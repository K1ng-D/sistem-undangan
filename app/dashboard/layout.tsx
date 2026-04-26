import { ReactNode } from "react";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <Sidebar>{children}</Sidebar>
    </AuthGuard>
  );
}
