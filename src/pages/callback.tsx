import React, { useEffect } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";

const CallbackPage: Page = () => {
  const router = useRouter();

  const checkData = async () => {
    let clientType = router.query.clientType;
    let pfr = router.query.pfr;

    if(pfr === null) {
        if(clientType == '1') {
            router.push("/create/single");
        }else {
            router.push("/create/joint");
        }
    }else {
        
    }
  };

  useEffect(() => {
    checkData();
  });
  return <div>...Loading</div>;
};

CallbackPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default CallbackPage;
