import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { getLength, usdFormat } from "@/libs/helper";
import { assetInterface } from "@/models/SectionFour";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import DeleteBin5FillIcon from "remixicon-react/DeleteBin5FillIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
interface Props {
  pfrType?: any;
}
const LiabilityBalance = (props: Props) => {
  // zustand
  const {
    others,
    addLiability,
    updateLiability,
    deleteLiability,
    totalCalc,
    initData,
  } = useBalanceSheet();
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
  const [saveType, setSaveType] = useState<any[]>([""]);

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
    setSaveType(["add", null]);
  };

  const openEditModal = (id: number) => {

    setAsset(others.liability[id]);
    setShowModal(true);
    setSaveType(["edit", id]);
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
  const saveButton = () => {
    saveType[0] === "add"
      ? addLiability(asset)
      : updateLiability(saveType[1], asset);
    closeModal();
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Loan</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Housing</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"asas"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.liabilities[index].housing)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Vehicle</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"asas"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.liabilities[index].vehicle)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Renovation</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"asas"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.liabilities[index].renovation)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Credit Card</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"asas"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.liabilities[index].creditCard)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Personal Loan</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"asas"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.liabilities[index].personalLoan)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Overdraft</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"asas"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.liabilities[index].overdraft)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="flex text-gray-light ">
            Other(s)
            <ButtonBox className="ml-2 text-green-deep" onClick={openModal}>
              <AddLineIcon size={14} />
            </ButtonBox>
          </TextSmall>
          {/* Open Modal */}
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
                        Add More Liabilities
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex justify-between gap-8">
                          <Input
                            className="my-4"
                            type="text"
                            placeholder="Liability"
                            name="key"
                            value={asset.key}
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
                              value={asset.otherValue[index]}
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
                            saveButton();
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
          {/* END Modal */}
        </div>
        <div>
          {others.liability.map((assetsData: any, index) => (
            <Fragment key={index}>
              <RowSingleJointGrid pfrType={props.pfrType}>
                <TextSmall className="flex justify-between text-gray-light">
                  {assetsData.key}
                  <div>
                    <ButtonBox
                      className="mr-1 text-green-deep"
                      onClick={() => openEditModal(index)}
                    >
                      <PencilLineIcon size={14} />
                    </ButtonBox>
                    <ButtonBox
                      className="text-red"
                      onClick={() => deleteLiability(index)}
                    >
                      <CloseLineIcon size={14} />
                    </ButtonBox>
                  </div>
                </TextSmall>
                <div className="text-right">
                  <TextSmall className="flex justify-end">
                    {usdFormat(assetsData.otherValue[0])}
                  </TextSmall>
                </div>
                {props.pfrType == 2 && (
                  <div className="text-right">
                    <TextSmall className="flex justify-end">
                      {usdFormat(assetsData.otherValue[1])}
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
            {getPfrLength.map((e, i) => (
              <Fragment key={i}>
                <div className="text-right">
                  <TextSmall className="text-green-deep">
                    {usdFormat(totalCalc?.liability[i])}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
    </SectionCardSingleGrid>
  );
};

export default LiabilityBalance;
