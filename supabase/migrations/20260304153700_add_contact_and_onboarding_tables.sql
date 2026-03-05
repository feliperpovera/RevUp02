-- ============================================================
-- 1. NEW TABLE: contact_submissions
-- ============================================================
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 20),
  company TEXT CHECK (company IS NULL OR char_length(company) <= 200),
  message TEXT NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 2000),
  source_form TEXT NOT NULL DEFAULT 'contact',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact submissions"
  ON public.contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 2. NEW TABLE: onboarding_submissions
-- ============================================================
CREATE TABLE public.onboarding_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  has_strategy TEXT NOT NULL CHECK (has_strategy IN ('yes', 'no')),
  strategy_details TEXT CHECK (strategy_details IS NULL OR char_length(strategy_details) <= 2000),
  google_percentage TEXT,
  meta_percentage TEXT,
  active_skus TEXT,
  focus_on_categories TEXT CHECK (focus_on_categories IS NULL OR focus_on_categories IN ('yes', 'no')),
  categories_details TEXT CHECK (categories_details IS NULL OR char_length(categories_details) <= 2000),
  has_drive_folder TEXT NOT NULL CHECK (has_drive_folder IN ('yes', 'no')),
  drive_folder_link TEXT CHECK (drive_folder_link IS NULL OR char_length(drive_folder_link) <= 500),
  additional_info TEXT CHECK (additional_info IS NULL OR char_length(additional_info) <= 2000),
  consent BOOLEAN NOT NULL DEFAULT false,
  shopify_report_name TEXT,
  google_ads_report_name TEXT,
  meta_ads_report_name TEXT,
  source_form TEXT NOT NULL DEFAULT 'onboarding_form',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert onboarding submissions"
  ON public.onboarding_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view onboarding submissions"
  ON public.onboarding_submissions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update onboarding submissions"
  ON public.onboarding_submissions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete onboarding submissions"
  ON public.onboarding_submissions FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER update_onboarding_submissions_updated_at
  BEFORE UPDATE ON public.onboarding_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 3. ADD AUDIT COLUMNS TO leads
-- ============================================================
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS source_form TEXT DEFAULT 'portal_onboarding',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 4. INDEXES for analytics
-- ============================================================
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions (email);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions (status);

CREATE INDEX idx_onboarding_submissions_created_at ON public.onboarding_submissions (created_at);
CREATE INDEX idx_onboarding_submissions_status ON public.onboarding_submissions (status);

CREATE INDEX idx_leads_source_form ON public.leads (source_form);
CREATE INDEX idx_leads_created_at ON public.leads (created_at);
