import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface PropsHandler {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: PropsHandler) => {
  const map = useMap();

  const fetchData = async (place: google.maps.places.PlaceResult) => {
    await fetch("http://localhost:3000/api/db", {
      method: "POST",
      body: JSON.stringify(place),
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
