import { useLocations } from "@/hooks";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface PropsHandler {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: PropsHandler) => {
  const map = useMap();
  const { addLocation } = useLocations();

  useEffect(() => {
    if (!map || !place) return;
    addLocation(place);

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
      new google.maps.Marker({
        position: place.geometry.location,
        map,
        title: place.name,
      });
    }
  }, [addLocation, map, place]);

  return null;
};

export default MapHandler;
