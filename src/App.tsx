import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactElement } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { RouteMeta } from "@/components/RouteMeta";
import servicePages from "@/config/service-pages.json";
import blogPosts from "@/config/blog-posts.json";
import pages from "@/config/pages.json";
import { postPath, type PageKey } from "@/config/i18n";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const StrategyPage = lazy(() => import("./pages/StrategyPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const ROASCalculatorPage = lazy(() => import("./pages/ROASCalculatorPage"));
const GraciasPage = lazy(() => import("./pages/GraciasPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Pages that exist in English (site root) and Spanish (/es/...); each component reads the language from the URL. */
const CORE_PAGES: [PageKey, ReactElement][] = [
  ["home", <Index />],
  ["about", <AboutPage />],
  ["strategy", <StrategyPage />],
  ["partners", <PartnersPage />],
  ["services", <ServicesPage />],
  ["process", <ProcessPage />],
  ["testimonials", <TestimonialsPage />],
  ["roas", <ROASCalculatorPage />],
  ["blog", <BlogPage />],
  ["pricing", <PricingPage />],
  ["thanks", <GraciasPage />],
];

/** Old URLs that moved; .htaccess also answers these with a 301. */
const REDIRECTS: [string, string][] = [
  ["/thank-you", "/gracias"],
  ["/precios", "/es/precios"],
  ["/agencia-google-ads", "/es/agencia-google-ads"],
  ["/agencia-seo", "/es/agencia-seo"],
];

const RouteLoadingFallback = () => (
  <div className="min-h-screen bg-transparent flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/40 border-t-accent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <RouteMeta />
            <AnimatedBackground />
            <WhatsAppButton />
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                {CORE_PAGES.flatMap(([key, element]) =>
                  (["en", "es"] as const).map((lang) => <Route key={`${key}-${lang}`} path={pages[key][lang]} element={element} />)
                )}
                <Route path="/onboarding" element={<OnboardingPage />} />
                {servicePages.map((page) => (
                  <Route key={page.path} path={page.path} element={<ServiceDetailPage page={page} />} />
                ))}
                {blogPosts.map((post) => (
                  <Route key={postPath(post)} path={postPath(post)} element={<BlogPostPage post={post} />} />
                ))}
                {REDIRECTS.map(([from, to]) => (
                  <Route key={from} path={from} element={<Navigate to={to} replace />} />
                ))}

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
