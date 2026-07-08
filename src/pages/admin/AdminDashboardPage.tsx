import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download,
  Inbox,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Rocket,
  Search,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { checkIsAdmin } from "@/lib/adminAuth";
import { supabase } from "@/integrations/supabase/client";
import revupLogoLight from "@/assets/revup-logo-light.png";

type SubmissionRecord = Record<string, unknown> & { id?: string | number };

const SOURCES = [
  { key: "leads", label: "Leads", icon: Rocket },
  { key: "contact_submissions", label: "Contacto", icon: MessageSquare },
  { key: "onboarding_submissions", label: "Onboarding", icon: Inbox },
] as const;

type SourceKey = (typeof SOURCES)[number]["key"];

const STATUS_OPTIONS = ["new", "contacted", "qualified", "lost"];

const asText = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(asText).join(", ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return "";
};

const formatDate = (value: unknown) => {
  const text = asText(value);
  if (!text) return "—";
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? text : date.toLocaleString();
};

const pickName = (row: SubmissionRecord) =>
  asText(row.name) || asText(row.full_name) || asText(row.company) || asText(row.email) || "—";

const pickMessage = (row: SubmissionRecord) =>
  asText(row.message) ||
  asText(row.project_description) ||
  asText(row.additional_info) ||
  asText(row.strategy_details);

