import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Clock, CheckCircle, AlertCircle, Send, Loader2, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import PortalLayout from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { Link } from 'react-router-dom';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  status: string;
  created_at: string;
}

const ticketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100),
  category: z.string().min(1, 'Please select a category'),
  priority: z.string().min(1, 'Please select a priority'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000)
});

const PortalSupportPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTickets = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setTickets(data);
    if (error) {
      toast({ title: 'Error', description: 'Could not load tickets', variant: 'destructive' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = ticketSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: 'Validation Error',
        description: validation.error.errors[0].message,
        variant: 'destructive'
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to create a support ticket.',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('support_tickets').insert({
      user_id: user.id,
      ...formData
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: 'Error',
        description: 'Could not create ticket. Please try again.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Ticket Created',
        description: 'Your support request has been submitted. We\'ll respond shortly.'
      });
      setFormData({ subject: '', category: '', priority: 'medium', description: '' });
      setDialogOpen(false);
      fetchTickets();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'in_progress': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved': return 'Resolved';
      case 'in_progress': return 'In Progress';
      default: return 'Received';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <PortalLayout>
      <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
                <span className="gradient-text">Support</span> Center
              </h1>
              <p className="text-muted-foreground">
                Get help from our team. We're here to assist you.
              </p>
            </div>
            {user ? (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base px-6 hover:scale-[1.02] transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Create Support Ticket</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Describe your issue and we'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-background/50 border-border/30 rounded-xl h-12 focus:border-primary/50 text-foreground"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="campaign">Campaign Support</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-foreground">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide as much detail as possible..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-background/50 border-border/30 rounded-xl focus:border-primary/50 text-foreground min-h-32"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base px-6 hover:scale-[1.02] transition-all duration-300"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Ticket
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Link to="/portal/login">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base px-6 hover:scale-[1.02] transition-all duration-300">
                  Sign In to Create Ticket
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Tickets List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {!user ? (
              <Card className="futuristic-card rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
                <CardContent className="py-16 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Sign in to view your tickets</h3>
                  <p className="text-muted-foreground mb-6">
                    Create an account or sign in to access support and view your ticket history.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link to="/portal/login">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base px-6 hover:scale-[1.02] transition-all duration-300">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/portal/register">
                      <Button variant="outline">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="futuristic-card rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {getStatusIcon(ticket.status)}
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{ticket.subject}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {ticket.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className={getStatusColor(ticket.status)}>
                                  {getStatusLabel(ticket.status)}
                                </Badge>
                                <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {ticket.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="futuristic-card rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
                <CardContent className="py-16 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No tickets yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first support ticket if you need assistance.
                  </p>
                  <Button onClick={() => setDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 text-base px-6 hover:scale-[1.02] transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalSupportPage;
