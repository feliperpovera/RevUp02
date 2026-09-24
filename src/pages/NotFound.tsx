import { pagePath, useLang } from "@/config/i18n";

const COPY = {
  en: { message: "Oops! Page not found", home: "Return to Home" },
  es: { message: "¡Uy! No encontramos esta página", home: "Volver al inicio" },
};

const NotFound = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.message}</p>
        <a href={pagePath("home", lang)} className="text-primary underline hover:text-primary/90">
          {t.home}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
