import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Input from "@/components/Forms/Input";
import React, { useState, Fragment } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import DeleteBin5FillIcon from "remixicon-react/DeleteBin5FillIcon";
import { Transition, Dialog } from "@headlessui/react";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import { assetInterface } from "@/models/SectionFour";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { getLength } from "@/libs/helper";

interface Props {
  pfrType?: any;
  dataS4?: any;
}
const AssetBalance = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [asset, setAsset] = useState<assetInterface>({
    key: "",
    otherValue: [0, 0],
  });
  let getPfrLength = getLength(props.pfrType);

  const handleKey = (event: any) => {
    setAsset({
      ...asset,
      key: event.target.value,
    });
  };

  const handleValue = (event: any, index: any) => {
    let newValue: any = [];
    asset.otherValue?.map((e, i) => {
      i === index ? newValue.push(event.target.value) : newValue.push(e);
    });

    setAsset({
      ...asset,
      otherValue: newValue,
    });
  };

  const openModal = () => {
    setAsset({ key: "", otherValue: [0, 0] });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const disableButton = (data: any) => {
    if (
      data.key === "" ||
      data.key === "-" ||
      data.otherValue[0] === "" ||
      data.otherValue[0] === "-"
    ) {
      return true;
    } else {
      return false;
    }
  };
  // zustand
  const { others, addAsset, deleteAsset } = useBalanceSheet();

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Property</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Residence</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Investment</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Investment</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Bond</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Investment</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Unit Trust</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Other</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Savings</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Saving Account</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Fixed Deposit</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">CPF</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">
                Ordinary Account
              </TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Special Account</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Medisave</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">
                Retirement Account
              </TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">SRS</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Account Balance</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall>$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light flex justify-between">
            Other(s)
            <ButtonBox className="text-green-deep" onClick={openModal}>
              <AddLineIcon />
            </ButtonBox>
          </TextSmall>
          <Transition appear show={showModal}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
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
                        Add More Assets
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex justify-between gap-8">
                          <Input
                            className="my-4"
                            type="text"
                            placeholder="Asset"
                            name="key"
                            handleChange={handleKey}
                            needValidation={true}
                            logic={asset.key === "" ? false : true}
                          />
                          {getPfrLength.map((e: any, index: any) => (
                            <Input
                              key={index}
                              className="my-4"
                              type="text"
                              name="otherValue"
                              placeholder="Cost"
                              handleChange={(input) =>
                                handleValue(input, index)
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <ButtonGreenMedium
                          onClick={() => {
                            addAsset(asset);
                            closeModal();
                          }}
                          disabled={disableButton(asset)}
                        >
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
        <div>
          {others.asset.map((assetsData: any, index) => (
            <Fragment key={index}>
              <RowSingleJointGrid pfrType={props.pfrType}>
                <TextSmall className="text-gray-light flex justify-between">
                  {assetsData.key}
                  <div>
                    <ButtonBox className="text-green-deep mr-1">
                      <PencilLineIcon size={14} />
                    </ButtonBox>
                    <ButtonBox
                      className="text-red"
                      onClick={() => deleteAsset(index)}
                    >
                      <CloseLineIcon size={14} />
                    </ButtonBox>
                  </div>
                </TextSmall>
                <div className="text-right">
                  <TextSmall className="flex justify-end">
                    ${assetsData.otherValue[0]}
                  </TextSmall>
                </div>
                {props.pfrType == 2 && (
                  <div className="text-right">
                    <TextSmall className="flex justify-end">
                      ${assetsData.otherValue[1]}
                    </TextSmall>
                  </div>
                )}
              </RowSingleJointGrid>
            </Fragment>
          ))}
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-green-deep">TOTAL</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div></div>
            <div className="text-right">
              <TextSmall className="text-green-deep">$0.00</TextSmall>
            </div>
            {props.pfrType == 2 && (
              <div className="text-right">
                <TextSmall className="text-green-deep">$0.00</TextSmall>
              </div>
            )}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
    </SectionCardSingleGrid>
  );
};

export default AssetBalance;
