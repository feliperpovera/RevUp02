import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { 
  Menu, 
  LayoutDashboard, 
  Gift, 
  FileText, 
  HelpCircle, 
  User, 
  LogOut, 
  Calculator, 
  ShoppingCart,
  ChevronDown,
  Wrench,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import revUpLogoLight from '@/assets/revup-logo-light.png';
import revUpLogoMain from '@/assets/revup-logo-main.png';

// Main navigation items
const mainNavItems = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
];

// Tools dropdown items
const toolsItems = [
  { name: 'ROAS Calculator', href: '/portal/roas-calculator', icon: Calculator },
  { name: 'Amazon FBA', href: '/portal/amazon-calculator', icon: ShoppingCart },
];

// Resources dropdown items  
const resourcesItems = [
  { name: 'Benefits', href: '/portal/beneficios', icon: Gift },
  { name: 'Resources', href: '/portal/recursos', icon: FileText },
  { name: 'Support', href: '/portal/soporte', icon: HelpCircle },
];

const PortalNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentLogo = resolvedTheme === 'light' ? revUpLogoMain : revUpLogoLight;

  const handleSignOut = async () => {
    await signOut();
    navigate('/portal');
  };

  const isActive = (path: string) => location.pathname === path;
  const isInGroup = (items: typeof toolsItems) => items.some(item => isActive(item.href));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/portal/dashboard" className="flex items-center gap-2">
            <img 
              src={currentLogo} 
              alt="RevUp Agency" 
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-primary">Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Dashboard */}
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-2 px-4 py-2 h-auto text-sm font-medium ${
                    isInGroup(toolsItems)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Wrench className="h-4 w-4" />
                  Tools
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {toolsItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.href}
                      className={`flex items-center gap-2 cursor-pointer ${
                        isActive(item.href) ? 'bg-primary/10 text-primary' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-2 px-4 py-2 h-auto text-sm font-medium ${
                    isInGroup(resourcesItems)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Resources
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {resourcesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.href}
                      className={`flex items-center gap-2 cursor-pointer ${
                        isActive(item.href) ? 'bg-primary/10 text-primary' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            
            <Link to="/" className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors">
              <Home className="h-4 w-4" />
            </Link>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`flex items-center gap-2 ${
                    isActive('/portal/perfil') ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  <User className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/portal/perfil" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-border">
                <div className="flex flex-col gap-2 mt-8">
                  {/* Main Nav */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">
                    Navigation
                  </p>
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}

                  {/* Tools Section */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2 mt-4">
                    Tools
                  </p>
                  {toolsItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}

                  {/* Resources Section */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2 mt-4">
                    Resources
                  </p>
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}

                  {/* User Section */}
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-sm text-muted-foreground px-4 mb-2">{user?.email}</p>
                    <Link
                      to="/portal/perfil"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive('/portal/perfil')
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                      <Home className="h-5 w-5" />
                      Back to Home
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-3 h-auto text-destructive hover:text-destructive hover:bg-destructive/10" 
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PortalNavbar;
