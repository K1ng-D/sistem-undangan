"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ClipboardList, Clock, XCircle } from "lucide-react";

interface DashboardSummary {
  totalPesanan: number;
  totalProses: number;
  totalSelesai: number;
  totalBatal: number;
  totalPendapatan: number;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalPesanan: 0,
    totalProses: 0,
    totalSelesai: 0,
    totalBatal: 0,
    totalPendapatan: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Gagal mengambil data dashboard.");
          return;
        }

        setSummary(result.data);
      } catch (err) {
        console.error(err);
        setError("Tidak dapat terhubung ke server.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-600">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Ringkasan sistem manajemen pemesanan undangan fisik.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <ClipboardList className="text-rose-600" size={30} />
          <p className="mt-4 text-sm text-slate-500">Total Pesanan</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {summary.totalPesanan}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Clock className="text-orange-500" size={30} />
          <p className="mt-4 text-sm text-slate-500">Proses</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {summary.totalProses}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <CheckCircle className="text-green-600" size={30} />
          <p className="mt-4 text-sm text-slate-500">Selesai</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {summary.totalSelesai}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <XCircle className="text-red-600" size={30} />
          <p className="mt-4 text-sm text-slate-500">Batal</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {summary.totalBatal}
          </h2>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Total Pendapatan</p>
        <h2 className="mt-2 text-3xl font-bold text-rose-600">
          {formatRupiah(summary.totalPendapatan)}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Total dihitung dari semua pesanan kecuali yang berstatus batal.
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Selamat Datang Admin
        </h2>
        <p className="mt-2 text-slate-600">
          Gunakan menu Data Undangan untuk menambahkan, mengedit, menghapus, dan
          melihat data pesanan undangan fisik.
        </p>
      </div>
    </div>
  );
}
