import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Loader2, CheckCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import revUpLogoLight from '@/assets/revup-logo-light.png';
import revUpLogoMain from '@/assets/revup-logo-main.png';

const leadSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  website: z.string().optional(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  budget_range: z.string().min(1, 'Select a budget range'),
  main_goal: z.string().min(1, 'Select a goal'),
  project_description: z.string().min(20, 'Please describe your project (min 20 chars)'),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) })
});

const services = ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Amazon Ads', 'SEO', 'Email Marketing', 'Analytics', 'Full Service'];
const budgets = ['$1,000 - $5,000/mo', '$5,000 - $15,000/mo', '$15,000 - $50,000/mo', '$50,000+/mo', 'Not sure yet'];
const goals = ['Increase Sales', 'Improve ROAS', 'Brand Awareness', 'Market Expansion', 'Launch New Product', 'Other'];

const PortalOnboardingPage = () => {
  const [formData, setFormData] = useState({
    full_name: '', company: '', email: '', phone: '', city: '', country: '', website: '',
    services: [] as string[], budget_range: '', main_goal: '', project_description: '', consent: false
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();
  const currentLogo = resolvedTheme === 'light' ? revUpLogoMain : revUpLogoLight;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files).slice(0, 5));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = leadSchema.safeParse(formData);
    if (!validation.success) {
      toast({ title: 'Error', description: validation.error.errors[0].message, variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.from('leads').insert({
      full_name: formData.full_name, company: formData.company, email: formData.email,
      phone: formData.phone || null, city: formData.city || null, country: formData.country || null,
      website: formData.website || null, services: formData.services, budget_range: formData.budget_range,
      main_goal: formData.main_goal, project_description: formData.project_description, consent: formData.consent
    }).select('id').single();
    setLoading(false);

    if (error) {
      toast({ title: 'Error', description: 'Could not submit. Please try again.', variant: 'destructive' });
    } else {
      setRequestId(data.id.slice(0, 8).toUpperCase());
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-2">Your request has been submitted successfully.</p>
          <p className="text-lg font-medium text-primary mb-8">Request ID: #{requestId}</p>
          <p className="text-sm text-muted-foreground mb-8">We'll review your information and contact you within 24-48 hours.</p>
          <Link to="/portal"><Button>Back to Portal</Button></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/portal"><img src={currentLogo} alt="RevUp" className="h-10" /></Link>
          <Link to="/portal" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Request Access</CardTitle>
            <CardDescription>Tell us about your project and we'll get in touch.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} required className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="bg-input border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="bg-input border-border" />
              </div>
              <div className="space-y-2">
                <Label>Services of Interest *</Label>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <Button key={s} type="button" size="sm" variant={formData.services.includes(s) ? 'default' : 'outline'}
                      onClick={() => toggleService(s)} className={formData.services.includes(s) ? 'bg-primary text-primary-foreground' : ''}>
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Budget *</Label>
                  <Select value={formData.budget_range} onValueChange={v => setFormData({...formData, budget_range: v})}>
                    <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select budget" /></SelectTrigger>
                    <SelectContent>{budgets.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Main Goal *</Label>
                  <Select value={formData.main_goal} onValueChange={v => setFormData({...formData, main_goal: v})}>
                    <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Select goal" /></SelectTrigger>
                    <SelectContent>{goals.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tell us about your project *</Label>
                <Textarea value={formData.project_description} onChange={e => setFormData({...formData, project_description: e.target.value})}
                  className="bg-input border-border min-h-32" placeholder="Describe your business, challenges, and goals..." required />
              </div>
              <div className="space-y-2">
                <Label>Attachments (optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload files (max 5)</p>
                  <Input type="file" multiple onChange={handleFileChange} className="hidden" id="files" />
                  <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('files')?.click()}>
                    Choose Files
                  </Button>
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                          <span className="truncate">{f.name}</span>
                          <X className="h-4 w-4 cursor-pointer" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="consent" checked={formData.consent} onCheckedChange={c => setFormData({...formData, consent: c as boolean})} />
                <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                  I consent to RevUp Agency processing my data to contact me about their services. *
                </Label>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4 mr-2" />Submit Request</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortalOnboardingPage;
