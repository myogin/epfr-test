import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

const VehiclesPortofolio = () => {
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
      <div className="w-full mb-8">
        <button
          className="flex items-start justify-start gap-2 text-sm text-green-deep"
          onClick={openModal}
        >
          <AddLineIcon /> Add
        </button>

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
                      Add Vehicles
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
                            label="Category"
                            type="text"
                            placeholder="Category"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Vehicle Type"
                            type="text"
                            placeholder="Sedan"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Year Purchashed"
                            type="text"
                            placeholder="1,000,000"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Input
                            className="my-4"
                            label="Purchase Price"
                            type="text"
                            placeholder="Residence"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Loan Amount Taken"
                            type="text"
                            placeholder="2012"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Current Outstanding Loan"
                            type="text"
                            placeholder="1,000,000"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Current Market Value"
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

      <table className="table w-full border border-collapse opacity-50 table-auto border-gray-light">
        <thead className="text-sm opacity-50 text-gray-light">
          <tr>
            <th>SN</th>
            <th>Client</th>
            <th>Category</th>
            <th>Vehicle Typ</th>
            <th>Year Purchashed</th>
            <th>Purchase Price</th>
            <th>Loan Amount Taken</th>
            <th>Current Outstanding Loan</th>
            <th>Current Market Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-collapse opacity-50 border-gray-light">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  );
};

export default VehiclesPortofolio;
