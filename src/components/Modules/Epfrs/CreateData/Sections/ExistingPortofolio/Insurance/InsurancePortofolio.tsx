import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { SummaryOfInsurance, SummaryOfInsurance2 } from "@/models/SectionTwo";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const InsurancePortofolio = () => {
  const [showModal, setShowModal] = useState(false);

  const [newDataInput, setNewDataInput] = useState<SummaryOfInsurance>({
    editting: false,
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
  });

  const [newDataInput2, setNewDataInput2] = useState<SummaryOfInsurance2>({
    editting: false,
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
  });

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
                      Add Insurance
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between gap-8">
                        <div>
                          <Input
                            className="my-4"
                            label="Client"
                            type="text"
                            value={newDataInput.client}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                client: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Insured"
                            type="text"
                            value={newDataInput.insured}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                insured: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Insurer"
                            type="text"
                            value={newDataInput.insurer}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                insurer: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Policy Type"
                            type="text"
                            value={newDataInput.policyType}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                policyType: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Policy Term"
                            type="text"
                            value={newDataInput.policyTerm}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                policyTerm: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Sum Assured Death"
                            type="text"
                            value={newDataInput.death}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                death: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Sum Assured TPD"
                            type="text"
                            value={newDataInput.tpd}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                tpd: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Sum Assured CI"
                            type="text"
                            value={newDataInput.ci}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                ci: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Sum Assured Early CI"
                            type="text"
                            value={newDataInput.earlyCI}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                earlyCI: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Sum Assured Acc"
                            type="text"
                            value={newDataInput.acc}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                acc: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Year Of Purchase"
                            type="text"
                            value={newDataInput.purchaseYear}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                purchaseYear: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Premium"
                            type="text"
                            value={newDataInput.premium}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                premium: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Premium Frequency"
                            type="text"
                            value={newDataInput.premiumFrequency}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                premiumFrequency: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Source Of Fund"
                            type="text"
                            value={newDataInput.sourceOfFund}
                            handleChange={(event) =>
                              setNewDataInput({
                                ...newDataInput,
                                sourceOfFund: Number(event.target.value),
                              })
                            }
                          />
                        </div>
                        {/* End Of Insurance */}
                        <div>
                          <Input
                            className="my-4"
                            label="Client"
                            type="text"
                            value={newDataInput2.client}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                client: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Insured"
                            type="text"
                            value={newDataInput2.insured}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                insured: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Insurer"
                            type="text"
                            value={newDataInput2.insurer}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                insurer: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Policy Type"
                            type="text"
                            value={newDataInput2.policyType}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                policyType: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Policy Term"
                            type="text"
                            value={newDataInput2.policyTerm}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                policyTerm: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Existing Hospitalization Plan (If Any)"
                            type="text"
                            value={newDataInput2.existingHosPlan}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                existingHosPlan: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Type Of Hospital Covered"
                            type="text"
                            value={newDataInput2.typeOfHosCovered}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                typeOfHosCovered: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Class Of Ward Covered"
                            type="text"
                            value={newDataInput2.classOfWardCovered}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                classOfWardCovered: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Year Of Purchase"
                            type="text"
                            value={newDataInput2.purchaseYear}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                purchaseYear: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Premium Cash"
                            type="text"
                            value={newDataInput2.premium}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                premium: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Premium Medisave"
                            type="text"
                            value={newDataInput2.medisave}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                medisave: Number(event.target.value),
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Frequency"
                            type="text"
                            value={newDataInput2.frequency}
                            handleChange={(event) =>
                              setNewDataInput2({
                                ...newDataInput2,
                                frequency: event.target.value,
                              })
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
    </SectionCardSingleGrid>
  );
};

export default InsurancePortofolio;
