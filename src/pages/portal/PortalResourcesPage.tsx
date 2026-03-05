import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Download, FileSpreadsheet, FileImage, File, BookOpen, CheckSquare, LayoutTemplate } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import PortalLayout from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_type: string | null;
  downloads: number;
  created_at: string;
}

const categories = [
  { value: 'all', label: 'All', icon: FileText },
  { value: 'Guides', label: 'Guides', icon: BookOpen },
  { value: 'Templates', label: 'Templates', icon: LayoutTemplate },
  { value: 'Checklists', label: 'Checklists', icon: CheckSquare },
  { value: 'Frameworks', label: 'Frameworks', icon: File },
];

const getFileIcon = (fileType: string | null) => {
  switch (fileType?.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-8 w-8 text-red-500" />;
    case 'excel':
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
    case 'powerpoint':
      return <FileImage className="h-8 w-8 text-orange-500" />;
    default:
      return <File className="h-8 w-8 text-primary" />;
  }
};

const PortalResourcesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setResources(data);
      if (error) {
        toast({ title: 'Error', description: 'Could not load resources', variant: 'destructive' });
      }
      setLoading(false);
    };

    fetchResources();
  }, [toast]);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resource: Resource) => {
    window.open(resource.file_url, '_blank');
    toast({ title: 'Download Started', description: `Downloading ${resource.title}` });
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
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
              <span className="gradient-text">Resources</span> Library
            </h1>
            <p className="text-muted-foreground">
              Download guides, templates, and tools to optimize your marketing efforts.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
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

          {/* Resources Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
              ))
            ) : filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="glass-card h-full flex flex-col group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                          {getFileIcon(resource.file_type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline">{resource.category}</Badge>
                            {resource.file_type && (
                              <span className="text-xs text-muted-foreground uppercase">
                                {resource.file_type}
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-lg text-foreground">{resource.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground mt-3">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(resource.created_at).toLocaleDateString()}
                        </span>
                        <Button
                          onClick={() => handleDownload(resource)}
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalResourcesPage;
