"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {  useState } from "react";
import { MapHandler } from "@/components/mapHandler";
import { PlaceAutocomplete } from "@/components/placeAutocomplete";
import { AdminPanel } from "@/components/adminPanel";

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function Home() {

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);



  return (
    <main className="main">
      <APIProvider apiKey={mapsApiKey}>
        <AdminPanel />
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
