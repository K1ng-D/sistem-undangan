import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
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
      `UPDATE undangan SET
        nama_pelanggan = ?,
        no_hp = ?,
        jenis_undangan = ?,
        model_undangan = ?,
        jumlah_cetak = ?,
        harga_satuan = ?,
        total_harga = ?,
        status = ?,
        tanggal_pesan = ?
      WHERE id = ?`,
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
        params.id,
      ],
    );

    return NextResponse.json({
      success: true,
      message: "Data undangan berhasil diperbarui.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data undangan." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db.query("DELETE FROM undangan WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Data undangan berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data undangan." },
      { status: 500 },
    );
  }
}
