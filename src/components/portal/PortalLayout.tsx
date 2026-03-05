import { ReactNode } from 'react';
import PortalNavbar from './PortalNavbar';

interface PortalLayoutProps {
  children: ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
  return (
    <div className="min-h-screen bg-transparent">
      <PortalNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default PortalLayout;
