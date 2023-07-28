import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
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

interface Props {
  updateassets: (assets: assetInterface) => void;
  assetDatas: any[];
  deleteAssets: (index: number) => void;
}
const AssetBalance = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [asset, setAsset] = useState<assetInterface>({
    key: "",
    otherValue: [],
  });

  const handleKey = (event: any) => {
    setAsset({
      ...asset,
      key: event.target.value,
    });
  };

  const handleValue = (event: any) => {
    let value = [];
    value.push(event.target.value);
    setAsset({
      ...asset,
      otherValue: value,
    });
  };

  const openModal = () => {
    setAsset({ key: "", otherValue: [] });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addAsset = () => {
    props.updateassets(asset);
    closeModal();
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Property</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Residence</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Investment</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Investment</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Bond</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Investment</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Unit Trust</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Other</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Savings</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Saving Account</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Fixed Deposit</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">CPF</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
                Ordinary Account
              </TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Special Account</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Medisave</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
                Retirement Account
              </TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">SRS</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Account Balance</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="flex justify-between text-gray-light">
            Other(s)
            <ButtonBox className="text-green-deep" onClick={openModal}>
              <AddLineIcon size={14} />
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
                          />
                          <Input
                            className="my-4"
                            type="text"
                            name="otherValue"
                            placeholder="Cost"
                            handleChange={handleValue}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <ButtonGreenMedium onClick={addAsset}>
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
          {props.assetDatas.map((assetsData: any, index) => (
            <Fragment key={index}>
              <RowDoubleGrid>
                <TextSmall className="text-gray-light">
                  {assetsData.key}
                </TextSmall>
                <div className="text-right">
                  <TextSmall className="flex justify-end">
                    {assetsData.otherValue[0]}
                    <button onClick={() => props.deleteAssets(index)}>
                      <DeleteBin5FillIcon />
                    </button>
                  </TextSmall>
                </div>
              </RowDoubleGrid>
            </Fragment>
          ))}
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-green-deep">TOTAL</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div></div>
            <div className="text-right">
              <TextSmall className="text-green-deep">$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
    </SectionCardSingleGrid>
  );
};

export default AssetBalance;
