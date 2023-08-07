import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import React, { useState } from "react";
import Toggle from "@/components/Forms/Toggle";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";
import Select from "@/components/Forms/Select";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { getLength } from "@/libs/helper";

interface Props {
  datas?: Array<any>;
  pfrType: number;
}

const MaternityPlan = (props: Props) => {
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
    addMaternity,
    removeMaternity,
    setMaternity,
  } = usePrioritiesNeedAnalysis();

  const addColumn = () => {
    addMaternity();
  };

  const rmColumn = (index: any) => {
    removeMaternity(index);
  };

  let getPfrLength = getLength(props.pfrType);

  const handleMaternity = (e: any, index: any, indexSub: any) => {
    const { groupdata } = e.target.dataset;
    const { name, value } = e.target;
    setMaternity(value, index, name, groupdata, indexSub);
  };

  // Total Data Client & Deoendants
  let total = props.pfrType + section7.totalDependant;
  var totalClient = [];
  var totalDependant = [];
  for (var i = 0; i < section7.typeClient; i++) {
    totalClient.push(i);
  }

  for (var i = 0; i < section7.totalDependant; i++) {
    totalDependant.push(i);
  }

  // Handle Checkbox Client & Dependant
  const handleClient = (value: any, i: any, dataI: any) => {
    setNeed(i, dataI, value);
  };

  const handleDependant = (value: any, i: any, dataI: any) => {
    setNeedDependant(i, dataI, value);
  };

  // Set Client Data
  const setDataClient = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setClient(value, i, name, groupdata);
  };

  // Set Dependant Data
  const setDataDependant = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setDependant(value, i, name, groupdata);
  };

  // Default Check
  const handleDefaultCheck = (a: any) => {
    const { name, checked, value } = a.target;
    setAnswerDefaultCheck(checked, 0, name);
  };

  // Additional Note
  const handleAdditional = (e: any) => {
    const { name, value } = e.target;
    setAdditional(value, 9, name);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-gray-light">
                MATERNITY PLAN
              </TextSmall>
            </td>
            {total > 1
              ? getPfrLength.map((data, i) => (
                  <td key={"asda" + i} className={``}>
                    <div className="text-right text-green-deep">
                      Client {i + 1}{" "}
                    </div>
                    <div
                      className="items-center justify-start gap-2 mb-10 text-right"
                      id={`custome-checkbox-${i}`}
                    >
                      <div className="items-start justify-start gap-4">
                        <input
                          type="checkbox"
                          checked={section7.answer.need.client[i][9]}
                          onChange={(event) =>
                            handleClient(
                              !section7.answer.need.client[i][9],
                              i,
                              9
                            )
                          }
                          className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                        />
                        <span className={``}> Review</span>
                      </div>
                    </div>
                  </td>
                ))
              : ""}

            {totalDependant.length > 0
              ? totalDependant.map(function (i) {
                  return (
                    <td key={"asda" + i} className={``}>
                      <div className="text-right text-green-deep">
                        Dependant {i + 1}{" "}
                      </div>
                      <div
                        className="items-center justify-start gap-2 mb-10 text-right"
                        id={`custome-checkbox-dependant-${i}`}
                      >
                        <div className="items-start justify-start gap-4">
                          <input
                            type="checkbox"
                            checked={section7.answer.need.dependant[i][9]}
                            onChange={(event) =>
                              handleDependant(
                                !section7.answer.need.dependant[i][9],
                                i,
                                9
                              )
                            }
                            className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                          />
                          <span className={``}> Review</span>
                        </div>
                      </div>
                    </td>
                  );
                })
              : ""}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Amount Needed ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"asda" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="amountNeeded"
                  dataType="maternity"
                  value={section7.answer.clientData[i].maternity.amountNeeded}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asda" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="amountNeeded"
                    dataType="maternity"
                    value={section7.answer.clientData[i].maternity.amountNeeded}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <div className="col-end-1">
                <TextSmall className="uppercase text-green-deep">
                  Less :
                </TextSmall>
              </div>
              <div className="col-span-1 ">
                <input
                  type="checkbox"
                  onChange={handleDefaultCheck}
                  name="maternity_other"
                  checked={section7.answer.defaultCheck.maternity_other}
                  className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                />
                <button
                  className="mt-2 ml-2 text-xs text-right border rounded-md border-gray-soft-strong w-fit"
                  onClick={() => addColumn()}
                >
                  <AddLineIcon />
                </button>
              </div>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"asda" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="less"
                  dataType="maternity"
                  value={section7.answer.clientData[i].maternity.less}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asda" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="less"
                    dataType="maternity"
                    value={section7.answer.clientData[i].maternity.less}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          {section7.answer.addtionalMaternityPlan.map(
            (maternity: any, index: any) => {
              return (
                <tr key={"aadasa" + i}>
                  <td>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-end-1">
                        <ButtonBox
                          className="text-red"
                          onClick={() => rmColumn(index)}
                        >
                          <CloseLineIcon size={14} />
                        </ButtonBox>
                      </div>
                      <div className="col-span-3">
                        <Input
                          formStyle="text-right"
                          className="mb-10"
                          type="text"
                          placeholder="Value"
                          name="key"
                          value={maternity.key}
                          handleChange={(event) =>
                            handleMaternity(event, index, null)
                          }
                        />
                      </div>
                    </div>
                  </td>
                  {maternity.client.map(function (v: any, i: any) {
                    return (
                      <td key={"asda" + i} className={``}>
                        <Input
                          formStyle="text-right"
                          className="mb-10"
                          type="text"
                          placeholder="1,000,000"
                          name={i}
                          dataType="client"
                          value={v}
                          handleChange={(event) =>
                            handleMaternity(event, index, i)
                          }
                        />
                      </td>
                    );
                  })}
                  {maternity.dependants.map(function (v: any, i: any) {
                    return (
                      <td key={"asda" + i} className={``}>
                        <Input
                          formStyle="text-right"
                          className="mb-10"
                          type="text"
                          placeholder="1,000,000"
                          name={i}
                          dataType="dependants"
                          value={v}
                          handleChange={(event) =>
                            handleMaternity(event, index, i)
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            }
          )}
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-green-deep">
                Net amount required ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"dsdsa" + i} className="align-top">
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].maternity.netAmountRequired}
                </TextSmall>
              </td>
            ))}
            {totalDependant.map(function (i) {
              return (
                <td key={"asdaas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i].maternity
                        .netAmountRequired
                    }
                  </TextSmall>
                </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={total}>
              <TextSmall className="text-gray-light">
                Additional Notes
              </TextSmall>
            </td>
          </tr>
          <tr>
            <td colSpan={total + 1}>
              <Input
                formStyle="text-right"
                className="mb-10"
                type="text"
                placeholder="Additional Notes"
                name="note"
                value={section7.additionalNote[9].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  );
};

export default MaternityPlan;
