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


interface Props {
  datas?: Array<any>;
}

const FundDisability = (props : Props) => {
  const [sectionSeven, setSectionSeven] = useState<any>(props.datas);
  const [needClient, setNeedClient] = useState(sectionSeven.answer.need.client); //
  const [needDependant, setNeedDependant] = useState(sectionSeven.answer.need.dependant);
  const [clientData, setClienData] = useState(sectionSeven.answer.clientData)
  const [dependantData, setDependantData] = useState(sectionSeven.answer.dependantData)


  // Total Data Client & Deoendants
    let total = sectionSeven.typeClient + sectionSeven.totalDependant;
    var totalClient = [];
    var totalDependant = [];
    for (var i = 0; i < sectionSeven.typeClient; i++) {
      totalClient.push(i);
    }

    for (var i = 0; i < sectionSeven.totalDependant; i++) {
      totalDependant.push(i);
    }
  
  // Handle Checkbox Client & Dependant
  const handleClient = (i: any) => {
    const updatedClient = needClient.map((item: any, index: any) => {
      if(item[i] === true){
        item[i] = false;
      }else{
        item[i] = true;
      }
      return item;
    });
    setNeedClient(updatedClient);
  }

  const handleDependant = (i: any) => {
    const updatedDependant = needDependant.map((item: any, index: any) => {
      if(item[i] === true){
        item[i] = false;
      }else{
        item[i] = true;
      }
      return item;
    });
    setNeedDependant(updatedDependant);
    
    
  }

  // Set Client Data
  const setDataClient = (event: any, i: any) => {
    const groupdata = i;
    const { name, value } = event.target;
    const dataIncome = [...clientData];

    dataIncome[groupdata].clientId = groupdata+1;
    dataIncome[groupdata].fundDisabilityIncomeExpense[name] = value;

    const resCapitalSum = capitalSumRequired(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['capitalSumRequired'] = resCapitalSum;

    const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].fundDisabilityIncomeExpense);
    console.log('resTotalCashOutflow', resTotalCashOutflow)
    dataIncome[groupdata].fundDisabilityIncomeExpense['totalCashOutflow'] = resTotalCashOutflow;

    const resTotal = totalAB(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['total'] = resTotal;

    const totalNetAmount = totalNetAmmount(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['netAmountRequired'] = totalNetAmount;

    setClienData(dataIncome);
  }

  // Set Dependant Data
  const setDataDependant = (event: any, i: any) => {
    const groupdata = i;
    const { name, value } = event.target;
    const dataIncome = [...dependantData];
    dataIncome[groupdata].dependantId = groupdata+1;
    dataIncome[groupdata].fundDisabilityIncomeExpense[name] = value;
    
    const resCapitalSum = capitalSumRequired(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['capitalSumRequired'] = resCapitalSum;

    const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['totalCashOutflow'] = resTotalCashOutflow;

    const resTotal = totalAB(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['total'] = resTotal;

    const totalNetAmount = totalNetAmmount(dataIncome[groupdata].fundDisabilityIncomeExpense);
    dataIncome[groupdata].fundDisabilityIncomeExpense['netAmountRequired'] = totalNetAmount;

    setDependantData(dataIncome);
  }

  // Default Check
  const handleDefaultCheck = (e: any) => {
    const { name, checked, value } = e.target;
    setSectionSeven((prevState: any) => {
      const newDefault = {...prevState}
      newDefault.answer.defaultCheck[name] = checked
      return newDefault
    });
  }
  
  // Additional Note
  const handleAdditional = (e: any) => {
    const {name, value} = e.target;

    setSectionSeven((prevState: any) => {
      const resData = [...prevState.additionalNote];
      const additionalNote = resData.map((valueData, index) => {
        var res = valueData
        if(index === 1) {
          res = { ...valueData, [name]: value };
        }

        return res;
      });
      return { ...prevState, additionalNote };
    });
    
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
    var result = res.total - res.existingResources - res.existingInsuranceCoverageOnDisability;
    return isNaN(result) ? 0 : result.toFixed(2);
  }

  // End
  const setData = (params: any) => {
    console.log('params', params);
  };

  console.log('7.2', sectionSeven)

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <table className="table-auto border-separate border-spacing-5">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
              Fund Disability Income / Expense
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
                        <input type="checkbox" checked={needClient[i][2]} onChange={(event) => handleClient(i) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                          <input type="checkbox" checked={needDependant[i][2]} onChange={(event) => handleDependant(i) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="annualAmountNeeded"
                    value={clientData[i].fundDisabilityIncomeExpense.annualAmountNeeded}
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
                    value={dependantData[i].fundDisabilityIncomeExpense.annualAmountNeeded}
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
                    value={clientData[i].fundDisabilityIncomeExpense.numberOfYearsNeed}
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
                    value={dependantData[i].fundDisabilityIncomeExpense.numberOfYearsNeed}
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
                    value={clientData[i].fundDisabilityIncomeExpense.netRateOfReture}
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
                    value={dependantData[i].fundDisabilityIncomeExpense.netRateOfReture}
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
            <td className='align-top'>
              {
                (totalClient.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${clientData[i].fundDisabilityIncomeExpense.capitalSumRequired}
                  </TextSmall>
                :
                null
              }
            </td>
            <td className='align-top'>
              {
                (totalDependant.length > 0) ? 
                <TextSmall className="text-right uppercase text-green-deep">
                  ${dependantData[i].fundDisabilityIncomeExpense.capitalSumRequired}
                </TextSmall> : null
              }
            </td>
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-gray-light">
              Medical Expense ($)
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="medicalExpense"
                    value={clientData[i].fundDisabilityIncomeExpense.medicalExpense}
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
                    name="medicalExpense"
                    value={dependantData[i].fundDisabilityIncomeExpense.medicalExpense}
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
                <input type="checkbox" onChange={handleDefaultCheck} name="fund_disability_income_expense_mortgage" checked={sectionSeven.answer.defaultCheck.fund_disability_income_expense_mortgage}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                    value={clientData[i].fundDisabilityIncomeExpense.mortgage}
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
                    value={dependantData[i].fundDisabilityIncomeExpense.mortgage}
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
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    name="loans"
                    value={clientData[i].fundDisabilityIncomeExpense.loans}
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
                    name="loans"
                    value={dependantData[i].fundDisabilityIncomeExpense.loans}
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
              <td className='align-top'>
                {
                  (totalClient.length > 0) ? 
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${clientData[i].fundDisabilityIncomeExpense.totalCashOutflow}
                    </TextSmall>
                  :
                  null
                }
              </td>
              <td className='align-top'>
                {
                  (totalDependant.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${dependantData[i].fundDisabilityIncomeExpense.totalCashOutflow}
                  </TextSmall> : null
                }
              </td>
          </tr>
          <tr>
              <td className='align-top'>
              <TextSmall className="uppercase text-green-deep">
              TOTAL (A + B) ($)
              </TextSmall>
              </td>
              <td className='align-top'>
                {
                  (totalClient.length > 0) ? 
                    <TextSmall className="text-right uppercase text-green-deep">
                      ${clientData[i].fundDisabilityIncomeExpense.total}
                    </TextSmall>
                  :
                  null
                }
              </td>
              <td className='align-top'>
                {
                  (totalDependant.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${dependantData[i].fundDisabilityIncomeExpense.total}
                  </TextSmall> : null
                }
              </td>
          </tr>
          <tr>
            <td className='align-top'>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-end-1">
                <TextSmall className="text-gray-light">
                Less: existing insurance coverage on disability ($)
                </TextSmall>
                </div>
                <div className="col-span-1 mt-2">
                <input type="checkbox" onChange={handleDefaultCheck} name="fund_disability_income_expense_disability" checked={sectionSeven.answer.defaultCheck.fund_disability_income_expense_disability}  className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                    name="existingInsuranceCoverageOnDisability"
                    value={clientData[i].fundDisabilityIncomeExpense.existingInsuranceCoverageOnDisability}
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
                    name="existingInsuranceCoverageOnDisability"
                    value={dependantData[i].fundDisabilityIncomeExpense.existingInsuranceCoverageOnDisability}
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
                    value={clientData[i].fundDisabilityIncomeExpense.existingResources}
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
                    value={dependantData[i].fundDisabilityIncomeExpense.existingResources}
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
            <td className='align-top'>
              {
                (totalClient.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${clientData[i].fundDisabilityIncomeExpense.netAmountRequired}
                  </TextSmall>
                :
                null
              }
            </td>
            <td className='align-top'>
              {
                (totalDependant.length > 0) ? 
                <TextSmall className="text-right uppercase text-green-deep">
                  ${clientData[i].fundDisabilityIncomeExpense.netAmountRequired}
                </TextSmall> : null
              }
            </td>
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
                value={sectionSeven.additionalNote[2].note}
                handleChange={handleAdditional}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </SectionCardSingleGrid>
  )
}

export default FundDisability