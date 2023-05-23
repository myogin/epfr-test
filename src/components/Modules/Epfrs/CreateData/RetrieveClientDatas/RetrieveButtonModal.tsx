import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import Input from "@/components/Forms/Input";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import File3LineIcon from "remixicon-react/File3LineIcon";
import UserLocationFillIcon from "remixicon-react/UserLocationFillIcon";
import VideoChatLineIcon from "remixicon-react/VideoChatLineIcon";
import RetrieveSingpassChecklist from "./RetrieveSingpassChecklist";

const RetrieveButtonModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [remoteSession, setRemoteSession] = useState(false);
  const [inpersonSession, setInpersonSession] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleParentModal = (params: boolean) => {
    setInpersonSession(params);
    setRemoteSession(!params);
  };

  const chooseType = (type: any, condition: boolean) => {
    if (type == 1) {
      console.log("masuk type 1");
      setInpersonSession(condition);
      setRemoteSession(!condition);
    } else {
      console.log("masuk type 2");
      setRemoteSession(condition);
      setInpersonSession(!condition);
    }
  };

  return (
    <div>
      <ButtonRedMedium onClick={openModal}>Retrieve MyInfo</ButtonRedMedium>
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
                <Dialog.Panel className="w-full max-w-2xl p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="mb-10 text-xl font-medium leading-6 text-gray-light"
                  >
                    Please choose EPFR session method
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex justify-between gap-10">
                      <div className="p-10 border rounded-lg cursor-pointer border-gray-light hover:border-green-deep hover:bg-green-light">
                        <div className="w-full space-y-4 text-center">
                          <UserLocationFillIcon
                            className="inline text-green-deep"
                            size={30}
                          />
                          <RetrieveSingpassChecklist
                            handleParentModal={handleParentModal}
                          />
                        </div>
                      </div>
                      <div className="p-10 space-y-4 text-center border rounded-lg cursor-pointer border-gray-light hover:border-green-deep hover:bg-green-light">
                        <span className="mx-auto">
                          <VideoChatLineIcon
                            className="inline text-green-deep"
                            size={30}
                          />
                        </span>

                        <button onClick={() => chooseType(2, true)}>
                          <h2>Remote Session</h2>
                          <span className="text-sm text-gray-light">
                            This session for online consultation.
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {remoteSession ? (
                    <div className="mt-10">
                      <div className="flex flex-col justify-center">
                        <div className="w-full text-sm font-normal text-center text-gray-light">
                          We will send the Singpass Retrieve Data QR Code to
                          client’s email.
                        </div>
                        <div className="flex justify-between gap-4 mt-10">
                          <Input label="Email Address" type="email" />
                          <ButtonGreenMedium className="w-fit h-fit">
                            Send
                          </ButtonGreenMedium>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default RetrieveButtonModal;
