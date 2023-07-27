import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const productFindOne = async (id: any) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get/`+id, 
        {
            'headers':{
                'Authorization': '$2y$10$K/BY6MOqyuIRBZKw1Zksa.HjOTOFHlwI5q/OXk31GVtQ84gqJoe4i'
            }
        }
    );
    const data = await response.json();
    
    return data;
};