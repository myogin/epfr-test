import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getAllCountry = async () => {
  const res = await http.get(`/birth-country`, {
    headers: authHeader(),
  });
  return res.data;
};

export const getCountry = async (id : any) => {
    const res = await http.get(`/birth-country/${id}`, {
      headers: authHeader(),
    });
    return res.data;
  };
