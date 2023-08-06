import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";
import AuthToken from "@/libs/authToken";

export const getPfrList = async () => {
  await wait(3000);
  return null;
};

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
