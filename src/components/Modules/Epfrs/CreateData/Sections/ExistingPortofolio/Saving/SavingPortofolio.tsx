import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { SummaryOfSavings } from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const SavingPortofolio = () => {
  const [showModal, setShowModal] = useState(false);

  let { summaryOfSavings, setSaving } = useExistingPortofolio();
  // get client state 
  let {clientInfo} = usePersonalInformation();

  const [newData, setNewData] = useState<SummaryOfSavings>({
    editting: false,
    client: "",
    typeOfDeposit: 0,
    bank: "",
    yearDeposit: 0,
    savingAmount: 0,
  });

  let clients: Array<any> = getClientCustom(clientInfo)

  let buttonSave = checkButtonActive(newData);

  let deposits : Array<any> = [
    {id: "0", name:"Savings Account"},
    {id: "1", name:"Fixed Deposit"},
  ]

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
                      Add Saving
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
                          <Select
                            className="my-4"
                            name="typeOfDeposit"
                            label="Type Of Deposit"
                            value={newData.typeOfDeposit}
                            datas={deposits}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                typeOfDeposit: Number(event.target.value),
                              })
                            }
                            needValidation={true}
                            logic={
                              String(newData.typeOfDeposit) === "-" || String(newData.typeOfDeposit) === "NaN"
                                ? false
                                : true
                            }
                          />
                          <Input
                            className="my-4"
                            label="Type Of Deposit"
                            type="text"
                            value={newData.typeOfDeposit}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                typeOfDeposit: Number(event.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <Input
                            className="my-4"
                            label="Bank"
                            type="text"
                            value={newData.bank}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                bank: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Savings Amount"
                            type="text"
                            value={newData.savingAmount}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                savingAmount: Number(event.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium disabled={buttonSave} onClick={() => saveData()}>
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
      {summaryOfSavings[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Type Of Deposit</th>
                <th className="px-2 py-5">Bank</th>
                <th className="px-2 py-5">Savings Amount</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfSavings?.length && summaryOfSavings.map((value, index) => (
                <tr key={index}>
                <td className="px-2 py-5">{++index}</td>
                <td className="px-2 py-5">{value.client}</td>
                <td className="px-2 py-5">{value.typeOfDeposit}</td>
                <td className="px-2 py-5">{value.bank}</td>
                <td className="px-2 py-5">{value.savingAmount}</td>
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
      ) : null}
    </SectionCardSingleGrid>
  );
};

const getClientCustom = (clients : any) => {
  
  let clientCustom : any[] = [];

  if(clients?.length) {
    clients.map((data : any, index : any) => {
      clientCustom.push({id: index, name: data.clientName});
    })
  }

  return clientCustom;
}

const checkButtonActive = (newData: any) => {
  let button: boolean = false;
  if (
    newData.client === "" ||
    newData.client === "-" ||
    newData.typeOfDeposit === "NaN" ||
    newData.typeOfDeposit === "-"
  ) {
    button = true;
  } else {
    button = false;
  }

  return button;
};

export default SavingPortofolio;
