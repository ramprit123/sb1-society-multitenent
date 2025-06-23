"use client";

import { useSociety } from "@/contexts/society-context";
import { useClerk, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Building2 },
  { name: "Members", href: "/members", icon: Users },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Complaints", href: "/complaints", icon: MessageSquare },
  { name: "Visitors", href: "/visitors", icon: Shield },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { currentSociety, currentUser } = useSociety();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Main content */}
      <div>
        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
