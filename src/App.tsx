import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const PortalLandingPage = lazy(() => import("./pages/portal/PortalLandingPage"));
const PortalLoginPage = lazy(() => import("./pages/portal/PortalLoginPage"));
const PortalRegisterPage = lazy(() => import("./pages/portal/PortalRegisterPage"));
const PortalDashboardPage = lazy(() => import("./pages/portal/PortalDashboardPage"));
const PortalBenefitsPage = lazy(() => import("./pages/portal/PortalBenefitsPage"));
const PortalResourcesPage = lazy(() => import("./pages/portal/PortalResourcesPage"));
const PortalSupportPage = lazy(() => import("./pages/portal/PortalSupportPage"));
const PortalProfilePage = lazy(() => import("./pages/portal/PortalProfilePage"));
const PortalOnboardingPage = lazy(() => import("./pages/portal/PortalOnboardingPage"));
const PortalROASCalculatorPage = lazy(() => import("./pages/portal/PortalROASCalculatorPage"));
const PortalOnboardingFormPage = lazy(() => import("./pages/portal/PortalOnboardingFormPage"));
const PortalAmazonCalculatorPage = lazy(() => import("./pages/portal/PortalAmazonCalculatorPage"));

const queryClient = new QueryClient();

const RouteLoadingFallback = () => (
  <div className="min-h-screen bg-transparent flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/40 border-t-accent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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

                {/* Portal Routes */}
                <Route path="/portal" element={<PortalLandingPage />} />
                <Route path="/portal/login" element={<PortalLoginPage />} />
                <Route path="/portal/register" element={<PortalRegisterPage />} />
                <Route path="/portal/dashboard" element={<PortalDashboardPage />} />
                <Route path="/portal/benefits" element={<PortalBenefitsPage />} />
                <Route path="/portal/resources" element={<PortalResourcesPage />} />
                <Route path="/portal/support" element={<PortalSupportPage />} />
                <Route path="/portal/profile" element={<PortalProfilePage />} />
                <Route path="/portal/onboarding" element={<PortalOnboardingPage />} />
                <Route path="/portal/roas-calculator" element={<PortalROASCalculatorPage />} />
                <Route path="/portal/onboarding-form" element={<PortalOnboardingFormPage />} />
                <Route path="/portal/amazon-calculator" element={<PortalAmazonCalculatorPage />} />

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
