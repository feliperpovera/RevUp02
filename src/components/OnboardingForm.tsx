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
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  // Step 1
  shopifyReport: File | null;
  googleAdsReport: File | null;
  metaAdsReport: File | null;
  hasStrategy: string;
  strategyDetails: string;
  // Step 2
  googlePercentage: string;
  metaPercentage: string;
  activeSKUs: string;
  focusOnCategories: string;
  categoriesDetails: string;
  // Step 3
  hasDriveFolder: string;
  driveFolderLink: string;
  additionalInfo: string;
  consent: boolean;
}

const initialFormData: FormData = {
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

interface FormErrors {
  [key: string]: string;
}

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.hasStrategy) {
      newErrors.hasStrategy = "Este campo es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.googlePercentage) {
      newErrors.googlePercentage = "El porcentaje de Google es requerido";
    }
    if (!formData.metaPercentage) {
      newErrors.metaPercentage = "El porcentaje de Meta es requerido";
    }
    
    const googleNum = parseFloat(formData.googlePercentage) || 0;
    const metaNum = parseFloat(formData.metaPercentage) || 0;
    const total = googleNum + metaNum;
    
    if (total > 100) {
      newErrors.percentageSum = "La suma de los porcentajes no puede superar 100%";
    } else if (formData.googlePercentage && formData.metaPercentage && total < 95) {
      newErrors.percentageSum = "La suma de los porcentajes debe ser aproximadamente 100%";
    }
    
    if (!formData.activeSKUs) {
      newErrors.activeSKUs = "El número de SKUs es requerido";
    }
    if (!formData.focusOnCategories) {
      newErrors.focusOnCategories = "Este campo es requerido";
    }
    if (formData.focusOnCategories === "si" && !formData.categoriesDetails) {
      newErrors.categoriesDetails = "Por favor especifica las categorías o productos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.hasDriveFolder) {
      newErrors.hasDriveFolder = "Este campo es requerido";
    }
    if (formData.driveFolderLink && !isValidUrl(formData.driveFolderLink)) {
      newErrors.driveFolderLink = "Por favor ingresa una URL válida";
    }
    if (!formData.consent) {
      newErrors.consent = "Debes aceptar el tratamiento de datos para continuar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Security constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
  ];
  const MAX_TEXT_LENGTH = 2000;

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: `El archivo ${file.name} excede el límite de 10MB` };
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { valid: false, error: `Tipo de archivo no permitido: ${file.name}. Solo se aceptan PDF, CSV, XLS, XLSX` };
    }
    return { valid: true };
  };

  const sanitizeText = (text: string): string => {
    return text
      .slice(0, MAX_TEXT_LENGTH)
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim();
  };

  const fileToBase64 = (file: File): Promise<{ name: string; content: string; type: string }> => {
    return new Promise((resolve, reject) => {
      // Validate file before processing
      const validation = validateFile(file);
      if (!validation.valid) {
        reject(new Error(validation.error));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({
          name: file.name.slice(0, 255), // Limit filename length
          content: base64,
          type: file.type,
        });
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    try {
      // Validate files before upload
      const filesToValidate = [
        formData.shopifyReport,
        formData.googleAdsReport,
        formData.metaAdsReport,
      ].filter(Boolean) as File[];

      for (const file of filesToValidate) {
        const validation = validateFile(file);
        if (!validation.valid) {
          toast({
            title: "Error de validación",
            description: validation.error,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Convert files to base64
      const shopifyFile = formData.shopifyReport ? await fileToBase64(formData.shopifyReport) : null;
      const googleAdsFile = formData.googleAdsReport ? await fileToBase64(formData.googleAdsReport) : null;
      const metaAdsFile = formData.metaAdsReport ? await fileToBase64(formData.metaAdsReport) : null;

      // Sanitize text inputs
      const sanitizedData = {
        hasStrategy: formData.hasStrategy,
        strategyDetails: sanitizeText(formData.strategyDetails),
        googlePercentage: formData.googlePercentage,
        metaPercentage: formData.metaPercentage,
        activeSKUs: formData.activeSKUs,
        focusOnCategories: formData.focusOnCategories,
        categoriesDetails: sanitizeText(formData.categoriesDetails),
        hasDriveFolder: formData.hasDriveFolder,
        driveFolderLink: formData.driveFolderLink.slice(0, 500),
        additionalInfo: sanitizeText(formData.additionalInfo),
        shopifyReport: shopifyFile,
        googleAdsReport: googleAdsFile,
        metaAdsReport: metaAdsFile,
      };

      const { data, error } = await supabase.functions.invoke('send-onboarding-email', {
        body: sanitizedData,
      });

      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "¡Formulario enviado!",
        description: "Hemos recibido tu información correctamente.",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al enviar el formulario. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ 
    label, 
    field, 
    accept = ".csv,.xlsx,.pdf",
    description 
  }: { 
    label: string; 
    field: keyof FormData;
    accept?: string;
    description?: string;
  }) => {
    const file = formData[field] as File | null;
    
    return (
      <div className="space-y-2">
        <Label className="text-foreground font-medium">{label}</Label>
        {description && (
          <p className="text-sm text-foreground/60">{description}</p>
        )}
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
            accept={accept}
            onChange={handleFileChange(field)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            {file ? (
              <>
                <FileText className="w-8 h-8 text-accent" />
                <span className="text-sm font-medium text-foreground">{file.name}</span>
                <span className="text-xs text-foreground/60">Click para cambiar archivo</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-foreground/40 group-hover:text-accent transition-colors" />
                <span className="text-sm text-foreground/60">
                  Arrastra tu archivo aquí o haz click para seleccionar
                </span>
                <span className="text-xs text-foreground/40">CSV, XLSX, PDF</span>
              </>
            )}
          </div>
        </div>
        {errors[field] && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500",
                step < currentStep 
                  ? "bg-accent text-accent-foreground scale-100" 
                  : step === currentStep 
                    ? "bg-accent text-accent-foreground scale-110 shadow-lg shadow-accent/30" 
                    : "bg-muted text-muted-foreground"
              )}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div 
                className={cn(
                  "w-16 sm:w-24 md:w-32 h-1 mx-2 rounded transition-all duration-500",
                  step < currentStep ? "bg-accent" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm text-foreground/60">
          Paso {currentStep} de 3: {
            currentStep === 1 ? "Archivos" : 
            currentStep === 2 ? "Datos de Operación" : 
            "Contenido"
          }
        </span>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className={cn(
        "futuristic-card p-8 md:p-12 text-center transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="mb-6 relative">
          <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center animate-scale-in">
            <Check className="w-10 h-10 text-accent animate-fade-in" style={{ animationDelay: '0.3s' }} />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-accent/30 rounded-full animate-ping" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          ¡Gracias, recibimos tu información!
        </h2>
        <p className="text-foreground/70 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Nuestro equipo revisará tus datos y te contactará pronto para comenzar a desarrollar tu estrategia publicitaria personalizada.
        </p>
        
        <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold mb-4 text-accent">Resumen de tu envío:</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>✓ Informe de Shopify: {formData.shopifyReport?.name}</li>
            <li>✓ Informe de Google Ads: {formData.googleAdsReport?.name}</li>
            <li>✓ Informe de Meta Ads: {formData.metaAdsReport?.name}</li>
            <li>✓ Distribución: Google {formData.googlePercentage}% / Meta {formData.metaPercentage}%</li>
            <li>✓ SKUs activos: {formData.activeSKUs}</li>
          </ul>
        </div>
        
        <Link to="/">
          <Button variant="glow" size="lg" className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Home className="w-5 h-5 mr-2" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={cn(
      "futuristic-card p-6 md:p-8 transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <ProgressBar />
      
      {/* Step 1 */}
      <div className={cn(
        "space-y-6 transition-all duration-500",
        currentStep === 1 ? "opacity-100 translate-x-0" : "hidden"
      )}>
        <FileUploadField 
          label="1. Sube el informe de ventas de Shopify en EE.UU. de los últimos 12 meses (opcional)"
          field="shopifyReport"
          description="Formato aceptado: CSV, XLSX, PDF"
        />
        
        <FileUploadField 
          label="2. Sube los informes de tus campañas de Google Ads de los últimos 12 meses (opcional)"
          field="googleAdsReport"
        />
        
        <FileUploadField 
          label="3. Sube los informes de tus campañas de Meta Ads de los últimos 12 meses (opcional)"
          field="metaAdsReport"
        />
        
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            4. ¿Tienen actualmente una estrategia publicitaria definida para Google y Meta Ads?
          </Label>
          <Select value={formData.hasStrategy} onValueChange={handleSelectChange("hasStrategy")}>
            <SelectTrigger className={cn(
              "w-full transition-all duration-200",
              errors.hasStrategy ? "border-destructive" : ""
            )}>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.hasStrategy && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.hasStrategy}
            </p>
          )}
        </div>
        
        {formData.hasStrategy === "si" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-foreground font-medium">
              5. Cuéntenos más sobre tu estrategia. ¿Priorizan categorías o productos específicos?
            </Label>
            <Textarea 
              value={formData.strategyDetails}
              onChange={handleInputChange("strategyDetails")}
              placeholder="Describe tu estrategia actual..."
              className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-accent/50"
            />
          </div>
        )}
      </div>

      {/* Step 2 */}
      <div className={cn(
        "space-y-6 transition-all duration-500",
        currentStep === 2 ? "opacity-100 translate-x-0" : "hidden"
      )}>
        <div className="space-y-4">
          <Label className="text-foreground font-medium">
            6. ¿Cuál es la distribución del gasto publicitario entre Google y Meta Ads?
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-foreground/70">Google Ads (%)</Label>
              <Input 
                type="number"
                min="0"
                max="100"
                value={formData.googlePercentage}
                onChange={(e) => {
                  const value = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                  const metaNum = parseFloat(formData.metaPercentage) || 0;
                  if (value + metaNum > 100) {
                    setFormData(prev => ({ 
                      ...prev, 
                      googlePercentage: String(Math.min(value, 100 - metaNum))
                    }));
                  } else {
                    setFormData(prev => ({ ...prev, googlePercentage: e.target.value }));
                  }
                  if (errors.googlePercentage) {
                    setErrors(prev => ({ ...prev, googlePercentage: "", percentageSum: "" }));
                  }
                }}
                placeholder="Ej: 60"
                className={cn(
                  "transition-all duration-200 focus:ring-2 focus:ring-accent/50",
                  errors.googlePercentage ? "border-destructive" : ""
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground/70">Meta Ads (%)</Label>
              <Input 
                type="number"
                min="0"
                max="100"
                value={formData.metaPercentage}
                onChange={(e) => {
                  const value = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
                  const googleNum = parseFloat(formData.googlePercentage) || 0;
                  if (value + googleNum > 100) {
                    setFormData(prev => ({ 
                      ...prev, 
                      metaPercentage: String(Math.min(value, 100 - googleNum))
                    }));
                  } else {
                    setFormData(prev => ({ ...prev, metaPercentage: e.target.value }));
                  }
                  if (errors.metaPercentage) {
                    setErrors(prev => ({ ...prev, metaPercentage: "", percentageSum: "" }));
                  }
                }}
                placeholder="Ej: 40"
                className={cn(
                  "transition-all duration-200 focus:ring-2 focus:ring-accent/50",
                  errors.metaPercentage ? "border-destructive" : ""
                )}
              />
            </div>
          </div>
          {/* Show current sum */}
          {(formData.googlePercentage || formData.metaPercentage) && (
            <p className={cn(
              "text-sm flex items-center gap-1 animate-fade-in",
              (parseFloat(formData.googlePercentage || "0") + parseFloat(formData.metaPercentage || "0")) === 100 
                ? "text-green-500" 
                : "text-foreground/60"
            )}>
              Total: {(parseFloat(formData.googlePercentage || "0") + parseFloat(formData.metaPercentage || "0"))}%
              {(parseFloat(formData.googlePercentage || "0") + parseFloat(formData.metaPercentage || "0")) === 100 && (
                <Check className="w-4 h-4" />
              )}
            </p>
          )}
          {errors.percentageSum && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.percentageSum}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            7. ¿Cuántos SKUs tiene activos en Shopify disponibles para la venta en EE.UU.?
          </Label>
          <Input 
            type="number"
            min="0"
            value={formData.activeSKUs}
            onChange={handleInputChange("activeSKUs")}
            placeholder="Ej: 150"
            className={cn(
              "transition-all duration-200 focus:ring-2 focus:ring-accent/50",
              errors.activeSKUs ? "border-destructive" : ""
            )}
          />
          {errors.activeSKUs && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.activeSKUs}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            8. ¿Desean enfocar esta nueva estrategia publicitaria en categorías específicas o en productos concretos?
          </Label>
          <Select value={formData.focusOnCategories} onValueChange={handleSelectChange("focusOnCategories")}>
            <SelectTrigger className={cn(
              "w-full transition-all duration-200",
              errors.focusOnCategories ? "border-destructive" : ""
            )}>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.focusOnCategories && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.focusOnCategories}
            </p>
          )}
        </div>
        
        {formData.focusOnCategories === "si" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-foreground font-medium">
              9. Comparte las categorías y productos a los que desean dirigirse principalmente con esta estrategia
            </Label>
            <Textarea 
              value={formData.categoriesDetails}
              onChange={handleInputChange("categoriesDetails")}
              placeholder="Lista las categorías y/o productos..."
              className={cn(
                "min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-accent/50",
                errors.categoriesDetails ? "border-destructive" : ""
              )}
            />
            {errors.categoriesDetails && (
              <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                {errors.categoriesDetails}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Step 3 */}
      <div className={cn(
        "space-y-6 transition-all duration-500",
        currentStep === 3 ? "opacity-100 translate-x-0" : "hidden"
      )}>
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            10. ¿Tienen una carpeta en Google Drive o Dropbox con su contenido para redes sociales?
          </Label>
          <Select value={formData.hasDriveFolder} onValueChange={handleSelectChange("hasDriveFolder")}>
            <SelectTrigger className={cn(
              "w-full transition-all duration-200",
              errors.hasDriveFolder ? "border-destructive" : ""
            )}>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.hasDriveFolder && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.hasDriveFolder}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            11. Por favor, comparte el acceso a su Drive o Dropbox con el correo: managementecaccess@gmail.com
          </Label>
          <p className="text-sm text-foreground/60 mb-2">
            Además, pega el enlace aquí abajo.
          </p>
          <Input 
            type="url"
            value={formData.driveFolderLink}
            onChange={handleInputChange("driveFolderLink")}
            placeholder="https://drive.google.com/... o https://dropbox.com/..."
            className={cn(
              "transition-all duration-200 focus:ring-2 focus:ring-accent/50",
              errors.driveFolderLink ? "border-destructive" : ""
            )}
          />
          {errors.driveFolderLink && (
            <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.driveFolderLink}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            12. Compártenos cualquier otra información que consideren relevante (opcional)
          </Label>
          <Textarea 
            value={formData.additionalInfo}
            onChange={handleInputChange("additionalInfo")}
            placeholder="Información adicional..."
            className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-accent/50"
          />
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent" 
              checked={formData.consent}
              onCheckedChange={(checked) => {
                setFormData(prev => ({ ...prev, consent: checked as boolean }));
                if (errors.consent) {
                  setErrors(prev => ({ ...prev, consent: "" }));
                }
              }}
              className={cn(errors.consent ? "border-destructive" : "")}
            />
            <label 
              htmlFor="consent" 
              className="text-sm text-foreground/70 cursor-pointer leading-relaxed"
            >
              Autorizo el tratamiento de datos y el uso de la información para el desarrollo de la estrategia publicitaria.
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive flex items-center gap-1 mt-2 animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        {currentStep > 1 ? (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="transition-all duration-200 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
        ) : (
          <div />
        )}
        
        {currentStep < 3 ? (
          <Button 
            variant="glow" 
            onClick={handleNext}
            className="transition-all duration-200"
          >
            Guardar y continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            variant="glow" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="transition-all duration-200 min-w-[140px]"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              <>
                Enviar
                <Check className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
