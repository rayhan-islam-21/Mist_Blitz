import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Equipment from "@/model/product";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, quantity, image, ownerType, category, bash, memberName } = body;

        const existingEquipment = await Equipment.findOne({ bash });
        if (existingEquipment) {
            return NextResponse.json({ message: "Equipment already exists" }, { status: 409 });
        }
        const newEquipment = await Equipment.create({
            name,
            quantity,
            image,
            ownerType,
            category,
            bash,
            memberName,
        })
        return new Response(JSON.stringify(newEquipment), { status: 201 });

    }
    catch (error) {
        console.error("Error creating user:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}


export async function GET() {
  try {
    await connectDB();

    const equipments = await Equipment.find();
    return NextResponse.json(equipments, { status: 200 });
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
