import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { SummaryOfProperty } from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

interface Props {
  datas?: any;
  id?: any;
}

const PropertyPortofolio = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);
  const [saveType, setSaveType] = useState("");

  let { summaryOfProperty, setProperty, removeData, patchProperty } =
    useExistingPortofolio();

  let checkIndex = checkPropertyData(summaryOfProperty);

  console.log("cek data "+ checkIndex)

  let initialState: SummaryOfProperty = {
    id: checkIndex,
    client: "",
    category: 0,
    typeOfProperty: "",
    yearPurchased: 0,
    purchasePrice: 0,
    loanAmount: 0,
    currentOutstanding: 0,
    monthlyLoanRepaymentCash: 0,
    monthlyLoanRepaymentCPF: 0,
    currentMarketValue: 0,
  };

  // inject initial state to useState
  const [newData, setNewData] = useState(initialState);


  const openModal = () => {
    setSaveType("add");
    setNewData(initialState);
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    setSaveType("update");
    const detailData = summaryOfProperty.filter((obj) => obj.id === params);
    setNewData(detailData[0]);
    setShowModal(true);
  };

  const saveData = () => {
    let checkTotalData = summaryOfProperty?.length === 0 || summaryOfProperty[0].id === 0 ? 0 : 1;

    console.log(checkTotalData);
    
    if (saveType === "add") {
      setProperty(checkTotalData, newData);
    } else {
      patchProperty(newData);
    }

    setShowModal(false);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
  };

  const removeDataAction = (params: any) => {
    removeData("summaryOfProperty",params);
    setShowModalRemove(false);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <div className="w-full">
        <ButtonBox onClick={openModal} className="text-green-deep">
          <AddLineIcon />
        </ButtonBox>

        <Transition appear show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
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
                      Add Property
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between gap-8">
                        <div>
                          <Input
                            className="my-4"
                            label="Client"
                            type="text"
                            name="client"
                            placeholder="Margo Madison"
                            value={newData.client}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                client: event.target.value,
                              })}
                          />
                          <Input
                            className="my-4"
                            label="Type Of Property"
                            type="text"
                            name="typeOfProperty"
                            value={newData.typeOfProperty}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                typeOfProperty: event.target.value,
                              })}
                          />
                          <Input
                            className="my-4"
                            label="Category"
                            type="text"
                            name="category"
                            value={newData.category}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                category: Number(event.target.value),
                              })}
                          />
                          <Input
                            className="my-4"
                            label="Year Purchashed"
                            type="text"
                            name="yearPurchased"
                            value={newData.yearPurchased}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                yearPurchased: Number(event.target.value),
                              })}
                          />
                        </div>
                        <div>
                          <Input
                            className="my-4"
                            label="Purchase Price ($)"
                            type="text"
                            name="purchasePrice"
                            formStyle="text-right"
                            value={newData.purchasePrice}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                purchasePrice: Number(event.target.value),
                              })}
                          />
                          <Input
                            className="my-4"
                            label="Current Outstanding Loan ($)"
                            type="text"
                            name="currentOutstanding"
                            formStyle="text-right"
                            value={newData.currentOutstanding}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                currentOutstanding: Number(event.target.value),
                              })}
                          />
                          <Input
                            className="my-4"
                            label="Loan Amount Taken ($)"
                            type="text"
                            name="loanAmount"
                            formStyle="text-right"
                            value={newData.loanAmount}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                loanAmount: Number(event.target.value),
                              })}
                          />
                          <Input
                            className="my-4"
                            label="Current Market Value ($)"
                            type="text"
                            name="currentMarketValue"
                            formStyle="text-right"
                            value={newData.currentMarketValue}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                currentMarketValue: Number(event.target.value),
                              })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium onClick={() => saveData()}>
                        Save
                      </ButtonGreenMedium>
                      <ButtonTransparentMedium onClick={() => setShowModal(false)}>
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

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => removeDataAction(actionDatatId)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
      {summaryOfProperty?.length && summaryOfProperty[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Category</th>
                <th className="px-2 py-5">Type Of Property</th>
                <th className="px-2 py-5">Year Purchashed</th>
                <th className="px-2 py-5">Purchase Price</th>
                <th className="px-2 py-5">Loan Amount Taken</th>
                <th className="px-2 py-5">Current Outstanding Loan</th>
                <th className="px-2 py-5">Current Market Value</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfProperty?.length &&
                summaryOfProperty.map((data, index) => (
                  <tr key={index}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{data.client}</td>
                    <td className="px-2 py-5">{data.category}</td>
                    <td className="px-2 py-5">{data.typeOfProperty}</td>
                    <td className="px-2 py-5">{data.yearPurchased}</td>
                    <td className="px-2 py-5">{data.purchasePrice}</td>
                    <td className="px-2 py-5">{data.loanAmount}</td>
                    <td className="px-2 py-5">{data.currentOutstanding}</td>
                    <td className="px-2 py-5">{data.currentMarketValue}</td>
                    <td className="w-1/12 px-2 py-5">
                      <div className="flex w-full gap-2">
                        <ButtonBox className="text-green-deep" onClick={() => openModalEdit(data.id)}>
                          <PencilLineIcon size={14} />
                        </ButtonBox>
                        <ButtonBox className="text-red" onClick={() => modalRemoveData(data.id)}>
                          <CloseLineIcon size={14} />
                        </ButtonBox>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </SectionCardSingleGrid>
  );
};

function checkPropertyData(property: any) {
  let data: number = 0;
  if (property?.length) {
    if (property[0].client === "") {
      data = property.length;
    } else {
      data = property.length + 1;
    }
  } else {
    data = property.length + 1;
  }

  return data;
}

export default PropertyPortofolio;
