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

const FundHospitalExpenses = (props : Props) => {
  let desHospital: Array<any> = [
    { id: "Private ", name: "Private " },
    { id: "Public", name: "Public" }
  ];

  let desWard: Array<any> = [
    { id: "A", name: "A" },
    { id: "B1", name: "B1" },
    { id: "B2", name: "B2" },
    { id: "C", name: "C" }
  ];

  let desCover: Array<any> = [
    { id: "Basic Plan", name: "Basic Plan" },
    { id: "Rider", name: "Rider" },
    { id: "Basic Plan & Rider", name: "Basic Plan & Rider" }
  ];

  let exisHospital: Array<any> = [
    { id: "Private ", name: "Private " },
    { id: "Public", name: "Public" }
  ];

  let exisCovered: Array<any> = [
    { id: "A", name: "A" },
    { id: "B1", name: "B1" },
    { id: "B2", name: "B2" },
    { id: "C", name: "C" }
  ];

  let exisCover: Array<any> = [
    { id: "Basic Plan", name: "Basic Plan" },
    { id: "Rider", name: "Rider" },
    { id: "Basic Plan & Rider", name: "Basic Plan & Rider" }
  ];

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
    // dataIncome[groupdata].fundHospitalExpense[name] = value;
    
    // const resCapitalSum = capitalSumRequired(dataIncome[groupdata].fundHospitalExpense);
    // dataIncome[groupdata].fundHospitalExpense['capitalSumRequired'] = resCapitalSum;

    // const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].fundHospitalExpense);
    // dataIncome[groupdata].fundHospitalExpense['totalCashOutflow'] = resTotalCashOutflow;

    // const resTotal = totalAB(dataIncome[groupdata].fundHospitalExpense);
    // dataIncome[groupdata].fundHospitalExpense['total'] = resTotal;

    // const totalNetAmount = totalNetAmmount(dataIncome[groupdata].fundHospitalExpense);
    // dataIncome[groupdata].fundHospitalExpense['netAmountRequired'] = totalNetAmount;

    // setDependantData(dataIncome);
  }

  // Default Check
  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setAnswerDefaultCheck(checked, '', name)
  }
  
  // Additional Note
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;
    setAdditional(value, 8, name)
    
  }

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
       <table className="table-auto border-separate border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Fund Hospital Expense
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
                          formStyle="text-right" type="checkbox" checked={section7.answer.need.client[i][8]} onChange={(event) => handleClient(!section7.answer.need.client[i][8], i, 8) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                            formStyle="text-right" type="checkbox" checked={section7.answer.need.dependant[i][8]} onChange={(event) => handleDependant(!section7.answer.need.dependant[i][8], i, 8) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
              Desired Choice of Hospital Type
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Select
                    className="mb-10"
                    name="disiredChoiceOfHospitalType"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.disiredChoiceOfHospitalType}
                    datas={desHospital}
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
                    name="disiredChoiceOfHospitalType"
                    dataType="fundHospitalExpense"
                    value={section7.answer.dependantData[i].fundHospitalExpense.disiredChoiceOfHospitalType}
                    datas={desHospital}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Desired Choice of Ward Class
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Select
                    className="mb-10"
                    name="disiredChoiceOfWardClass"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.disiredChoiceOfWardClass}
                    datas={desWard}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <td className={``}>
                    <Select
                      className="mb-10"
                      name="disiredChoiceOfWardClass"
                      dataType="fundHospitalExpense"
                      value={section7.answer.dependantData[i].fundHospitalExpense.disiredChoiceOfWardClass}
                      datas={desWard}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Desired Type of Cover
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Select
                    className="mb-10"
                    name="desiredTypeOfCover"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.desiredTypeOfCover}
                    datas={desCover}
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
                    name="desiredTypeOfCover"
                    dataType="fundHospitalExpense"
                    value={section7.answer.dependantData[i].fundHospitalExpense.desiredTypeOfCover}
                    datas={desCover}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Name of Existing Hospitalization Plan (if any)
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
                    name="nameOfExistingHospitalizationPlan"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.nameOfExistingHospitalizationPlan}
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
                    name="nameOfExistingHospitalizationPlan"
                    dataType="fundHospitalExpense"
                    value={section7.answer.dependantData[i].fundHospitalExpense.nameOfExistingHospitalizationPlan}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Existing Type of Hospital Covered
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Select
                    className="mb-10"
                    name="existingTypeOfHospitalCovered"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.existingTypeOfHospitalCovered}
                    datas={exisHospital}
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
                    name="existingTypeOfHospitalCovered"
                    dataType="fundHospitalExpense"
                    value={section7.answer.dependantData[i].fundHospitalExpense.existingTypeOfHospitalCovered}
                    datas={exisHospital}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Existing Class of Ward Covered
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Select
                    className="mb-10"
                    name="existingClassOfWardCovered"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.existingClassOfWardCovered}
                    datas={exisCovered}
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
                    name="existingClassOfWardCovered"
                    dataType="fundHospitalExpense"
                    value={section7.answer.dependantData[i].fundHospitalExpense.existingClassOfWardCovered}
                    datas={exisCovered}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Existing Type of Cover
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Select
                    className="mb-10"
                    name="existingTypeOfCover"
                    dataType="fundHospitalExpense"
                    value={section7.answer.clientData[i].fundHospitalExpense.existingTypeOfCover}
                    datas={exisCover}
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
                    name="existingTypeOfCover"
                    dataType="fundHospitalExpense"
                    value={section7.answer.dependantData[i].fundHospitalExpense.existingTypeOfCover}
                    datas={exisCover}
                    handleChange={(event) => setDataDependant(event, i)}
                  />
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
                value={section7.additionalNote[8].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  )
}

export default FundHospitalExpenses