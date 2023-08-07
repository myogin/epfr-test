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

const FundDisability = (props: Props) => {
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
  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setAnswerDefaultCheck(checked, 0, name);
  };

  // Additional Note
  const handleAdditional = (e: any) => {
    const { name, value } = e.target;
    setAdditional(value, 1, name);
  };

  // Calculate
  const getPV = (fv: any, rate: any, n: any) => {
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
    }
    return sum.toFixed(2);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-gray-light">
                Fund Disability Income / Expense
              </TextSmall>
            </td>
            {total > 1
              ? getPfrLength.map((data, i) => (
                  <td key={"asa" + i} className={``}>
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
                          checked={section7.answer.need.client[i][1]}
                          onChange={(event) =>
                            handleClient(
                              !section7.answer.need.client[i][1],
                              i,
                              1
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
                    <td key={"asa" + i} className={``}>
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
                            checked={section7.answer.need.dependant[i][1]}
                            onChange={(event) =>
                              handleDependant(
                                !section7.answer.need.dependant[i][1],
                                i,
                                1
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
                Annual Amount Needed ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .annualAmountNeeded
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.annualAmountNeeded
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="text-gray-light">
                Number of Years Needed
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="numberOfYearsNeed"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .numberOfYearsNeed
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="numberOfYearsNeed"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.numberOfYearsNeed
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="text-gray-light">
                Net Rate of Return (adjusted for inflation)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="netRateOfReture"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .netRateOfReture
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="netRateOfReture"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.netRateOfReture
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
                A CAPITAL SUM REQUIRED
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .capitalSumRequired
                    }
                  </TextSmall>
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.capitalSumRequired
                    }
                  </TextSmall>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="text-gray-light">
                Medical Expense ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="medicalExpense"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .medicalExpense
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="medicalExpense"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.medicalExpense
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                  <TextSmall className="text-gray-light">
                    Mortgage ($)
                  </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                  <input
                    type="checkbox"
                    onChange={handleDefaultCheck}
                    name="fund_disability_income_expense_mortgage"
                    checked={
                      section7.answer.defaultCheck
                        .fund_disability_income_expense_mortgage
                    }
                    className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                  />
                </div>
              </div>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="mortgage"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .mortgage
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="mortgage"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.mortgage
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="text-gray-light">
                Loans / Others ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="loans"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .loans
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="loans"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.loans
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
                B. TOTAL CASH OUTFLOW ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .totalCashOutflow
                    }
                  </TextSmall>
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.totalCashOutflow
                    }
                  </TextSmall>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="uppercase text-green-deep">
                TOTAL (A + B) ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .total
                    }
                  </TextSmall>
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.total
                    }
                  </TextSmall>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                  <TextSmall className="text-gray-light">
                    Less: existing insurance coverage on disability ($)
                  </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                  <input
                    type="checkbox"
                    onChange={handleDefaultCheck}
                    name="fund_disability_income_expense_disability"
                    checked={
                      section7.answer.defaultCheck
                        .fund_disability_income_expense_disability
                    }
                    className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                  />
                </div>
              </div>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingInsuranceCoverageOnDisability"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .existingInsuranceCoverageOnDisability
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingInsuranceCoverageOnDisabil"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense
                        .existingInsuranceCoverageOnDisability
                    }
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="align-top">
              <TextSmall className="text-gray-light">
                Less: existing resource ($) (if any)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingResources"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .existingResources
                    }
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"asa" + i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingResources"
                    dataType="fundDisabilityIncomeExpense"
                    value={
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.existingResources
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
                Net amount required ($)
              </TextSmall>
            </td>
            {getPfrLength.map((data, i) => (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.clientData[i].fundDisabilityIncomeExpense
                        .netAmountRequired
                    }
                  </TextSmall>
                </td>
              ))}

            {totalDependant.map(function (i) {
              return (
                <td key={"aasas" + i} className="align-top">
                  <TextSmall className="text-right uppercase text-green-deep">
                    $
                    {
                      section7.answer.dependantData[i]
                        .fundDisabilityIncomeExpense.netAmountRequired
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
                value={section7.additionalNote[1].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  );
};

export default FundDisability;
