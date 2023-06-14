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

interface Need {
  client: boolean[][];
  dependant: boolean[][];
}

const IncomeProtection = (props : Props) => {
  const [sectionSeven, setSectionSeven] = useState<any>(props.datas);
  const [newIncomeProtectionNeedClient, setIncomeProtectionNeedClient] = useState(sectionSeven.answer.need.client); //
  const [newIncomeProtectionNeedDependant, setIncomeProtectionNeedDependant] = useState(sectionSeven.answer.need.dependant);
  const [newIncomeProtection, setIncomeProtection] = useState(sectionSeven.answer.clientData)
  const [newIncomeProtectionDep, setIncomeProtectionDep] = useState(sectionSeven.answer.dependantData)

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

  // End
  const handleClient = (i: any) => {
    const updatedClient = newIncomeProtectionNeedClient.map((item: any, index: any) => {
      if(index === i){
        if(item[0] === true){
          item[0] = false;
        }else{
          item[0] = true;
        }
      } 
      return item;
    });
    setIncomeProtectionNeedClient(updatedClient);
  }

  const handleDependant = (i: any) => {
    const updatedDependant = newIncomeProtectionNeedDependant.map((item: any, index: any) => {
      if(index === i){
        if(item[0] === true){
          item[0] = false;
        }else{
          item[0] = true;
        }
      } 
      return item;
    });
    setIncomeProtectionNeedDependant(updatedDependant);
    
    
  }

  const setDataClient = (event: any, i: any) => {
    const groupdata = i;
    const { name, value } = event.target;
    const dataIncome = [...newIncomeProtection];

    dataIncome[groupdata].clientId = groupdata+1;
    dataIncome[groupdata].incomeProtectionUponDeath[name] = value;

    const resCapitalSum = capitalSumRequired(dataIncome[groupdata].incomeProtectionUponDeath);    
    dataIncome[groupdata].incomeProtectionUponDeath['capitalSumRequired'] = resCapitalSum;

    const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['totalCashFlow'] = resTotalCashOutflow;

    const resTotal = totalAB(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['total'] = resTotal;

    const totalNetAmount = totalNetAmmount(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['netAmountRequired'] = totalNetAmount;

    setIncomeProtection(dataIncome);

    // console.log('sectionseven', sectionSeven)
  };

  const setDataDependant = (event: any, i: any) => {
    const groupdata = i;
    const { name, value } = event.target;
    const dataIncome = [...newIncomeProtectionDep];
    dataIncome[groupdata].dependantId = groupdata+1;
    dataIncome[groupdata].incomeProtectionUponDeath[name] = value;
    
    const resCapitalSum = capitalSumRequired(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['capitalSumRequired'] = resCapitalSum;

    const resTotalCashOutflow = totalCashOutflow(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['totalCashFlow'] = resTotalCashOutflow;

    const resTotal = totalAB(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['total'] = resTotal;

    const totalNetAmount = totalNetAmmount(dataIncome[groupdata].incomeProtectionUponDeath);
    dataIncome[groupdata].incomeProtectionUponDeath['netAmountRequired'] = totalNetAmount;

    setIncomeProtectionDep(dataIncome);
  };

  const getPV = (fv:any, rate:any, n: any) =>{
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
      console.log('sum', sum);
    }
    return sum.toFixed(2);
  }

  // Rumus
  const capitalSumRequired = (res: any) => {
    var result = getPV(
      res.annualAmountNeeded,
      res.netRateOfReture / 100,
      res.numberOfYearsNeed
    );

    return isNaN(result) ? 0 : result;
  }

  const totalCashOutflow = (res:any) => {
    var result = parseFloat(res.finalExpense) + parseFloat(res.emergencyFund) + parseFloat(res.mortgage) + parseFloat(res.personalDebts) + parseFloat(res.others);
    return isNaN(result) ? 0 : result.toFixed(2);
  }

  const totalAB = (res: any) => {
    var result = parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashFlow);
    return isNaN(result) ? 0 : result.toFixed(2);
  }

  const totalNetAmmount = (res: any) => {
    var result = res.total - res.existingResources - res.existingInsuranceCoverageOnDeath;
    return isNaN(result) ? 0 : result.toFixed(2);
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
                        <input type="checkbox" checked={newIncomeProtectionNeedClient[i][0]} onChange={(event) => handleClient(i) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                          <input type="checkbox" checked={newIncomeProtectionNeedDependant[i][0]} onChange={(event) => handleDependant(i) } className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
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
                    value={newIncomeProtection[i].incomeProtectionUponDeath.annualAmountNeeded}
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
                    value={newIncomeProtectionDep[i].incomeProtectionUponDeath.annualAmountNeeded}
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.numberOfYearsNeed}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.numberOfYearsNeed}
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.netRateOfReture}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.netRateOfReture}
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
            <td>
              {
                (totalClient.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${newIncomeProtection[i].incomeProtectionUponDeath.capitalSumRequired}
                  </TextSmall>
                :
                null
              }
            </td>
            <td>
              {
                (totalDependant.length > 0) ? 
                <TextSmall className="text-right uppercase text-green-deep">
                  ${newIncomeProtectionDep[i].incomeProtectionUponDeath.capitalSumRequired}
                </TextSmall> : null
              }
            </td>
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.finalExpense}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.finalExpense}
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.emergencyFund}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.emergencyFund}
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
                <Checkbox/>
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.mortgage}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.mortgage}
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
                  <Checkbox/>
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.personalDebts}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.personalDebts}
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
                  <Checkbox/>
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
                    value={newIncomeProtection[i].incomeProtectionUponDeath.others}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.others}
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
            <td>
              {
                (totalClient.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${newIncomeProtection[i].incomeProtectionUponDeath.totalCashFlow}
                  </TextSmall>
                :
                null
              }
            </td>
            <td>
              {
                (totalDependant.length > 0) ? 
                <TextSmall className="text-right uppercase text-green-deep">
                  ${newIncomeProtectionDep[i].incomeProtectionUponDeath.totalCashFlow}
                </TextSmall> : null
              }
            </td>
          </tr>
          <tr>
            <td className='align-top'>
              <TextSmall className="text-green-deep">TOTAL A + B ($)</TextSmall>  
            </td>
            <td>
              {
                (totalClient.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                  ${newIncomeProtection[i].incomeProtectionUponDeath.total}
                  </TextSmall>
                :
                null
              }
            </td>
            <td>
              {
                (totalDependant.length > 0) ? 
                <TextSmall className="text-right uppercase text-green-deep">
                  ${newIncomeProtectionDep[i].incomeProtectionUponDeath.total}
                </TextSmall> : null
              }
            </td>
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
                  <Checkbox/>
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.existingInsuranceCoverageOnDeath}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.existingInsuranceCoverageOnDeath}
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
                      value={newIncomeProtection[i].incomeProtectionUponDeath.existingResources}
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
                      value={newIncomeProtectionDep[i].incomeProtectionUponDeath.existingResources}
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
            <td>
              {
                (totalClient.length > 0) ? 
                  <TextSmall className="text-right uppercase text-green-deep">
                    ${newIncomeProtection[i].incomeProtectionUponDeath.netAmountRequired}
                  </TextSmall>
                :
                null
              }
            </td>
            <td>
              {
                (totalDependant.length > 0) ? 
                <TextSmall className="text-right uppercase text-green-deep">
                  ${newIncomeProtectionDep[i].incomeProtectionUponDeath.netAmountRequired}
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