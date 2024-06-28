import { ILocation } from "@/lib/db/models/location";
import { getLocations, postLocation } from "@/services/locations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useLocations = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery<{ locations: ILocation[] }>({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
  });

  const { mutate } = useMutation({
    mutationFn: postLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  return { locations: data?.locations, addLocation: mutate };
};

export default useLocations;
