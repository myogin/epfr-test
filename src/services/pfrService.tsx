export const getAllPfrData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getAllPfr`);
  const data = await response.json();

  return data;
};

export const getPfrSection = async (params: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/getPfr/${params}`
  );
  const data = await response.json();

  return data;
};

export const postPfr = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pfr`);
  const data = await response.json();

  return data;
};
