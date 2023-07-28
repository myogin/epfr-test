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
import React, { useState, Fragment } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

interface Props {
  pfrType?: number;
}
const AnnualExpenseCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  const [showModalOther, setShowModalOther] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);

  let getPfrLength = getLength(props.pfrType);

  let { need, annualExpense, others } = useCashFlow();

  const addOther = () => {
    setShowModalOther(true);
  };

  const closeOther = () => {
    setShowModalOther(false);
  };

  const editOther = (params: string) => {
    setShowModalOther(true);
  };

  const removeDataAction = (params: any) => {
    // removeDependent(params);
    setShowModalRemove(false);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
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
        <div className={`col-span-3`}></div>
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
          <div className={`col-span-3`}>
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
                      <div className="text-sm text-right text-gray-light">
                        0
                      </div>
                      <div className="text-sm text-right text-gray-light">
                        0
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <div className="text-sm text-right text-gray-light">0</div>
                    <div className="text-sm text-right text-gray-light">0</div>
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
        <div className={`${props.pfrType == 1 ? "col-span-2" : ""}`}>
          <div className="flex items-center gap-4">
            <h3 className="px-0 py-2 text-sm font-bold text-gray-light">
              Other(s)
            </h3>
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
                                {need ? (
                                  need[index] == 1 ? (
                                    <>
                                      <Input
                                        label="Monthly"
                                        className={`my-4 ${
                                          props.pfrType == 1
                                            ? "1/4"
                                            : "basis-1/6"
                                        }`}
                                        type="text"
                                        name="otherValue"
                                        placeholder="0"
                                        formStyle="text-left"
                                      />
                                      <Input
                                        label="Annual"
                                        className={`my-4 ${
                                          props.pfrType == 1
                                            ? "1/4"
                                            : "basis-1/6"
                                        }`}
                                        type="text"
                                        name="otherValue"
                                        placeholder="0"
                                        formStyle="text-left"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`my-4 space-y-3 text-right ${
                                          props.pfrType == 1
                                            ? "1/4"
                                            : "basis-1/6"
                                        }`}
                                      >
                                        <div className="w-full text-sm font-bold text-left text-gray-light">
                                          Monthly
                                        </div>
                                        <div className="py-2 text-sm text-left text-gray-light">
                                          0
                                        </div>
                                      </div>
                                      <div
                                        className={`my-4 space-y-3 text-right ${
                                          props.pfrType == 1
                                            ? "1/4"
                                            : "basis-1/6"
                                        }`}
                                      >
                                        <div className="w-full text-sm font-bold text-left text-gray-light">
                                          Annual
                                        </div>
                                        <div className="py-2 text-sm text-left text-gray-light">
                                          0
                                        </div>
                                      </div>
                                    </>
                                  )
                                ) : (
                                  <>
                                    <div className="text-right">-</div>
                                    <div className="text-right">-</div>
                                  </>
                                )}
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

          {/* Modal Delete */}
          <Transition appear show={showModalRemove} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowModalRemove(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Remove Data
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure to remove this data.?
                        </p>
                      </div>

                      <div className="mt-4 space-x-2">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium border rounded-md text-red border-red"
                          onClick={() => removeDataAction(actionDatatId)}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium border rounded-md text-gray-light border-gray-light"
                          onClick={() => setShowModalRemove(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>

        {others?.annualExpense.length ? (
          <div
            className={`${props.pfrType == 1 ? "col-span-3" : "col-span-6"}`}
          >
            {others.annualExpense.map((data, index) => (
              <div
                className={`${
                  props.pfrType == 1 ? "grid-cols-3" : "grid-cols-6"
                } grid gap-8 space-y-4`}
                key={"annualExpense-" + index}
              >
                <div className={`${props.pfrType == 1 ? "" : "col-span-2"}`}>
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-gray-light">{data.key}</div>
                    {data.key !== "" ? (
                      <div className="space-x-2">
                        <ButtonBox
                          className="text-green-deep"
                          onClick={() => editOther(data.key)}
                        >
                          <PencilLineIcon size={14} />
                        </ButtonBox>
                        <ButtonBox
                          className="text-red"
                          onClick={() => modalRemoveData(data.id)}
                        >
                          <CloseLineIcon size={14} />
                        </ButtonBox>
                      </div>
                    ) : null}
                  </div>
                </div>
                {getPfrLength?.length &&
                  getPfrLength.map((d, indexB) => (
                    <>
                      <div className="text-sm text-right text-gray-light">
                        {data.values[indexB] ? data.values[indexB] : "0"}
                      </div>
                      <div className="text-sm text-right text-gray-light">
                        {data.values[indexB] ? data.values[indexB] : "0"}
                      </div>
                    </>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            {getPfrLength?.length &&
              getPfrLength.map((d, index) => (
                <>
                  <div className="text-sm text-right text-gray-light">0</div>
                  <div className="text-sm text-right text-gray-light">0</div>
                </>
              ))}
          </>
        )}
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
