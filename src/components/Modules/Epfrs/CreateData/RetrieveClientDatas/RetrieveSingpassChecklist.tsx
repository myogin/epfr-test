import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import Input from "@/components/Forms/Input";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import SingpassIcon from "../../../../../../public/singpasIcon.png";
import Image from "next/image";
import { SingpassData } from "@/models/SingpassData";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  handleParentModal: Function;
}

const singpassParam = {
  agent_uuid: "",
  epfr_uuid: "",
  client_uuid: "",
  applicant_type: "",
};

const RetrieveSingpassChecklist = (props: Props) => {
  const [showModalSecondary, setShowModalSecondary] = useState(false);

  const closeModal = () => {
    setShowModalSecondary(false);
  };

  const openModal = () => {
    setShowModalSecondary(true);
    props.handleParentModal(true);
  };

  const storeSingpassInfo = () => {
    
  };

  return (
    <div>
      <button onClick={openModal}>
        <h2>In person Session</h2>
        <span className="text-sm text-gray-light">
          This session for offline consultation.
        </span>
      </button>
      <Transition appear show={showModalSecondary} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="basis-1/2">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-bold leading-6 text-gray-light"
                        >
                          {`PLEASE CLICK "PROCEED" IF YOU AGREE WITH THE RETRIEVAL
                          OF THE FOLLOWING DATA FROM SINGPASS.`}
                        </Dialog.Title>
                      </div>
                      <div className="basis-1/2">
                        <Image src={SingpassIcon} alt="Singpass" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between gap-10">
                      <div>
                        <ul className="space-y-4 text-sm font-normal text-gray-light">
                          <li>NRIC/FIN</li>
                          <li>Name</li>
                          <li>Sex</li>
                          <li>Date of Birth</li>
                          <li>Race</li>
                          <li>Country/Place of Birth</li>
                          <li>Residential Status</li>
                          <li>Nationality/Citizenship</li>
                          <li>Mobile Number</li>
                          <li>Pass Type</li>
                          <li>Email</li>
                          <li>Employment Sector</li>
                          <li>Registered Address</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-4 text-sm font-normal text-gray-light">
                          <li>CPF Balances</li>
                          <li>Employer’s Name</li>
                          <li>Occupation</li>
                          <li>CPF Employers</li>
                          <li>Marital Status</li>
                          <li>Children Birth - Cert Number</li>
                          <li>Children Birth - Name</li>
                          <li>Children Birth - Sex</li>
                          <li>Children Birth - Date of Birth</li>
                          <li>Sponsored Children - NRIC/FIN</li>
                          <li>Sponsored Children - Name</li>
                          <li>Ownership Private Residency</li>
                          <li>Vehicles - Vehicle Type</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <div className="flex justify-start gap-2">
                      <ButtonGreenMedium onClick={storeSingpassInfo}>
                        Proceed
                      </ButtonGreenMedium>
                      <ButtonRedMedium onClick={closeModal}>
                        Cancel
                      </ButtonRedMedium>
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

export default RetrieveSingpassChecklist;
