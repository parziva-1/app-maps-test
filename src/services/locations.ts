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
