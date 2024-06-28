import server from "./fetchServer";

export const getLocations = async () => {
  return await server("/api/locations");
};

export const postLocation = async (place: google.maps.places.PlaceResult) => {
  return await server("/api/locations", {
    method: "POST",
    body: JSON.stringify({ location: place }),
  });
};

export const deleteLocation = async (_id: string) => {
  return await server("/api/locations", {
    method: "DELETE",
    body: JSON.stringify({ _id }),
  });
};
