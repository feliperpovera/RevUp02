import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/brand/kit";
import { goToForm } from "@/config/links";
import posts from "@/config/blog-posts.json";
import servicePages from "@/config/service-pages.json";
import { formatDate } from "@/pages/BlogPage";
import { localizePath, pagePath, postLang, postPath, useLang } from "@/config/i18n";

export type BlogPost = (typeof posts)[number];

const COPY = {
  en: {
    breadcrumb: "Breadcrumb",
    home: "Home",
    minRead: "min read",
    ctaTitle: "Want this done for your business?",
    ctaText:
      "RevUp builds marketing for US service businesses — campaigns, websites and tracking focused on calls and booked jobs.",
    book: "Book a Meeting",
    explore: (name: string) => `Explore our ${name}`,
    more: "More articles",
    all: "All articles",
  },
  es: {
    breadcrumb: "Ruta de navegación",
    home: "Inicio",
    minRead: "min de lectura",
    ctaTitle: "¿Quieres que hagamos esto por tu negocio?",
    ctaText:
      "RevUp crea el marketing de negocios de servicios en EE. UU. — campañas, sitios web y medición enfocados en conseguir llamadas y trabajos agendados.",
    book: "Agenda una reunión",
    explore: (name: string) => `Ver servicio: ${name}`,
    more: "Más artículos",
    all: "Todos los artículos",
  },
};

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  const lang = useLang();
  const t = COPY[lang];
  const more = posts.filter((p) => p.slug !== post.slug && postLang(p) === lang);
  const findService = (path: string) => servicePages.find((p) => p.path === localizePath(path, lang));
  const related = findService(post.service) ?? findService("/service-business-marketing");

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="container mx-auto px-4 pb-24 pt-36 md:px-8 md:pt-44">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <nav aria-label={t.breadcrumb} className="mb-8 text-sm text-stone">
              <Link to={pagePath("home", lang)} className="hover:text-performance">{t.home}</Link>
              <span className="mx-2">/</span>
              <Link to={pagePath("blog", lang)} className="hover:text-performance">Blog</Link>
            </nav>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone">
              {formatDate(post.date, lang)} · {post.readingMinutes} {t.minRead} · RevUp Agency Group
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[1.08] text-foreground md:text-5xl">{post.h1}</h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-stone">{post.excerpt}</p>
          </Reveal>

          <div className="mt-12 space-y-12">
            {post.sections.map((section) => (
              <section key={section.h2}>
                <h2 className="font-heading text-2xl text-foreground md:text-3xl">{section.h2}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="mt-4 text-base font-light leading-relaxed text-foreground/80 md:text-lg">
                    {paragraph}
                  </p>
                ))}
                {"bullets" in section && section.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-base font-light leading-relaxed text-foreground/80 marker:text-performance md:text-lg">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-graphite p-8 md:p-10">
            <p className="font-heading text-3xl leading-tight text-cream">{t.ctaTitle}</p>
            <p className="mt-2 text-cream/70">
              {t.ctaText}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={goToForm}
                className="h-12 rounded-full bg-accent px-7 font-semibold text-graphite hover:bg-accent/90"
              >
                {t.book}
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
              {related ? (
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-cream/30 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream">
                  <Link to={related.path}>{t.explore(related.name)}</Link>
                </Button>
              ) : null}
            </div>
          </div>

          {/* More articles */}
          <nav aria-label={t.more} className="mt-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-stone">{t.more}</p>
            <ul className="space-y-3">
              {more.map((p) => (
                <li key={postPath(p)}>
                  <Link to={postPath(p)} className="font-heading text-lg text-foreground hover:text-performance">
                    {p.h1}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to={pagePath("blog", lang)} className="mt-8 inline-flex items-center gap-2 text-sm text-stone hover:text-performance">
              <ArrowLeft className="h-4 w-4" />
              {t.all}
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
