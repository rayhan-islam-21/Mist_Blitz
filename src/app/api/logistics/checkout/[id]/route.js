import { connectDB } from "@/lib/db"
import { LogisticsRecord } from "@/model/archived";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { blitzId } = await params;
        const result = await LogisticsRecord.find(blitzId)

        if (!result) {
            return NextResponse.json({ error: "info not found" }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
    }
    catch (err) {
        console.log(err)
    }
}