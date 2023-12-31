import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Input from "@/components/Forms/Input";
import React, { useState, Fragment, useEffect } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import DeleteBin5FillIcon from "remixicon-react/DeleteBin5FillIcon";
import { Transition, Dialog } from "@headlessui/react";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import { assetInterface } from "@/models/SectionFour";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { getLength, usdFormat } from "@/libs/helper";
import { log } from "console";

interface Props {
  pfrType?: any;
  dataS4?: any;
}
const AssetBalance = (props: Props) => {
  // zustand
  const { others, addAsset, updateAsset, deleteAsset, totalCalc, initData } =
    useBalanceSheet();

  const [showModal, setShowModal] = useState(false);
  const [asset, setAsset] = useState<assetInterface>({
    key: "",
    otherValue: [0, 0],
  });
  const [saveType, setSaveType] = useState<any[]>([""]);
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
      i === index
        ? newValue.push(parseInt(event.target.value))
        : newValue.push(e);
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
    setAsset(others.asset[id]);
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
    saveType[0] === "add" ? addAsset(asset) : updateAsset(saveType[1], asset);
    closeModal();
  };

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

            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sds"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].property.residence)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Investment </TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sd"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].property.investment)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
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
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sd"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].investments.bonds)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Unit Trust</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sd"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].investments.unitTrusts)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Stock & Shares </TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sds"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].investments.stockShares)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Other</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"dsd"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].investments.others)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
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
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sd"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(
                      initData.assets[index].savings.bankSavingAccount
                    )}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Fixed Deposit</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sds"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].savings.fixedDeposits)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
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
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"sds"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].cpf.ordinaryAccount)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Special Account</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"afs"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].cpf.specialAccount)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">Medisave</TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"afs"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].cpf.medisave)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div>
              <TextSmall className="text-gray-light">
                Retirement Account
              </TextSmall>
            </div>
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"afs"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].cpf.retirementAccount)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
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
            {getPfrLength.map((e: any, index: any) => (
              <Fragment key={"afs"+index}>
                <div className="text-right">
                  <TextSmall>
                    {usdFormat(initData.assets[index].srs.accountBalance)}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="flex text-gray-light">
            Other(s)
            <ButtonBox className="ml-2 text-green-deep" onClick={openModal}>
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
                            value={asset.key}
                            handleChange={handleKey}
                            needValidation={true}
                            logic={asset.key === "" ? false : true}
                          />
                          {getPfrLength.map((e: any, index: any) => (
                            <Input
                              key={index}
                              className="my-4"
                              type="number"
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
        </div>
        <div>
          {others.asset.map((assetsData: any, index) => (
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
                      onClick={() => deleteAsset(index)}
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
                    {usdFormat(totalCalc?.asset[i])}
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

export default AssetBalance;
