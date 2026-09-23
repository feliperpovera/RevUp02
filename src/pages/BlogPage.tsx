import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrandCard, Eyebrow, Reveal } from "@/components/brand/kit";
import posts from "@/config/blog-posts.json";

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const CORNERS = ["tl", "tr", "bl", "br"] as const;

const BlogPage = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <main className="container mx-auto px-4 pb-24 pt-36 md:px-8 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow index="001" label="Blog" className="mb-8 max-w-md" />
          <h1 className="font-heading text-4xl leading-[1.05] text-foreground md:text-6xl">
            Marketing guides for <span className="text-primary">service businesses</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-stone">
            Practical advice on Google Ads, social media ads, Google Business Profile and websites for US service
            businesses that want more calls, leads and booked jobs.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={(i % 2) * 0.08}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <BrandCard corner={CORNERS[i % 4]} className="flex h-full flex-col">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone">
                    {formatDate(post.date)} · {post.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 font-heading text-2xl leading-tight text-foreground transition-colors group-hover:text-performance">
                    {post.h1}
                  </h2>
                  <p className="mt-3 flex-1 font-light leading-relaxed text-stone">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-performance">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </BrandCard>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </main>
    <Footer />
  </div>
);

export default BlogPage;
