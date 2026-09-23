import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { RouteMeta } from "@/components/RouteMeta";
import servicePages from "@/config/service-pages.json";
import blogPosts from "@/config/blog-posts.json";
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
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

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
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/strategy" element={<StrategyPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/roas-calculator" element={<ROASCalculatorPage />} />
                {servicePages.map((page) => (
                  <Route key={page.path} path={page.path} element={<ServiceDetailPage page={page} />} />
                ))}
                <Route path="/blog" element={<BlogPage />} />
                {blogPosts.map((post) => (
                  <Route key={post.slug} path={`/blog/${post.slug}`} element={<BlogPostPage post={post} />} />
                ))}
                <Route path="/gracias" element={<GraciasPage />} />
                <Route path="/thank-you" element={<Navigate to="/gracias" replace />} />

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
