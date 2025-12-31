import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import InviteToken from "@/model/secretToken";

export async function POST(req) {
  await connectDB();
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json({ message: "Code is required" }, { status: 400 });
  }

  const invite = await InviteToken.findOne({ code: code.toUpperCase() });
  if (!invite) {
    return NextResponse.json({ message: "Invalid code" }, { status: 401 });
  }

  if (invite.used) {
    return NextResponse.json({ message: "Code already used" }, { status: 403 });
  }

  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ message: "Code expired" }, { status: 403 });
  }

  return NextResponse.json({ message: "Code valid" });
}
