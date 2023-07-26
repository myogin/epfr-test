import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { getLength } from "@/libs/helper";
import { AnnualExpanse } from "@/models/SectionThree";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

interface Props {
  pfrType?: number;
}
const AnnualExpenseCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  const [showModalOther, setShowModalOther] = useState(false);

  let getPfrLength = getLength(props.pfrType);

  let { need, annualExpense } = useCashFlow();

  const addOther = () => {
    setShowModalOther(true);
  };

  const closeOther = () => {
    setShowModalOther(false);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div
          className={`col-span-3`}
        ></div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </>
          ))}
      </RowDinamycGrid>

      {annualExpense.map((data, index) => (
        <RowDinamycGrid
          key={index}
          className={`${
            props.pfrType == 1
              ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
              : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
          }`}
        >
          <div
            className={`col-span-3`}
          >
            <TextSmall className="text-gray-light">{data.title}</TextSmall>
          </div>
          {getPfrLength?.length &&
            getPfrLength.map((dataTwo, index) => (
              <>
                {need ? (
                  need[index] ? (
                    <>
                      <div>
                        <Input
                          className="my-4"
                          formStyle="text-right"
                          type="text"
                          value={data.values[index]}
                          handleChange={(event) => setData(event.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          className="my-4"
                          formStyle="text-right"
                          type="text"
                          value={data.values[index]}
                          handleChange={(event) => setData(event.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-right">0</div>
                      <div className="text-right">0</div>
                    </>
                  )
                ) : (
                  <>
                    <div className="text-right">0</div>
                    <div className="text-right">0</div>
                  </>
                )}
              </>
            ))}
        </RowDinamycGrid>
      ))}

      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div className={`col-span-3`}>
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
                        <div
                          className={`${
                            props.pfrType == 1 ? "2/4" : "basis-2/6"
                          }`}
                        >
                          Other Annual Expense
                        </div>
                        {props.pfrType == 1 ? (
                          ""
                        ) : (
                          <>
                            {getPfrLength?.length &&
                              getPfrLength.map((d, index) => (
                                <>
                                  <div
                                    className={`text-sm ${
                                      props.pfrType == 1 ? "1/4" : "basis-1/6"
                                    } text-green-deep`}
                                  >
                                    Client {++index}
                                  </div>
                                  <div
                                    className={`${
                                      props.pfrType == 1 ? "1/4" : "basis-1/6"
                                    }`}
                                  ></div>
                                </>
                              ))}
                          </>
                        )}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex justify-between gap-8">
                          <Input
                            label="Item"
                            className={`my-4 ${
                              props.pfrType == 1 ? "2/4" : "basis-2/6"
                            }`}
                            type="text"
                            placeholder="Add item here.."
                            name="key"
                          />
                          {getPfrLength?.length &&
                            getPfrLength.map((d, index) => (
                              <>
                                <Input
                                  label="Monthly"
                                  className={`my-4 ${
                                    props.pfrType == 1 ? "1/4" : "basis-1/6"
                                  }`}
                                  type="text"
                                  name="otherValue"
                                  placeholder="0"
                                />
                                <Input
                                  label="Annual"
                                  className={`my-4 ${
                                    props.pfrType == 1 ? "1/4" : "basis-1/6"
                                  }`}
                                  type="text"
                                  name="otherValue"
                                  placeholder="0"
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
          getPfrLength.map((data, index) => (
            <>
              <div className="text-right">0</div>
              <div className="text-right">0</div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div className={`col-span-3`}>
          <TextSmall className="text-green-deep">ANNUAL NET EXPENSE</TextSmall>
        </div>

        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              {need ? (
                need[index] ? (
                  <>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="text-right">
                    <span className="text-green-deep">0</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-deep">0</span>
                  </div>
                </>
              )}
            </>
          ))}
      </RowDinamycGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualExpenseCashFlow;
