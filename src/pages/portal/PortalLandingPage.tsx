import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, FileText, HelpCircle, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import revUpLogoLight from '@/assets/revup-logo-light.png';
import revUpLogoMain from '@/assets/revup-logo-main.png';

const features = [
  {
    icon: Gift,
    title: 'Exclusive Benefits',
    description: 'Access special discounts, partner offers, and exclusive promotions for our clients.'
  },
  {
    icon: FileText,
    title: 'Resources & Templates',
    description: 'Download guides, templates, and tools to optimize your marketing efforts.'
  },
  {
    icon: HelpCircle,
    title: 'Priority Support',
    description: 'Get dedicated support with quick response times and personalized assistance.'
  }
];

const PortalLandingPage = () => {
  const { resolvedTheme } = useTheme();
  const currentLogo = resolvedTheme === 'light' ? revUpLogoMain : revUpLogoLight;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-orb" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-orb" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={currentLogo} alt="RevUp Agency" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/portal/login">
              <Button variant="ghost" className="text-foreground">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/portal/onboarding">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Client Portal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Welcome to Your
              <span className="gradient-text block mt-2">Exclusive Portal</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Access exclusive benefits, resources, and support designed to help you scale your e-commerce business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portal/login">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 glow-border">
                  <LogIn className="h-5 w-5 mr-2" />
                  Client Login
                </Button>
              </Link>
              <Link to="/portal/onboarding">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-muted">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Request Access
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="glass-card h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA for Potential Clients */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="futuristic-card overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
                Not a Client Yet?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Fill out our onboarding form and let us know about your project. Our team will review your information and get in touch within 24-48 hours.
              </p>
              <Link to="/portal/onboarding">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Application
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Main Site
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RevUp Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortalLandingPage;
