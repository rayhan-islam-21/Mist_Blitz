import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/model/member";
import { verifyAdmin } from "@/middleware/auth";

export async function GET(req) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
    }

    await connectDB();
    const users = await Member.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}