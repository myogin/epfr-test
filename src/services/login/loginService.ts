import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";

export const resendService = async (email: string) => {
    const res = await http.post(
      `/resend`,
      {
        email:email,
      },

    );
    return res.data;
  };