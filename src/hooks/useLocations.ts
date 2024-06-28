import { ILocation } from "@/lib/db/models/location";
import { getLocations } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useLocations = () => {
  const { data } = useQuery<{ locations: ILocation[] }>({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
  });

  return { locations: data?.locations };
};

export default useLocations;
