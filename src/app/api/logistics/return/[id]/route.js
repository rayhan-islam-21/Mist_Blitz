import { connectDB } from "@/lib/db";
import { LogisticsRecord } from "@/model/archived";
import Equipment from "@/model/product"; 
import TransitionLog from "@/model/history"; // Import your new model
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; 

    // 1. Find the active record
    const logEntry = await LogisticsRecord.findById(id);

    if (!logEntry) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // 2. CREATE THE ARCHIVE LOG (The "History" entry)
    await TransitionLog.create({
      type: "RETURN", // Marking this as a return event
      equipmentId: logEntry.equipmentId,
      item: logEntry.item,
      receiver: logEntry.receiver,
      quantity: logEntry.quantity,
    });

    // 3. Restore Stock to Inventory
    await Equipment.findByIdAndUpdate(
      logEntry.equipmentId, 
      { $inc: { quantity: logEntry.quantity } }
    );

    // 4. Delete from Active Possession
    await LogisticsRecord.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Asset archived and returned." });

  } catch (error) {
    console.error("RETURN_CRITICAL_FAILURE:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}