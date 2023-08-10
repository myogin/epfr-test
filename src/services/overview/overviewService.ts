import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getPfrList = async (ownerId: number) => {
  const res = await http.get(`/pfr/getAll/${ownerId}?page=1&per_page=10`, {
    headers: authHeader(),
  });
  return res.data;
};

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}