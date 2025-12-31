import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Your database connection helper
import Gallery from "@/model/gallery"; // Your Mongoose schema

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
    }

    // Insert the array into MongoDB
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