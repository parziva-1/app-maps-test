import server from "./fetchServer";

const getLocations = async () => {
  return await server("/api/locations");
};

export default getLocations;
