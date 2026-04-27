"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardList, LayoutDashboard, LogOut, Mail } from "lucide-react";
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("adminEmail");
    router.push("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Data Undangan",
      href: "/dashboard/undangan",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r bg-white px-5 py-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="rounded-2xl bg-rose-600 p-3 text-white">
            <Mail size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">Undangan Fisik</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </Link>

        <nav className="mt-10 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-rose-600 text-white"
                    : "text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                <Icon size={20} />
                {menu.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-5 right-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="ml-72 min-h-screen flex-1 p-8">{children}</main>
    </div>
  );
}
