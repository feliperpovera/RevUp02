import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import revupLogoLight from "@/assets/revup-logo-light.png";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { user, loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/admin", { replace: true });
    }
  }, [loading, user, navigate]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Ingresa tu email y contraseña");
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "Credenciales inválidas" : error.message);
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center gap-4">
          <img src={revupLogoLight} alt="RevUp Agency Group" className="h-12" />
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Admin Portal</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h1 className="mb-1 font-heading text-2xl">Iniciar sesión</h1>
          <p className="mb-6 text-sm text-muted-foreground">Acceso privado del equipo RevUp.</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="h-12 rounded-xl pl-11"
              />
            </div>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-12 rounded-xl pl-11"
              />
            </div>
            <Button type="submit" disabled={submitting} className="h-12 w-full rounded-full font-semibold">
              {submitting ? "Ingresando…" : "Ingresar"}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default AdminLoginPage;
