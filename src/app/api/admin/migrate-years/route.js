import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/model/member";

const YEAR_MAP = {
  "Senior Engineer": 2024,
  "Junior Engineer": 2024,
  "Apprentice Engineer": 2025,
  "Trainee": 2026,
};

export async function POST() {
  try {
    await connectDB();

    const results = await Promise.all(
      Object.entries(YEAR_MAP).map(([position, year]) =>
        Member.updateMany({ position }, { $set: { year } })
      )
    );

    const totalUpdated = results.reduce((sum, r) => sum + r.modifiedCount, 0);

    return NextResponse.json({
      success: true,
      message: `Updated ${totalUpdated} members with year based on position.`,
      breakdown: Object.entries(YEAR_MAP).map(([pos, yr], i) => ({
        position: pos,
        year: yr,
        updated: results[i].modifiedCount,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
