import { Location, connectToDatabase } from "@/lib/db/database";

import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const locations = await Location.find({});
    return NextResponse.json({ msg: "Hello from server", locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ msg: "Error" });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  const locationData = await req.json();
  
  try {
    const location = new Location(locationData);
    const savedLocation = await location.save();
    return NextResponse.json({
      msg: "Location created successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error saving location:", error);
    return NextResponse.json({ msg: "Error creating location" });
  }
}
