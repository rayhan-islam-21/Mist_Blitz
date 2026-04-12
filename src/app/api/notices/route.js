import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/model/notice";

// GET latest active notice (public)
export async function GET() {
  try {
    await connectDB();
    const notice = await Notice.findOne({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ notice });
  } catch {
    return NextResponse.json({ error: "Failed to fetch notice" }, { status: 500 });
  }
}
