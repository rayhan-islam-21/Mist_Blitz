import { connectDB } from "@/lib/db";
import { LogisticsRecord } from "@/model/archived";
import Equipment from "@/model/product";
import TransitionLog from "@/model/history"; 
import { NextResponse } from "next/server";

// --- POST: Create a new checkout ---
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { equipmentId, quantity, item, receiver } = body;

    const asset = await Equipment.findById(equipmentId);
    if (!asset) return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    if (asset.quantity < quantity) return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });

    const updatedAsset = await Equipment.findByIdAndUpdate(
      equipmentId,
      { $inc: { quantity: -quantity } },
      { new: true }
    );

    const newRecord = await LogisticsRecord.create({
      equipmentId,
      quantity,
      item,
      receiver,
      status: "ACTIVE"
    });

    await TransitionLog.create({
      type: "ACTIVE", 
      equipmentId,
      item,
      receiver,
      quantity,
    });

    return NextResponse.json({
      message: "Checkout successful",
      record: newRecord,
      remainingStock: updatedAsset.quantity
    }, { status: 201 });

  } catch (error) {
    console.error("LOGISTICS_POST_ERROR:", error);
    return NextResponse.json({ error: "System failure" }, { status: 500 });
  }
}

// --- GET: Fetch all active handouts (This feeds your "Tracking Assets" table) ---
export async function GET() {
  try {
    await connectDB();
    
    // We fetch from LogisticsRecord because that's where "Active" items live
    const handouts = await LogisticsRecord.find({}).sort({ createdAt: -1 });

    return NextResponse.json(handouts, { status: 200 });
  } catch (error) {
    console.error("LOGISTICS_GET_ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch live data" }, { status: 500 });
  }
}