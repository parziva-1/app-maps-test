import { connectToDatabase } from "@/lib/db/database";
import { Location, User } from "@/components/models";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const userId = cookies().get("user_id")?.value;
    const locations = await Location.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ msg: "Locations:", locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ msg: "Error" });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { location } = await req.json();

    if (!location) {
      return NextResponse.json(
        { msg: "Location data is required" },
        { status: 400 }
      );
    }

    let userId = cookies().get("user_id")?.value;

    if (!userId) {
      const newUser = new User({
        type: "guest",
        name: "guest",
        email: "guest",
      });
      const savedUser = await newUser.save();
      userId = String(savedUser._id);

      const cookieStore = cookies();
      cookieStore.set("user_id", userId);
      cookieStore.set("user_type", String(savedUser.type));
    }

    const existingLocation = await Location.findOne({
      formatted_address: location.formatted_address,
      userId: userId,
    });

    if (existingLocation) {
      return NextResponse.json(
        { msg: "Duplicate location found" },
        { status: 400 }
      );
    }

    const locationToSave = new Location({
      ...location,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedLocation = await locationToSave.save();

    return NextResponse.json(
      {
        msg: "Location created successfully",
        location: savedLocation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    let errorMessage = "An unexpected error occurred";
    let statusCode = 500;

    if (error instanceof SyntaxError) {
      errorMessage = "Invalid JSON payload";
      statusCode = 400;
    }

    return NextResponse.json({ msg: errorMessage }, { status: statusCode });
  }
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const { _id } = await req.json();
  try {
    const deletedLocation = await Location.findByIdAndDelete(_id);

    if (!deletedLocation) {
      return NextResponse.json({ msg: "Location not found" });
    }

    return NextResponse.json({
      msg: "Location deleted successfully",
      deletedLocation,
    });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json({ msg: "Error" });
  }
}
