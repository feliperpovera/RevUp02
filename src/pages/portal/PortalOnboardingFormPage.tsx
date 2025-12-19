import { OnboardingForm } from "@/components/OnboardingForm";
import PortalLayout from "@/components/portal/PortalLayout";
import { motion } from "framer-motion";

const PortalOnboardingFormPage = () => {
  return (
    <PortalLayout>
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Onboarding</span> Form
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete the following form to start your personalized advertising strategy.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <OnboardingForm />
          </motion.div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalOnboardingFormPage;
