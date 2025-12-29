import { connectDB } from "@/lib/db";
import Member from "@/model/member";
import { NextResponse } from "next/server";

// --- GET: Fetch by Email (for Login) or ID (for Admin) ---
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { identifier } = await params;

        // Logic: If identifier contains '@', it's an email. Otherwise, it's an ID.
        const query = identifier.includes("@") 
            ? { email: identifier.toLowerCase().trim() } 
            : { _id: identifier };

        const member = await Member.findOne(query);

        if (!member) {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
        return NextResponse.json(member, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Sync Error" }, { status: 500 });
    }
}

// --- DELETE: Remove by ID ---
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { identifier } = await params; // Renamed to match folder
        const deletedMember = await Member.findByIdAndDelete(identifier);

        if (!deletedMember) {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Member successfully removed" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal System Error" }, { status: 500 });
    }
}

// --- PUT: Update by ID ---
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { identifier } = await params;
        const body = await request.json();

        const updatedMember = await Member.findByIdAndUpdate(
            identifier,
            {
                name: body.name, 
                roll: body.roll, 
                blitzId: body.blitzId, 
                linkedin: body.linkedin, 
                position: body.position, 
                techDept: body.techDept, 
                nonTechDept: body.nonTechDept,
                image: body.image,
                email: body.email // Added email update support
            },
            { new: true }
        );

        if (!updatedMember) {
            return NextResponse.json({ error: "Asset not found" }, { status: 404 });
        }
        return NextResponse.json(updatedMember, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to commit changes" }, { status: 500 });
    }
}