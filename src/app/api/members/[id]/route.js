import { connectDB } from "@/lib/db";
import Member from "@/model/member"


export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return NextResponse.json(
                { error: "Member not found in database" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "Member successfully removed from records" },
            { status: 200 }
        );
    }
    catch (error) {
        return NextResponse.json(
            { error: "Internal System Error during deletion" },
            { status: 500 }
        );
    }
}


export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const updatedMember = await Member.findByIdAndUpdate(
            id,
            {
                name: body.name, roll: body.roll, blitzId: body.blitzId, linkedin: body.linkedin, position: body.position, techDept: body.techDept, nonTechDept: body.nonTechDept,
                image: body.image
            },
            { new: true }
        );


        if (!updatedMember) {
            return NextResponse.json(
                { error: "Asset not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedItem, { status: 200 });

    }
    catch (error) {
        return NextResponse.json(
            { error: "Failed to commit changes to database" },
            { status: 500 }
        );
    }
}