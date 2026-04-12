import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/model/notice";

// PATCH toggle active / update
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const notice = await Notice.findByIdAndUpdate(params.id, body, { new: true });
    if (!notice) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ notice });
  } catch {
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Notice.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
