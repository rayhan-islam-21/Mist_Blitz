import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/model/adminlist";

export async function POST(req) {
    try {
        const { email } = await req.json();
        await connectDB();
        const user = await Admin.findOne({
            email: { $regex: new RegExp(`^${email.trim()}$`, "i") }
        });
        if (!user || user.role !== "admin") {
            return NextResponse.json({ error: "Access Denied: Not an Admin" }, { status: 403 });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Token Generation Failed" }, { status: 500 });
    }
}