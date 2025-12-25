import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import member from "@/model/member";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, roll, dept, image, linkedin } = body;

    const existingUser = await member.findOne({ roll });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const newUser = await member.create({ name, roll, dept, image, linkedin });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();

    const users = await member.find(); 
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}