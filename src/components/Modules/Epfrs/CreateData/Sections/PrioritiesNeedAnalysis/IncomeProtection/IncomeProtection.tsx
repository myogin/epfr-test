import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React, {useState, useEffect} from 'react'
import Dependent from '../../PersonalInformation/Dependent'
import Toggle from "@/components/Forms/Toggle";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";

interface Props {
  datas?: Array<any>
}

const IncomeProtection = (props : Props) => {
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

  // End
  const handleClient = (value:any, i: any, dataI:any) => {
    setNeed(value, i, dataI);
  }

  const handleDependant = (value: any, i: any, dataI: any) => {
    setNeedDependant(value, i, dataI);
  }

  const setDataClient = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    const resData = section7.answer.clientData[i];

    setClient(value, i, name, groupdata);
  };

  const setDataDependant = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    const resData = section7.answer.clientData[i];

    setDependant(value, i, name, groupdata);
  };

  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setAnswerDefaultCheck(checked, '', name)
  }
  
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;
    setAdditional(value, 0, name)
  }

  // Rumus
  const getPV = (fv:any, rate:any, n: any) =>{
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
    }
    console.log('sum', sum)
    return sum.toFixed(2);
  }


  const capitalSumRequired = (res: any) => {
    console.log('res.annualAmountNeeded-'+res.annualAmountNeeded, 'res.netRateOfReture-'+res.netRateOfReture, 'res.numberOfYearsNeed-'+res.numberOfYearsNeed)
    var result = getPV(
      res.annualAmountNeeded,
      res.netRateOfReture / 100,
      res.numberOfYearsNeed
    );

    return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
  }

  const totalCashOutflow = (res:any) => {
    var result = parseFloat(res.finalExpense) + parseFloat(res.emergencyFund) + parseFloat(res.mortgage) + parseFloat(res.personalDebts) + parseFloat(res.others);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  }

  const totalAB = (res: any) => {
    var result = parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashFlow);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  }

  const totalNetAmmount = (res: any) => {
    var result = res.total - res.existingResources - res.existingInsuranceCoverageOnDeath;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  }
  
  return (
    <>
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="table-auto border-separate border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
                Income Protection Upon Death
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
                        <input type="checkbox" checked={section7.answer.need.client[i][0]} onChange={(event) => handleClient(!section7.answer.need.client[i][0],i,0) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:rin, dataI:g-1' />
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
                          <input type="checkbox" checked={section7.answer.need.dependant[i][0]} onChange={(event) => handleDependant(!section7.answer.need.dependant[i][0], i, 0) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
              <TextSmall className="text-gray-light align-top">
                Annual Amount Needed ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    dataType="incomeProtectionUponDeath"
                    value={section7.answer.clientData[i].incomeProtectionUponDeath.annualAmountNeeded}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    dataType="incomeProtectionUponDeath"
                    value={section7.answer.dependantData[i].incomeProtectionUponDeath.annualAmountNeeded}
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
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="numberOfYearsNeed"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.numberOfYearsNeed}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="numberOfYearsNeed"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.numberOfYearsNeed}
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
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="netRateOfReture"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.netRateOfReture}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="netRateOfReture"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.netRateOfReture}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
              A. CAPITAN SUM REQUIRED
            </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].incomeProtectionUponDeath.capitalSumRequired}
                    </TextSmall>
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].incomeProtectionUponDeath.capitalSumRequired}
                    </TextSmall>
                </td>
              );
            })}
            
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">Final Expense ($)</TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="finalExpense"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.finalExpense}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="finalExpense"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.finalExpense}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">Emergency Fund ($)</TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="emergencyFund"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.emergencyFund}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="emergencyFund"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.emergencyFund}
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
                <input type="checkbox" onChange={handleDefaultCheck} name="income_protection_upon_death_mortgage" checked={section7.answer.defaultCheck.income_protection_upon_death_mortgage}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
              </div>
            </div>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="mortgage"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.mortgage}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="mortgage"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.mortgage}
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
                  Personal Debts ($)
                </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                  <input type="checkbox" onChange={handleDefaultCheck} name="income_protection_upon_death_debt" checked={section7.answer.defaultCheck.income_protection_upon_death_debt}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                </div>
              </div>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="personalDebts"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.personalDebts}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="personalDebts"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.personalDebts}
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
                  <TextSmall className="text-gray-light">Others ($)</TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                <input type="checkbox" onChange={handleDefaultCheck} name="income_protection_upon_death_other" checked={section7.answer.defaultCheck.income_protection_upon_death_other}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                </div>
              </div>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="others"
                    dataType="incomeProtectionUponDeath"
                    value={section7.answer.clientData[i].incomeProtectionUponDeath.others}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="others"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.others}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-green-deep">
                B. TOTAL CASH OUT FLOW ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].incomeProtectionUponDeath.totalCashFlow}
                    </TextSmall>
                </td>
              );
            })}
            {totalDependant.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].incomeProtectionUponDeath.totalCashFlow}
                    </TextSmall>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-green-deep">TOTAL A + B ($)</TextSmall>  
            </td>
            {totalClient.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].incomeProtectionUponDeath.total}
                    </TextSmall>
                </td>
              );
            })}
            {totalDependant.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].incomeProtectionUponDeath.total}
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
                  Less: existing insurance coverage on death ($)
                </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                <input type="checkbox" onChange={handleDefaultCheck} name="income_protection_upon_death_death" checked={section7.answer.defaultCheck.income_protection_upon_death_death}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                </div>
              </div>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="existingInsuranceCoverageOnDeath"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.existingInsuranceCoverageOnDeath}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="existingInsuranceCoverageOnDeath"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.existingInsuranceCoverageOnDeath}
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
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="existingResources"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.clientData[i].incomeProtectionUponDeath.existingResources}
                      handleChange={(event) => setDataClient(event, i)}
                    />
                  </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      name="existingResources"
                      dataType="incomeProtectionUponDeath"
                      value={section7.answer.dependantData[i].incomeProtectionUponDeath.existingResources}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
              NET AMOUNT REQUIRED ($)
            </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.clientData[i].incomeProtectionUponDeath.netAmountRequired}
                    </TextSmall>
                </td>
              );
            })}
            {totalDependant.map(function (i) {
              return (
                <td>
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${section7.answer.dependantData[i].incomeProtectionUponDeath.netAmountRequired}
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
                className="mb-10"
                type="text"
                placeholder="Additional Notes"
                name="note"
                value={section7.additionalNote[0].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
      
    </SectionCardSingleGrid>



      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </>
  )
}

export default IncomeProtection