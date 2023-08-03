import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getSingpass = async (params: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/getSingpass/${params}`
  );
  const data = await response.json();

  return data;
};

export const postSingpass = async (data: any) => {
  const res = await http.post(`/pfr/create-singpass`, data, {
    headers: authHeader(),
  });

  return res.data;
};

export const storeEnv = async (data: any) => {
  const res = await http.post(`/singpass/env`, data, {
    headers: authHeader(),
  });

  return res.data;
}