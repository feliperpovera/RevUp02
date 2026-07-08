import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const StrategyPage = lazy(() => import("./pages/StrategyPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const ROASCalculatorPage = lazy(() => import("./pages/ROASCalculatorPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));

const queryClient = new QueryClient();

const RouteLoadingFallback = () => (
  <div className="min-h-screen bg-transparent flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/40 border-t-accent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedBackground />
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

                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/employee-login" element={<Navigate to="/admin/login" replace />} />
                <Route path="/employee-portal" element={<Navigate to="/admin" replace />} />
                <Route path="/client-portal" element={<Navigate to="/admin/login" replace />} />
                <Route path="/portal/*" element={<Navigate to="/admin/login" replace />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
