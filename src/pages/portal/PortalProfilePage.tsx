import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import PortalLayout from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  full_name: string | null;
  company: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  website: string | null;
}

const PortalProfilePage = () => {
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    company: '',
    phone: '',
    city: '',
    country: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          company: data.company || '',
          phone: data.phone || '',
          city: data.city || '',
          country: data.country || '',
          website: data.website || ''
        });
      }
      if (error && error.code !== 'PGRST116') {
        toast({ title: 'Error', description: 'Could not load profile', variant: 'destructive' });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('user_id', user.id);
    setSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: 'Could not update profile. Please try again.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.'
      });
    }
  };

  return (
    <PortalLayout>
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
              Your <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your account information and preferences.
            </p>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{profile.full_name || 'Your Name'}</CardTitle>
                    <CardDescription className="text-muted-foreground">{user?.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-14 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full_name" className="text-foreground">Full Name</Label>
                        <Input
                          id="full_name"
                          value={profile.full_name || ''}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                          className="bg-input border-border"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-foreground">Company</Label>
                        <Input
                          id="company"
                          value={profile.company || ''}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          className="bg-input border-border"
                          placeholder="Your Company"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone || ''}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="bg-input border-border"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-foreground">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={profile.website || ''}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          className="bg-input border-border"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-foreground">City</Label>
                        <Input
                          id="city"
                          value={profile.city || ''}
                          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                          className="bg-input border-border"
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-foreground">Country</Label>
                        <Input
                          id="country"
                          value={profile.country || ''}
                          onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                          className="bg-input border-border"
                          placeholder="United States"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                      <Button 
                        type="submit" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={saving}
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Account Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your account details and membership status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="text-foreground">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500 border border-green-500/30">
                      Active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalProfilePage;
