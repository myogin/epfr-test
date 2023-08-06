import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import File3FillIcon from "remixicon-react/File3FillIcon";
import File3LineIcon from "remixicon-react/File3LineIcon";

const PfrButtonModal = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button
        className="flex px-5 py-3 text-white rounded-md bg-green-deep max-w-fit"
        onClick={openModal}
      >
        New EPFR <AddLineIcon />
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
                  <Dialog.Panel className="w-full max-w-2xl p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="mb-10 text-xl font-medium leading-6 text-gray-light"
                    >
                      Please choose EPFR type
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between gap-10">
                      <div className="p-10 text-center border rounded-lg cursor-pointer border-gray-light hover:border-green-deep hover:bg-green-light">
                      <Link href="/create/single">
                        <button>
                          <File3FillIcon className="text-green-deep" size={30} />
                        </button>
                        <h2>Single EPFR Document</h2>
                        <span className="text-sm text-gray-light">This EPFR for one person</span>
                      </Link>
                    </div>
                    <div className="p-10 text-center border rounded-lg cursor-pointer border-gray-light hover:border-green-deep hover:bg-green-light">
                      <Link href="/create/join">
                        <button>
                          <File3FillIcon className="text-green-deep" size={30} />
                        </button>
                        <h2>Joint EPFR Document</h2>
                        <span className="text-sm text-gray-light">This EPFR for two persons</span>
                      </Link>
                    </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    </div>
  );
};

export default PfrButtonModal;
