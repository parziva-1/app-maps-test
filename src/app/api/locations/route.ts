import { connectToDatabase } from "@/lib/db/database";
import { Location, User } from "@/lib/db/models";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const locations = await Location.find({});
    return NextResponse.json({ msg: "Locations:", locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ msg: "Error" });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const res = await req.json();
    console.log({ res });

    if (!res.location) {
      return NextResponse.json(
        { msg: "Location data is required" },
        { status: 400 }
      );
    }

    let userId = cookies().get("user_id")?.value;
    if (!userId) {
      const newUser = new User({
        type: res.user ? "registered" : "guest",
        name: res.user?.name ?? "guest",
        email: res.user?.email ?? "guest",
      });
      const savedUser = await newUser.save();
      userId = String(savedUser._id);

      const cookieStore = cookies();
      cookieStore.set("user_id", userId);
      cookieStore.set("user_type", String(savedUser.type));
    }

    const location = new Location({ ...res.location, userId });
    const savedLocation = await location.save();

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
