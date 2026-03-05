import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  AlertCircle,
  FileText,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

// ── Constants ────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];
const MAX_TEXT = 2000;

// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  shopifyReport: File | null;
  googleAdsReport: File | null;
  metaAdsReport: File | null;
  hasStrategy: string;
  strategyDetails: string;
  googlePercentage: string;
  metaPercentage: string;
  activeSKUs: string;
  focusOnCategories: string;
  categoriesDetails: string;
  hasDriveFolder: string;
  driveFolderLink: string;
  additionalInfo: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL: FormData = {
  shopifyReport: null,
  googleAdsReport: null,
  metaAdsReport: null,
  hasStrategy: "",
  strategyDetails: "",
  googlePercentage: "",
  metaPercentage: "",
  activeSKUs: "",
  focusOnCategories: "",
  categoriesDetails: "",
  hasDriveFolder: "",
  driveFolderLink: "",
  additionalInfo: "",
  consent: false,
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const validFile = (f: File): { ok: boolean; error?: string } => {
  if (f.size > MAX_FILE_SIZE)
    return { ok: false, error: `"${f.name}" exceeds the 10 MB limit` };
  if (!ALLOWED_TYPES.includes(f.type))
    return { ok: false, error: `"${f.name}": only PDF, CSV, XLS, XLSX are accepted` };
  return { ok: true };
};

const sanitize = (text: string) =>
  text.replace(/<[^>]*>/g, "").trim().slice(0, MAX_TEXT);

const isUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

// ── Component ────────────────────────────────────────────────────────────────
export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => setVisible(true), []);

  // ── Setters ────────────────────────────────────────────────────────────────
  const set =
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((p) => ({ ...p, [field]: e.target.value }));
        setErrors((p) => ({ ...p, [field]: "" }));
      };

  const setFile =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      setData((p) => ({ ...p, [field]: f }));
      setErrors((p) => ({ ...p, [field]: "" }));
    };

  const setSel =
    (field: keyof FormData) => (val: string) => {
      setData((p) => ({ ...p, [field]: val }));
      setErrors((p) => ({ ...p, [field]: "" }));
    };

  // ── Validators ────────────────────────────────────────────────────────────
  const validateStep1 = () => {
    const e: FormErrors = {};
    if (!data.hasStrategy) e.hasStrategy = "This field is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validateStep2 = () => {
    const e: FormErrors = {};
    if (!data.googlePercentage) e.googlePercentage = "Google % is required";
    if (!data.metaPercentage) e.metaPercentage = "Meta % is required";
    const total =
      (parseFloat(data.googlePercentage) || 0) +
      (parseFloat(data.metaPercentage) || 0);
    if (total > 100) e.percentageSum = "Total cannot exceed 100%";
    else if (data.googlePercentage && data.metaPercentage && total < 95)
      e.percentageSum = "Total should be approximately 100%";
    if (!data.activeSKUs) e.activeSKUs = "Number of SKUs is required";
    if (!data.focusOnCategories) e.focusOnCategories = "This field is required";
    if (data.focusOnCategories === "yes" && !data.categoriesDetails)
      e.categoriesDetails = "Please specify the categories or products";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validateStep3 = () => {
    const e: FormErrors = {};
    if (!data.hasDriveFolder) e.hasDriveFolder = "This field is required";
    if (data.driveFolderLink && !isUrl(data.driveFolderLink))
      e.driveFolderLink = "Please enter a valid URL";
    if (!data.consent) e.consent = "You must accept data processing to continue";
    setErrors(e);
    return !Object.keys(e).length;
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  const next = () => {
    const valid = step === 1 ? validateStep1() : validateStep2();
    if (valid) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setStep((s) => s - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitting(true);

    try {
      // Validate files
      for (const f of [data.shopifyReport, data.googleAdsReport, data.metaAdsReport].filter(Boolean) as File[]) {
        const { ok, error } = validFile(f);
        if (!ok) throw new Error(error);
      }

      // ── 1. Call secure Edge Function ──────────────────────────────────────
      const { data: result, error: fnError } = await supabase.functions.invoke("send-onboarding-email", {
        body: {
          hasStrategy: data.hasStrategy,
          strategyDetails: sanitize(data.strategyDetails),
          googlePercentage: data.googlePercentage,
          metaPercentage: data.metaPercentage,
          activeSKUs: data.activeSKUs,
          focusOnCategories: data.focusOnCategories,
          categoriesDetails: sanitize(data.categoriesDetails),
          hasDriveFolder: data.hasDriveFolder,
          driveFolderLink: data.driveFolderLink,
          additionalInfo: sanitize(data.additionalInfo),
          consent: data.consent,
          shopifyReportName: data.shopifyReport?.name,
          googleAdsReportName: data.googleAdsReport?.name,
          metaAdsReportName: data.metaAdsReport?.name,
          sourceForm: "onboarding_form",
        },
      });

      if (fnError || (result && result.error)) {
        throw new Error(fnError?.message || result?.error || "Could not save your information. Please try again.");
      }

      setSubmitted(true);
      toast({
        title: "Form submitted!",
        description: "We received your information and will contact you soon.",
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error
        ? err.message
        : "There was a problem submitting the form. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Sub-components ─────────────────────────────────────────────────────────
  const FileField = ({
    label,
    field,
    description,
  }: {
    label: string;
    field: keyof FormData;
    description?: string;
  }) => {
    const file = data[field] as File | null;
    return (
      <div className="space-y-2">
        <Label className="text-foreground font-medium">{label}</Label>
        {description && <p className="text-sm text-foreground/60">{description}</p>}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 cursor-pointer group",
            "hover:border-accent/50 hover:bg-accent/5",
            errors[field] ? "border-destructive" : "border-border",
            file ? "border-accent bg-accent/5" : ""
          )}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls,.pdf"
            onChange={setFile(field)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={label}
          />
          <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
            {file ? (
              <>
                <FileText className="w-8 h-8 text-accent" />
                <span className="text-sm font-medium text-foreground">{file.name}</span>
                <span className="text-xs text-foreground/60">Click to change file</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-foreground/40 group-hover:text-accent transition-colors" />
                <span className="text-sm text-foreground/60">Drag here or click to select</span>
                <span className="text-xs text-foreground/40">CSV, XLSX, PDF · Max 10 MB</span>
              </>
            )}
          </div>
        </div>
        {errors[field] && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  const StepBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500",
                s < step
                  ? "bg-accent text-accent-foreground"
                  : s === step
                    ? "bg-accent text-accent-foreground scale-110 shadow-lg shadow-accent/30"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {s < step ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "w-16 sm:w-24 md:w-32 h-1 mx-2 rounded transition-all duration-500",
                  s < step ? "bg-accent" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm text-foreground/60">
          Step {step} of 3:{" "}
          {step === 1 ? "Reports & Strategy" : step === 2 ? "Ad Performance" : "Content & Access"}
        </span>
      </div>
    </div>
  );

  // ── Success Screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className={cn(
          "futuristic-card p-8 md:p-12 text-center transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="mb-6 relative">
          <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center animate-scale-in">
            <Check className="w-10 h-10 text-accent animate-fade-in" style={{ animationDelay: "0.3s" }} />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-accent/30 rounded-full animate-ping" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Thank you, we received your information!
        </h2>
        <p className="text-foreground/70 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Our team will review your data and contact you soon to start developing your personalized advertising strategy.
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <h3 className="font-semibold mb-4 text-accent">Submission Summary:</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            {data.shopifyReport && <li>✓ Shopify Report: {data.shopifyReport.name}</li>}
            {data.googleAdsReport && <li>✓ Google Ads Report: {data.googleAdsReport.name}</li>}
            {data.metaAdsReport && <li>✓ Meta Ads Report: {data.metaAdsReport.name}</li>}
            <li>✓ Distribution: Google {data.googlePercentage}% / Meta {data.metaPercentage}%</li>
            <li>✓ Active SKUs: {data.activeSKUs}</li>
          </ul>
        </div>

        <Link to="/">
          <Button variant="glow" size="lg" className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  // ── Main Form ──────────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        "futuristic-card p-6 md:p-8 transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <StepBar />

      {/* ── Step 1: Reports & Strategy ──────────────────────────────────── */}
      <div className={cn("space-y-6 transition-all duration-500", step === 1 ? "block" : "hidden")}>
        <FileField
          label="1. Upload your Shopify US sales report (last 12 months) — optional"
          field="shopifyReport"
          description="Accepted: CSV, XLSX, PDF · Max 10 MB"
        />
        <FileField
          label="2. Upload your Google Ads campaign reports (last 12 months) — optional"
          field="googleAdsReport"
        />
        <FileField
          label="3. Upload your Meta Ads campaign reports (last 12 months) — optional"
          field="metaAdsReport"
        />

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            4. Do you currently have a defined advertising strategy for Google and Meta Ads?
            <span className="text-accent ml-1">*</span>
          </Label>
          <Select value={data.hasStrategy} onValueChange={setSel("hasStrategy")}>
            <SelectTrigger className={cn("w-full", errors.hasStrategy && "border-destructive")}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.hasStrategy && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.hasStrategy}
            </p>
          )}
        </div>

        {data.hasStrategy === "yes" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-foreground font-medium">
              5. Tell us more about your current strategy:
            </Label>
            <Textarea
              value={data.strategyDetails}
              onChange={set("strategyDetails")}
              placeholder="Describe your current strategy…"
              maxLength={MAX_TEXT}
              className="min-h-[100px]"
            />
          </div>
        )}
      </div>

      {/* ── Step 2: Ad Performance ──────────────────────────────────────── */}
      <div className={cn("space-y-6 transition-all duration-500", step === 2 ? "block" : "hidden")}>
        <div className="space-y-4">
          <Label className="text-foreground font-medium">
            6. Distribution of ad spend between Google and Meta Ads
            <span className="text-accent ml-1">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {/* Google */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground/70">Google Ads (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 60"
                value={data.googlePercentage}
                onChange={(e) => {
                  const v = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                  const m = parseFloat(data.metaPercentage) || 0;
                  setData((p) => ({
                    ...p,
                    googlePercentage: v + m > 100 ? String(100 - m) : e.target.value,
                  }));
                  setErrors((p) => ({ ...p, googlePercentage: "", percentageSum: "" }));
                }}
                className={cn(errors.googlePercentage && "border-destructive")}
              />
              {errors.googlePercentage && (
                <p className="text-xs text-destructive">{errors.googlePercentage}</p>
              )}
            </div>
            {/* Meta */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground/70">Meta Ads (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 40"
                value={data.metaPercentage}
                onChange={(e) => {
                  const v = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                  const g = parseFloat(data.googlePercentage) || 0;
                  setData((p) => ({
                    ...p,
                    metaPercentage: v + g > 100 ? String(100 - g) : e.target.value,
                  }));
                  setErrors((p) => ({ ...p, metaPercentage: "", percentageSum: "" }));
                }}
                className={cn(errors.metaPercentage && "border-destructive")}
              />
              {errors.metaPercentage && (
                <p className="text-xs text-destructive">{errors.metaPercentage}</p>
              )}
            </div>
          </div>
          {(data.googlePercentage || data.metaPercentage) && (
            <p
              className={cn(
                "text-sm flex items-center gap-1",
                (parseFloat(data.googlePercentage || "0") + parseFloat(data.metaPercentage || "0")) === 100
                  ? "text-green-500"
                  : "text-foreground/60"
              )}
            >
              Total: {(parseFloat(data.googlePercentage || "0") + parseFloat(data.metaPercentage || "0"))}%
              {(parseFloat(data.googlePercentage || "0") + parseFloat(data.metaPercentage || "0")) === 100 && (
                <Check className="w-4 h-4" />
              )}
            </p>
          )}
          {errors.percentageSum && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.percentageSum}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            7. How many active SKUs on Shopify available in the US?
            <span className="text-accent ml-1">*</span>
          </Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 150"
            value={data.activeSKUs}
            onChange={set("activeSKUs")}
            className={cn(errors.activeSKUs && "border-destructive")}
          />
          {errors.activeSKUs && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.activeSKUs}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            8. Focus on specific categories or products?
            <span className="text-accent ml-1">*</span>
          </Label>
          <Select value={data.focusOnCategories} onValueChange={setSel("focusOnCategories")}>
            <SelectTrigger className={cn("w-full", errors.focusOnCategories && "border-destructive")}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.focusOnCategories && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.focusOnCategories}
            </p>
          )}
        </div>

        {data.focusOnCategories === "yes" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-foreground font-medium">
              9. List the categories and products to target:
            </Label>
            <Textarea
              value={data.categoriesDetails}
              onChange={set("categoriesDetails")}
              placeholder="List categories and/or products…"
              maxLength={MAX_TEXT}
              className={cn("min-h-[100px]", errors.categoriesDetails && "border-destructive")}
            />
            {errors.categoriesDetails && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.categoriesDetails}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Step 3: Content & Access ────────────────────────────────────── */}
      <div className={cn("space-y-6 transition-all duration-500", step === 3 ? "block" : "hidden")}>
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            10. Do you have a Google Drive or Dropbox folder with social media content?
            <span className="text-accent ml-1">*</span>
          </Label>
          <Select value={data.hasDriveFolder} onValueChange={setSel("hasDriveFolder")}>
            <SelectTrigger className={cn("w-full", errors.hasDriveFolder && "border-destructive")}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.hasDriveFolder && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.hasDriveFolder}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            11. Share access with managementecaccess@gmail.com — paste the link below
          </Label>
          <Input
            type="url"
            placeholder="https://drive.google.com/… or https://dropbox.com/…"
            value={data.driveFolderLink}
            onChange={set("driveFolderLink")}
            maxLength={500}
            className={cn(errors.driveFolderLink && "border-destructive")}
          />
          {errors.driveFolderLink && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.driveFolderLink}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            12. Any other relevant information? (optional)
          </Label>
          <Textarea
            value={data.additionalInfo}
            onChange={set("additionalInfo")}
            placeholder="Additional information…"
            maxLength={MAX_TEXT}
            className="min-h-[100px]"
          />
          <p className="text-xs text-foreground/40 text-right">{data.additionalInfo.length} / {MAX_TEXT}</p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="onboarding-consent"
              checked={data.consent}
              onCheckedChange={(c) => {
                setData((p) => ({ ...p, consent: c as boolean }));
                setErrors((p) => ({ ...p, consent: "" }));
              }}
              className={cn(errors.consent && "border-destructive")}
            />
            <label
              htmlFor="onboarding-consent"
              className="text-sm text-foreground/70 cursor-pointer leading-relaxed"
            >
              I authorize the processing of my data for the development of the advertising strategy.
              <span className="text-accent ml-1">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive flex items-center gap-1 mt-2">
              <AlertCircle className="w-4 h-4" /> {errors.consent}
            </p>
          )}
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        {step > 1 ? (
          <Button variant="outline" onClick={back} className="hover:bg-muted">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <Button variant="glow" onClick={next} className="ml-auto">
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            variant="glow"
            onClick={handleSubmit}
            disabled={submitting}
            className="ml-auto"
          >
            {submitting ? "Submitting…" : "Submit Form"}
            {!submitting && <Check className="w-4 h-4 ml-2" />}
          </Button>
        )}
      </div>
    </div>
  );
};
