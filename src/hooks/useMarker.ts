import { ILocation } from "@/models/location";
import { useState, useEffect } from "react";

interface UseMarkerProps {
  location: ILocation["geometry"]["location"];
  map: google.maps.Map | null;
  name: string;
}

const useMarker = ({ location, map, name }: UseMarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    if (marker) {
      marker.setMap(null);
    }

    if (location) {
      const newMarker = new google.maps.Marker({
        position: location,
        map,
        title: name,
      });

      setMarker(newMarker);

      map.panTo(location);
    }
  }, [location, map, marker, name]);

  return marker;
};

export default useMarker;
