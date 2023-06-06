import React from "react";
import { Page } from "../_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import { getToken } from "@/services/tokenValidateService";

const EditPage: Page = () => {

    const router = useRouter();
    const {push} = useRouter();

    let params : any = router.query.params;

    let token = getToken();

    console.log(params);

    if(params[0] !== token) {
        push('/unauthorization');
    }
  

  return <div>EditPage</div>;
};

EditPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EditPage;
