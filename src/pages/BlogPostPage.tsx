import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/brand/kit";
import { openCalendly } from "@/config/links";
import posts from "@/config/blog-posts.json";
import servicePages from "@/config/service-pages.json";
import { formatDate } from "@/pages/BlogPage";

export type BlogPost = (typeof posts)[number];

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  const more = posts.filter((p) => p.slug !== post.slug);
  const related = servicePages.find((p) => p.path === post.service) ?? servicePages.find((p) => p.path === "/service-business-marketing");

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="container mx-auto px-4 pb-24 pt-36 md:px-8 md:pt-44">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-stone">
              <Link to="/" className="hover:text-performance">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-performance">Blog</Link>
            </nav>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone">
              {formatDate(post.date)} · {post.readingMinutes} min read · RevUp Agency Group
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
            <p className="font-heading text-3xl leading-tight text-cream">Want this done for your business?</p>
            <p className="mt-2 text-cream/70">
              RevUp builds marketing for US service businesses — campaigns, websites and tracking focused on calls and
              booked jobs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={openCalendly}
                className="h-12 rounded-full bg-accent px-7 font-semibold text-graphite hover:bg-accent/90"
              >
                Book a Meeting
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
              {related ? (
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-cream/30 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream">
                  <Link to={related.path}>Explore our {related.name}</Link>
                </Button>
              ) : null}
            </div>
          </div>

          {/* More articles */}
          <nav aria-label="More articles" className="mt-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-stone">More articles</p>
            <ul className="space-y-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="font-heading text-lg text-foreground hover:text-performance">
                    {p.h1}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-sm text-stone hover:text-performance">
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
