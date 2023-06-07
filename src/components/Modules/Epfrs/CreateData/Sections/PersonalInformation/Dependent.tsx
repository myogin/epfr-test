import SubSectionCardDoubleGrid from "@/components/Attributes/Cards/SubSectionCardDoubleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

interface Props {
  datas?: Array<any>;
}

const Dependent = (props : Props) => {
  const [showModal, setShowModal] = useState(false);
  const [dependentData, setDependentData] = useState(props.datas);

  let localStorageSectionOne : any = [];
  let localStorageSectionOneNormal : any = [];

  // get if existing data from local storage
  if (typeof window !== "undefined") {
    localStorageSectionOne = localStorage.getItem("section1") ? localStorage.getItem("section1") : [];
    localStorageSectionOneNormal = JSON.parse(localStorageSectionOne);
  }

  console.log(props.datas);
  console.log("check local storage");
  console.log(localStorageSectionOneNormal);

  const setData = (params: any) => {
    console.log(params);
  };

  const saveData = () => {
    console.log("Save test");
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const openModalEdit = (params : any) => {
    console.log(params)
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeData = (params: any) => {};

  // Variable Select Box
  let relationships: Array<any> = [
    { id: "SON", name: "SON" },
    { id: "DAUGHTER", name: "DAUGHTER" },
    { id: "PARENT", name: "PARENT" },
    { id: "SPOUSE", name: "SPOUSE" },
  ];

  let genders: Array<any> = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
  ];
  return (
    <>
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
                      Add Dependent
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex">
                        <Input
                          className="my-4"
                          label="Name"
                          type="text"
                          placeholder="Dependent name"
                          handleChange={(event) => setData(event.target.value)}
                        />
                      </div>
                      <div className="flex justify-between gap-8">
                        <div>
                          <Select
                            className="my-4"
                            label="Relationship"
                            value=""
                            datas={relationships}
                            handleChange={(event) =>
                              changeData(eval(event.target.value))
                            }
                          />
                          <Input
                            className="my-4"
                            label="Date Of Birth"
                            type="text"
                            placeholder="1,000,000"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                          <Input
                            className="my-4"
                            label="Age"
                            type="text"
                            placeholder="1,000,000"
                            handleChange={(event) =>
                              setData(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Select
                            className="my-4"
                            label="Sex"
                            value=""
                            datas={genders}
                            handleChange={(event) =>
                              changeData(eval(event.target.value))
                            }
                          />
                          <Input
                            className="my-4"
                            label="Years To Support"
                            type="text"
                            placeholder="Residence"
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
              <th className="px-2 py-5">Name</th>
              <th className="px-2 py-5">Relationship</th>
              <th className="px-2 py-5">Date Of Birth</th>
              <th className="px-2 py-5">Age</th>
              <th className="px-2 py-5">Sex</th>
              <th className="px-2 py-5">Years to Support</th>
              <th className="px-2 py-5"></th>
            </tr>
          </thead>
          <tbody>
            {dependentData?.length && dependentData.map((data, index) => (
              <tr key={"dependent-"+index}>
              <td className="px-2 py-5">{++index}</td>
              <td className="px-2 py-5">{data.name}</td>
              <td className="px-2 py-5">{data.relationship}</td>
              <td className="px-2 py-5">{data.dateOfBirth}</td>
              <td className="px-2 py-5">{data.age}</td>
              <td className="px-2 py-5">{data.gender}</td>
              <td className="px-2 py-5">{data.year}</td>
              <td className="w-1/12 px-2 py-5">
                <div className="flex w-full gap-2">
                  <ButtonBox onClick={() => openModalEdit(data.id)} className="text-green-deep">
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
    </>
  );
};

export default Dependent;
