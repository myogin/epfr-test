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
import { answerYesNo, checkCountDataDependent } from "@/libs/helper";

interface Props {
  datas?: Array<any>;
}

const Dependent = (props: Props) => {
  // Get data from zustand state
  let { dependant, setDependent, removeDependent, patchDependent } =
    usePersonalInformation();

  let checkIndex = checkCountDataDependent(dependant);
  // Initiate new local state for new data
  let initialState: DependantInformation = {
    id: checkIndex,
    name: "",
    relationship: "",
    dateOfBirth: "",
    age: 0,
    gender: "",
    year: "",
    certNumber: "",
    sponsored: "",
    nric: "",
    clientPfr: "",
    client: 0,
    depId: 0,
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);
  const [actionDatatIndex, setActionDataIndex] = useState(0);
  const [saveType, setSaveType] = useState("");

  const [checkCertNumber, setCheckCertNumber] = useState(false);
  const [checkNric, setCheckNric] = useState(false);

  // inject initial state to useState
  const [newData, setNewData] = useState(initialState);

  let buttonSave = checkButtonActive(newData);

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

  let sponsors: Array<any> = [
    { id: "1", name: "Yes" },
    { id: "2", name: "No" },
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
        setNewData({
          ...newData,
          gender: "1",
          relationship: params,
        });
        setCheckCertNumber(true);
        break;
      case "DAUGHTER":
        setNewData({
          ...newData,
          gender: "2",
          relationship: params,
        });
        setCheckCertNumber(true);
        break;
      default:
        setNewData({
          ...newData,
          gender: "1",
          relationship: params,
        });
        setCheckCertNumber(false);
        break;
    }
  };

  const checkSponsoredChild = (params: any) => {
    switch (params) {
      case "1":
        setNewData({
          ...newData,
          sponsored: params,
        });
        setCheckNric(true);
        break;
      case "2":
        setNewData({
          ...newData,
          sponsored: params,
        });
        setCheckNric(false);
        break;
      default:
        setNewData({
          ...newData,
          sponsored: params,
        });
        setCheckNric(false);
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

      setNewData({
        ...newData,
        age: calculatedAge,
        dateOfBirth: params,
      });
    }
  };

  const openModal = () => {
    setSaveType("add");
    setNewData(initialState);
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    setSaveType("update");
    const detailData = dependant.filter((obj) => obj.id === params);
    setNewData(detailData[0]);
    setShowModal(true);
  };

  const saveData = () => {
    let checkTotalData =
      dependant?.length === 0 || dependant[0].id === 0 ? 0 : 1;

    if (saveType === "add") {
      setDependent(checkTotalData, newData);
    } else {
      patchDependent(newData);
    }

    setShowModal(false);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
  };

  const removeDataAction = (params: any) => {
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
                          value={newData.name}
                          placeholder="Dependent name"
                          handleChange={(event) =>
                            setNewData({
                              ...newData,
                              name: event.target.value,
                            })
                          }
                          needValidation={true}
                          logic={
                            newData.name === "" || newData.name === "-"
                              ? false
                              : true
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
                            value={newData.relationship}
                            handleChange={(event) =>
                              checkRelationship(event.target.value)
                            }
                            needValidation={true}
                            logic={
                              newData.relationship === "" ||
                              newData.relationship === "-"
                                ? false
                                : true
                            }
                          />
                          {/* <DatePicker className="w-full px-0 py-2 my-4 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong" selected={newData.dateOfBirth} onChange={(date) => checkBirthDate(date)} /> */}
                          <Input
                            className="my-4"
                            label="Date Of Birth"
                            type="date"
                            name="dateOfBirth"
                            value={newData.dateOfBirth}
                            handleChange={(event) =>
                              checkBirthDate(event.target.value)
                            }
                            needValidation={true}
                            logic={
                              newData.dateOfBirth === "" ||
                              newData.dateOfBirth === "-"
                                ? false
                                : true
                            }
                          />
                          {checkCertNumber ? (
                            <Input
                              className="my-4"
                              label="Birth Cert Number"
                              type="text"
                              name="certNumber"
                              value={newData.certNumber}
                              placeholder="Please input cert number"
                              handleChange={(event) =>
                                setNewData({
                                  ...newData,
                                  certNumber: event.target.value,
                                })
                              }
                            />
                          ) : (
                            ""
                          )}

                          <Input
                            className="my-4"
                            label="Years To Support"
                            type="number"
                            name="year"
                            value={newData.year}
                            placeholder="Years To Support"
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                year: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Select
                            className="my-4"
                            label="Sex"
                            name="gender"
                            value={newData.gender}
                            datas={genders}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                gender: event.target.value,
                              })
                            }
                            needValidation={true}
                            logic={
                              newData.gender === "" || newData.gender === "-"
                                ? false
                                : true
                            }
                          />
                          <Input
                            readonly
                            className="my-4"
                            label="Age"
                            type="number"
                            name="age"
                            value={newData.age}
                          />
                          <Select
                            className="my-4"
                            label="Sponsored Child"
                            name="sponsored"
                            value={newData.sponsored}
                            datas={sponsors}
                            handleChange={(event) =>
                              checkSponsoredChild(event.target.value)
                            }
                            needValidation={true}
                            logic={
                              newData.sponsored === "" ||
                              newData.sponsored === "-"
                                ? false
                                : true
                            }
                          />
                          {checkNric ? (
                            <Input
                              className="my-4"
                              label="NRIC / FIN"
                              type="number"
                              name="nric"
                              value={newData.nric}
                              placeholder="Input NRIC here"
                              handleChange={(event) =>
                                setNewData({
                                  ...newData,
                                  nric: event.target.value,
                                })
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium
                        disabled={buttonSave}
                        onClick={saveData}
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

                    <div className="mt-4 space-x-2">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border rounded-md text-red border-red"
                        onClick={() => removeDataAction(actionDatatId)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border rounded-md text-gray-light border-gray-light"
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
      {dependant?.length && dependant[0].name !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Name</th>
                <th className="px-2 py-5">Relationship</th>
                <th className="px-2 py-5">Date Of Birth</th>
                <th className="px-2 py-5">Age</th>
                <th className="px-2 py-5">Birth Cert Number</th>
                <th className="px-2 py-5">Sex</th>
                <th className="px-2 py-5">Years to Support</th>
                <th className="px-2 py-5">Sponsored Child</th>
                <th className="px-2 py-5">NRIC / FIN</th>
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
                    <td className="px-2 py-5">{data.certNumber}</td>
                    <td className="px-2 py-5">{genderStatus(data.gender)}</td>
                    <td className="px-2 py-5">{data.year}</td>
                    <td className="px-2 py-5">{answerYesNo(data.sponsored)}</td>
                    <td className="px-2 py-5">{data.nric}</td>
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
    </>
  );
};

const checkButtonActive = (newData: any) => {
  let button: boolean = false;
  if (
    newData.name === "" ||
    newData.relationship === "" ||
    newData.relationship === "-" ||
    newData.dateOfBirth === "" ||
    newData.gender === "" ||
    newData.gender === "-"
  ) {
    button = true;
  } else {
    button = false;
  }

  return button;
};

export default Dependent;
