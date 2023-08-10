import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getPfrDetail = async (id: number) => {
  const res = await http.get(`/pfr/getShow/${id}`, {
    headers: authHeader(),
  });

  return res.data;
};
