import { connectDB } from "@/lib/db";
import { LogisticsRecord } from "@/model/archived"; // The model we just created
import Equipment from "@/model/product";       // Your Equipment model
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { equipmentId, quantity, item, receiver } = body;

    // 1. VALIDATION: Check if equipment exists and has enough stock
    const asset = await Equipment.findById(equipmentId);
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    if (asset.quantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock level" }, { status: 400 });
    }

    // 2. UPDATE INVENTORY: Reduce the quantity in the Equipment collection
    // We use $inc with a negative number to subtract
    const updatedAsset = await Equipment.findByIdAndUpdate(
      equipmentId,
      { $inc: { quantity: -quantity } },
      { new: true }
    );

    // 3. CREATE LOGISTICS RECORD: Save the history
    const newRecord = await LogisticsRecord.create({
      equipmentId,
      quantity,
      item,
      receiver,
      status: "ACTIVE" // Default status
    });

    return NextResponse.json({
      message: "Checkout successful",
      record: newRecord,
      remainingStock: updatedAsset.quantity
    }, { status: 201 });

  } catch (error) {
    console.error("LOGISTICS_ERROR:", error);
    return NextResponse.json(
      { error: "System failed to process transfer" }, 
      { status: 500 }
    );
  }
}

// --- GET: Fetch Checkout History ---
export async function GET(request) {
  try {
    await connectDB();
    
    // Fetch all active handouts, sorted by newest first
    const history = await LogisticsRecord.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}