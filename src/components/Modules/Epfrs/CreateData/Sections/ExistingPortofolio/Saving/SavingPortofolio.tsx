import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const SavingPortofolio = () => {
  const [showModal, setShowModal] = useState(false);

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
                          <Input
                            className="my-4"
                            label="Client"
                            type="text"
                            placeholder="Margo Madison"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Type Of Deposit"
                            type="text"
                            placeholder="Private"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Input
                            className="my-4"
                            label="Bank"
                            type="text"
                            placeholder="1,000,000"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Savings Amount"
                            type="text"
                            placeholder="1,000,000"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
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
            <tr>
              <td className="px-2 py-5">1</td>
              <td className="px-2 py-5">Client 1</td>
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
    </SectionCardSingleGrid>
  );
};

export default SavingPortofolio;
