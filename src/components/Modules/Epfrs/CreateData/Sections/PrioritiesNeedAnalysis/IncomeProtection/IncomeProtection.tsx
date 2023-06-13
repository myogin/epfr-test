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
  // console.log('props.datas',props.datas)
  const [incomeProtection, setIncomeProtection] = useState(props.datas);
  const [newIncomeProtectionNeedClient, setIncomeProtectionNeedClient] = useState<Need>(new Array(incomeProtection.typeClient).fill(false).map(() => {return new Array(14).fill(false);}));
  const [newIncomeProtectionNeedDependant, setIncomeProtectionNeedDependant] = useState<Need>(new Array(incomeProtection.totalDependant).fill(false).map(() => {return new Array(14).fill(false);}));

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
  }

  // Total Data Client & Deoendants
    let total = incomeProtection.typeClient + incomeProtection.totalDependant + 1;
    var totalClient = [];
    var totalDependant = [];
    for (var i = 0; i < incomeProtection.typeClient; i++) {
      totalClient.push(i);
    }

    for (var i = 0; i < incomeProtection.totalDependant; i++) {
      totalDependant.push(i);
    }

    console.log('newIncomeProtectionNeedClient',newIncomeProtectionNeedClient)

  // End

  const setData = (params: any) => {
    console.log('params', params);
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                    handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                      handleChange={(event) => setData(event.target.value)}
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
                handleChange={(event) => setData(event.target.value)}
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