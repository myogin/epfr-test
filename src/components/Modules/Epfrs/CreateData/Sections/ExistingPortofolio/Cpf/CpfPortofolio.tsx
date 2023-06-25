import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { SummaryOfCPF } from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const CpfPortofolio = () => {
  const [showModal, setShowModal] = useState(false);

  let { summaryOfCPF, setCpf } = useExistingPortofolio();
  // get client state
  let { clientInfo } = usePersonalInformation();

  const [newData, setNewData] = useState<SummaryOfCPF>({
    editting: false,
    client: "",
    ordinaryAccount: 0,
    specialAccount: 0,
    medisaveAccount: 0,
    retirementAccount: 0,
  });

  let clients: Array<any> = getClientCustom(clientInfo);

  let buttonSave = checkButtonActive(newData);

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
                      Add CPF
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
                            label="Ordinary Account"
                            type="text"
                            value={newData.ordinaryAccount}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                ordinaryAccount: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Medisave Account"
                            type="text"
                            value={newData.medisaveAccount}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                medisaveAccount: Number(event.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <Input
                            className="my-4"
                            label="Retirement Account"
                            type="text"
                            value={newData.retirementAccount}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                retirementAccount: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Special Account"
                            type="text"
                            value={newData.specialAccount}
                            formStyle="text-right"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                specialAccount: Number(event.target.value),
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
      {summaryOfCPF[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Ordinary Account</th>
                <th className="px-2 py-5">Special Account</th>
                <th className="px-2 py-5">Medisave Account</th>
                <th className="px-2 py-5">Retirement Account</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfCPF?.length &&
                summaryOfCPF.map((value, index) => (
                  <tr key={index}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{value.client}</td>
                    <td className="px-2 py-5">{value.ordinaryAccount}</td>
                    <td className="px-2 py-5">{value.specialAccount}</td>
                    <td className="px-2 py-5">{value.medisaveAccount}</td>
                    <td className="px-2 py-5">{value.retirementAccount}</td>
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

const checkButtonActive = (newData: any) => {
  let button: boolean = false;
  if (newData.client === "" || newData.client === "-") {
    button = true;
  } else {
    button = false;
  }

  return button;
};

export default CpfPortofolio;
