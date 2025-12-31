// /app/api/admin/invite/generate/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import InviteToken from "@/model/secretToken";
import { connectDB } from "@/lib/db";

function generateCode() {
  return "BLITZ-" + crypto.randomBytes(3).toString("hex").toUpperCase();
}

export async function POST(req) {
  await connectDB();
  const { count = 100 } = await req.json();

  const expires = new Date();
  expires.setDate(expires.getDate() + 20); 

  const tokens = [];
  for (let i = 0; i < count; i++) {
    tokens.push({
      code: generateCode(),
      expiresAt: expires,
    });
  }

  await InviteToken.insertMany(tokens);

  return NextResponse.json({
    message: `${count} invite codes generated`,
    expiresAt: expires
  });
}
