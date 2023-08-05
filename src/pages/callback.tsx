import React, { useEffect, useState } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";

const CallbackPage: Page = () => {
  const router = useRouter();
  let { fetchClient } = usePersonalInformation();

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

  const storeDataClientToState = (index: number, data: any) => {
    fetchClient(index, data);
  };

  const storeDataDependentToState = (index: number, data: any) => {
    fetchClient(index, data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    let dataSingpass = router.query.dataSingpass as string;
    let singpassBase = JSON.parse(decodeURIComponent(dataSingpass));

    let clients = singpassBase.clients ? singpassBase.clients : null;

    let clientType =
      clients !== null ? (Number(clients.clientType) === 1 ? 0 : 1) : 0;

    let dataDependant = singpassBase.dataDependant
      ? singpassBase.dataDependant
      : null;
    let dataSpons = singpassBase.dataSpons ? singpassBase.dataSpons : null;
    let dataAccomp = singpassBase.dataAccomp ? singpassBase.dataAccomp : null;
    let property = singpassBase.property ? singpassBase.property : null;
    let loan = singpassBase.loan ? singpassBase.loan : null;

    storeDataClientToState(clientType, clients);
    
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
