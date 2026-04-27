import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        nama_pelanggan AS namaPelanggan,
        no_hp AS noHp,
        jenis_undangan AS jenisUndangan,
        model_undangan AS modelUndangan,
        jumlah_cetak AS jumlahCetak,
        harga_satuan AS hargaSatuan,
        total_harga AS totalHarga,
        status,
        DATE_FORMAT(tanggal_pesan, '%Y-%m-%d') AS tanggalPesan
      FROM undangan
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data undangan." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      namaPelanggan,
      noHp,
      jenisUndangan,
      modelUndangan,
      jumlahCetak,
      hargaSatuan,
      status,
      tanggalPesan,
    } = body;

    const totalHarga = Number(jumlahCetak) * Number(hargaSatuan);

    await db.query(
      `INSERT INTO undangan 
      (nama_pelanggan, no_hp, jenis_undangan, model_undangan, jumlah_cetak, harga_satuan, total_harga, status, tanggal_pesan)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        namaPelanggan,
        noHp,
        jenisUndangan,
        modelUndangan,
        jumlahCetak,
        hargaSatuan,
        totalHarga,
        status,
        tanggalPesan,
      ],
    );

    return NextResponse.json({
      success: true,
      message: "Data undangan berhasil ditambahkan.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan data undangan." },
      { status: 500 },
    );
  }
}
