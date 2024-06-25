"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
console.log({ mapsApiKey });
export default function Home() {
  const { data: session } = useSession();

  const position = { lat: 53.54992, lng: 10.00678 };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      {/* 
      <h1>HomePage</h1>
      <button onClick={() => handleButton()}>
        {session ? "signOut" : "signIn"}
      </button> */}
      {isClient && (
        <APIProvider apiKey={mapsApiKey}>
          <Map defaultCenter={position} defaultZoom={10}>
            <Marker position={position} />
          </Map>
        </APIProvider>
      )}
    </main>
  );
}
