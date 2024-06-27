import { useMap } from "@vis.gl/react-google-maps";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface PropsHandler {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: PropsHandler) => {
  const map = useMap();
  const { data: session } = useSession();

  const fetchData = async (place: google.maps.places.PlaceResult) => {
    await fetch("/api/locations", {
      method: "POST",
      body: JSON.stringify({ location: place, user: session?.user }),
    });
  };

  useEffect(() => {
    if (!map || !place) return;
    fetchData(place);
    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, place]);

  return null;
};

export default MapHandler;
