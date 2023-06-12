import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React, {useState} from 'react'
import Dependent from '../../PersonalInformation/Dependent'

interface Props {
  datas?: Array<any>;
}

interface Need {
  client: boolean[][];
  dependant: boolean[][];
}

const IncomeProtection = (props : Props) => {
  const [sectionSeven, setSectionSeven] = useState(props.datas);
  const [newIncomeProtectionNeedClient, setIncomeProtectionNeedClient] = useState(sectionSeven.answer.need.client); //
  const [newIncomeProtectionNeedDependant, setIncomeProtectionNeedDependant] = useState(sectionSeven.answer.need.dependant);
  const [newIncomeProtection, setIncomeProtection] = useState(sectionSeven.answer.clientData)

  // Total Data Client & Deoendants
    let total = sectionSeven.typeClient + sectionSeven.totalDependant + 1;
    var totalClient = [];
    var totalDependant = [];
    for (var i = 0; i < sectionSeven.typeClient; i++) {
      totalClient.push(i);
    }

    for (var i = 0; i < sectionSeven.totalDependant; i++) {
      totalDependant.push(i);
    }

  // End
  const handleClient = (i) => {
    console.log('u',i)
    const updatedClient = newIncomeProtectionNeedClient.map((item, index) => {
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
    console.log('updatedClient', updatedClient)
    console.log('dataIncome', sectionSeven)
    console.log('props.datas',props.datas)

  }

  const handleDependant = (i) => {
    const updatedDependant = newIncomeProtectionNeedDependant.map((item, index) => {
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
    console.log('dataIncome', sectionSeven)
    console.log('props.datas',props.datas)
  }

  const setDataClient = (event: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    const dataIncome = [...newIncomeProtection];
    dataIncome[groupdata].incomeProtectionUponDeath[name] = value;
    setIncomeProtection(dataIncome);
    console.log('dataIncome', sectionSeven)
    console.log('props.datas',props.datas)
  };

  return (
    <>
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <div className={`grid grid-cols-1 gap-3 mb-10`}>
        <div className={`grid-span-1`}>
          <TextSmall className="uppercase text-gray-light">
            Income Protection Upon Death
          </TextSmall>
        </div>
      </div>

      <table className="table-auto">
        <tbody className="">
          <tr>
            <td className='align-top'>
              <TextSmall className="uppercase text-gray-light">
                Income Protection Upon Death
              </TextSmall>
            </td>
            {totalClient.map(function (i) {
              return (
                <td className={``}>
                  <div className="flex text-green-deep">Client {i+1} </div>
                  <div className="flex items-center justify-start gap-2 mb-10" id={`custome-checkbox-${i}`} name={i} value="true">
                    <Checkbox isChecked={newIncomeProtectionNeedClient[i][0]} onChange={(event) => handleClient(i) }/> <TextThin>Review</TextThin>
                  </div>
                </td>
              );
            })}

            {totalDependant.map(function (i) {
              return (
                <td className={``}>
                  <div className="flex text-green-deep">Dependant {i+1} </div>
                  <div className="flex items-center justify-start gap-2 mb-10">
                    <Checkbox isChecked={newIncomeProtectionNeedDependant[i][0]} onChange={() => handleDependant(i)}/> <TextThin>Review</TextThin>
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className=' align-top'>
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
                    dataType={i}
                    value={newIncomeProtection[i].incomeProtectionUponDeath.annualAmountNeeded}
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
                  />
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
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
                <td className={``}>
                  <Input
                    className="mb-10"
                    type="text"
                    placeholder="1,000,000"
                    handleChange={setDataClient}
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
                    handleChange={setDataClient}
                  />
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
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="uppercase text-green-deep">
              NET AMPUNT REQUIRED ($)
            </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
                    />
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className='align-top'>
            <TextSmall className="text-gray-light">
              Less: existing insurance coverage on death ($)
            </TextSmall>
            </td>
            {totalClient.map(function (i) {
                return (
                  <td className={``}>
                    <Input
                      className="mb-10"
                      type="text"
                      placeholder="1,000,000"
                      handleChange={setDataClient}
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
                      handleChange={setDataClient}
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
            <td colSpan={total}>
              <Input
                className="mb-10"
                type="text"
                placeholder="Additional Notes"
                handleChange={setDataClient}
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