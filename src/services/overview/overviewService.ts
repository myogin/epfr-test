import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getPfrList = async (query: any) => {
  let checkOwnerId = localStorage.getItem("login")
    ? localStorage.getItem("login")
    : "";
  let ownerId: any = null;
  if (checkOwnerId) {
    let dataLogin = JSON.parse(checkOwnerId);
    ownerId = dataLogin.state.ownerId;
  } else {
    ownerId = ``;
  }
  let filter = "";
  if (query) {
    filter = new URLSearchParams(query).toString() + "&";
  }

  const res = await http.get(
    `/pfr/getAll/${ownerId}?${filter}page=1&per_page=10`,
    {
      headers: authHeader(),
    }
  );
  return res.data;
};

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
