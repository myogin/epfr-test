import React, { useEffect, useState } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";

const CallbackPage: Page = () => {
  const router = useRouter();

  // const checkData = async () => {
  //   let clientType = router.query.clientType;
  //   let pfr = router.query.pfr;

  //   if(pfr === null) {
  //       if(clientType == '1') {
  //           router.push("/create/single");
  //       }else {
  //           router.push("/create/joint");
  //       }
  //   }else {

  //   }
  // };

  useEffect(() => {

    if(!router.isReady) return;
    let dataSingpass = router.query.dataSingpass as string;
    

    // if(dataSingpass === undefined) return;

    console.log(JSON.parse(decodeURIComponent(dataSingpass)));
  }, [router.isReady, router.query]);
  return (
    <div className="flex items-center justify-center w-full h-screen">
      Singpass Proses
    </div>
  );
};

CallbackPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default CallbackPage;
