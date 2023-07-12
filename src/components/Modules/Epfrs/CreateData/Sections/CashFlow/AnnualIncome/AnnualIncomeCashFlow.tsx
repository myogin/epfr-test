import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBorder from "@/components/Forms/Buttons/ButtonBorder";
import ButtonBorderMedium from "@/components/Forms/Buttons/ButtonBorderMedium";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { checkCountData, getLength } from "@/libs/helper";
import { AnnualIncome, Datas } from "@/models/SectionThree";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

interface Props {
  data?: any;
  pfrType?: number;
}

const AnnualIncomeCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let getPfrLength = getLength(props.pfrType);

  let { data, setAnnualIncome, setAnnualSurplus } = useCashFlow();

  const [showModalOther, setShowModalOther] = useState(false);

  let [annualData, setAnnualData] = useState(0);
  let [monthlyData, setMonthlyData] = useState(0);

  let [annualWadgesData, setAnnualWadgesData] = useState(0);
  let [monthlyWadgesData, setMonthlyWadgesData] = useState(0);

  let [annualLessData, setAnnualLessData] = useState(0);
  let [monthlyLessData, setMonthlyLessData] = useState(0);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata } = event.target.dataset;

    switch (name) {
      case "annualGrossIncome":
        if (groupdata === "annualy") {
          setAnnualData(value);
          setMonthlyData(value / 12);

          setAnnualIncome(0, name, value);
        } else {
          setAnnualData(value * 12);
          setMonthlyData(value);

          setAnnualIncome(0, name, value * 12);
        }

        break;
      case "additionalWages":
        if (groupdata === "annualy") {
          setMonthlyWadgesData(value / 12);
          setAnnualWadgesData(value);

          setAnnualIncome(0, name, value);
        } else {
          setAnnualWadgesData(value * 12);
          setMonthlyWadgesData(value);

          setAnnualIncome(0, name, value * 12);
        }
        break;
      case "less":
        if (groupdata === "annualy") {
          setMonthlyLessData(value / 12);
          setAnnualLessData(value);

          setAnnualIncome(0, name, value);
        } else {
          setAnnualLessData(value * 12);
          setMonthlyLessData(value);

          setAnnualIncome(0, name, value * 12);
        }
        break;
      default:
        if (groupdata === "annualy") {
          setMonthlyData(value / 12);
          setAnnualData(value);
        } else {
          setAnnualData(value * 12);
          setMonthlyData(value);
        }
        setAnnualIncome(0, name, annualData);
        break;
    }
  };

  const addOther = () => {
    setShowModalOther(true);
  };

  const closeOther = () => {
    setShowModalOther(false);
  };

  const [other, setOther] = useState<any>(0);
  const [cpfContribution, setCpfContribution] = useState<any>(0);
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        }`}
      >
        <div
          className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}
        ></div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        } items-center`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}>
          <TextSmall className="text-gray-light">Annual Gross Income</TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <>
              <div>
                <Input
                  dataType="monthly"
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  name="annualGrossIncome"
                  value={
                    monthlyData > 0
                      ? monthlyData
                      : data[index]
                      ? data[index].annualIncome.annualGrossIncome / 12
                      : 0
                  }
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  dataType="annualy"
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  name="annualGrossIncome"
                  value={
                    annualData > 0
                      ? annualData
                      : data[index]
                      ? data[index].annualIncome.annualGrossIncome
                      : 0
                  }
                  handleChange={handleInputChange}
                />
              </div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        } items-center`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}>
          <TextSmall className="text-gray-light">Additional Wages</TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <>
              <div>
                <Input
                  dataType="monthly"
                  className="my-4"
                  type="text"
                  formStyle="text-right"
                  name="additionalWages"
                  value={
                    monthlyWadgesData > 0
                      ? monthlyWadgesData
                      : data[index]
                      ? data[index].annualIncome.additionalWages / 12
                      : 0
                  }
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  dataType="annualy"
                  className="my-4"
                  type="text"
                  formStyle="text-right"
                  name="additionalWages"
                  value={
                    annualWadgesData > 0
                      ? annualWadgesData
                      : data[index]
                      ? data[index].annualIncome.additionalWages
                      : 0
                  }
                  handleChange={handleInputChange}
                />
              </div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        }`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}>
          <div className="flex items-center justify-start">
            <TextSmall className="text-gray-light">Others</TextSmall>
            <ButtonBox className="text-green-deep" onClick={addOther}>
              <AddLineIcon size={14} />
            </ButtonBox>
          </div>
          <Transition appear show={showModalOther}>
            <Dialog as="div" className="relative z-10" onClose={closeOther}>
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
                        className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                      >
                        <div className={`${props.pfrType == 1 ? "2/4" : "basis-2/6"}`}>Other Annual Income</div>
                        {props.pfrType == 1 ? (
                          ""
                        ) : (
                          <>
                            {getPfrLength?.length &&
                              getPfrLength.map((d, index) => (
                                <>
                                  <div className={`text-sm ${props.pfrType == 1 ? "1/4" : "basis-1/6"} text-green-deep`}>
                                    Client {++index}
                                  </div>
                                  <div className={`${props.pfrType == 1 ? "1/4" : "basis-1/6"}`}></div>
                                </>
                              ))}
                          </>
                        )}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex justify-between gap-4">
                          <Input
                            label="Item"
                            className={`my-4 ${props.pfrType == 1 ? "2/4" : "basis-2/6"}`}
                            type="text"
                            placeholder="Add item here.."
                            name="key"
                          />
                          {getPfrLength?.length &&
                            getPfrLength.map((d, index) => (
                              <>
                                <Input
                                  label="Monthly"
                                  className={`my-4 ${props.pfrType == 1 ? "1/4" : "basis-1/6"}`}
                                  type="text"
                                  name="otherValue"
                                  placeholder="0"
                                  formStyle="text-left"
                                />
                                <Input
                                  label="Annual"
                                  className={`my-4 ${props.pfrType == 1 ? "1/4" : "basis-1/6"}`}
                                  type="text"
                                  name="otherValue"
                                  placeholder="0"
                                  formStyle="text-left"
                                />
                              </>
                            ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <ButtonGreenMedium>Save</ButtonGreenMedium>
                        <ButtonTransparentMedium onClick={closeOther}>
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

        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <>
              <div></div>
              <div></div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        }`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}>
          <TextSmall className="text-gray-light">
            Less Employee’s CPF Contribution
          </TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <>
              <div>
                <Input
                  dataType="monthly"
                  className="my-4"
                  type="text"
                  name="less"
                  formStyle="text-right"
                  value={
                    monthlyLessData > 0
                      ? monthlyLessData
                      : data[index]
                      ? data[index].annualIncome.less / 12
                      : 0
                  }
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  dataType="annualy"
                  className="my-4"
                  type="text"
                  name="less"
                  formStyle="text-right"
                  value={
                    annualLessData > 0
                      ? annualLessData
                      : data[index]
                      ? data[index].annualIncome.less
                      : 0
                  }
                  handleChange={handleInputChange}
                />
              </div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        }`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}>
          <TextSmall className="text-green-deep">ANNUAL NET INCOME</TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <>
              <div className="text-right">
                <span className="text-green-deep">0</span>
              </div>
              <div className="text-right">
                <span className="text-green-deep">0</span>
              </div>
            </>
          ))}
      </RowDinamycGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualIncomeCashFlow;
