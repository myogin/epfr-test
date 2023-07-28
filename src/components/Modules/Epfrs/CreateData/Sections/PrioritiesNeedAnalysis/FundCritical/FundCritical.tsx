import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React, {useState} from 'react'
import Toggle from "@/components/Forms/Toggle";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";

interface Props {
  datas?: Array<any>;
}

const FundCritical = (props : Props) => {
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
  } = usePrioritiesNeedAnalysis();


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

  const handleDependant = (value:any, i: any, dataI:any) => {
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

    // const groupdata = i;
    // const { name, value } = event.target;
    // const dataIncome = [...dependantData];
    // dataIncome[groupdata].dependantId = groupdata+1;
    // dataIncome[groupdata].fundCriticalIllnessExpense[name] = value;
    
    // const resCapitalSum = capitalSumRequired(dataIncome[groupdata].fundCriticalIllnessExpense);
    // dataIncome[groupdata].fundCriticalIllnessExpense['capitalSumRequired'] = resCapitalSum;

    // const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].fundCriticalIllnessExpense);
    // dataIncome[groupdata].fundCriticalIllnessExpense['totalCashOutflow'] = resTotalCashOutflow;

    // const resTotal = totalAB(dataIncome[groupdata].fundCriticalIllnessExpense);
    // dataIncome[groupdata].fundCriticalIllnessExpense['total'] = resTotal;

    // const totalNetAmount = totalNetAmmount(dataIncome[groupdata].fundCriticalIllnessExpense);
    // dataIncome[groupdata].fundCriticalIllnessExpense['netAmountRequired'] = totalNetAmount;

    // setDependantData(dataIncome);
  }

  // Default Check
  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setAnswerDefaultCheck(checked, 0, name)
  }
  
  // Additional Note
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;
    setAdditional(value, 2, name)
    
  }

  // Calculate 
  const getPV = (fv:any, rate:any, n: any) =>{
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
    }
    return sum.toFixed(2);
  }

  const capitalSumRequired = (res: any) => {
    var result = getPV(
      res.annualAmountNeeded,
      res.netRateOfReture / 100,
      res.numberOfYearsNeed
    );

    return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
  }

  const totalCashOutflow = (res:any) => {
    var result = parseFloat(res.medicalExpense) + parseFloat(res.mortgage) + parseFloat(res.loans);
    return isNaN(result) ? 0 : result.toFixed(2);
  }

  const totalAB = (res: any) => {
    var result = parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashOutflow);
    return isNaN(result) ? 0 : result.toFixed(2);
  }

  const totalNetAmmount = (res: any) => {
    var result = res.total - res.existingResources - res.existingInsuranceCoverageOnCI;
    return isNaN(result) ? 0 : result.toFixed(2);
  }


  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Fund Critical Illness Expense
              </TextSmall>
            </td>
            { 
              (total > 1) ? 
              totalClient.map(function (i) {
                return (
                  <td  key={"asa"+i} className={``}>
                    <div className="text-right text-green-deep">Client {i+1} </div>
                    <div className="items-center justify-start gap-2 mb-10 text-right" id={`custome-checkbox-${i}`}>
                      <div className='items-start justify-start gap-4'>
                        <input type="checkbox" checked={section7.answer.need.client[i][2]} onChange={(event) => handleClient(!section7.answer.need.client[i][2], i, 2) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                    <td  key={"asa"+i} className={``}>
                      <div className="text-right text-green-deep">Dependant {i+1} </div>
                      <div className="items-center justify-start gap-2 mb-10 text-right" id={`custome-checkbox-dependant-${i}`}>
                        <div className='items-start justify-start gap-4'>
                          <input type="checkbox" checked={section7.answer.need.dependant[i][2]} onChange={(event) => handleDependant(!section7.answer.need.dependant[i][2], i, 2) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
                Annual Amount Needed ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.annualAmountNeeded}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.annualAmountNeeded}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">
              Number of Years Needed
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="numberOfYearsNeed"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.numberOfYearsNeed}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="numberOfYearsNeed"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.numberOfYearsNeed}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">
                Net Rate of Return (adjusted for inflation)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="netRateOfReture"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.netRateOfReture}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="netRateOfReture"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.netRateOfReture}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
            A CAPITAL SUM REQUIRED
            </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.clientData[i].fundCriticalIllnessExpense.capitalSumRequired}
                  </TextSmall>
                </td>
                );
            })}
            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.dependantData[i].fundCriticalIllnessExpense.capitalSumRequired}
                  </TextSmall>
                </td>
                );
            })}
            
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">
              Medical Expense ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="medicalExpense"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.medicalExpense}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="medicalExpense"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.medicalExpense}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                  <TextSmall className="text-gray-light">
                    Mortgage ($)
                  </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                <input type="checkbox" onChange={handleDefaultCheck} name="fund_critical_illness_expense_mortgage" checked={section7.answer.defaultCheck.fund_critical_illness_expense_mortgage}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                </div>
              </div>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="mortgage"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.mortgage}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="mortgage"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.mortgage}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">
              Loans / Others ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="loans"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.loans}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="loans"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.loans}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-green-deep">
              B. TOTAL CASH OUTFLOW ($)
              </TextSmall>
              </td>
              {totalClient.map(function (i) {
                return (
                  <td  key={"asa"+i} className='align-top'>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].fundCriticalIllnessExpense.totalCashOutflow}
                    </TextSmall>
                  </td>
                  );
              })}
              {totalDependant.map(function (i) {
                return (
                  <td  key={"asa"+i} className='align-top'>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].fundCriticalIllnessExpense.totalCashOutflow}
                    </TextSmall>
                  </td>
                  );
              })}
          </tr>
          <tr>
              <td className='align-top'>
              <TextSmall className="uppercase text-green-deep">
              TOTAL (A + B) ($)
              </TextSmall>
              </td>
              {totalClient.map(function (i) {
                return (
                  <td  key={"asa"+i} className='align-top'>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].fundCriticalIllnessExpense.total}
                    </TextSmall>
                  </td>
                  );
              })}
              {totalDependant.map(function (i) {
                return (
                  <td  key={"asa"+i} className='align-top'>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].fundCriticalIllnessExpense.total}
                    </TextSmall>
                  </td>
                  );
              })}
          </tr>
          <tr>
            <td className='align-top'>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                <TextSmall className="text-gray-light">
                Less: existing insurance coverage on CI and/or Early CI ($)
                </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                <input type="checkbox" onChange={handleDefaultCheck} name="fund_critical_illness_expense_ci" checked={section7.answer.defaultCheck.fund_critical_illness_expense_ci}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                </div>
              </div>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingInsuranceCoverageOnCI"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.existingInsuranceCoverageOnCI}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingInsuranceCoverageOnCI"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.existingInsuranceCoverageOnCI}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">
              Less: existing resource ($) (if any)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingResources"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.clientData[i].fundCriticalIllnessExpense.existingResources}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="existingResources"
                    dataType="fundCriticalIllnessExpense"
                    value={section7.answer.dependantData[i].fundCriticalIllnessExpense.existingResources}
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
                  <td  key={"asa"+i} className='align-top'>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].fundCriticalIllnessExpense.netAmountRequired}
                    </TextSmall>
                  </td>
                  );
              })}
              {totalDependant.map(function (i) {
                return (
                  <td  key={"asa"+i} className='align-top'>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].fundCriticalIllnessExpense.netAmountRequired}
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
                value={section7.additionalNote[2].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
  </SectionCardSingleGrid>
  )
}

export default FundCritical