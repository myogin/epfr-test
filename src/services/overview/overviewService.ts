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

  let currentPage = "";
  if (query?.page == undefined || query?.page == "") {
    currentPage = "page=1&";
  }
  // handle params
  let filter = "";
  if (query) {
    filter = new URLSearchParams(query).toString() + "&";
  }

  const res = await http.get(
    `/pfr/getAll/${ownerId}?${filter}${currentPage}per_page=10`,
    {
      headers: authHeader(),
    }
  );
  return res.data;
};

export const deletePfr = async (pfrId: number | null) => {
  if (pfrId) {
    const res = await http.post(
      `/pfr/delete`,
      {
        pfrId: pfrId,
      },
      {
        headers: authHeader(),
      }
    );
    return res.data;
  }
};

export const duplucatePfr = async (data: any) => {
  let type = data.newType == 1 ? "single" : "joint";
  const res = await http.post(
    `/pfr/duplicate/${type}`,
    {
      ...data,
    },
    {
      headers: authHeader(),
    }
  );
  return res.data;
};
export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
