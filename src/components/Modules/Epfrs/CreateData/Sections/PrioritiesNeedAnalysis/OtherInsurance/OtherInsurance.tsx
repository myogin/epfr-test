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

interface Props {
  datas?: Array<any>;
}

const OtherInsurance = (props : Props) => {
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

  let travelInsurance: Array<any> = [
    { id: "Single Trip", name: "Single Trip" },
    { id: "Annual Plan", name: "Annual Plan" },
    { id: "None At The Moment", name: "None At The Moment" }
  ];

  let interestMortgage: Array<any> = [
    { id: 'Yes', name: "Yes" },
    { id: 'No', name: "No" }
  ];

  let interestGroup: Array<any> = [
    { id: 'Yes', name: "Yes" },
    { id: 'No', name: "No" }
  ];

  
  // Total Data Client & Deoendants
  let total = section7.typeClient;
  var totalClient = [];
  var totalChildFund = [];
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


  // Set Client Data
  const setDataClient = (event: any, i: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setClient(value, i, name, groupdata);
  }

  // Additional Note
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;
    setAdditional(value, 11, name)
    
  }

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
       <table className="border-separate table-auto border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Travel Insurance
              </TextSmall>
            </td>
            { 
              (total > 1) ? 
              totalClient.map(function (i) {
                return (
                  <td key={"asasd"+i} className={``}>
                    <div className="text-right text-green-deep">Client {i+1} </div>
                    <div className="items-center justify-start gap-2 mb-10 text-right" id={`custome-checkbox-${i}`}>
                      <div className='items-start justify-start gap-4'>
                        <input type="checkbox" checked={section7.answer.need.client[i][11]} onChange={(event) => handleClient(!section7.answer.need.client[i][11], i, 11) } className='p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
              Frequency of Travel
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td key={"asasd"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="Value"
                    name="frequencyOfTravel"
                    dataType="otherInsures"
                    value={section7.answer.clientData[i].otherInsures.frequencyOfTravel}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Type of Travel Insurance Covered
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td key={"asasd"+i} className={``}>
                  <Select
                    className="mb-10"
                    name="typeOfTravelInsuranceCovered"
                    dataType="otherInsures"
                    value={section7.answer.clientData[i].otherInsures.typeOfTravelInsuranceCovered}
                    datas={travelInsurance}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>


          
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Motor Insurance
              </TextSmall>
            </td>
            { 
              (total > 1) ? 
              totalClient.map(function (i) {
                return (
                  <td key={"asasd"+i} className={``}>
                    <div className="text-right text-green-deep">Client {i+1} </div>
                    <div className="items-center justify-start gap-2 mb-10 text-right" id={`custome-checkbox-${i}`}>
                      <div className='items-start justify-start gap-4'>
                        <input type="checkbox" checked={section7.answer.need.client[i][12]} onChange={(event) => handleClient(!section7.answer.need.client[i][12], i, 12) } className='p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
              Company Name
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td key={"asasd"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="text"
                    placeholder="Value"
                    name="companyName"
                    dataType="otherInsures"
                    value={section7.answer.clientData[i].otherInsures.companyName}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Renewal Date
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td key={"asasd"+i} className={``}>
                  <Input
                    formStyle="text-right"
                    className="mb-10"
                    type="date"
                    placeholder="date"
                    name="renewalDate"
                    dataType="otherInsures"
                    value={section7.answer.clientData[i].otherInsures.renewalDate}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>

          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Would you be interested in knowing more and / or receiving quotes on the following range of insurance(s)? 
              </TextSmall>
            </td>
            { 
              (total > 1) ? 
              totalClient.map(function (i) {
                return (
                  <td key={"asasd"+i} className={``}>
                    <div className="text-right text-green-deep">Client {i+1} </div>
                    <div className="items-center justify-start gap-2 mb-10 text-right" id={`custome-checkbox-${i}`}>
                      <div className='items-start justify-start gap-4'>
                        <input type="checkbox" checked={section7.answer.need.client[i][13]} onChange={(event) => handleClient(!section7.answer.need.client[i][13], i, 13) } className='p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
              Mortgage insurance
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td key={"asasd"+i} className={``}>
                  <Select
                    className="mb-10"
                    name="mortgageInsurance"
                    dataType="otherInsures"
                    value={section7.answer.clientData[i].otherInsures.mortgageInsurance}
                    datas={interestMortgage}
                    handleChange={(event) => setDataClient(event, i)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td className='w-1/2 align-top'>
              <TextSmall className="text-gray-light">
              Group insurance (Company Employee Benefits)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td key={"asasd"+i} className={``}>
                  <Select
                    className="mb-10"
                    name="groupInsurance"
                    dataType="otherInsures"
                    value={section7.answer.clientData[i].otherInsures.groupInsurance}
                    datas={interestGroup}
                    handleChange={(event) => setDataClient(event, i)}
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
                value={section7.additionalNote[11].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>

    </SectionCardSingleGrid>
  )
}

export default OtherInsurance