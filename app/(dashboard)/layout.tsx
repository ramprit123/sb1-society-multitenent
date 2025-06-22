import { SocietyProvider } from '@/contexts/society-context';
import DashboardLayout from '@/components/dashboard/dashboard-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SocietyProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SocietyProvider>
  );
}