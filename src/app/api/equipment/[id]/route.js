import { NextResponse } from 'next/server';
import Equipment from '@/model/product'; // Your Mongoose model
import { connectDB } from '@/lib/db';

// DELETE: Remove asset from database
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; 
    console.log("Deleting asset with ID:", id);

    const deletedItem = await Equipment.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { error: "Asset not found in database" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Asset successfully purged from ledger" }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json(
      { error: "Internal System Error during deletion" }, 
      { status: 500 }
    );
  }
}

// PUT: Update asset quantity (from your Edit Modal)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // We only want to allow updating the quantity based on your UI logic
    const updatedItem = await Equipment.findByIdAndUpdate(
      id,
      { quantity: body.quantity },
      { new: true } 
    );

    if (!updatedItem) {
      return NextResponse.json(
        { error: "Asset not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("UPDATE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to commit changes to database" }, 
      { status: 500 }
    );
  }
}