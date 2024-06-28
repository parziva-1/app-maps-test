import { ILocation } from "@/components/models/location";
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { CardHistory } from "./cardHistory";
import styles from "./locationsHistory.module.css";
import { useLocations } from "@/hooks";

const LocationsHistory = () => {
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const { locations } = useLocations();
  const map = useMap();

  const handleSelectLocation = (
    viewport: ILocation["geometry"]["viewport"],
    location: ILocation["geometry"]["location"],
    name: string
  ) => {
    if (map) {
      if (marker) {
        marker.setMap(null);
      }
      map.fitBounds(viewport);
      const mark = new google.maps.Marker({
        position: location,
        map,
        title: name,
      });
      setMarker(mark);
    }
  };

  return (
    <div className={styles.historyContainer}>
      {locations?.length ? (
        <>
          {locations?.map((v) => (
            <CardHistory
              key={v._id as string}
              handleSelectLocation={handleSelectLocation}
              data={v}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default LocationsHistory;
