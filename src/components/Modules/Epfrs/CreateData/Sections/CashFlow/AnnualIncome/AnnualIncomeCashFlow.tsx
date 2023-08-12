import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import { checkCountDataOther, getLength } from "@/libs/helper";
import { AnnualGeneral, AnnualIncome, Datas } from "@/models/SectionThree";
import { useAffordabilityTemp } from "@/store/epfrPage/createData/affordabilityTemp";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";

interface Props {
  data?: any;
  pfrType?: number;
}

const AnnualIncomeCashFlow = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);

  let setAnnualIncome = useCashFlow((state) => state.setAnnualIncome);
  let setOthers = useCashFlow((state) => state.setOthers);
  let patchOthers = useCashFlow((state) => state.patchOthers);
  let removeOthers = useCashFlow((state) => state.removeOthers);

  let setAffodability = useAffordabilityTemp((state) => state.setGlobal);

  let need = useCashFlow((state) => state.need);
  let data = useCashFlow((state) => state.data);
  let others = useCashFlow((state) => state.others);

  let checkIndex = checkCountDataOther(others?.annualIncome);

  let initialState: AnnualGeneral = {
    id: checkIndex,
    editting: true,
    key: "",
    values: [0, 0, 0, 0],
  };

  const [showModalOther, setShowModalOther] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [actionDatatId, setActionDataId] = useState(0);
  const [saveType, setSaveType] = useState("");

  // inject initial state to useState
  const [newData, setNewData] = useState(initialState);

  let [annualData, setAnnualData] = useState([0, 0]);
  let [monthlyData, setMonthlyData] = useState([0, 0]);

  let [checkTotal, setCheckTotal] = useState([0, 0]);

  let [annualDataOther, setAnnualDataOther] = useState([0, 0]);
  let [monthlyDataOther, setMonthlyDataOther] = useState([0, 0]);

  let [annualWadgesData, setAnnualWadgesData] = useState([0, 0]);
  let [monthlyWadgesData, setMonthlyWadgesData] = useState([0, 0]);

  let [annualLessData, setAnnualLessData] = useState([0, 0]);
  let [monthlyLessData, setMonthlyLessData] = useState([0, 0]);

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
    const { groupdata, indexdata } = event.target.dataset;

    switch (name) {
      case "annualGrossIncome":
        if (groupdata === "annualy") {
          const newArray = [...annualData];
          newArray[indexdata] = value;

          const newArrayMonthly = [...monthlyData];
          newArrayMonthly[indexdata] = value / 12;

          setAnnualData(newArray);
          setMonthlyData(newArrayMonthly);

          setAnnualIncome(indexdata, name, value);
        } else {
          const newArray = [...monthlyData];
          newArray[indexdata] = value;

          const newArrayAnnualy = [...annualData];
          newArrayAnnualy[indexdata] = value * 12;

          setAnnualData(newArrayAnnualy);
          setMonthlyData(newArray);

          setAnnualIncome(indexdata, name, value * 12);
        }

        break;
      case "additionalWages":
        if (groupdata === "annualy") {
          console.log(
            "additional wedges annual masulk " +
              indexdata +
              " " +
              name +
              " " +
              value
          );

          const newArray = [...annualWadgesData];
          newArray[indexdata] = value;

          const newArrayMonthly = [...monthlyWadgesData];
          newArrayMonthly[indexdata] = value / 12;

          setAnnualWadgesData(newArray);
          setMonthlyWadgesData(newArrayMonthly);

          setAnnualIncome(indexdata, name, value);
        } else {
          console.log(
            "additional wedges monthly masulk " +
              indexdata +
              " " +
              name +
              " " +
              value
          );

          const newArray = [...monthlyWadgesData];
          newArray[indexdata] = value;

          const newArrayAnnualy = [...annualWadgesData];
          newArrayAnnualy[indexdata] = value * 12;

          setAnnualWadgesData(newArrayAnnualy);
          setMonthlyWadgesData(newArray);

          setAnnualIncome(indexdata, name, value * 12);
        }
        break;
      case "less":
        if (groupdata === "annualy") {
          const newArray = [...annualLessData];
          newArray[indexdata] = value;

          const newArrayMonthly = [...monthlyLessData];
          newArrayMonthly[indexdata] = value / 12;

          setAnnualLessData(newArray);
          setMonthlyLessData(newArrayMonthly);

          setAnnualIncome(indexdata, name, value);
        } else {
          const newArray = [...monthlyWadgesData];
          newArray[indexdata] = value;

          const newArrayAnnualy = [...annualWadgesData];
          newArrayAnnualy[indexdata] = value * 12;

          setAnnualLessData(newArrayAnnualy);
          setMonthlyLessData(newArray);

          setAnnualIncome(indexdata, name, value * 12);
        }
        break;
      default:
        if (groupdata === "annualy") {
          const newArray = [...annualData];
          newArray[indexdata] = value;

          const newArrayMonthly = [...monthlyData];
          newArrayMonthly[indexdata] = value / 12;

          setAnnualData(newArray);
          setMonthlyData(newArrayMonthly);

          setAnnualIncome(indexdata, name, value);
        } else {
          const newArray = [...monthlyData];
          newArray[indexdata] = value;

          const newArrayAnnualy = [...annualData];
          newArrayAnnualy[indexdata] = value * 12;

          setAnnualData(newArrayAnnualy);
          setMonthlyData(newArray);

          setAnnualIncome(indexdata, name, value * 12);
        }
        break;
    }
  };

  const addOther = () => {
    setSaveType("add");
    initialState.values[0] = 0;
    initialState.values[1] = 0;
    setAnnualDataOther([0, 0]);
    setMonthlyDataOther([0, 0]);
    setNewData(initialState);
    setShowModalOther(true);
  };

  const closeOther = () => {
    setShowModalOther(false);
  };

  const editOther = (params: number) => {
    setSaveType("update");

    setAnnualDataOther([0, 0]);
    setMonthlyDataOther([0, 0]);

    const detailData = others?.annualIncome.filter((obj) => obj.id === params);

    console.log("check data filter");
    console.log(detailData[0]);

    initialState.id = detailData[0].id;
    initialState.key = detailData[0].key;
    initialState.values[0] = detailData[0].values[0];
    initialState.values[1] = detailData[0].values[1];

    setNewData(initialState);
    setShowModalOther(true);
  };

  const removeDataAction = (params: any) => {
    removeOthers("annualIncome", params);
    setShowModalRemove(false);
  };

  const modalRemoveData = (params: any) => {
    setShowModalRemove(true);
    setActionDataId(params);
  };

  const saveData = () => {
    console.log(newData);

    let checkTotalData =
      others?.annualIncome.length === 0 || others?.annualIncome[0].id === 0
        ? 0
        : 1;

    if (saveType === "add") {
      setOthers("annualIncome", checkTotalData, newData);
    } else {
      patchOthers("annualIncome", newData);
    }

    setShowModalOther(false);
  };

  // count total annual income
  useEffect(() => {
    if (data.length > 0) {
      let totalOther = [0, 0];
      let newArray: any[] = [];
      getPfrLength.map((dataA, index) => {
        if (others.annualIncome.length > 0) {
          others.annualIncome.map((dataB, indexA) => {
            totalOther[index] += dataB.values[index];
          });
        }

        let annualGrossIncome = data[index].annualIncome.annualGrossIncome;
        let additionalWages = data[index].annualIncome.additionalWages;
        let less = data[index].annualIncome.less;
        let totalOtherFix = totalOther[index] > 0 ? totalOther[index] : 0;
        let result =
          Number(annualGrossIncome) +
          Number(additionalWages) +
          Number(totalOtherFix) -
          Number(less);

        newArray = [...checkTotal];
        newArray[index] = result;

        setAffodability("annualIncome", index, result)
      });

      setCheckTotal(newArray);
    }
  }, [data, others.annualIncome]);

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
            <Fragment key={"dsds" + index}>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </Fragment>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        } items-center`}
      >
        <div className={`col-span-3`}>
          <TextSmall className="text-gray-light">Annual Gross Income</TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <Fragment key={"asas" + index}>
              {need ? (
                need[index] == 1 ? (
                  <>
                    <div>
                      <Input
                        dataType="monthly"
                        className="my-4"
                        indexData={index}
                        formStyle="text-right"
                        type="text"
                        name="annualGrossIncome"
                        value={
                          monthlyData[index] > 0
                            ? monthlyData[index]
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
                        indexData={index}
                        formStyle="text-right"
                        type="text"
                        name="annualGrossIncome"
                        value={
                          annualData[index] > 0
                            ? annualData[index]
                            : data[index]
                            ? data[index].annualIncome.annualGrossIncome
                            : 0
                        }
                        handleChange={handleInputChange}
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
            </Fragment>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        } items-center`}
      >
        <div className={`col-span-3`}>
          <TextSmall className="text-gray-light">Additional Wages</TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <Fragment key={"asa" + index}>
              {need ? (
                need[index] == 1 ? (
                  <>
                    <div>
                      <Input
                        dataType="monthly"
                        className="my-4"
                        type="text"
                        formStyle="text-right"
                        name="additionalWages"
                        indexData={index}
                        value={
                          monthlyWadgesData[index] > 0
                            ? monthlyWadgesData[index]
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
                        indexData={index}
                        value={
                          annualWadgesData[index] > 0
                            ? annualWadgesData[index]
                            : data[index]
                            ? data[index].annualIncome.additionalWages
                            : 0
                        }
                        handleChange={handleInputChange}
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
            </Fragment>
          ))}
      </RowDinamycGrid>
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
                          Other Annual Income
                        </div>
                        {props.pfrType == 1 ? (
                          ""
                        ) : (
                          <>
                            {getPfrLength?.length &&
                              getPfrLength.map((d, index) => (
                                <Fragment key={"asa" + index}>
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
                        <div className="flex justify-between gap-4">
                          <Input
                            label="Item"
                            name="key"
                            value={newData.key}
                            className={`my-4 ${
                              props.pfrType == 1 ? "2/4" : "basis-2/6"
                            }`}
                            type="text"
                            placeholder="Add item here.."
                            handleChange={(event) =>
                              setNewData({
                                ...newData,
                                key: event.target.value,
                              })
                            }
                          />
                          {getPfrLength?.length &&
                            getPfrLength.map((d, index) => (
                              <Fragment key={"asas" + index}>
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
                                        indexData={index}
                                        dataType="annualy"
                                        label="Annual"
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
        {others?.annualIncome.length ? (
          <div
            className={`${props.pfrType == 1 ? "col-span-3" : "col-span-6"}`}
          >
            {others.annualIncome.map((data, index) => (
              <div
                className={`${
                  props.pfrType == 1 ? "grid-cols-3" : "grid-cols-6"
                } grid gap-8 space-y-4`}
                key={"annualIncome-" + index}
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
                    <Fragment key={"assa" + indexB}>
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
          <TextSmall className="text-gray-light">
            Less Employee’s CPF Contribution
          </TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <Fragment key={"sas" + index}>
              {need ? (
                need[index] == 1 ? (
                  <>
                    <Input
                      dataType="monthly"
                      className="my-4"
                      type="text"
                      name="less"
                      formStyle="text-right"
                      indexData={index}
                      value={
                        monthlyLessData[index] > 0
                          ? monthlyLessData[index]
                          : data[index]
                          ? data[index].annualIncome.less / 12
                          : 0
                      }
                      handleChange={handleInputChange}
                    />
                    <Input
                      dataType="annualy"
                      className="my-4"
                      type="text"
                      name="less"
                      indexData={index}
                      formStyle="text-right"
                      value={
                        annualLessData[index] > 0
                          ? annualLessData[index]
                          : data[index]
                          ? data[index].annualIncome.less
                          : 0
                      }
                      handleChange={handleInputChange}
                    />
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
            </Fragment>
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
          <TextSmall className="text-green-deep">ANNUAL NET INCOME</TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((d, index) => (
            <Fragment key={"sasa" + index}>
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

export default AnnualIncomeCashFlow;
