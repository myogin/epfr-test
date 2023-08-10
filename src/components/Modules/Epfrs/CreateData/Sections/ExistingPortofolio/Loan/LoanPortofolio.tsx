import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { checkCountData, getClientCustom } from "@/libs/helper";
import { SummaryOfLoans } from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const LoanPortofolio = () => {
  const [showModal, setShowModal] = useState(false);
  const [saveType, setSaveType] = useState("");
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);

  let { summaryOfLoans, setLoan, patchLoan, removeLoan } =
    useExistingPortofolio();
  // get client state
  let { clientInfo } = usePersonalInformation();

  let checkIndex = checkCountData(summaryOfLoans);

  let initialState: SummaryOfLoans = {
    id: checkIndex,
    editting: true,
    client: "",
    typeOfLoan: "",
    loanTerm: "",
    yearOfLoanTaken: 0,
    amountBorrowed: 0,
    loanStatus: "",
    typeOfVehicle: "",
    currentOutstandingLoan: 0,
    lender: "",
    interestRate: 0,
    monthlyLoanRepayment: 0,
    clientPfr: "Manual"
  };

  const [newData, setNewData] = useState(initialState);

  let clients: Array<any> = getClientCustom(clientInfo);

  let buttonSave = checkButtonActive(newData);

  const clientName = (params: any) => {
    let customName = "-";
    if (clients.length > 0) {
      customName = clients[Number(params)].name;
    }
    return customName;
  };

  const saveData = () => {
    let checkTotalData =
      summaryOfLoans?.length === 0 || summaryOfLoans[0].id === 0 ? 0 : 1;

    console.log(checkTotalData);

    if (saveType === "add") {
      setLoan(checkTotalData, newData);
    } else {
      patchLoan(newData);
    }

    setShowModal(false);
  };

  const openModal = () => {
    setSaveType("add");
    setNewData(initialState);
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    setSaveType("update");
    const detailData = summaryOfLoans.filter((obj) => obj.id === params);
    setNewData(detailData[0]);
    setShowModal(true);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
  };

  const removeDataAction = (params: any) => {
    removeLoan(params);
    setShowModalRemove(false);
  };

  let typeOfLoans: Array<any> = [
    { id: "1", name: "VEHICLE" },
    { id: "2", name: "RENOVATION" },
    { id: "3", name: "EDUCATION" },
    { id: "4", name: "CREDIT CARD" },
    { id: "5", name: "PERSONAL LOANS" },
    { id: "6", name: "OVERDRAFTS" },
  ];

  let loanTerms = loanTerm();

  const [checkVehicle, setCheckVehicle] = useState(false);

  const checkTypeOfLoan = (params: any) => {
    if (params === "1") {
      setNewData({
        ...newData,
        typeOfLoan: params,
      });
      setCheckVehicle(true);
    } else {
      setNewData({
        ...newData,
        typeOfLoan: params,
      });
      setCheckVehicle(false);
    }
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <div className="flex flex-col w-full">
        {summaryOfLoans[0].editting && summaryOfLoans[0].client === "" ? (
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
                      Add Loan
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between gap-8">
                        <div className="basis-2/3">
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
                          <Select
                            className="my-4"
                            name="typeOfLoan"
                            label="Type Of Loan"
                            value={newData.typeOfLoan}
                            datas={typeOfLoans}
                            handleChange={(event) =>
                              checkTypeOfLoan(event.target.value)
                            }
                            needValidation={true}
                            logic={
                              newData.typeOfLoan === "" ||
                              newData.typeOfLoan === "-"
                                ? false
                                : true
                            }
                          />
                          {checkVehicle ? (
                            <>
                              <Input
                                className="my-4"
                                label="Type Of Vehicle"
                                type="text"
                                name="typeOfVehicle"
                                value={newData.typeOfVehicle}
                                needValidation={true}
                                logic={
                                  newData.typeOfLoan === "1" &&
                                  (newData.typeOfVehicle === "" ||
                                    newData.typeOfVehicle === "-")
                                    ? false
                                    : true
                                }
                                handleChange={(event) =>
                                  setNewData({
                                    ...newData,
                                    typeOfVehicle: event.target.value,
                                  })
                                }
                              />
                              <Input
                                className="my-4"
                                label="Loan Status"
                                type="text"
                                name="loanStatus"
                                value={newData.loanStatus}
                                needValidation={true}
                                logic={
                                  newData.typeOfLoan === "1" &&
                                  (newData.loanStatus === "" ||
                                    newData.loanStatus === "-")
                                    ? false
                                    : true
                                }
                                handleChange={(event) =>
                                  setNewData({
                                    ...newData,
                                    loanStatus: event.target.value,
                                  })
                                }
                              />
                            </>
                          ) : (
                            ""
                          )}

                          <Select
                            className="my-4"
                            name="loanTerm"
                            label="Loan Term"
                            value={newData.loanTerm}
                            datas={loanTerms}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                loanTerm: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Year Of Loan Taken"
                            type="text"
                            value={newData.yearOfLoanTaken}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                yearOfLoanTaken: Number(event.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="basis-1/3">
                          <Input
                            className="my-4"
                            label="Amount Borrowed ($)"
                            type="text"
                            value={newData.amountBorrowed}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                amountBorrowed: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Current Outstanding Loan ($)"
                            type="text"
                            value={newData.currentOutstandingLoan}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                currentOutstandingLoan: Number(
                                  event.target.value
                                ),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Lender"
                            type="text"
                            value={newData.lender}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                lender: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Interest Rate"
                            type="text"
                            value={newData.interestRate}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                interestRate: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Monthly Loan Repayment (Cash) ($)"
                            type="text"
                            value={newData.monthlyLoanRepayment}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                monthlyLoanRepayment: Number(
                                  event.target.value
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium
                        disabled={buttonSave}
                        onClick={() => saveData()}
                      >
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

        {/* Modal Delete */}
        <Transition appear show={showModalRemove} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShowModalRemove(false)}
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
              <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Remove Data
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure to remove this data.?
                      </p>
                    </div>

                    <div className="mt-4 space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-red hover:ring-red focus:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
                        onClick={() => removeDataAction(actionDatatId)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick={() => setShowModalRemove(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {summaryOfLoans?.length && summaryOfLoans[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Type Of Loan</th>
                <th className="px-2 py-5">Loan Term</th>
                <th className="px-2 py-5">Type Of Vehicle</th>
                <th className="px-2 py-5">Loan Status</th>
                <th className="px-2 py-5">Year Of Loan Taken</th>
                <th className="px-2 py-5">Amount Borrowed ($)</th>
                <th className="px-2 py-5">Current Outstanding Loan ($)</th>
                <th className="px-2 py-5">Lender</th>
                <th className="px-2 py-5">Interest Rate</th>
                <th className="px-2 py-5">Monthly Loan Repayment (Cash) ($)</th>
                <th className="px-2 py-5">Status</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfLoans?.length &&
                summaryOfLoans.map((data, index) => (
                  <tr key={data.id}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{clientName(data.client)}</td>
                    <td className="px-2 py-5">
                      {data.typeOfLoan
                        ? typeOfLoans[Number(data.typeOfLoan) - 1].name
                        : ""}
                    </td>
                    <td className="px-2 py-5">{data.loanTerm}</td>
                    {data.typeOfLoan === "1" ? (
                      <>
                        <td className="px-2 py-5">{data.typeOfVehicle}</td>
                        <td className="px-2 py-5">{data.loanStatus}</td>
                      </>
                    ) : (
                      ""
                    )}

                    <td className="px-2 py-5">{data.yearOfLoanTaken}</td>
                    <td className="px-2 py-5">{data.amountBorrowed}</td>

                    <td className="px-2 py-5">{data.currentOutstandingLoan}</td>
                    <td className="px-2 py-5">{data.lender}</td>
                    <td className="px-2 py-5">{data.interestRate}</td>
                    <td className="px-2 py-5">{data.monthlyLoanRepayment}</td>
                    <td className="w-1/12 px-2 py-5">
                      <div className="flex w-full gap-2">
                        <ButtonBox
                          className="text-green-deep"
                          onClick={() => openModalEdit(data.id)}
                        >
                          <PencilLineIcon size={14} />
                        </ButtonBox>
                        <ButtonBox
                          className="text-red"
                          onClick={() => modalRemoveData(data.id)}
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

// Additional function

const loanTerm = () => {
  let dataArray = [];
  for (let i = 1; i <= 100; i++) {
    dataArray.push({ id: i, name: i });
  }

  return dataArray;
};

const checkButtonActive = (newData: any) => {
  let button: boolean = false;
  if (
    newData.client === "" ||
    newData.client === "-" ||
    newData.typeOfLoan === "" ||
    newData.typeOfLoan === "-"
  ) {
    button = true;
  } else {
    button = false;
  }

  return button;
};

export default LoanPortofolio;
