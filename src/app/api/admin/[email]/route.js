import { connectDB } from "@/lib/db"
import { NextResponse } from "next/server"
import Admin from "@/model/adminlist"

export async function GET(req,{params}) {
    try{
        await connectDB();
        const {email} = await params;
        const result = await Admin.findOne({email:email});

        if(!result){
             return NextResponse.json({ error: "info not found" }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });

    }
    catch(err){
        console.log(err)
        return NextResponse.json({error:"Server Error"},{status:403})
    }
}