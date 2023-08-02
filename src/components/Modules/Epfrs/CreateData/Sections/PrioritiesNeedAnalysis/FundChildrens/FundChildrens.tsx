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
import Select from '@/components/Forms/Select'
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import AddBoxFillIcon from "remixicon-react/AddBoxFillIcon";
import { getLength } from '@/libs/helper'

interface Props {
  datas?: Array<any>;
  pfrType: number;
}

const FundChildrens =(props : Props) => {
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
    addChildFund,
    removeChildFund,
    setChildFund
  } = usePrioritiesNeedAnalysis();

  let childrenName: Array<any> = [
    { id: 1, name: "Test" },
    { id: 2, name: "Test 2" }
  ];

  let getPfrLength = getLength(props.pfrType);

  // Total Data Client & Deoendants
    let total = props.pfrType;
    var totalClient = [];
    var totalChildFund = [];
    var totalDependant = [];
    
    for (var i = 0; i < section7.answer.childFund.length; i++) {
      totalChildFund.push(i);
    }

    for (var i = 0; i < section7.typeClient; i++) {
      totalClient.push(i);
    }

    for (var i = 0; i < section7.totalDependant; i++) {
      totalDependant.push(i);
    }
  
  // Handdle Add New Field
  const handleAddNew = () => {
    addChildFund();
  }

  const handleRemoveNew = (i: any) => {
    removeChildFund(i);
  }
  // End

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
    setChildFund(value, i, name);
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
    setAnswerDefaultCheck(checked, 0, name)
  }
  
  // Additional Note
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;
    setAdditional(value, 3, name)
    
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
            <td className='align-top '>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                  <TextSmall className="text-gray-light">
                  Fund Children Education 
                  </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                  <ButtonGreenMedium className="relative bottom-3 " onClick={handleAddNew}>
                    <AddBoxFillIcon size={20} />
                    Add
                  </ButtonGreenMedium>
                </div>
              </div>
            </td>
            { 
              (total > 1) ? 
              totalChildFund.map(function (i) {
                return (
                  <td key={"asa"+i} className={` align-top`}>
                    <div className="text-right text-green-deep">Client {i+1} </div>
                    <div className="items-center justify-start gap-2 mb-10 text-right" id={`custome-checkbox-${i}`}>
                      <div className='items-start justify-start gap-4'>
                        {
                          (i != 0) ?
                            <button className={`px-4 py-3 text-sm text-white rounded-lg bg-red`} onClick={()=>handleRemoveNew(i)}>
                                Remove
                            </button>
                          :
                          ""
                        }
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
              Name of Child
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Select
                    dataType="clientInfo"
                    className="mb-10"
                    name="nameOfChild"
                    value={section7.answer.childFund[i].nameOfChild}
                    datas={childrenName}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Years to Tertiary Education
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="yearsToTertiaryEducation"
                    value={section7.answer.childFund[i].yearsToTertiaryEducation}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              No. of Years of Study
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="noOfYearsOfStudy"
                    value={section7.answer.childFund[i].noOfYearsOfStudy}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Annual Tuition Fees ($)
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annaulTuitionFees"
                    value={section7.answer.childFund[i].annaulTuitionFees}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Education Inflation Rate (in %)
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="educationInflationRate"
                    value={section7.answer.childFund[i].educationInflationRate}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Future Value of Annual Tuition Fees ($)
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.childFund[i].futureValueOfAnnualTuitionFee}
                  </TextSmall>
                </td>
                );
            })}
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
            A TOTAL TUITION FEES ($)
            </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.childFund[i].totalTuitionFee}
                  </TextSmall>
                </td>
                );
            })}
          
            
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Annual Living Costs ($)
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualLivingCosts"
                    value={section7.answer.childFund[i].annualLivingCosts}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Inflation Rate (in %)
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="inflationRate"
                    value={section7.answer.childFund[i].inflationRate}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Future Value of Annual Living Costs ($)
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.childFund[i].futureValueOfAnnualLivingCosts}
                  </TextSmall>
                </td>
                );
            })}

          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
            TOTAL LIVING COSTS ($)
            </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.childFund[i].totalLivingCost}
                  </TextSmall>
                </td>
                );
            })}
           
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
            TOTAL EDUCATION FUNDING (A+B) ($)
            </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.childFund[i].totalEducationFunding}
                  </TextSmall>
                </td>
                );
            })}
            
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Less : Future value of existing resources for education
              </TextSmall>
            </td>
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="futureValueOfExistingResourceForEducation"
                    value={section7.answer.childFund[i].futureValueOfExistingResourceForEducation}
                    handleChange={(event) => setDataClient(event, i)}
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
            {totalChildFund.map(function (i) {
              return (
                <td  key={"asa"+i} className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.childFund[i].netAmountRequired}
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
                value={section7.additionalNote[3].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  )
}

export default FundChildrens