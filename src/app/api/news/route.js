import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import News from "@/model/news";

export async function GET() {
  try {
    await connectDB();
    const news = await News.find({ isPublished: true }).sort({ createdAt: -1 }).limit(6);
    return NextResponse.json({ news });
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
