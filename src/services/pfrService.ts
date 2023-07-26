import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getAllPfrData = async (params: any) => {

  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const getPfrSection = async (params: any) => {
  return await http.get(`pfr/get-general-data/${params}`, { headers: authHeader() });
};

export const postPfr = async (group : any, data : any) => {
  return await http.post(`/create-pfr-lite/${group}`, data, { headers: authHeader() });
}

export const getWholeContext = async (id: any) => {
  const headers = {'Authorization': 'Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'};
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/getWhole/${id}`, 
      {
          'headers':{
              'Authorization': '$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'
          }
      }
  );
  const data = await response.json();
  
  return data;
};

export const pfrSection = async (section:any, id:any) => {
  const headers = {'Authorization': 'Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'};
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/get/s${section}/${id}`, 
      {
          'headers':{
              'Authorization': '$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'
          }
      }
  );
  const data = await response.json();
  
  return data;
};
// export const updatePfr = async (id : any, data : any) => {
//   return await http.post(`/category/${id}`, data, { headers: authHeader() });
// }

// export const deletePfr = async (id : any) => {
//   return await http.delete(`/category/${id}`, { headers: authHeader() });
// }

// export const findByQuery =  async (name: any) => {
//   return await http.get(`/category?name=${name}`, { headers: authHeader() });
// }


