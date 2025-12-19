-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  company TEXT,
  phone TEXT,
  city TEXT,
  country TEXT,
  website TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create benefits table
CREATE TABLE public.benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  conditions TEXT,
  category TEXT NOT NULL,
  code TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view benefits" ON public.benefits FOR SELECT TO authenticated USING (true);

-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  thumbnail_url TEXT,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view resources" ON public.resources FOR SELECT TO authenticated USING (true);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tickets" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id);

-- Create leads table (for onboarding form - public access for insert)
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  country TEXT,
  website TEXT,
  services TEXT[],
  budget_range TEXT,
  main_goal TEXT,
  project_description TEXT,
  attachments TEXT[],
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Insert mock benefits data
INSERT INTO public.benefits (title, description, conditions, category, code, is_featured) VALUES
('20% Off Meta Ads Setup', 'Exclusive discount on your first Meta Ads campaign setup with full optimization included.', 'Valid for new campaigns only. Cannot be combined with other offers.', 'Discounts', 'META20', true),
('Free Google Analytics Audit', 'Comprehensive audit of your Google Analytics setup with actionable recommendations.', 'One per client. Must have GA4 installed.', 'Consulting', NULL, false),
('Priority Support Access', 'Get dedicated priority support with 4-hour response time guarantee.', 'Available for Premium clients only.', 'Support', NULL, false),
('Exclusive Webinar Access', 'Monthly exclusive webinars on digital marketing trends and strategies.', 'All clients welcome. Registration required.', 'Events', NULL, false),
('Partner Discount: Shopify Plus', '15% discount on Shopify Plus annual subscription through our partnership.', 'New Shopify Plus subscriptions only.', 'Partnerships', 'SHOPIFY15', false),
('Quarterly Strategy Review', 'In-depth quarterly strategy review session with senior consultants.', 'Included for clients with 6+ month contracts.', 'Consulting', NULL, false);

-- Insert mock resources data
INSERT INTO public.resources (title, description, category, file_url, file_type) VALUES
('Meta Ads Best Practices 2024', 'Complete guide to optimizing your Meta advertising campaigns for maximum ROAS.', 'Guides', 'https://example.com/meta-ads-guide.pdf', 'PDF'),
('Google Ads Campaign Template', 'Ready-to-use template for structuring your Google Ads campaigns.', 'Templates', 'https://example.com/google-template.xlsx', 'Excel'),
('E-commerce Conversion Checklist', 'Essential checklist for optimizing your e-commerce conversion funnel.', 'Checklists', 'https://example.com/conversion-checklist.pdf', 'PDF'),
('Social Media Content Calendar', 'Monthly content calendar template for social media planning.', 'Templates', 'https://example.com/content-calendar.xlsx', 'Excel'),
('ROAS Optimization Playbook', 'Step-by-step playbook for improving your return on ad spend.', 'Guides', 'https://example.com/roas-playbook.pdf', 'PDF'),
('Brand Guidelines Template', 'Professional template for creating comprehensive brand guidelines.', 'Templates', 'https://example.com/brand-template.pptx', 'PowerPoint'),
('Analytics Dashboard Setup Guide', 'How to set up effective analytics dashboards for e-commerce.', 'Guides', 'https://example.com/analytics-guide.pdf', 'PDF'),
('Email Marketing Sequences', 'Pre-built email sequences for e-commerce customer journeys.', 'Templates', 'https://example.com/email-sequences.pdf', 'PDF'),
('Competitor Analysis Framework', 'Framework for conducting thorough competitor analysis.', 'Frameworks', 'https://example.com/competitor-framework.xlsx', 'Excel'),
('Monthly Report Template', 'Professional template for client monthly performance reports.', 'Templates', 'https://example.com/monthly-report.pptx', 'PowerPoint');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();