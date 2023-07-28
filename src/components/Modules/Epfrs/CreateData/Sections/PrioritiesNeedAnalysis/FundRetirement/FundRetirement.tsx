import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React, {useState} from 'react'
import Dependent from '../../PersonalInformation/Dependent'
import Toggle from "@/components/Forms/Toggle";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";
import Select from '@/components/Forms/Select'

interface Props {
  datas?: Array<any>;
}

const FundRetirement = () => {
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
  } = usePrioritiesNeedAnalysis();

  let incomeMethod: Array<any> = [
    { id: 0, name: "Annual Income" },
    { id: 1, name: "Annual Expense" }
  ];

  // Total Data Client & Deoendants
    let total = section7.typeClient + section7.totalDependant;
    var totalClient = [];
    var totalDependant = [];
    for (var i = 0; i < section7.typeClient; i++) {
      totalClient.push(i);
    }

    for (var i = 0; i < section7.totalDependant; i++) {
      totalDependant.push(i);
    }
  
  // Handle Checkbox Client & Dependant
  const handleClient = (value:any, i: any, dataI:any) => {
    setNeed(value, i, dataI);
  }

  const handleDependant = (value: any, i: any, dataI: any) => {
    setNeedDependant(value, i, dataI);
  }

  // Set Client Data
  const setDataClient = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setClient(value, i, name, groupdata);

  }

  // Set Dependant Data
  const setDataDependant = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setDependant(value, i, name, groupdata);
  }

  // Default Check
  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setAnswerDefaultCheck(checked, '', name)
  }
  
  // Additional Note
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;
    setAdditional(value, 5, name)
  }

  // Calculate 
  const getPV = (fv:any, rate:any, n: any) =>{
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
    }
    return sum.toFixed(2);
  }

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="table-auto border-separate border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Fund Retirement Lifestyle
              </TextSmall>
            </td>
            { 
              (total > 1) ? 
              totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <div className="text-right text-green-deep">Client {i+1} </div>
                    <div className="text-right items-center justify-start gap-2 mb-10" id={`custome-checkbox-${i}`}>
                      <div className='items-start justify-start gap-4'>
                        <input
                          formStyle="text-right" type="checkbox" checked={section7.answer.need.client[i][5]} onChange={(event) => handleClient(!section7.answer.need.client[i][5], i, 5) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                        <span className={``}> Review</span>
                      </div>
                    </div>
                  </td>
                );
              })
              
              : ''
            }

            {
              (totalDependant.length > 0) ? 
                totalDependant.map(function (i) {
                  return (
                    <td className={``}>
                      <div className="text-right text-green-deep">Dependant {i+1} </div>
                      <div className="text-right items-center justify-start gap-2 mb-10" id={`custome-checkbox-dependant-${i}`}>
                        <div className='items-start justify-start gap-4'>
                          <input
                            formStyle="text-right" type="checkbox" checked={section7.answer.need.dependant[i][5]} onChange={(event) => handleDependant(!section7.answer.need.dependant[i][5], i, 1) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                          <span className={``}> Review</span>
                        </div>
                      </div>
                    </td>
                  );
                })
              : ''
            }
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Expected Retirement Age
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="expectedRetirementAge"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.expectedRetirementAge}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="expectedRetirementAge"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.expectedRetirementAge}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Number of Years to Retirement
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].fundRetirementLifeStyle.yearsToRetirement}
                </TextSmall>
              </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.dependantData[i].fundRetirementLifeStyle.yearsToRetirement}
                </TextSmall>
              </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Either Income Method of Calculation
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                   <Select
                      className="mb-10"
                      name="selectedMethod"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.selectedMethod}
                      datas={incomeMethod}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Select
                      className="mb-10"
                      name="selectedMethod"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.selectedMethod}
                      datas={incomeMethod}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Annual Income ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="annualIncome"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.annualIncome}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="annualIncome"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.annualIncome}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Rate of Income Increment (%)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="rateOfIncomeIncrement"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.rateOfIncomeIncrement}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="rateOfIncomeIncrement"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.rateOfIncomeIncrement}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Income at Retirement Age ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].fundRetirementLifeStyle.incomeAtRetirementAge}
                </TextSmall>
              </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.dependantData[i].fundRetirementLifeStyle.incomeAtRetirementAge}
                </TextSmall>
              </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              (%) of Income Required at Retirement Age
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="percentOfIncomeRequiredAtRetirement"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.percentOfIncomeRequiredAtRetirement}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="percentOfIncomeRequiredAtRetirement"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.percentOfIncomeRequiredAtRetirement}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-green-deep">
              Income required at Retirement ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].fundRetirementLifeStyle.incomeRequiredAtRetirement}
                </TextSmall>
              </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.dependantData[i].fundRetirementLifeStyle.incomeRequiredAtRetirement}
                </TextSmall>
              </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Retirement Expense (in today's value) ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  (section7.answer.clientData[i].fundRetirementLifeStyle.selectedMethod == 1) ?
                    <td className={``}>
                      <Input
                        formStyle="text-right"
                        className="mb-10"
                        type="text"
                        placeholder="1,000,000"
                        name="retirementExpense"
                        dataType="fundRetirementLifeStyle"
                        value={section7.answer.clientData[i].fundRetirementLifeStyle.retirementExpense}
                        handleChange={(event) => setDataClient(event, i)}
                      />
                    </td> : ''
                )
              })}

              {totalDependant.map(function (i) {
                return (
                  (section7.answer.dependantData[i].fundRetirementLifeStyle.selectedMethod == 1) ?
                    <td className={``}>
                      <Input
                        formStyle="text-right"
                        className="mb-10"
                        type="text"
                        placeholder="1,000,000"
                        name="retirementExpense"
                        dataType="fundRetirementLifeStyle"
                        value={section7.answer.dependantData[i].fundRetirementLifeStyle.retirementExpense}
                        handleChange={(event) => setDataDependant(event, i)}
                      />
                    </td>
                  : ''
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Inflation Rate (%)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  (section7.answer.clientData[i].fundRetirementLifeStyle.selectedMethod == 1) ?
                    <td className={``}>
                      <Input
                        formStyle="text-right"
                        className="mb-10"
                        type="text"
                        placeholder="1,000,000"
                        name="inflationRate"
                        dataType="fundRetirementLifeStyle"
                        value={section7.answer.clientData[i].fundRetirementLifeStyle.inflationRate}
                        handleChange={(event) => setDataClient(event, i)}
                      />
                    </td> : ''
                )
              })}

              {totalDependant.map(function (i) {
                return (
                  (section7.answer.dependantData[i].fundRetirementLifeStyle.selectedMethod == 1) ?
                    <td className={``}>
                      <Input
                        formStyle="text-right"
                        className="mb-10"
                        type="text"
                        placeholder="1,000,000"
                        name="inflationRate"
                        dataType="fundRetirementLifeStyle"
                        value={section7.answer.dependantData[i].fundRetirementLifeStyle.inflationRate}
                        handleChange={(event) => setDataDependant(event, i)}
                      />
                    </td>
                  : ''
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-green-deep">
              Expenses at Retirement ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].fundRetirementLifeStyle.expenseATRetirement}
                </TextSmall>
              </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.dependantData[i].fundRetirementLifeStyle.expenseATRetirement}
                </TextSmall>
              </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Years to Receive Retirement Income
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="yearsToReceiveRetirementIncome"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.yearsToReceiveRetirementIncome}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="yearsToReceiveRetirementIncome"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.yearsToReceiveRetirementIncome}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Net Rate of Return (adjusted for inflation)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="netRateOfReture"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.netRateOfReture}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="netRateOfReture"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.netRateOfReture}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Amount Needed at Retirement Age ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].fundRetirementLifeStyle.amountNeededAtRetirementAge}
                </TextSmall>
              </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.dependantData[i].fundRetirementLifeStyle.amountNeededAtRetirementAge}
                </TextSmall>
              </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Less : Future value of existing resource for retirement ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="less"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.clientData[i].fundRetirementLifeStyle.less}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      formStyle="text-right"
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="less"
                      dataType="fundRetirementLifeStyle"
                      value={section7.answer.dependantData[i].fundRetirementLifeStyle.less}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-green-deep">
              Net amount required ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.clientData[i].fundRetirementLifeStyle.netAmountRequired}
                </TextSmall>
              </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
              <td className='align-top'>
                <TextSmall className="text-right uppercase text-green-deep">
                  ${section7.answer.dependantData[i].fundRetirementLifeStyle.netAmountRequired}
                </TextSmall>
              </td>
              );
            })}
          </tr>
          <tr>
            <td colSpan={total}>
              <TextSmall className="text-gray-light">Additional Notes</TextSmall>
            </td>
          </tr>
          <tr>
            <td colSpan={total+1}>
              <Input
                formStyle="text-right"
                className="mb-10"
                type="text"
                placeholder="Additional Notes"
                name="note"
                value={section7.additionalNote[5].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  )
}

export default FundRetirement