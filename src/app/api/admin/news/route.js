import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import News from "@/model/news";

export async function GET() {
  try {
    await connectDB();
    const news = await News.find().sort({ createdAt: -1 });
    return NextResponse.json({ news });
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, excerpt, category, image } = body;
    if (!title?.trim() || !excerpt?.trim()) {
      return NextResponse.json({ error: "Title and excerpt are required" }, { status: 400 });
    }
    const item = await News.create({ title, excerpt, category, image });
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
