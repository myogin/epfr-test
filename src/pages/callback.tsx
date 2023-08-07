import React, { useEffect, useState } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import {
  Accompaniment,
  Clientformation,
  DependantInformation,
} from "@/models/SectionOne";
import {
  SummaryOfCPF,
  SummaryOfLoans,
  SummaryOfProperty,
} from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { checkCountData, checkCountDataDependent } from "@/libs/helper";
import Head from "next/head";
import { siteConfig } from "@/libs/config";

const CallbackPage: Page = () => {
  const router = useRouter();

  let summaryOfLoans = useExistingPortofolio((state) => state.summaryOfLoans);

  let summaryOfCPF = useExistingPortofolio((state) => state.summaryOfCPF);

  let summaryOfProperty = useExistingPortofolio(
    (state) => state.summaryOfProperty
  );

  let setProperty = useExistingPortofolio((state) => state.setProperty);

  let setCpf = useExistingPortofolio((state) => state.setCpf);

  let setLoan = useExistingPortofolio((state) => state.setLoan);

  let fetchDependent = usePersonalInformation((state) => state.fetchDependent);

  let fetchClient = usePersonalInformation((state) => state.fetchClient);

  let fetchAccompainment = usePersonalInformation(
    (state) => state.fetchAccompainment
  );

  let resetSectionOne = usePersonalInformation(
    (state) => state.resetSectionOne
  );

  let resetSectionTwo = useExistingPortofolio((state) => state.resetSectionTwo);

  const storeDataClientToState = (
    clientType: number,
    data: Clientformation
  ) => {
    fetchClient(clientType, data);
  };

  const storeDataDependentToState = (data: DependantInformation[]) => {
    fetchDependent(data);
  };

  const storeDataSponsoreChildToState = (data: DependantInformation[]) => {
    fetchDependent(data);
  };

  const storeDataAccompainmentToState = (
    clientType: number,
    data: Accompaniment
  ) => {
    fetchAccompainment(clientType, data);
  };

  const storeDataPropertyToState = (data: SummaryOfProperty) => {
    let checkTotalData =
      summaryOfProperty?.length === 0 || summaryOfProperty[0].id === 0 ? 0 : 1;
    let checkIndex = checkCountData(summaryOfProperty);
    data["id"] = checkIndex;
    setProperty(checkTotalData, data);
  };

  const storeDataLoanToState = (data: SummaryOfLoans[]) => {
    let checkTotalData =
      summaryOfLoans?.length === 0 || summaryOfLoans[0].id === 0 ? 0 : 1;
    let checkIndex = checkCountData(summaryOfLoans);
    if (data?.length > 0) {
      data.map((data, index) => {
        data["id"] = checkIndex;
        setLoan(checkTotalData, data);
      });
    }
  };

  const storeDataCpfToState = (data: SummaryOfCPF) => {
    let checkIndex = checkCountData(summaryOfCPF);
    let checkTotalData =
      summaryOfCPF?.length === 0 || summaryOfCPF[0].id === 0 ? 0 : 1;
    data["id"] = checkIndex;
    setCpf(checkTotalData, data);
  };

  // Reset Data
  const resetExistingData = () => {
    resetSectionOne();
    resetSectionTwo();
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
    let cpfs = singpassBase.cpfs ? singpassBase.cpfs : null;
    let loan = singpassBase.loan ? singpassBase.loan : null;

    let pfr = singpassBase.pfr ? singpassBase.pfr : null;

    let pfrType =
      pfr !== null
        ? Number(pfr.pfrType) === 1
          ? "single"
          : "joint"
        : "single";

    resetExistingData();

    if (clients !== null) {
      storeDataClientToState(clientType, clients);
    }

    if (dataDependant !== null) {
      storeDataDependentToState(dataDependant);
    }

    if (dataSpons !== null) {
      storeDataSponsoreChildToState(dataSpons);
    }

    if (dataAccomp !== null) {
      storeDataAccompainmentToState(clientType, dataAccomp);
    }

    if (property !== null) {
      storeDataPropertyToState(property);
    }

    if (loan !== null) {
      storeDataLoanToState(loan);
    }

    if (cpfs !== null) {
      storeDataCpfToState(cpfs);
    }

    console.log("test masuk apa ini  " + pfr.uuid);

    if(pfr.uuid === "" || pfr.uuid === null || pfr.uuid === 0 || pfr.uuid === undefined) {
      router.push(`/create/${pfrType}?singpass=ok#section-1`);
    }else {
      router.push(`/create/${pfrType}?id=${pfr.uuid}&singpass=ok#section-1`);
      
    }

    // router.push(`/create/${pfrType}#section-1`);
  }, [router.isReady, router.query]);
  return (
    <>
      <Head>
        <title>{`Singpass Proses | ${siteConfig.siteName}`}</title>
      </Head>
      <div className="flex items-center justify-center w-full h-screen">
        Singpass Proses
      </div>
    </>
  );
};

CallbackPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default CallbackPage;
