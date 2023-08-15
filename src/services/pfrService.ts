import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const getAllPfrData = async (params: any) => {
  const res = await http.get(`/pfr/get-general-data/${params}`, {
    headers: authHeader(),
  });
  return res.data;
};


export const getPfrStep = async (step: number, pfrId: any) => {
  const res = await http.get(`/pfr/get/s${step}/${pfrId}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const getPfrStepLite = async (step: number, pfrId: any) => {
  const res = await http.get(`/pfr/get/slite${step}/${pfrId}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const getPfrShow = async (pfrId: any) => {
  const res = await http.get(`pfr/getShow/${pfrId}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const postPfr = async (group: any, data: any) => {
  return await http.post(`/pfr/create-pfr-lite/${group}`, data, {
    headers: authHeader(),
  });
};

export const postPfrSections = async (sections: any, data: any) => {
  return await http.post(`/pfr/create-pfr-lite-section/${sections}`, data, {
    headers: authHeader(),
  });
};

export const getWholeContext = async (id: any) => {
  const res = await http.get(`/pfr/getWhole/${id}`, { headers: authHeader() });
  return res.data;
};

// Pfr Secction 9 Recommendation
export const postSection9Recommendation = async (data: any) => {
  return await http.post(`/pfr/save/recommend`, data, {
    headers: authHeader(),
  });
};

export const removeRecommendation = async (pfrId:any, id: any) => {
  return await http.get(`/pfr/delete/recommend/${pfrId}/${id}`, { headers: authHeader() });
};

export const pfrSection = async (section: any, id: any) => {
  const headers = {
    Authorization:
      "Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i",
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/get/s${section}/${id}`,
    {
      headers: {
        Authorization:
          "$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i",
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getRecommendation = async (id: any) => {
  const headers = {
    Authorization:
      "Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i",
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/get/recommend/${id}`,
    {
      headers: {
        Authorization:
          "$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i",
      },
    }
  );
  const data = await response.json();

  return data;
};

export const getRecommendationGroup = async (id:any, groupId: any) => {
  const headers = {'Authorization': 'Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'};
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/get/recommendGroup/${id}/${groupId}`,
      {
          'headers':{
              'Authorization': '$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'
          }
      }
  );
  const data = await response.json();
  
  return data;
};

export const signProceed = async (data: any) => {
  return await http.post(`/pfr/sign`, data, {
    headers: authHeader(),
  });
};

export const downloadPDF_1 = async (pfrId: number) => {
  const headers = {
    Authorization:
      "Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i",
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/downloadPDF_1/${pfrId}`,
    {
      headers: {
        Authorization:
          "$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i",
      },
    }
  );
  const data = await response.blob();

  return data;
}


export const getPfr = async (id:any) => {
  const headers = {'Authorization': 'Bearer $2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'};
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/pfr/get/${id}`, 
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


export const validateToken = async () => {
  await http
    .post(
      `http://localhost:8009/api/pfr/validate-params`,
      {},
      { headers: authHeader() }
    )
    .then((res) => {
      return res;
    });
};

export const downloadPdf = async (pfrId: any) => {
  const res = await http.get(`pfr/downloadPDF_1/${pfrId}`, {
    headers: authHeader(),
    responseType: "blob",
  });
  return res;
};
