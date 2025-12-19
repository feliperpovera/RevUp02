import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import StrategyPage from "./pages/StrategyPage";
import PartnersPage from "./pages/PartnersPage";
import ServicesPage from "./pages/ServicesPage";
import ProcessPage from "./pages/ProcessPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import OnboardingPage from "./pages/OnboardingPage";
import ROASCalculatorPage from "./pages/ROASCalculatorPage";
import NotFound from "./pages/NotFound";

// Portal Pages
import PortalLandingPage from "./pages/portal/PortalLandingPage";
import PortalLoginPage from "./pages/portal/PortalLoginPage";
import PortalRegisterPage from "./pages/portal/PortalRegisterPage";
import PortalDashboardPage from "./pages/portal/PortalDashboardPage";
import PortalBenefitsPage from "./pages/portal/PortalBenefitsPage";
import PortalResourcesPage from "./pages/portal/PortalResourcesPage";
import PortalSupportPage from "./pages/portal/PortalSupportPage";
import PortalProfilePage from "./pages/portal/PortalProfilePage";
import PortalOnboardingPage from "./pages/portal/PortalOnboardingPage";
import PortalROASCalculatorPage from "./pages/portal/PortalROASCalculatorPage";
import PortalOnboardingFormPage from "./pages/portal/PortalOnboardingFormPage";
import PortalAmazonCalculatorPage from "./pages/portal/PortalAmazonCalculatorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
              <Route path="/portal/registro" element={<PortalRegisterPage />} />
              <Route path="/portal/dashboard" element={<PortalDashboardPage />} />
              <Route path="/portal/beneficios" element={<PortalBenefitsPage />} />
              <Route path="/portal/recursos" element={<PortalResourcesPage />} />
              <Route path="/portal/soporte" element={<PortalSupportPage />} />
              <Route path="/portal/perfil" element={<PortalProfilePage />} />
              <Route path="/portal/onboarding" element={<PortalOnboardingPage />} />
              <Route path="/portal/roas-calculator" element={<PortalROASCalculatorPage />} />
              <Route path="/portal/onboarding-form" element={<PortalOnboardingFormPage />} />
              <Route path="/portal/amazon-calculator" element={<PortalAmazonCalculatorPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
