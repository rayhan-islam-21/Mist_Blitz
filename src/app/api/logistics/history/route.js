import { connectDB } from "@/lib/db";
import TransitionLog from "@/model/history";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const allLogs = await TransitionLog.find({})
      .sort({ createdAt: -1 })
      .limit(500); 

    return NextResponse.json(allLogs, { status: 200 });
  } catch (error) {
    console.error("ADMIN_HISTORY_ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch master logs" }, { status: 500 });
  }
}