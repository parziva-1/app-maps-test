const server = async (url: string, options?: { [key: string]: string }) => {
  try {
    const response = await fetch(url, { ...options });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }

      const errorMessage = errorData.message || "Request failed";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
    return null;
  }
};

export default server;
