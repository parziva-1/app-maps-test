"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { MapHandler } from "@/components/mapHandler";
import { PlaceAutocomplete } from "@/components/placeAutocomplete";
const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function Home() {
  const { data: session } = useSession();

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  // checking if sessions exists
  if (session) {
    //logged in code
  }

  const handleButton = () => {
    if (session) {
      signOut();
      return;
    }
    signIn();
  };

  return (
    <main style={{ height: "100vh" }}>
      <APIProvider apiKey={mapsApiKey}>
        <MapHandler place={selectedPlace} />
        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />

        <Map
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </main>
  );
}
