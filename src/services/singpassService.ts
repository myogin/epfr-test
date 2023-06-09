export const getSingpass = async (params: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/getSingpass/${params}`
  );
  const data = await response.json();

  return data;
};

export const postSingpass = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/singpass`);
  const data = await response.json();

  return data;
};
