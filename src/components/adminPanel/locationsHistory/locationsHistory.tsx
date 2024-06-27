import { ILocation } from "@/lib/db/models/location";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { CardHistory } from "./cardHistory";
import styles from "./locationsHistory.module.css";

const LocationsHistory = () => {
  const [data, setData] = useState<ILocation[]>();
  const map = useMap();

  const { data: sesion } = useSession();

  const fetchData = async () => {
    try {
      const res = await fetch(`api/locations`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log({ data });
      setData(data.locations);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSelectLocation = (
    location: ILocation["geometry"]["viewport"]
  ) => {
    if (map) map.fitBounds(location);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.historyContainer}>
      {data?.length ? (
        <>
          {data.map((v) => (
            <CardHistory
              key={v.formatted_address}
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
