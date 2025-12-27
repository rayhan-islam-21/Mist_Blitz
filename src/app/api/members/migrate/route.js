// src/app/api/members/route.js
import { NextResponse } from "next/server";
import Member from "@/model/member"; // Adjust this path to your actual model file
import { connectDB } from "@/lib/db"; // Ensure you have your DB connection import

export async function GET(req) {
  await connectDB();

  // Check if the URL has ?migrate=true
  const { searchParams } = new URL(req.url);
  const migrate = searchParams.get("migrate");

  if (migrate === "true") {
    try {
      // Find members who don't have a blitzId yet
      const members = await Member.find({ blitzId: { $exists: false } });

      const updates = members.map(async (member) => {
        // This triggers the .pre("save") hook in your schema
        return member.save();
      });

      await Promise.all(updates);

      return NextResponse.json({
        message: `Successfully generated IDs for ${members.length} members.`,
        status: "SUCCESS",
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // Your existing GET logic (fetching all members) goes here...
  const allMembers = await Member.find({});
  return NextResponse.json(allMembers);
}