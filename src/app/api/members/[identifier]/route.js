import { connectDB } from "@/lib/db";
import Member from "@/model/member";
import { NextResponse } from "next/server";

// --- GET: Fetch by Email (for Login) or ID (for Admin) ---
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { identifier } = await params;
        const decodedId = decodeURIComponent(identifier).trim();

        let query;
        if (decodedId.includes("@")) {
            query = { email: decodedId.toLowerCase() };
        } else if (decodedId.length === 24 && /^[0-9a-fA-F]+$/.test(decodedId)) {
            query = { _id: decodedId };
        } else {
            query = {blitzId: decodedId };
        }

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

// --- PUT: Update by ID or Email ---
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { identifier } = await params;
        const body = await request.json();

        // Check if the identifier is an email or a MongoDB ID
        const isEmail = identifier.includes("@");
        const filter = isEmail ? { email: identifier } : { _id: identifier };

        const updatedMember = await Member.findOneAndUpdate(
            filter, // Dynamic filter based on input
            {
                name: body.name, 
                roll: body.roll, 
                blitzId: body.blitzId, 
                linkedin: body.linkedin, 
                position: body.position, 
                techDept: body.techDept, 
                nonTechDept: body.nonTechDept,
                image: body.image,
                email: body.email 
            },
            { new: true, runValidators: true } // runValidators ensures data integrity
        );

        if (!updatedMember) {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }

        return NextResponse.json(updatedMember, { status: 200 });
    } catch (error) {
        console.error("PUT Error:", error); // Logs actual error to your terminal
        return NextResponse.json({ error: "Failed to commit changes" }, { status: 500 });
    }
}