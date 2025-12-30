import { connectDB } from "@/lib/db";
import { LogisticsRecord } from "@/model/archived";
// Corrected import: removing braces because product.js uses 'export default'
import Equipment from "@/model/product"; 
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    // In Next.js 15+, we must await params
    const { id } = await params; 

    // 1. Find the logistics record to get the item and quantity details
    const logEntry = await LogisticsRecord.findById(id);

    if (!logEntry) {
      return NextResponse.json(
        { error: "Protocol Error: Record not found in local node." }, 
        { status: 404 }
      );
    }

    // 2. Restore Stock to the Main Inventory
    // We target the equipmentId saved during checkout and increment the quantity
    const inventoryUpdate = await Equipment.findByIdAndUpdate(
      logEntry.equipmentId, 
      { $inc: { quantity: logEntry.quantity } },
      { new: true }
    );

    if (!inventoryUpdate) {
      console.warn("Main inventory item no longer exists, but clearing log anyway.");
    }

    // 3. Delete the possession record
    await LogisticsRecord.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Asset restored to main registry." }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("RETURN_CRITICAL_FAILURE:", error);
    return NextResponse.json(
      { error: "Internal Server Protocol Failure" }, 
      { status: 500 }
    );
  }
}