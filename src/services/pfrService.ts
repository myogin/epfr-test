import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getAllPfrData = async (params: any) => {

  const res = await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
  return res.data;
};

export const getPfrSection = async (params: any) => {
  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const postPfr = async (group : any, data : any) => {
  return await http.post(`/create-pfr-lite/${group}`, data, { headers: authHeader() });
}

// export const updatePfr = async (id : any, data : any) => {
//   return await http.post(`/category/${id}`, data, { headers: authHeader() });
// }

// export const deletePfr = async (id : any) => {
//   return await http.delete(`/category/${id}`, { headers: authHeader() });
// }

// export const findByQuery =  async (name: any) => {
//   return await http.get(`/category?name=${name}`, { headers: authHeader() });
// }

export const getPfrStep = async (step: any, pfrId: any) => {
  const res = await http.get(`pfr/get/s${step}/${pfrId}`, { headers: authHeader() });
  return res.data;
}

export const downloadPdf = async (pfrId: any) => {
  const res = await http.get(`pfr/downloadPDF_1/${pfrId}`, { headers: authHeader(), responseType : "blob" });
  return res;
}