import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getAllPfrData = async (params: any) => {

  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const getPfrSection = async (params: any) => {
  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const postPfr = async (section : any, data : any) => {
  return await http.post(`/create-pfr-lite/${section}`, data, { headers: authHeader() });
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


