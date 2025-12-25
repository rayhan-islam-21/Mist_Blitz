import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/model/adminlist";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email } = body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 409 });
        }
        const newAdmin = await Admin.create({ name, email });
        return NextResponse.json(newAdmin, { status: 201 });
    }
    catch (error) {
        console.error("Error creating admin:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        const admins = await admin.find();
        return NextResponse.json(admins, { status: 200 });

    }
    catch (error) {
        console.error("Error fetching admins:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}