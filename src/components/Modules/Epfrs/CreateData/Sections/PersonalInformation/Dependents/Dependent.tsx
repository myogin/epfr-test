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
import "react-datepicker/dist/react-datepicker.css";
import { DependantInformation } from "@/models/SectionOne";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import moment from "moment";

interface Props {
  datas?: Array<any>;
}

const Dependent = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDependentId, setActionDependentId] = useState(0);

  // Get data from zustand state
  let { dependant, setDependent, removeDependent } = usePersonalInformation();

  let checkIndex =
    dependant[0].name === "" ? dependant.length : dependant.length + 1;

  console.log("Apa sih ini " + checkIndex);
  // Initiate new local state for new data
  let initialState: DependantInformation = {
    id: checkIndex,
    name: "",
    relationship: "",
    dateOfBirth: "",
    age: 0,
    gender: "",
    year: "",
  };

  // inject initial state to useState
  const [newDependent, setNewDependent] = useState(initialState);

  // Variable Select Box
  let relationships: Array<any> = [
    { id: "SON", name: "SON" },
    { id: "DAUGHTER", name: "DAUGHTER" },
    { id: "PARENT", name: "PARENT" },
    { id: "SPOUSE", name: "SPOUSE" },
  ];

  let genders: Array<any> = [
    { id: "1", name: "MALE" },
    { id: "2", name: "FEMALE" },
  ];

  const genderStatus = (params: any) => {
    switch (params) {
      case "1":
        return "MALE";
      case "2":
        return "FEMALE";
      default:
        return "MALE";
    }
  };

  const checkRelationship = (params: any) => {
    switch (params) {
      case "SON":
        setNewDependent({
          ...newDependent,
          gender: "1",
          relationship: params,
        });
        break;
      case "DAUGHTER":
        setNewDependent({
          ...newDependent,
          gender: "2",
          relationship: params,
        });
        break;
      default:
        setNewDependent({
          ...newDependent,
          gender: "1",
          relationship: params,
        });
        break;
    }
  };

  const checkBirthDate = (params: any) => {
    let currentDate = new Date();
    let dependentBirthDate = new Date(params);

    if (!isNaN(dependentBirthDate.getTime())) {
      const yearsDiff =
        currentDate.getFullYear() - dependentBirthDate.getFullYear();
      const monthsDiff = currentDate.getMonth() - dependentBirthDate.getMonth();

      let calculatedAge = yearsDiff;

      if (
        monthsDiff < 0 ||
        (monthsDiff === 0 &&
          currentDate.getDate() < dependentBirthDate.getDate())
      ) {
        calculatedAge--;
      }

      setNewDependent({
        ...newDependent,
        age: calculatedAge,
        dateOfBirth: params,
      });
    }
  };

  const saveData = (event: any) => {
    console.log("Masuk Save");

    let checkTotalData = dependant[0].id === 0 ? 0 : 1;

    setDependent(checkTotalData, newDependent);
    setShowModal(false);
  };

  const openModal = () => {
    setNewDependent(initialState);
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    const detailDependent = dependant.filter((obj) => obj.id === params);
    setNewDependent(detailDependent[0]);
    setShowModal(true);
  };

  const modalRemoveDependent = (params: any) => {
    setShowModalRemove(true);
    setActionDependentId(params);
  };

  const removeDependentAction = (params: any) => {
    removeDependent(params);
    setShowModalRemove(false);
  };

  return (
    <>
      <div className="w-full">
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
                      Add Dependent
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex">
                        <Input
                          className="my-4"
                          label="Name"
                          name="nameDependent"
                          type="text"
                          value={newDependent.name}
                          placeholder="Dependent name"
                          handleChange={(event) =>
                            setNewDependent({
                              ...newDependent,
                              name: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex justify-between gap-8">
                        <div>
                          <Select
                            className="my-4"
                            label="Relationship"
                            name="relationship"
                            datas={relationships}
                            value={newDependent.relationship}
                            handleChange={(event) =>
                              checkRelationship(event.target.value)
                            }
                          />
                          {/* <DatePicker className="w-full px-0 py-2 my-4 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong" selected={newDependent.dateOfBirth} onChange={(date) => checkBirthDate(date)} /> */}
                          <Input
                            className="my-4"
                            label="Date Of Birth"
                            type="date"
                            name="dateOfBirth"
                            value={newDependent.dateOfBirth}
                            handleChange={(event) =>
                              checkBirthDate(event.target.value)
                            }
                          />
                          <Input
                            readonly
                            className="my-4"
                            label="Age"
                            type="number"
                            name="age"
                            value={newDependent.age}
                          />
                        </div>
                        <div>
                          <Select
                            className="my-4"
                            label="Sex"
                            name="gender"
                            value={newDependent.gender}
                            datas={genders}
                            handleChange={(event) =>
                              setNewDependent({
                                ...newDependent,
                                gender: event.target.value,
                              })
                            }
                          />
                          <Input
                            className="my-4"
                            label="Years To Support"
                            type="number"
                            name="year"
                            value={newDependent.year}
                            placeholder="Years To Support"
                            handleChange={(event) =>
                              setNewDependent({
                                ...newDependent,
                                year: event.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium onClick={saveData}>
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
                      Remove Dependent
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
                        onClick={() => removeDependentAction(actionDependentId)}
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
      {dependant[0].name !== "" ? (
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
              {dependant?.length &&
                dependant.map((data, index) => (
                  <tr key={"dependent-" + index}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{data.name}</td>
                    <td className="px-2 py-5">{data.relationship}</td>
                    <td className="px-2 py-5">{data.dateOfBirth}</td>
                    <td className="px-2 py-5">{data.age}</td>
                    <td className="px-2 py-5">{genderStatus(data.gender)}</td>
                    <td className="px-2 py-5">{data.year}</td>
                    <td className="w-1/12 px-2 py-5">
                      <div className="flex w-full gap-2">
                        <ButtonBox
                          onClick={() => openModalEdit(data.id)}
                          className="text-green-deep"
                        >
                          <PencilLineIcon size={14} />
                        </ButtonBox>
                        <ButtonBox
                          className="text-red"
                          onClick={() => modalRemoveDependent(data.id)}
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
    </>
  );
};

export default Dependent;
