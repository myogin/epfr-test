import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { checkCountDataOther, getLength } from "@/libs/helper";
import { AnnualGeneral } from "@/models/SectionThree";
import { useAffordabilityTemp } from "@/store/epfrPage/createData/affordabilityTemp";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment, useEffect } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

interface Props {
  pfrType?: number;
}
const AnnualExpenseCashFlow = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);

  let setAnnualExpanse = useCashFlow((state) => state.setAnnualExpanse);
  let setOthers = useCashFlow((state) => state.setOthers);
  let patchOthers = useCashFlow((state) => state.patchOthers);
  let removeOthers = useCashFlow((state) => state.removeOthers);

  let need = useCashFlow((state) => state.need);
  let annualExpense = useCashFlow((state) => state.annualExpense);
  let others = useCashFlow((state) => state.others);

  let checkIndex = checkCountDataOther(others?.annualExpense);

  let initialState: AnnualGeneral = {
    id: checkIndex,
    editting: true,
    key: "",
    values: [0, 0],
  };

  const [showModalOther, setShowModalOther] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);
  const [saveType, setSaveType] = useState("");

  const [newData, setNewData] = useState(initialState);

  let [checkTotal, setCheckTotal] = useState([0, 0]);

  let setAffodability = useAffordabilityTemp((state) => state.setGlobal);

  let [annualDataOther, setAnnualDataOther] = useState([0, 0]);
  let [monthlyDataOther, setMonthlyDataOther] = useState([0, 0]);

  let [annualData, setAnnualData] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  let [monthlyData, setMonthlyData] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  const addOther = () => {
    setSaveType("add");
    initialState.values[0] = 0;
    initialState.values[1] = 0;
    setNewData(initialState);
    setAnnualDataOther([0, 0]);
    setMonthlyDataOther([0, 0]);
    setShowModalOther(true);
  };

  const closeOther = () => {
    setShowModalOther(false);
  };

  const editOther = (params: number) => {
    setSaveType("update");

    setAnnualDataOther([0, 0]);
    setMonthlyDataOther([0, 0]);

    const detailData = others?.annualExpense.filter((obj) => obj.id === params);

    initialState.id = detailData[0].id;
    initialState.key = detailData[0].key;
    initialState.values[0] = detailData[0].values[0];
    initialState.values[1] = detailData[0].values[1];
    setNewData(initialState);

    setShowModalOther(true);
  };

  const removeDataAction = (params: any) => {
    removeOthers("annualExpense", params);
    setShowModalRemove(false);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
  };

  const saveData = () => {
    console.log(newData);

    let checkTotalData =
      others?.annualExpense.length === 0 || others?.annualExpense[0].id === 0
        ? 0
        : 1;

    if (saveType === "add") {
      setOthers("annualExpense", checkTotalData, newData);
    } else {
      patchOthers("annualExpense", newData);
    }

    setShowModalOther(false);
  };

  const handleInputChangeOther = (event: any) => {
    const { name, value } = event.target;
    const { groupdata, indexdata } = event.target.dataset;

    if (groupdata === "annualy") {
      const newArray = [...annualDataOther];
      newArray[indexdata] = value;

      const newArrayMonthly = [...monthlyDataOther];
      newArrayMonthly[indexdata] = value / 12;

      setAnnualDataOther(newArray);
      setMonthlyDataOther(newArrayMonthly);

      const newArrayOri = [...newData.values];
      newArrayOri[indexdata] = value;

      setNewData((prevObj) => {
        const newValues = [...prevObj.values];
        newValues[indexdata] = value;
        return { ...prevObj, values: newValues };
      });
    } else {
      const newArray = [...monthlyDataOther];
      newArray[indexdata] = value;

      const newArrayAnnualy = [...annualDataOther];
      newArrayAnnualy[indexdata] = value * 12;

      setAnnualDataOther(newArrayAnnualy);
      setMonthlyDataOther(newArray);

      setNewData((prevObj) => {
        const newValues = [...prevObj.values];
        newValues[indexdata] = value * 12;
        return { ...prevObj, values: newValues };
      });
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const { groupdata, indexdata, indexclient } = event.target.dataset;

    if (groupdata === "annualy") {
      const newArray = [...annualData];
      newArray[indexdata][indexclient] = value;

      const newArrayMonthly = [...monthlyData];
      newArrayMonthly[indexdata][indexclient] = value / 12;

      setAnnualData(newArray);
      setMonthlyData(newArrayMonthly);

      setAnnualExpanse(name, indexdata, indexclient, value);
    } else {
      const newArray = [...monthlyData];
      newArray[indexdata][indexclient] = value;

      const newArrayAnnualy = [...annualData];
      newArrayAnnualy[indexdata][indexclient] = value * 12;

      setAnnualData(newArrayAnnualy);
      setMonthlyData(newArray);

      setAnnualExpanse(name, indexdata, indexclient, value * 12);
    }
  };

  // count total annual income
  useEffect(() => {
    if (annualExpense.length > 0) {
      let totalOther = [0, 0];
      let newArray: any[] = [];
      getPfrLength.map((dataA, index) => {
        if (others.annualExpense.length > 0) {
          others.annualExpense.map((dataB, indexA) => {
            totalOther[index] += Number(dataB.values[index]);
          });
        }

        if (annualExpense.length > 0) {
          annualExpense.map((dataB, indexA) => {
            totalOther[index] += Number(dataB.values[index]);
          });
        }

        // newArray = [...checkTotal];
        newArray[index] = totalOther[index];

        setAffodability("annualExpense", index, totalOther[index])
      });

      setCheckTotal(newArray);
    }
  }, [annualExpense, others.annualExpense]);

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
            <Fragment key={"dasda" + index}>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </Fragment>
          ))}
      </RowDinamycGrid>

      {annualExpense.map((data, indexOne) => (
        <RowDinamycGrid
          key={indexOne}
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
              <Fragment key={"dsa" + index}>
                {need ? (
                  need[index] ? (
                    <>
                      <div>
                        <Input
                          dataType="monthly"
                          className="my-4"
                          formStyle="text-right"
                          type="text"
                          indexData={indexOne}
                          indexClient={index}
                          name={data.key}
                          value={
                            monthlyData[indexOne][index] > 0
                              ? monthlyData[indexOne][index]
                              : data.values
                              ? data.values[index] / 12
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
                          indexData={indexOne}
                          indexClient={index}
                          name={data.key}
                          type="text"
                          value={
                            annualData[indexOne][index] > 0
                              ? annualData[indexOne][index]
                              : data.values
                              ? data.values[index]
                              : 0
                          }
                          handleChange={handleInputChange}
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
              </Fragment>
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
                                <Fragment key={"asas" + index}>
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
                                </Fragment>
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
                            value={newData.key}
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                key: event.target.value,
                              })
                            }
                          />
                          {getPfrLength?.length &&
                            getPfrLength.map((d, index) => (
                              <Fragment key={"asa" + index}>
                                {need ? (
                                  need[index] == 1 ? (
                                    <>
                                      <Input
                                        label="Monthly"
                                        dataType="monthly"
                                        indexData={index}
                                        className={`my-4 ${
                                          props.pfrType == 1
                                            ? "1/4"
                                            : "basis-1/6"
                                        }`}
                                        type="text"
                                        name="otherMonthlyValue"
                                        placeholder="0"
                                        formStyle="text-left"
                                        value={
                                          monthlyDataOther[index] > 0
                                            ? monthlyDataOther[index]
                                            : newData.values
                                            ? newData.values[index] / 12
                                            : 0
                                        }
                                        handleChange={handleInputChangeOther}
                                      />
                                      <Input
                                        label="Annual"
                                        dataType="annualy"
                                        indexData={index}
                                        className={`my-4 ${
                                          props.pfrType == 1
                                            ? "1/4"
                                            : "basis-1/6"
                                        }`}
                                        type="text"
                                        name="otherAnnualValue"
                                        placeholder="0"
                                        formStyle="text-left"
                                        value={
                                          annualDataOther[index] > 0
                                            ? annualDataOther[index]
                                            : newData.values
                                            ? newData.values[index]
                                            : 0
                                        }
                                        handleChange={handleInputChangeOther}
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
                              </Fragment>
                            ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <ButtonGreenMedium onClick={saveData}>
                          Save
                        </ButtonGreenMedium>
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
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-light">
                      {data.key}
                    </div>
                    {data.key !== "" ? (
                      <div className="space-x-2">
                        <ButtonBox
                          className="text-green-deep"
                          onClick={() => editOther(Number(data.id))}
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
                    <Fragment key={"adas" + indexB}>
                      <div className="text-sm text-right text-gray-light">
                        {data.values[indexB] ? data.values[indexB] / 12 : "0"}
                      </div>
                      <div className="text-sm text-right text-gray-light">
                        {data.values[indexB] ? data.values[indexB] : "0"}
                      </div>
                    </Fragment>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            {getPfrLength?.length &&
              getPfrLength.map((d, index) => (
                <Fragment key={"sasa" + index}>
                  <div className="text-sm text-right text-gray-light">0</div>
                  <div className="text-sm text-right text-gray-light">0</div>
                </Fragment>
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
            <Fragment key={"sasas" + index}>
              {need ? (
                need[index] ? (
                  <>
                    <div className="text-right">
                      <span className="text-green-deep">
                        {checkTotal[index] / 12}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-deep">
                        {checkTotal[index]}
                      </span>
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
            </Fragment>
          ))}
      </RowDinamycGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualExpenseCashFlow;
