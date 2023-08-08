import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import SingpassIcon from "../../../../../../public/singpassSmall.png";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useLoginData } from "@/store/login/logindata";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { storeEnv } from "@/services/singpassService";

interface Props {
  clientType: number;
}

const RetrieveSingpassModal = (props: Props) => {
  const [showModalSecondary, setShowModalSecondary] = useState(false);
  let ownerId = useLoginData((state) => state.ownerId);
  let pfrType = usePersonalInformation((state) => state.type);
  let pfrId = usePersonalInformation((state) => state.id);

  const closeModal = () => {
    setShowModalSecondary(false);
  };

  const openModal = () => {
    console.log("check client type");
    console.log(props.clientType);
    setShowModalSecondary(true);
  };

  const storeSingpassInfo = async () => {
    let dataI = props.clientType + 1;

    const singpassParam = {
      agent_uuid: ownerId,
      epfr_uuid: pfrId === null || pfrId === undefined || pfrId === 0 ? uuidv4() : Number(pfrId),
      client_uuid: uuidv4(),
      applicant_type: dataI + "-" + pfrType,
    };

    let postEnv = await storeEnv(singpassParam);

    if (postEnv.success) {
      window.location.href = postEnv.url;
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <ButtonRedMedium onClick={openModal}>Retrieve MyInfo</ButtonRedMedium>
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
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-base font-bold leading-6 text-gray-light"
                        >
                          {`PLEASE CLICK "PROCEED" IF YOU AGREE WITH THE RETRIEVAL
                          OF THE FOLLOWING DATA FROM SINGPASS.`}
                        </Dialog.Title>
                      </div>
                      {/* <div className=" basis-1/2">
                        <div className="flex justify-end w-full">
                          <Image src={SingpassIcon} alt="Singpass" />
                        </div>
                      </div> */}
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

export default RetrieveSingpassModal;