/** Field order preference for the detail dialog; everything else follows. */
const PREFERRED_FIELDS = [
  "created_at",
  "name",
  "full_name",
  "email",
  "phone",
  "company",
  "services",
  "budget_range",
  "message",
  "project_description",
  "source_form",
  "status",
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [source, setSource] = useState<SourceKey>("leads");
  const [rows, setRows] = useState<SubmissionRecord[]>([]);
  const [counts, setCounts] = useState<Partial<Record<SourceKey, number>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<SubmissionRecord | null>(null);

  const fetchRows = useCallback(async (table: SourceKey) => {
    setIsLoading(true);
    setError(null);
    const { data, error: qError } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (qError) {
      setError(qError.message);
      setRows([]);
    } else {
      setRows((data ?? []) as SubmissionRecord[]);
      setCounts((prev) => ({ ...prev, [table]: data?.length ?? 0 }));
    }
    setIsLoading(false);
  }, []);

  const fetchCounts = useCallback(async () => {
    const next: Partial<Record<SourceKey, number>> = {};
    await Promise.all(
      SOURCES.map(async ({ key }) => {
        const { count } = await supabase.from(key).select("*", { count: "exact", head: true });
        next[key] = count ?? 0;
      })
    );
    setCounts(next);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/admin/login", { replace: true });
      return;
    }
    void (async () => {
      const ok = await checkIsAdmin();
      setIsAdmin(ok);
      if (ok) {
        void fetchCounts();
        void fetchRows(source);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, navigate]);

  useEffect(() => {
    if (isAdmin) void fetchRows(source);
  }, [source, isAdmin, fetchRows]);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter !== "all" && asText(row.status).toLowerCase() !== statusFilter) return false;
      if (!lower) return true;
      const haystack = [pickName(row), asText(row.email), asText(row.phone), pickMessage(row)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(lower);
    });
  }, [rows, query, statusFilter]);

  const handleStatusUpdate = async (row: SubmissionRecord, nextStatus: string) => {
    if (row.id === undefined || row.id === null) return;
    const { error: uError } = await supabase
      .from(source)
      .update({ status: nextStatus })
      .eq("id", row.id as string);

    if (uError) {
      toast.error(`No se pudo actualizar: ${uError.message}`);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: nextStatus } : r)));
    toast.success("Estado actualizado");
  };

  const handleExportCsv = () => {
    if (!filtered.length) {
      toast.info("No hay registros para exportar");
      return;
    }
    const keys = Array.from(new Set(filtered.flatMap((row) => Object.keys(row))));
    const escape = (value: unknown) => `"${asText(value).replace(/"/g, '""')}"`;
    const csv = [keys.join(","), ...filtered.map((row) => keys.map((k) => escape(row[k])).join(","))].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `revup-${source}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading || (user && isAdmin === null)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      </main>
    );
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
          <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-destructive" />
          <h1 className="font-heading text-2xl mb-2">Cuenta sin autorización</h1>
          <p className="text-muted-foreground mb-6">
            Tu cuenta ({user?.email}) existe pero no es administradora. Pide al administrador
            actual que te asigne el rol admin en la tabla <code>user_roles</code>.
          </p>
          <Button onClick={handleLogout} variant="outline" className="rounded-full">
            Cerrar sesión
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={revupLogoLight} alt="RevUp" className="h-8" />
            <span className="hidden text-sm uppercase tracking-[0.25em] text-muted-foreground sm:block">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground md:block">{user?.email}</span>
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Source cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SOURCES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSource(key)}
              className={`rounded-3xl border p-6 text-left transition-all duration-300 ${
                source === key
                  ? "border-primary bg-primary text-primary-foreground shadow-lg"
                  : "border-border bg-card hover:border-primary/40 hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${source === key ? "text-accent" : "text-muted-foreground"}`} />
                <span className="font-heading text-3xl">{counts[key] ?? "—"}</span>
              </div>
              <p className={`mt-2 text-sm ${source === key ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {label}
              </p>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email, teléfono o mensaje"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 rounded-full pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 w-[150px] rounded-full">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 rounded-full" onClick={() => fetchRows(source)}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" className="h-11 rounded-full" onClick={handleExportCsv}>
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-4 font-medium">Fecha</th>
                  <th className="px-5 py-4 font-medium">Nombre</th>
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Teléfono</th>
                  <th className="px-5 py-4 font-medium">Mensaje</th>
                  <th className="px-5 py-4 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                      Cargando…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                      <Mail className="mx-auto mb-2 h-6 w-6" />
                      Sin registros
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={asText(row.id) || i}
                      onClick={() => setSelected(row)}
                      className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">{formatDate(row.created_at)}</td>
                      <td className="px-5 py-4 font-medium">{pickName(row)}</td>
                      <td className="px-5 py-4">{asText(row.email) || "—"}</td>
                      <td className="whitespace-nowrap px-5 py-4">{asText(row.phone) || "—"}</td>
                      <td className="max-w-[280px] truncate px-5 py-4 text-muted-foreground">{pickMessage(row) || "—"}</td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={asText(row.status) || "new"}
                          onValueChange={(value) => handleStatusUpdate(row, value)}
                        >
                          <SelectTrigger className="h-8 w-[130px] rounded-full text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(new Set([...STATUS_OPTIONS, asText(row.status)].filter(Boolean))).map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {filtered.length} de {rows.length} registros · fuente: {SOURCES.find((s) => s.key === source)?.label}
        </p>
      </div>

      {/* Detail dialog */}
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">{selected ? pickName(selected) : ""}</DialogTitle>
            <DialogDescription>
              Registro completo · {selected ? formatDate(selected.created_at) : ""}
            </DialogDescription>
          </DialogHeader>
          {selected ? (
            <div className="space-y-3">
              {[...PREFERRED_FIELDS.filter((k) => k in selected), ...Object.keys(selected).filter((k) => !PREFERRED_FIELDS.includes(k))]
                .filter((key, idx, arr) => arr.indexOf(key) === idx && key !== "id")
                .map((key) => {
                  const value = asText(selected[key]);
                  if (!value) return null;
                  return (
                    <div key={key} className="rounded-2xl bg-muted/40 px-4 py-3">
                      <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">{key.replace(/_/g, " ")}</p>
                      {key === "status" ? (
                        <Badge variant="secondary" className="rounded-full">{value}</Badge>
                      ) : (
                        <p className="whitespace-pre-wrap break-words text-sm">{key === "created_at" ? formatDate(value) : value}</p>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AdminDashboardPage;
