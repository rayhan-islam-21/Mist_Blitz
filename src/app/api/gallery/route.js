import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import Gallery from "@/model/gallery"; 

// 1. POST: Seed or Add Multiple Images
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
    }

    const result = await Gallery.insertMany(data);

    return NextResponse.json({ 
      message: `${result.length} items seeded successfully`,
      count: result.length 
    }, { status: 201 });

  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. GET: Fetch all Gallery Images
export async function GET() {
  try {
    await connectDB();
    
    // Sort by year (descending) so 2025 comes before 2024
    const photos = await Gallery.find().sort({ year: -1, createdAt: -1 });

    return NextResponse.json(photos, { status: 200 });
  } catch (err) {
    console.error("Fetch Error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}  