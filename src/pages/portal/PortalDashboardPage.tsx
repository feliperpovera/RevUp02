import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, FileText, HelpCircle, ArrowRight, Sparkles, Clock, CheckCircle, AlertCircle, Calculator, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PortalLayout from '@/components/portal/PortalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Benefit {
  id: string;
  title: string;
  category: string;
  is_featured: boolean;
}

interface Resource {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

const quickLinks = [
  { name: 'ROAS Calculator', href: '/portal/roas-calculator', icon: Calculator, description: 'Calculate your ad spend returns' },
  { name: 'Amazon FBA', href: '/portal/amazon-calculator', icon: ShoppingCart, description: 'Full P&L and inventory planning' },
  { name: 'Benefits', href: '/portal/benefits', icon: Gift, description: 'View exclusive offers' },
  { name: 'Resources', href: '/portal/resources', icon: FileText, description: 'Download guides & templates' },
  { name: 'Support', href: '/portal/support', icon: HelpCircle, description: 'Get help from our team' },
];

const PortalDashboardPage = () => {
  const { user } = useAuth();
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const [benefitsRes, resourcesRes] = await Promise.all([
        supabase.from('benefits').select('id, title, category, is_featured').limit(3),
        supabase.from('resources').select('id, title, category, created_at').order('created_at', { ascending: false }).limit(3)
      ]);

      if (benefitsRes.data) setBenefits(benefitsRes.data);
      if (resourcesRes.data) setResources(resourcesRes.data);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';

  return (
    <PortalLayout>
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
              Welcome{user ? `, ` : ' to the '}<span className="gradient-text">{user ? userName : 'Portal'}</span>
            </h1>
            <p className="text-muted-foreground">
              Access tools, benefits, resources, and support from your dashboard.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8"
          >
            {quickLinks.map((link, index) => (
              <Link key={link.name} to={link.href}>
                <Card className="glass-card h-full group cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {link.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="futuristic-card h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      Active Benefits
                    </CardTitle>
                    <CardDescription>Exclusive offers and discounts</CardDescription>
                  </div>
                  <Link to="/portal/benefits">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : benefits.length > 0 ? (
                    <div className="space-y-3">
                      {benefits.map((benefit) => (
                        <div
                          key={benefit.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {benefit.is_featured && (
                              <Sparkles className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-foreground">{benefit.title}</span>
                          </div>
                          <Badge variant="secondary">{benefit.category}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No active benefits</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* New Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="futuristic-card h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      New Resources
                    </CardTitle>
                    <CardDescription>Recently added guides and templates</CardDescription>
                  </div>
                  <Link to="/portal/resources">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : resources.length > 0 ? (
                    <div className="space-y-3">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <span className="text-foreground">{resource.title}</span>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No resources available</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    Ready to Scale Your Advertising?
                  </h3>
                  <p className="text-muted-foreground">
                    Request a free consultation and let our team help you achieve your goals.
                  </p>
                </div>
                <Link to="/portal/onboarding">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
                    Request Consultation
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalDashboardPage;
