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
import { getLength } from "@/libs/helper";

interface Props {
  datas?: Array<any>;
  pfrType: number;
}

const CoverForPersonal = (props: Props) => {
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
  } = usePrioritiesNeedAnalysis();

  let getPfrLength = getLength(props.pfrType);

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
    setNeed(value, i, dataI);
  };

  const handleDependant = (value: any, i: any, dataI: any) => {
    setNeedDependant(value, i, dataI);
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

    // const groupdata = i;
    // const { name, value } = event.target;
    // const dataIncome = [...dependantData];
    // dataIncome[groupdata].dependantId = groupdata+1;
    // dataIncome[groupdata].coverForPersonalAccident[name] = value;

    // const resCapitalSum = capitalSumRequired(dataIncome[groupdata].coverForPersonalAccident);
    // dataIncome[groupdata].coverForPersonalAccident['capitalSumRequired'] = resCapitalSum;

    // const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].coverForPersonalAccident);
    // dataIncome[groupdata].coverForPersonalAccident['totalCashOutflow'] = resTotalCashOutflow;

    // const resTotal = totalAB(dataIncome[groupdata].coverForPersonalAccident);
    // dataIncome[groupdata].coverForPersonalAccident['total'] = resTotal;

    // const totalNetAmount = totalNetAmmount(dataIncome[groupdata].coverForPersonalAccident);
    // dataIncome[groupdata].coverForPersonalAccident['netAmountRequired'] = totalNetAmount;

    // setDependantData(dataIncome);
  };

  // Default Check
  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setAnswerDefaultCheck(checked, 0, name);
  };

  // Additional Note
  const handleAdditional = (e: any) => {
    const { name, value } = e.target;
    setAdditional(value, 6, name);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-gray-light">
                Cover for Personal Accident
              </TextSmall>
            </td>
            {total > 1
              ? getPfrLength.map((data, i) => (
                  <td key={"7ab" + i} className={``}>
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
                          checked={section7.answer.need.client[i][6]}
                          onChange={(event) =>
                            handleClient(
                              !section7.answer.need.client[i][6],
                              i,
                              6
                            )
                          }
                          className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
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
                    <td key={"7bb" + i} className={``}>
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
                            checked={section7.answer.need.dependant[i][6]}
                            onChange={(event) =>
                              handleDependant(
                                !section7.answer.need.dependant[i][6],
                                i,
                                6
                              )
                            }
                            className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
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
                Mount Needed ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"7hs" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="amountNeeded"
                  dataType="coverForPersonalAccident"
                  value={
                    section7.answer.clientData[i].coverForPersonalAccident
                      .amountNeeded
                  }
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"ysd" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="amountNeeded"
                    dataType="coverForPersonalAccident"
                    value={
                      section7.answer.dependantData[i].coverForPersonalAccident
                        .amountNeeded
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                  <TextSmall className="text-gray-light">
                    Less : existing personal accident benefits ($)
                  </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                  <input
                    type="checkbox"
                    onChange={handleDefaultCheck}
                    name="cover_for_personal_accident_benefit"
                    checked={
                      section7.answer.defaultCheck
                        .cover_for_personal_accident_benefit
                    }
                    className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                  />
                </div>
              </div>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sdf" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="less"
                  dataType="coverForPersonalAccident"
                  value={
                    section7.answer.clientData[i].coverForPersonalAccident.less
                  }
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asss" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="less"
                    dataType="coverForPersonalAccident"
                    value={
                      section7.answer.dependantData[i].coverForPersonalAccident
                        .less
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-green-deep">
                NET AMOUNT REQUIRED ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"sds" + i}>
                <TextSmall className="text-right uppercase text-green-deep">
                  $
                  {
                    section7.answer.clientData[i].coverForPersonalAccident
                      .netAmountRequired
                  }
                </TextSmall>
              </td>
            ))}
            {totalDependant.map(function (i) {
              return (
                <td key={"sds" + i}>
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i].coverForPersonalAccident
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
                className="mb-10"
                type="text"
                placeholder="Additional Notes"
                name="note"
                value={section7.additionalNote[6].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  );
};

export default CoverForPersonal;
