export const getToken = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token`);
  const data = await response.json();

  return data;
};
