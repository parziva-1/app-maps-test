const clearCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
export default clearCookie;
