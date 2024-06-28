import { ILocation } from "@/lib/db/models/location";
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { CardHistory } from "./cardHistory";
import styles from "./locationsHistory.module.css";
import { useLocations } from "@/hooks";

const LocationsHistory = () => {
  const { locations } = useLocations();
  const map = useMap();

  const handleSelectLocation = (
    location: ILocation["geometry"]["viewport"]
  ) => {
    if (map) map.fitBounds(location);
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
