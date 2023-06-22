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

  let { summaryOfProperty, setProperty } = useExistingPortofolio();

  let initialState: SummaryOfProperty = {
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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setProperty(0, name, value);
  };

  const setData = (params: any) => {
    console.log("params", params);
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

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <div className="w-full">
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
                            value={summaryOfProperty[0].client}
                            handleChange={handleInputChange}
                          />
                          <Input
                            className="my-4"
                            label="Type Of Property"
                            type="text"
                            name="typeOfProperty"
                            value={summaryOfProperty[0].typeOfProperty}
                            handleChange={handleInputChange}
                          />
                          <Input
                            className="my-4"
                            label="Category"
                            type="text"
                            name="category"
                            value={summaryOfProperty[0].category}
                            handleChange={handleInputChange}
                          />
                          <Input
                            className="my-4"
                            label="Year Purchashed"
                            type="text"
                            name="yearPurchased"
                            value={summaryOfProperty[0].yearPurchased}
                            handleChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Input
                            className="my-4"
                            label="Purchase Price ($)"
                            type="text"
                            name="purchasePrice"
                            formStyle="text-right"
                            value={summaryOfProperty[0].purchasePrice}
                            handleChange={handleInputChange}
                          />
                          <Input
                            className="my-4"
                            label="Current Outstanding Loan ($)"
                            type="text"
                            name="currentOutstanding"
                            formStyle="text-right"
                            value={summaryOfProperty[0].currentOutstanding}
                            handleChange={handleInputChange}
                          />
                          <Input
                            className="my-4"
                            label="Loan Amount Taken ($)"
                            type="text"
                            name="loanAmount"
                            formStyle="text-right"
                            value={summaryOfProperty[0].loanAmount}
                            handleChange={handleInputChange}
                          />
                          <Input
                            className="my-4"
                            label="Current Market Value ($)"
                            type="text"
                            name="currentMarketValue"
                            formStyle="text-right"
                            value={summaryOfProperty[0].currentMarketValue}
                            handleChange={handleInputChange}
                          />
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
      {summaryOfProperty[0].client !== "" ? (
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
                summaryOfProperty.map((value, index) => (
                  <tr key={index}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{value.client}</td>
                    <td className="px-2 py-5">{value.category}</td>
                    <td className="px-2 py-5">{value.typeOfProperty}</td>
                    <td className="px-2 py-5">{value.yearPurchased}</td>
                    <td className="px-2 py-5">{value.purchasePrice}</td>
                    <td className="px-2 py-5">{value.loanAmount}</td>
                    <td className="px-2 py-5">{value.currentOutstanding}</td>
                    <td className="px-2 py-5">{value.currentMarketValue}</td>
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

export default PropertyPortofolio;
