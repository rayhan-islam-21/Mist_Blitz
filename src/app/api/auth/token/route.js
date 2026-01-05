import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/model/adminlist";

export async function POST(req) {
    try {
        const { email } = await req.json();
        await connectDB();

        // 1. Check if this user actually exists in your DB and is an Admin
        const user = await Admin.findOne({
            email: { $regex: new RegExp(`^${email.trim()}$`, "i") }
        });
        console.log("Found User Role:", user?.role); // This will show 'admin' now after Step 1

        // INDUSTRY TIP: Check for an admin flag so regular members can't get an admin token
        if (!user || user.role !== "admin") {
            return NextResponse.json({ error: "Access Denied: Not an Admin" }, { status: 403 });
        }

        // 2. Generate the JWT Key
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token expires in 24 hours
        );

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Token Generation Failed" }, { status: 500 });
    }
}