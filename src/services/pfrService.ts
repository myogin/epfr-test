import http from "@/httpSetting";
import authHeader from "./authHeader";

export const getAllPfrData = async (params: any) => {

  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const getPfrSection = async (params: any) => {
  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const postPfr = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pfr`);
  const data = await response.json();

  return data;
};
