import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import {
  checkCountData,
  getClientCustom,
  getInsuredCustom,
} from "@/libs/helper";
import {
  SummaryOfInsurance,
  SummaryOfInsurance2,
  SummaryOfInsuranceGroup,
} from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { Transition, Dialog } from "@headlessui/react";
import { Exo_2 } from "next/font/google";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const InsurancePortofolio = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);
  const [actionDatatType, setActionDataType] = useState(0);
  const [saveType, setSaveType] = useState("");

  let {
    summaryOfInsurance,
    summaryOfInsurance2,
    setInsurance,
    setInsurance2,
    removeInsurance,
    removeInsurance2,
    patchInsurance,
    patchInsurance2,
  } = useExistingPortofolio();
  // get client state
  let { clientInfo, dependant } = usePersonalInformation();

  let initialState: SummaryOfInsuranceGroup = {
    editting: true,
    client: "",
    insured: "",
    insurer: "",
    policyType: "",
    policyTypeOther: "",
    policyTerm: "",
    death: 0,
    tpd: 0,
    ci: 0,
    earlyCI: 0,
    acc: 0,
    premiumFrequency: "",
    cash: 0,
    existingHosPlan: "",
    typeOfHosCovered: "",
    classOfWardCovered: "",
    purchaseYear: 0,
    premium: 0,
    medisave: 0,
    sourceOfFund: 0,
    status: "",
  };

  const [newData, setNewData] = useState<SummaryOfInsuranceGroup>(initialState);

  let clients: Array<any> = getClientCustom(clientInfo);
  let insures: Array<any> = getInsuredCustom(clientInfo, dependant);

  const setData = (params: any) => {
    console.log(params);
  };

  const saveData = () => {
    if (newData.policyType === "Hospitalization") {
      let checkIndex = checkCountData(summaryOfInsurance);

      let checkTotalData2 =
        summaryOfInsurance2?.length === 0 || summaryOfInsurance2[0].id === 0
          ? 0
          : 1;
      console.log("Ini masuk hospitalization");

      let hosData: SummaryOfInsurance2 = {
        id: checkIndex,
        editting: true,
        client: newData.client,
        insured: newData.insured,
        insurer: newData.insurer,
        policyType: newData.policyType,
        policyTerm: newData.policyTerm,
        existingHosPlan: newData.existingHosPlan,
        typeOfHosCovered: newData.typeOfHosCovered,
        classOfWardCovered: newData.classOfWardCovered,
        purchaseYear: newData.purchaseYear,
        premium: newData.premium,
        medisave: newData.medisave,
        frequency: newData.premiumFrequency,
        sourceOfFund: newData.sourceOfFund,
      };

      if (saveType === "add") {
        setInsurance2(checkTotalData2, hosData);
      } else {
        patchInsurance2(hosData);
      }
    } else {
      console.log("Ini bukan hospitalization");
      let checkTotalData =
        summaryOfInsurance?.length === 0 || summaryOfInsurance[0].id === 0
          ? 0
          : 1;
      let checkIndexTwo = checkCountData(summaryOfInsurance2);

      let hosData: SummaryOfInsurance = {
        id: checkIndexTwo,
        editting: true,
        client: newData.client,
        insured: newData.insured,
        insurer: newData.insurer,
        policyType: newData.policyType,
        policyTypeOther: newData.policyTypeOther,
        policyTerm: newData.policyTerm,
        death: newData.death,
        tpd: newData.tpd,
        ci: newData.ci,
        earlyCI: newData.earlyCI,
        acc: newData.acc,
        purchaseYear: newData.purchaseYear,
        premiumFrequency: newData.premiumFrequency,
        premium: newData.premium,
        cash: newData.cash,
        medisave: newData.medisave,
        sourceOfFund: newData.sourceOfFund,
        status: newData.status,
      };

      if (saveType === "add") {
        setInsurance(checkTotalData, hosData);
      } else {
        patchInsurance(hosData);
      }
    }
    console.log(newData);

    setShowModal(false);
  };

  const openModal = () => {
    setSaveType("add");
    setNewData(initialState);
    setShowModal(true);
  };

  const openModalEdit = (type: number, params: any) => {
    setSaveType("update");

    console.log("cek " + type + " " + params);

    if (type === 1) {
      let detailDataInsurance = summaryOfInsurance.filter(
        (obj) => obj.id === params
      );

      let exisData: SummaryOfInsuranceGroup = {
        client: detailDataInsurance[0].client,
        insured: detailDataInsurance[0].insured,
        insurer: detailDataInsurance[0].insurer,
        policyType: detailDataInsurance[0].policyType,
        policyTypeOther: detailDataInsurance[0].policyTypeOther,
        policyTerm: detailDataInsurance[0].policyTerm,
        death: detailDataInsurance[0].death,
        tpd: detailDataInsurance[0].tpd,
        ci: detailDataInsurance[0].ci,
        earlyCI: detailDataInsurance[0].earlyCI,
        acc: detailDataInsurance[0].acc,
        premiumFrequency: detailDataInsurance[0].premiumFrequency,
        cash: detailDataInsurance[0].cash,
        existingHosPlan: "",
        typeOfHosCovered: "",
        classOfWardCovered: "",
        purchaseYear: detailDataInsurance[0].purchaseYear,
        premium: detailDataInsurance[0].premium,
        medisave: detailDataInsurance[0].medisave,
        sourceOfFund: detailDataInsurance[0].sourceOfFund,
        status: "",
      };

      console.log("Exis apa");
      console.log(exisData);

      setNewData(exisData);
    } else {
      let detailDataInsurance2 = summaryOfInsurance2.filter(
        (obj) => obj.id === params
      );

      let exisData: SummaryOfInsuranceGroup = {
        client: detailDataInsurance2[0].client,
        insured: detailDataInsurance2[0].insured,
        insurer: detailDataInsurance2[0].insurer,
        policyType: detailDataInsurance2[0].policyType,
        policyTypeOther: "",
        policyTerm: detailDataInsurance2[0].policyTerm,
        death: 0,
        tpd: 0,
        ci: 0,
        earlyCI: 0,
        acc: 0,
        premiumFrequency: detailDataInsurance2[0].frequency,
        cash: 0,
        existingHosPlan: detailDataInsurance2[0].existingHosPlan,
        typeOfHosCovered: detailDataInsurance2[0].typeOfHosCovered,
        classOfWardCovered: detailDataInsurance2[0].classOfWardCovered,
        purchaseYear: detailDataInsurance2[0].purchaseYear,
        premium: detailDataInsurance2[0].premium,
        medisave: detailDataInsurance2[0].medisave,
        sourceOfFund: detailDataInsurance2[0].sourceOfFund,
        status: "",
      };

      setNewData(exisData);
    }

    console.log(newData);

    setShowModal(true);
  };

  const modalRemoveData = (type: number, params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
    setActionDataType(type);
  };

  const removeDataAction = (type: number, params: any) => {
    if (type == 1) {
      removeInsurance(params);
    } else {
      removeInsurance2(params);
    }
    setShowModalRemove(false);
  };

  let policyTypes: Array<any> = [
    { id: "Wholelife", name: "Wholelife" },
    { id: "Investment-linked", name: "Investment-linked" },
    { id: "Endowment", name: "Endowment" },
    { id: "Term", name: "Term" },
    { id: "Disability Income", name: "Disability Income" },
    { id: "Accident", name: "Accident" },
    { id: "Hospitalization", name: "Hospitalization" },
    { id: "Others", name: "Others" },
  ];

  let frequencyDatas: Array<any> = [
    { id: "Monthly", name: "Monthly" },
    { id: "Quarterly", name: "Quarterly" },
    { id: "Half-Yearly", name: "Half-Yearly" },
    { id: "Yearly", name: "Yearly" },
    { id: "Single", name: "Single" },
    { id: "Fully Paid", name: "Fully Paid" },
  ];

  let sourceOfFundDatas: Array<any> = [
    { id: 0, name: "Cash" },
    { id: 1, name: "CPF" },
    { id: 2, name: "SRS" },
  ];

  let typeOfHospital: Array<any> = [
    { id: "Private", name: "Private" },
    { id: "Government", name: "Government" },
  ];

  let classOfWard: Array<any> = [
    { id: "A", name: "A" },
    { id: "B1", name: "B1" },
    { id: "B2", name: "B2" },
    { id: "C", name: "C" },
  ];

  const clientName = (params: any) => {
    let customName = "-";
    if (clients.length > 0) {
      customName = clients[Number(params)].name;
    }
    return customName;
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <div className="flex flex-col w-full">
        {summaryOfInsurance[0].editting &&
        summaryOfInsurance[0].client === "" ? (
          <span className="mb-2 text-sm text-red">Required</span>
        ) : (
          ""
        )}
        <ButtonBox onClick={openModal} className="text-green-deep">
          <AddLineIcon />
        </ButtonBox>

        <Transition appear show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShowModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-opacity-25 bg-gray-light" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add Insurance
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between gap-8">
                        <div>
                          <Select
                            className="my-4"
                            name="client"
                            label="Client"
                            value={newData.client}
                            datas={clients}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                client: event.target.value,
                              })
                            }
                            needValidation={true}
                            logic={
                              newData.client === "" || newData.client === "-"
                                ? false
                                : true
                            }
                          />

                          <Input
                            className="my-4"
                            label="Insurer"
                            name="insurer"
                            type="text"
                            value={newData.insurer}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                insurer: event.target.value,
                              })
                            }
                          />
                          {newData.policyType !== "" &&
                          newData.policyType !== "-" ? (
                            <>
                              {newData.policyType !== "Hospitalization" ? (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Policy Term"
                                    type="text"
                                    name="policyTerm"
                                    value={newData.policyTerm}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        policyTerm: event.target.value,
                                      })
                                    }
                                  />

                                  <Input
                                    className="my-4"
                                    label="Sum Assured TPD"
                                    type="text"
                                    name="tpd"
                                    value={newData.tpd}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        tpd: Number(event.target.value),
                                      })
                                    }
                                  />

                                  <Input
                                    className="my-4"
                                    label="Sum Assured Early CI"
                                    type="text"
                                    name="earlyCI"
                                    value={newData.earlyCI}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        earlyCI: Number(event.target.value),
                                      })
                                    }
                                  />

                                  <Input
                                    className="my-4"
                                    label="Year Of Purchase"
                                    type="text"
                                    name="purchaseYear"
                                    value={newData.purchaseYear}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        purchaseYear: Number(
                                          event.target.value
                                        ),
                                      })
                                    }
                                  />

                                  <Select
                                    className="my-4"
                                    name="client"
                                    label="Premium Frequency"
                                    value={newData.premiumFrequency}
                                    datas={frequencyDatas}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        premiumFrequency: event.target.value,
                                      })
                                    }
                                    needValidation={true}
                                    logic={
                                      newData.premiumFrequency === "" ||
                                      newData.premiumFrequency === "-"
                                        ? false
                                        : true
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Policy Term"
                                    type="text"
                                    name="policyTerm"
                                    value={newData.policyTerm}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        policyTerm: event.target.value,
                                      })
                                    }
                                  />
                                  <Select
                                    className="my-4"
                                    name="typeOfHosCovered"
                                    label="Type Of Hospital Covered"
                                    value={newData.typeOfHosCovered}
                                    datas={typeOfHospital}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        typeOfHosCovered: event.target.value,
                                      })
                                    }
                                    needValidation={true}
                                    logic={
                                      newData.typeOfHosCovered === "" ||
                                      newData.typeOfHosCovered === "-"
                                        ? false
                                        : true
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Year Of Purchase"
                                    type="text"
                                    name="purchaseYear"
                                    value={newData.purchaseYear}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        purchaseYear: Number(
                                          event.target.value
                                        ),
                                      })
                                    }
                                  />

                                  <Input
                                    className="my-4"
                                    label="Premium Medisave"
                                    type="text"
                                    name="medisave"
                                    value={newData.medisave}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        medisave: Number(event.target.value),
                                      })
                                    }
                                  />
                                </>
                              )}
                            </>
                          ) : null}
                        </div>
                        {/* End Of Insurance */}
                        <div>
                          <Select
                            className="my-4"
                            name="insured"
                            label="Insured"
                            value={newData.insured}
                            datas={insures}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                insured: event.target.value,
                              })
                            }
                            needValidation={true}
                            logic={
                              newData.insured === "" || newData.insured === "-"
                                ? false
                                : true
                            }
                          />
                          <Select
                            className="my-4"
                            name="client"
                            label="Policy Type"
                            value={newData.policyType}
                            datas={policyTypes}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                policyType: event.target.value,
                              })
                            }
                            needValidation={true}
                            logic={
                              newData.policyType === "" ||
                              newData.policyType === "-"
                                ? false
                                : true
                            }
                          />
                          {newData.policyType === "Others" ? (
                            <Input
                              className="my-4"
                              label="Policy Other"
                              name="policyTypeOther"
                              type="text"
                              value={newData.policyTypeOther}
                              handleChange={(event) =>
                                setNewData({
                                  ...newData,
                                  policyTypeOther: event.target.value,
                                })
                              }
                            />
                          ) : null}

                          {newData.policyType !== "" &&
                          newData.policyType !== "-" ? (
                            <>
                              {newData.policyType !== "Hospitalization" ? (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Sum Assured Death"
                                    type="text"
                                    name="death"
                                    value={newData.death}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        death: Number(event.target.value),
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Sum Assured CI"
                                    type="text"
                                    name="ci"
                                    value={newData.ci}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        ci: Number(event.target.value),
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Sum Assured Acc"
                                    type="text"
                                    name="acc"
                                    value={newData.acc}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        acc: Number(event.target.value),
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Premium"
                                    name="premium"
                                    type="text"
                                    value={newData.premium}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        premium: Number(event.target.value),
                                      })
                                    }
                                  />
                                  <Select
                                    className="my-4"
                                    name="sourceOfFund"
                                    label="Source Of Fund"
                                    value={newData.sourceOfFund}
                                    datas={sourceOfFundDatas}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        sourceOfFund: Number(
                                          event.target.value
                                        ),
                                      })
                                    }
                                    needValidation={true}
                                    logic={
                                      String(newData.sourceOfFund) === "" ||
                                      String(newData.sourceOfFund) === "-"
                                        ? false
                                        : true
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Existing Hospitalization Plan (If Any)"
                                    type="text"
                                    name="existingHosPlan"
                                    value={newData.existingHosPlan}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        existingHosPlan: event.target.value,
                                      })
                                    }
                                  />

                                  <Select
                                    className="my-4"
                                    name="classOfWardCovered"
                                    label="Class Of Ward Covered"
                                    value={newData.classOfWardCovered}
                                    datas={classOfWard}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        classOfWardCovered: String(
                                          event.target.value
                                        ),
                                      })
                                    }
                                    needValidation={true}
                                    logic={
                                      newData.classOfWardCovered === "" ||
                                      newData.classOfWardCovered === "-"
                                        ? false
                                        : true
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Premium Cash"
                                    type="text"
                                    name="premium"
                                    value={newData.premium}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        premium: Number(event.target.value),
                                      })
                                    }
                                  />
                                  {/* Hospitalization */}

                                  <Select
                                    className="my-4"
                                    name="premiumFrequency"
                                    label="Premium Frequency"
                                    value={newData.premiumFrequency}
                                    datas={frequencyDatas}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        premiumFrequency: String(
                                          event.target.value
                                        ),
                                      })
                                    }
                                    needValidation={true}
                                    logic={
                                      newData.premiumFrequency === "" ||
                                      newData.premiumFrequency === "-"
                                        ? false
                                        : true
                                    }
                                  />
                                </>
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium onClick={() => saveData()}>
                        Save
                      </ButtonGreenMedium>
                      <ButtonTransparentMedium
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </ButtonTransparentMedium>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {summaryOfInsurance?.length && summaryOfInsurance[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Insured</th>
                <th className="px-2 py-5">Insurer</th>
                <th className="px-2 py-5">Policy Type</th>
                <th className="px-2 py-5">Policy Term</th>
                <th className="px-2 py-5">Sum Assured Death</th>
                <th className="px-2 py-5">Sum Assured TPD</th>
                <th className="px-2 py-5">Sum Assured CI</th>
                <th className="px-2 py-5">Sum Assured Early CI</th>
                <th className="px-2 py-5">Sum Assured Acc</th>
                <th className="px-2 py-5">Year Of Purchase</th>
                <th className="px-2 py-5">Premium</th>
                <th className="px-2 py-5">Premium Frequency</th>
                <th className="px-2 py-5">Source Of Fund</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfInsurance?.length &&
                summaryOfInsurance.map((data, index) => (
                  <tr key={index}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{clientName(data.client)}</td>
                    <td className="px-2 py-5">{clientName(data.insured)}</td>
                    <td className="px-2 py-5">{data.insurer}</td>
                    <td className="px-2 py-5">{data.policyType}</td>
                    <td className="px-2 py-5">{data.policyTerm}</td>
                    <td className="px-2 py-5">{data.death}</td>
                    <td className="px-2 py-5">{data.tpd}</td>
                    <td className="px-2 py-5">{data.ci}</td>
                    <td className="px-2 py-5">{data.earlyCI}</td>
                    <td className="px-2 py-5">{data.acc}</td>
                    <td className="px-2 py-5">{data.purchaseYear}</td>
                    <td className="px-2 py-5">{data.premium}</td>
                    <td className="px-2 py-5">{data.premiumFrequency}</td>
                    <td className="px-2 py-5">
                      {data.sourceOfFund >= 0
                        ? sourceOfFundDatas[Number(data.sourceOfFund)].name
                        : ""}
                    </td>
                    <td className="w-1/12 px-2 py-5">
                      <div className="flex w-full gap-2">
                        <ButtonBox
                          className="text-green-deep"
                          onClick={() => openModalEdit(1, data.id)}
                        >
                          <PencilLineIcon size={14} />
                        </ButtonBox>
                        <ButtonBox
                          className="text-red"
                          onClick={() => modalRemoveData(1, data.id)}
                        >
                          <CloseLineIcon size={14} />
                        </ButtonBox>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {summaryOfInsurance2?.length && summaryOfInsurance2[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Insured</th>
                <th className="px-2 py-5">Insurer</th>
                <th className="px-2 py-5">Policy Type</th>
                <th className="px-2 py-5">Policy Term</th>
                <th className="px-2 py-5">
                  Existing Hospitalization Plan (If Any)
                </th>
                <th className="px-2 py-5">Type Of Hospital Covered</th>
                <th className="px-2 py-5">Class Of Ward Covered</th>
                <th className="px-2 py-5">Year Of Purchase</th>
                <th className="px-2 py-5">Premium Cash</th>
                <th className="px-2 py-5">Premium Medisave</th>
                <th className="px-2 py-5">Frequency</th>
                <th className="px-2 py-5">Source of Fund</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfInsurance2?.length &&
                summaryOfInsurance2.map((data, index) => (
                  <tr key={index}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{clientName(data.client)}</td>
                    <td className="px-2 py-5">{data.insured}</td>
                    <td className="px-2 py-5">{data.insurer}</td>
                    <td className="px-2 py-5">{data.policyType}</td>
                    <td className="px-2 py-5">{data.policyTerm}</td>
                    <td className="px-2 py-5">{data.existingHosPlan}</td>
                    <td className="px-2 py-5">{data.typeOfHosCovered}</td>
                    <td className="px-2 py-5">{data.classOfWardCovered}</td>
                    <td className="px-2 py-5">{data.purchaseYear}</td>
                    <td className="px-2 py-5">{data.premium}</td>
                    <td className="px-2 py-5">{data.medisave}</td>
                    <td className="px-2 py-5">{data.frequency}</td>
                    <td className="w-1/12 px-2 py-5">
                      <div className="flex w-full gap-2">
                        <ButtonBox
                          className="text-green-deep"
                          onClick={() => openModalEdit(2, data.id)}
                        >
                          <PencilLineIcon size={14} />
                        </ButtonBox>
                        <ButtonBox
                          className="text-red"
                          onClick={() => modalRemoveData(2, data.id)}
                        >
                          <CloseLineIcon size={14} />
                        </ButtonBox>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </SectionCardSingleGrid>
  );
};

export default InsurancePortofolio;
