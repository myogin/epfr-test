import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { SummaryOfInsurance, SummaryOfInsurance2 } from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const InsurancePortofolio = () => {
  const [showModal, setShowModal] = useState(false);

  let { summaryOfInsurance, summaryOfInsurance2, setInsurance, setInsurance2 } =
    useExistingPortofolio();
  // get client state
  let { clientInfo, dependant } = usePersonalInformation();

  let checkIndex = checkCountData(summaryOfInsurance);
  let checkIndexTwo = checkCountData(summaryOfInsurance2);

  let initialState: SummaryOfInsurance = {
    id: checkIndex,
    editting: true,
    client: "",
    insured: "",
    status: "",
    insurer: "",
    policyType: "",
    policyTypeOther: "",
    policyTerm: "",
    death: 0,
    tpd: 0,
    ci: 0,
    earlyCI: 0,
    acc: 0,
    purchaseYear: 0,
    premiumFrequency: "",
    premium: 0,
    cash: 0,
    medisave: 0,
    sourceOfFund: 0,
  };

  let initialState2: SummaryOfInsurance2 = {
    id: checkIndex,
    editting: true,
    client: "",
    insured: "",
    insurer: "",
    policyType: "",
    policyTerm: "",
    existingHosPlan: "",
    typeOfHosCovered: "",
    classOfWardCovered: "",
    purchaseYear: 0,
    premium: 0,
    medisave: 0,
    frequency: "",
    sourceOfFund: 0,
  };

  const [newData, setNewData] = useState<SummaryOfInsurance>(initialState);

  const [newData2, setNewData2] = useState<SummaryOfInsurance2>(initialState2);

  let clients: Array<any> = getClientCustom(clientInfo);
  let insures : Array<any> = getInsuredCustom(clientInfo, dependant)

  const setData = (params: any) => {
    console.log(params);
  };

  const saveData = () => {
    console.log("Save test");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <div className="flex flex-col w-full">
        {summaryOfInsurance[0].editting && summaryOfInsurance[0].client === "" ? (
          <span className="mb-2 text-sm text-red">Required</span>
        ) : (
          ""
        )}
        <ButtonBox onClick={openModal} className="text-green-deep">
          <AddLineIcon />
        </ButtonBox>

        <Transition appear show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                              {newData.policyType === "Hospitalization" ? (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Policy Term"
                                    type="text"
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
                                    label="Premium Frequency"
                                    type="text"
                                    value={newData.premiumFrequency}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        premiumFrequency: event.target.value,
                                      })
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Policy Term"
                                    type="text"
                                    value={newData2.policyTerm}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
                                        policyTerm: event.target.value,
                                      })
                                    }
                                  />

                                  <Input
                                    className="my-4"
                                    label="Type Of Hospital Covered"
                                    type="text"
                                    value={newData2.typeOfHosCovered}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
                                        typeOfHosCovered: event.target.value,
                                      })
                                    }
                                  />

                                  <Input
                                    className="my-4"
                                    label="Year Of Purchase"
                                    type="text"
                                    value={newData2.purchaseYear}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
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
                                    value={newData2.medisave}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
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
                              newData.insured === "" ||
                              newData.insured === "-"
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
                          {newData.policyType !== "" &&
                          newData.policyType !== "-" ? (
                            <>
                              {newData.policyType === "Hospitalization" ? (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Sum Assured Death"
                                    type="text"
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
                                    type="text"
                                    value={newData.premium}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        premium: Number(event.target.value),
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Source Of Fund"
                                    type="text"
                                    value={newData.sourceOfFund}
                                    handleChange={(event) =>
                                      setNewData({
                                        ...newData,
                                        sourceOfFund: Number(
                                          event.target.value
                                        ),
                                      })
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Input
                                    className="my-4"
                                    label="Existing Hospitalization Plan (If Any)"
                                    type="text"
                                    value={newData2.existingHosPlan}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
                                        existingHosPlan: event.target.value,
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Class Of Ward Covered"
                                    type="text"
                                    value={newData2.classOfWardCovered}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
                                        classOfWardCovered: event.target.value,
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Premium Cash"
                                    type="text"
                                    value={newData2.premium}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
                                        premium: Number(event.target.value),
                                      })
                                    }
                                  />
                                  <Input
                                    className="my-4"
                                    label="Frequency"
                                    type="text"
                                    value={newData2.frequency}
                                    handleChange={(event) =>
                                      setNewData2({
                                        ...newData2,
                                        frequency: event.target.value,
                                      })
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
                      <ButtonTransparentMedium onClick={closeModal}>
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
              <tr>
                <td className="px-2 py-5">1</td>
                <td className="px-2 py-5">Client 1</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="w-1/12 px-2 py-5">
                  <div className="flex w-full gap-2">
                    <ButtonBox className="text-green-deep">
                      <PencilLineIcon size={14} />
                    </ButtonBox>
                    <ButtonBox className="text-red">
                      <CloseLineIcon size={14} />
                    </ButtonBox>
                  </div>
                </td>
              </tr>
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
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-5">1</td>
                <td className="px-2 py-5">Client 1</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="px-2 py-5">$0.0</td>
                <td className="w-1/12 px-2 py-5">
                  <div className="flex w-full gap-2">
                    <ButtonBox className="text-green-deep">
                      <PencilLineIcon size={14} />
                    </ButtonBox>
                    <ButtonBox className="text-red">
                      <CloseLineIcon size={14} />
                    </ButtonBox>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </SectionCardSingleGrid>
  );
};

// Additional function
const getClientCustom = (clients: any) => {
  let clientCustom: any[] = [];

  if (clients?.length) {
    clients.map((data: any, index: any) => {
      clientCustom.push({ id: index, name: data.clientName });
    });
  }

  return clientCustom;
};

const getInsuredCustom = (clients: any, dependents : any) => {
  let clientCustom: any[] = [];

  if (clients?.length) {
    clients.map((data: any, indexClient: any) => {
      clientCustom.push({ id: indexClient, name: data.clientName });
    });
  }

  if (dependents?.length) {
    dependents.map((data: any, indexDependent: any) => {
      clientCustom.push({ id: indexDependent + clients.length, name: data.name });
    });
  }

  return clientCustom;
};

function checkCountData(datas: any) {
  let data: number = 0;
  if (datas?.length) {
    if (datas[0].client === "") {
      data = datas.length;
    } else {
      data = datas.length + 1;
    }
  } else {
    data = datas.length + 1;
  }

  return data;
}

export default InsurancePortofolio;
