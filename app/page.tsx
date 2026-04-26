import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, ClipboardList, Printer, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Navbar />

      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
            Sistem Manajemen Undangan Fisik
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Kelola pesanan undangan fisik dengan lebih rapi dan cepat
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Sistem ini digunakan untuk mencatat data pelanggan, jenis undangan,
            jumlah cetak, harga, total pembayaran, dan status pesanan undangan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"
            >
              Masuk Admin
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">Fitur Sistem</h2>

          <div className="mt-6 space-y-4">
            <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
              <ClipboardList className="text-rose-600" />
              <div>
                <h3 className="font-semibold text-slate-900">CRUD Pesanan</h3>
                <p className="text-sm text-slate-600">
                  Tambah, lihat, edit, dan hapus data pesanan undangan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
              <Printer className="text-rose-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Data Cetak</h3>
                <p className="text-sm text-slate-600">
                  Mengelola jumlah cetak, model undangan, dan total harga.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
              <ShieldCheck className="text-rose-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Login Admin</h3>
                <p className="text-sm text-slate-600">
                  Halaman dashboard hanya dapat diakses oleh admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
