import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { checkCountData, getClientCustom } from "@/libs/helper";
import { SummaryOfSRS } from "@/models/SectionTwo";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

const SrsPortofolio = () => {
  const [showModal, setShowModal] = useState(false);
  const [saveType, setSaveType] = useState("");
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);

  let { summaryOfSRS, setSrs, patchSrs, removeSrs } = useExistingPortofolio();
  // get client state
  let { clientInfo } = usePersonalInformation();

  let checkIndex = checkCountData(summaryOfSRS);

  let initialState: SummaryOfSRS = {
    id: checkIndex,
    editting: true,
    client: "",
    amount: 0,
  };

  const [newData, setNewData] = useState(initialState);

  let clients: Array<any> = getClientCustom(clientInfo);

  const clientName = (params: any) => {
    let customName = "-";
    if (clients.length > 0) {
      customName = clients[Number(params)].name;
    }
    return customName;
  };

  let buttonSave = checkButtonActive(newData);

  const saveData = () => {
    let checkTotalData =
      summaryOfSRS?.length === 0 || summaryOfSRS[0].id === 0 ? 0 : 1;

    console.log(checkTotalData);

    if (saveType === "add") {
      setSrs(checkTotalData, newData);
    } else {
      patchSrs(newData);
    }

    setShowModal(false);
  };

  const openModal = () => {
    setSaveType("add");
    setNewData(initialState);
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    setSaveType("update");
    const detailData = summaryOfSRS.filter((obj) => obj.id === params);
    setNewData(detailData[0]);
    setShowModal(true);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
  };

  const removeDataAction = (params: any) => {
    removeSrs(params);
    setShowModalRemove(false);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add SRS
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex flex-col w-full">
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
                          label="Amount"
                          type="text"
                          value={newData.amount}
                          formStyle="text-right"
                          handleChange={(event) =>
                            setNewData({
                              ...newData,
                              amount: Number(event.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium onClick={() => saveData()}>
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

                    <div className="mt-4 space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-red hover:ring-red focus:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
                        onClick={() => removeDataAction(actionDatatId)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
      {summaryOfSRS[0].client !== "" ? (
        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
            <thead className="text-left bg-white-bone">
              <tr className="border-b border-gray-soft-strong">
                <th className="px-2 py-5">SN</th>
                <th className="px-2 py-5">Client</th>
                <th className="px-2 py-5">Amount</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody>
              {summaryOfSRS?.length &&
                summaryOfSRS.map((data, index) => (
                  <tr key={data.id}>
                    <td className="px-2 py-5">{++index}</td>
                    <td className="px-2 py-5">{clientName(data.client)}</td>
                    <td className="px-2 py-5">{data.amount}</td>
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
      ) : null}
    </SectionCardSingleGrid>
  );
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

export default SrsPortofolio;
