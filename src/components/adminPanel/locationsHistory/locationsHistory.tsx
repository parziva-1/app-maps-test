import { ILocation } from "@/lib/db/database";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LocationsHistory = () => {
  const [data, setData] = useState<ILocation[]>();

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data?.length ? (
        <>
          {data.map((v) => (
            <p key={String(v.formatted_address)}>{v.formatted_address}</p>
          ))}
        </>
      ) : null}
    </>
  );
};

export default LocationsHistory;
