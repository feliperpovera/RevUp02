import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, Copy, Check, Sparkles, Tag, Users, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import PortalLayout from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';

interface Benefit {
  id: string;
  title: string;
  description: string;
  conditions: string | null;
  category: string;
  code: string | null;
  is_featured: boolean;
  valid_until: string | null;
}

const categories = [
  { value: 'all', label: 'All Benefits', icon: Gift },
  { value: 'Discounts', label: 'Discounts', icon: Tag },
  { value: 'Partnerships', label: 'Partnerships', icon: Users },
  { value: 'Events', label: 'Events', icon: Calendar },
  { value: 'Consulting', label: 'Consulting', icon: BookOpen },
];

const PortalBenefitsPage = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBenefits = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('benefits')
        .select('*')
        .order('is_featured', { ascending: false });
      
      if (data) setBenefits(data);
      if (error) {
        toast({ title: 'Error', description: 'Could not load benefits', variant: 'destructive' });
      }
      setLoading(false);
    };

    fetchBenefits();
  }, [toast]);

  const filteredBenefits = benefits.filter((benefit) => {
    const matchesSearch = benefit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefit.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || benefit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBenefit = benefits.find((b) => b.is_featured);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({ title: 'Code Copied!', description: `Code "${code}" has been copied to clipboard.` });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <PortalLayout>
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
              Exclusive <span className="gradient-text">Benefits</span>
            </h1>
            <p className="text-muted-foreground">
              Access special discounts, partner offers, and exclusive promotions.
            </p>
          </motion.div>

          {/* Featured Benefit Banner */}
          {featuredBenefit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30 overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Featured Offer
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {featuredBenefit.title}
                      </h2>
                      <p className="text-muted-foreground">{featuredBenefit.description}</p>
                    </div>
                    {featuredBenefit.code && (
                      <Button
                        onClick={() => copyCode(featuredBenefit.code!)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {copiedCode === featuredBenefit.code ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code: {featuredBenefit.code}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={selectedCategory === cat.value ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <cat.icon className="h-4 w-4 mr-2" />
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
              ))
            ) : filteredBenefits.length > 0 ? (
              filteredBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{benefit.category}</Badge>
                        {benefit.is_featured && (
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <CardTitle className="text-foreground">{benefit.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {benefit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end gap-4">
                      {benefit.conditions && (
                        <p className="text-xs text-muted-foreground border-t border-border pt-3">
                          <span className="font-medium">Conditions:</span> {benefit.conditions}
                        </p>
                      )}
                      <div className="flex gap-2">
                        {benefit.code ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyCode(benefit.code!)}
                            className="flex-1"
                          >
                            {copiedCode === benefit.code ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                {benefit.code}
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="flex-1">
                            Learn More
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No benefits found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalBenefitsPage;
