import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        COUNT(*) AS totalPesanan,
        SUM(CASE WHEN status = 'Proses' THEN 1 ELSE 0 END) AS totalProses,
        SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) AS totalSelesai,
        SUM(CASE WHEN status = 'Batal' THEN 1 ELSE 0 END) AS totalBatal,
        SUM(CASE WHEN status != 'Batal' THEN total_harga ELSE 0 END) AS totalPendapatan
      FROM undangan
    `);

    const result = rows as any[];

    return NextResponse.json({
      success: true,
      data: {
        totalPesanan: Number(result[0].totalPesanan || 0),
        totalProses: Number(result[0].totalProses || 0),
        totalSelesai: Number(result[0].totalSelesai || 0),
        totalBatal: Number(result[0].totalBatal || 0),
        totalPendapatan: Number(result[0].totalPendapatan || 0),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data dashboard.",
      },
      { status: 500 },
    );
  }
}
