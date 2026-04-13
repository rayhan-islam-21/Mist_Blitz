import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Equipment from "@/model/product";

function generateBash() {
  return `BZ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function POST(req) {
  try {
    await connectDB();
    const { items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const results = { inserted: 0, skipped: 0, errors: [] };

    for (const item of items) {
      try {
        const existing = await Equipment.findOne({ name: item.name });
        if (existing) {
          results.skipped++;
          continue;
        }
        await Equipment.create({
          name: item.name,
          quantity: Number(item.quantity) || 1,
          category: item.category || "Electronics",
          ownerType: item.ownerType || "Blitz Official Inventory",
          memberName: item.memberName || null,
          bash: generateBash(),
          image: null,
        });
        results.inserted++;
      } catch {
        results.errors.push(item.name);
      }
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
