import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 },
      );
    }

    const [rows] = await db.query(
      "SELECT * FROM admin WHERE email = ? AND password = ? LIMIT 1",
      [email, password],
    );

    const admin = rows as any[];

    if (admin.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login berhasil.",
      admin: {
        id: admin[0].id,
        email: admin[0].email,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
