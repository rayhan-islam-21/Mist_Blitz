import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/model/notice";

// GET all notices (admin)
export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ createdAt: -1 });
    return NextResponse.json({ notices });
  } catch {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

// POST create new notice
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { message, link, linkText, type } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Deactivate all existing notices first (only one active at a time)
    await Notice.updateMany({}, { isActive: false });

    const notice = await Notice.create({ message, link, linkText, type });
    return NextResponse.json({ notice }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}
