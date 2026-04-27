"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit, Plus, Search, Trash2, X } from "lucide-react";

type StatusPesanan = "Proses" | "Selesai" | "Diambil" | "Batal";

interface Undangan {
  id: number;
  namaPelanggan: string;
  noHp: string;
  jenisUndangan: string;
  modelUndangan: string;
  jumlahCetak: number;
  hargaSatuan: number;
  totalHarga: number;
  status: StatusPesanan;
  tanggalPesan: string;
}

const initialForm = {
  namaPelanggan: "",
  noHp: "",
  jenisUndangan: "",
  modelUndangan: "",
  jumlahCetak: "",
  hargaSatuan: "",
  status: "Proses" as StatusPesanan,
  tanggalPesan: "",
};

export default function DataUndanganPage() {
  const [data, setData] = useState<Undangan[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/undangan");
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Gagal mengambil data.");
        return;
      }

      setData(result.data);
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.namaPelanggan.toLowerCase().includes(keyword) ||
        item.noHp.toLowerCase().includes(keyword) ||
        item.jenisUndangan.toLowerCase().includes(keyword) ||
        item.modelUndangan.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const totalHarga =
    Number(form.jumlahCetak || 0) * Number(form.hargaSatuan || 0);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.namaPelanggan ||
      !form.noHp ||
      !form.jenisUndangan ||
      !form.modelUndangan ||
      !form.jumlahCetak ||
      !form.hargaSatuan ||
      !form.tanggalPesan
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const url = editId ? `/api/undangan/${editId}` : "/api/undangan";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Gagal menyimpan data.");
        return;
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Undangan) => {
    setEditId(item.id);
    setForm({
      namaPelanggan: item.namaPelanggan,
      noHp: item.noHp,
      jenisUndangan: item.jenisUndangan,
      modelUndangan: item.modelUndangan,
      jumlahCetak: String(item.jumlahCetak),
      hargaSatuan: String(item.hargaSatuan),
      status: item.status,
      tanggalPesan: item.tanggalPesan,
    });
  };

  const handleDelete = async (id: number) => {
    const yakin = confirm("Yakin ingin menghapus data ini?");
    if (!yakin) return;

    try {
      const response = await fetch(`/api/undangan/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menghapus data.");
        return;
      }

      fetchData();
    } catch (err) {
      console.error(err);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Data Undangan</h1>
          <p className="mt-2 text-slate-500">
            Kelola data pesanan undangan fisik pelanggan.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-slate-500">Total Data</p>
          <h2 className="text-2xl font-bold text-rose-600">{data.length}</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[400px_1fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {editId ? "Edit Pesanan" : "Tambah Pesanan"}
            </h2>

            {editId && (
              <button
                onClick={resetForm}
                className="rounded-lg bg-slate-100 p-2 text-slate-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Nama pelanggan"
              value={form.namaPelanggan}
              onChange={(e) =>
                setForm({ ...form, namaPelanggan: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />

            <input
              placeholder="Nomor HP"
              value={form.noHp}
              onChange={(e) => setForm({ ...form, noHp: e.target.value })}
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />

            <select
              value={form.jenisUndangan}
              onChange={(e) =>
                setForm({ ...form, jenisUndangan: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
            >
              <option value="">Pilih jenis undangan</option>
              <option value="Pernikahan">Pernikahan</option>
              <option value="Khitanan">Khitanan</option>
              <option value="Ulang Tahun">Ulang Tahun</option>
              <option value="Aqiqah">Aqiqah</option>
              <option value="Acara Resmi">Acara Resmi</option>
            </select>

            <input
              placeholder="Model undangan"
              value={form.modelUndangan}
              onChange={(e) =>
                setForm({ ...form, modelUndangan: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Jumlah cetak"
                value={form.jumlahCetak}
                onChange={(e) =>
                  setForm({ ...form, jumlahCetak: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <input
                type="number"
                placeholder="Harga satuan"
                value={form.hargaSatuan}
                onChange={(e) =>
                  setForm({ ...form, hargaSatuan: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />
            </div>

            <div className="rounded-xl bg-rose-50 px-4 py-3">
              <p className="text-sm text-slate-500">Total Harga</p>
              <h3 className="font-bold text-rose-600">
                {formatRupiah(totalHarga)}
              </h3>
            </div>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as StatusPesanan })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
            >
              <option value="Proses">Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Diambil">Diambil</option>
              <option value="Batal">Batal</option>
            </select>

            <input
              type="date"
              value={form.tanggalPesan}
              onChange={(e) =>
                setForm({ ...form, tanggalPesan: e.target.value })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              <Plus size={20} />
              {loading ? "Menyimpan..." : editId ? "Update" : "Tambah"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 rounded-xl border px-4 py-3">
            <Search size={20} className="text-slate-400" />
            <input
              placeholder="Cari data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="px-4 py-3">Pelanggan</th>
                  <th className="px-4 py-3">Jenis</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Jumlah</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-4">
                      <p className="font-semibold">{item.namaPelanggan}</p>
                      <p className="text-xs text-slate-500">{item.noHp}</p>
                    </td>
                    <td className="px-4 py-4">{item.jenisUndangan}</td>
                    <td className="px-4 py-4">{item.modelUndangan}</td>
                    <td className="px-4 py-4">{item.jumlahCetak} pcs</td>
                    <td className="px-4 py-4 font-semibold">
                      {formatRupiah(item.totalHarga)}
                    </td>
                    <td className="px-4 py-4">{item.status}</td>
                    <td className="px-4 py-4">{item.tanggalPesan}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600"
                        >
                          <Edit size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      Belum ada data undangan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
