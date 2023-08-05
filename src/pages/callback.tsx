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

const CallbackPage: Page = () => {
  const router = useRouter();
  let { dependant, fetchClient, setDependent, fetchAccompainment } =
    usePersonalInformation();

  let {
    summaryOfLoans,
    summaryOfCPF,
    summaryOfProperty,
    setProperty,
    setCpf,
    setLoan,
  } = useExistingPortofolio();

  const storeDataClientToState = (
    clientType: number,
    data: Clientformation
  ) => {
    fetchClient(clientType, data);
  };

  const storeDataDependentToState = (data: DependantInformation[]) => {
    let checkTotalData =
      dependant?.length === 0 || dependant[0].id === 0 ? 0 : 1;

    let checkIndex = checkCountDataDependent(dependant);
    if (data?.length > 0) {
      data.map((data, index) => {
        if (checkTotalData > 0) {
          data["id"] = checkIndex;
          setDependent(checkTotalData, data);
        } else {
          data["id"] = checkIndex;
          setDependent(0, data);
        }
      });
    }
  };

  const storeDataSponsoreChildToState = (data: DependantInformation[]) => {
    let checkTotalData =
      dependant?.length === 0 || dependant[0].id === 0 ? 0 : 1;

    let checkIndex = checkCountDataDependent(dependant);
    if (data?.length > 0) {
      data.map((data, index) => {
        if (checkTotalData > 0) {
          data["id"] = checkIndex;
          setDependent(checkTotalData, data);
        } else {
          data["id"] = checkIndex;
          setDependent(0, data);
        }
      });
    }
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
        if (checkTotalData > 0) {
          data["id"] = checkIndex;
          setLoan(checkTotalData, data);
        } else {
          data["id"] = checkIndex;
          setLoan(0, data);
        }
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

    if (clients !== null) {
      storeDataClientToState(clientType, clients);
    }

    if (dataDependant !== null) {
      dataDependant.length;
      storeDataDependentToState(dataDependant);
    }

    if (dataSpons !== null) {
      storeDataSponsoreChildToState(dataSpons);
    }

    if (dataAccomp !== null) {
      storeDataAccompainmentToState(clientType, dataAccomp);
    }

    if (property !== null) {
      storeDataPropertyToState(clients);
    }

    if (loan !== null) {
      storeDataLoanToState(loan);
    }

    if (cpfs !== null) {
      storeDataCpfToState(cpfs);
    }
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
