import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Member from "@/model/member";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, roll, techDept, nonTechDept, image, linkedin, position } = body;

    const existingUser = await Member.findOne({ roll });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const newUser = await Member.create({
      name,
      roll,
      techDept,
      nonTechDept,
      image,
      linkedin,
      position
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    const query = year ? { year: Number(year) } : {};
    const users = await Member.find(query).select('name position image techDept nonTechDept linkedin isLead year');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
