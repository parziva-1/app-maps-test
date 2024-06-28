import { useQueryClient } from "@tanstack/react-query";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface PropsHandler {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: PropsHandler) => {
  const map = useMap();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  };

  useEffect(() => {
    if (!map || !place) return;
    const saveLocation = async (place: google.maps.places.PlaceResult) => {
      await fetch("/api/locations", {
        method: "POST",
        body: JSON.stringify({ location: place }),
      });
      handleRefresh();
    };
    saveLocation(place);
    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, place]);

  return null;
};

export default MapHandler;
