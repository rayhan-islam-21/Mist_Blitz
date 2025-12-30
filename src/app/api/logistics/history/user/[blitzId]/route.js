import { connectDB } from "@/lib/db";
import TransitionLog from "@/model/history"; // Ensure this matches your model filename
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // 1. Extract the blitzId from the URL params (Awaiting for Next.js 15+)
    const { blitzId } = await params;

    if (!blitzId) {
      return NextResponse.json({ error: "Missing Identity Parameter" }, { status: 400 });
    }

    // 2. Query the TransitionLog collection
    // We filter by the nested receiver.blitzId field
    const history = await TransitionLog.find({ "receiver.blitzId": blitzId })
      .sort({ createdAt: -1 }); // Show most recent returns first

    // 3. Return the array to the frontend
    return NextResponse.json(history, { status: 200 });

  } catch (error) {
    console.error("HISTORY_RETRIEVAL_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Protocol Failure" }, 
      { status: 500 }
    );
  }
}