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
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import AddBoxFillIcon from "remixicon-react/AddBoxFillIcon";

interface Props {
  datas?: Array<any>;
}

const FundMediumToLong = () => {
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
    setAdditional(value, 4, name)
  }

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="table-auto border-separate border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Fund Medium to Long Term Savings / Investment Needs / Other Goals
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
                          formStyle="text-right" type="checkbox" checked={section7.answer.need.client[i][4]} onChange={(event) => handleClient(!section7.answer.need.client[i][4], i, 4) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                            formStyle="text-right" type="checkbox" checked={section7.answer.need.dependant[i][4]} onChange={(event) => handleDependant(!section7.answer.need.dependant[i][4], i, 1) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                Objective ($)
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
                      name="objective"
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.clientData[i].fundMediumToLongTerm.objective}
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
                      name="objective"
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.dependantData[i].fundMediumToLongTerm.objective}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>

          <tr>
            <td className='w-1/2 align-top'>
                <TextSmall className="text-gray-light">
                Goal Description
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
                      name="goalDescription"
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.clientData[i].fundMediumToLongTerm.goalDescription}
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
                      name="goalDescription"
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.dependantData[i].fundMediumToLongTerm.goalDescription}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>

          <tr>
            <td className='w-1/2 align-top'>
                <TextSmall className="text-gray-light">
                Years to Reach Goal
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
                      name="yearsToReachGoal"
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.clientData[i].fundMediumToLongTerm.yearsToReachGoal}
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
                      name="yearsToReachGoal"
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.dependantData[i].fundMediumToLongTerm.yearsToReachGoal}
                      handleChange={(event) => setDataDependant(event, i)}
                    />
                  </td>
                );
              })}
          </tr>

          <tr>
            <td className='w-1/2 align-top'>
                <TextSmall className="text-gray-light">
                Less : Future value of existing resources for goal ($)
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
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.clientData[i].fundMediumToLongTerm.less}
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
                      dataType="fundMediumToLongTerm"
                      value={section7.answer.dependantData[i].fundMediumToLongTerm.less}
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
                    ${section7.answer.clientData[i].fundMediumToLongTerm.netAmountRequired}
                  </TextSmall>
                </td>
                );
              })}

              {totalDependant.map(function (i) {
                return (
                <td className='align-top'>
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${section7.answer.dependantData[i].fundMediumToLongTerm.netAmountRequired}
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
                value={section7.additionalNote[4].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  )
}

export default FundMediumToLong