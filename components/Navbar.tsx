import Link from "next/link";
import { Mail } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-rose-600 p-2 text-white">
            <Mail size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Undangan Fisik</h1>
            <p className="text-xs text-slate-500">Sistem Pemesanan Undangan</p>
          </div>
        </Link>

        <Link
          href="/login"
          className="rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Login Admin
        </Link>
      </div>
    </nav>
  );
}
