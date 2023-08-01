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

const FundLongTermCare = (props: Props) => {
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
    // dataIncome[groupdata].fundLongTermCare[name] = value;

    // const resCapitalSum = capitalSumRequired(dataIncome[groupdata].fundLongTermCare);
    // dataIncome[groupdata].fundLongTermCare['capitalSumRequired'] = resCapitalSum;

    // const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].fundLongTermCare);
    // dataIncome[groupdata].fundLongTermCare['totalCashOutflow'] = resTotalCashOutflow;

    // const resTotal = totalAB(dataIncome[groupdata].fundLongTermCare);
    // dataIncome[groupdata].fundLongTermCare['total'] = resTotal;

    // const totalNetAmount = totalNetAmmount(dataIncome[groupdata].fundLongTermCare);
    // dataIncome[groupdata].fundLongTermCare['netAmountRequired'] = totalNetAmount;

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
    setAdditional(value, 7, name);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-gray-light">
                Fund Long Term Care
              </TextSmall>
            </td>
            {total > 1
              ? getPfrLength.map((data, i) => (
                  <td key={"assda" + i} className={``}>
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
                          checked={section7.answer.need.client[i][7]}
                          onChange={(event) =>
                            handleClient(
                              !section7.answer.need.client[i][7],
                              i,
                              7
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
                    <td key={"assda" + i} className={``}>
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
                            checked={section7.answer.need.dependant[i][7]}
                            onChange={(event) =>
                              handleDependant(
                                !section7.answer.need.dependant[i][7],
                                i,
                                7
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
                Desired Monthly Cash Payout ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"assda" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="desiredMonthlyCashPayout"
                  dataType="fundLongTermCare"
                  value={
                    section7.answer.clientData[i].fundLongTermCare
                      .desiredMonthlyCashPayout
                  }
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"assda" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="desiredMonthlyCashPayout"
                    dataType="fundLongTermCare"
                    value={
                      section7.answer.dependantData[i].fundLongTermCare
                        .desiredMonthlyCashPayout
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Name of Existing Long Term Care Insurance (if any)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"assda" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="nameOfExistingLongTermCareInsurance"
                  dataType="fundLongTermCare"
                  value={
                    section7.answer.clientData[i].fundLongTermCare
                      .nameOfExistingLongTermCareInsurance
                  }
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"assda" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="nameOfExistingLongTermCareInsurance"
                    dataType="fundLongTermCare"
                    value={
                      section7.answer.dependantData[i].fundLongTermCare
                        .nameOfExistingLongTermCareInsurance
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="w-1/2 align-top">
              <TextSmall className="text-gray-light">
                Less : existing insurance benefit payout ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
              <td key={"assda" + i} className={``}>
                <Input
                  formStyle="text-right"
                  className="mb-10"
                  type="text"
                  placeholder="1,000,000"
                  name="less"
                  dataType="fundLongTermCare"
                  value={section7.answer.clientData[i].fundLongTermCare.less}
                  handleChange={(event) => setDataClient(event, i)}
                />
              </td>
            ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"assda" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="less"
                    dataType="fundLongTermCare"
                    value={
                      section7.answer.dependantData[i].fundLongTermCare.less
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
              <td key={"asd" + i}>
                <TextSmall className="text-right uppercase text-green-deep">
                  $
                  {
                    section7.answer.clientData[i].fundLongTermCare
                      .netAmountRequired
                  }
                </TextSmall>
              </td>
            ))}
            {totalDependant.map(function (i) {
              return (
                <td key={"sda" + i}>
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i].fundLongTermCare
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
                value={section7.additionalNote[7].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  );
};

export default FundLongTermCare;
