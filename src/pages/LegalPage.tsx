import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLang } from "@/config/i18n";
import legal from "@/config/legal.json";

export type LegalDoc = keyof typeof legal.docs;

type Section = { h: string; p: string[]; list?: string[]; after?: string[] };

const formatDate = (iso: string, lang: "en" | "es") =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(lang === "es" ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric" });

const LegalPage = ({ doc }: { doc: LegalDoc }) => {
  const lang = useLang();
  const d = legal.docs[doc][lang];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="container mx-auto px-4 pb-24 pt-36 md:px-8 md:pt-44">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">{d.title}</h1>
          <p className="mt-3 text-sm text-stone">
            {lang === "es" ? "Fecha de vigencia" : "Effective date"}: {formatDate(legal.effective, lang)}
          </p>
          <p className="mt-8 text-base leading-relaxed text-foreground/80 md:text-lg">{d.intro}</p>
          {(d.sections as Section[]).map((s) => (
            <section key={s.h} className="mt-10">
              <h2 className="font-heading text-2xl text-foreground">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para.slice(0, 40)} className="mt-3 leading-relaxed text-foreground/80">{para}</p>
              ))}
              {s.list ? (
                <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-foreground/80 marker:text-performance">
                  {s.list.map((li) => <li key={li.slice(0, 40)}>{li}</li>)}
                </ul>
              ) : null}
              {s.after?.map((para) => (
                <p key={para.slice(0, 40)} className="mt-3 leading-relaxed text-foreground/80">{para}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
