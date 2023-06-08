import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import Select from '@/components/Forms/Select'
import React from 'react'

const OtherInsurance = () => {
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

  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      
      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Travel Insurance
          </TextSmall>
        </div>
        <div className="col-span-1">
          <div className="flex text-green-deep">Client 1</div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox /> <TextThin>Review</TextThin>
          </div>
        </div>
      </RowDoubleGrid>
      
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Frequency of Travel
              </TextSmall>
            </div>
            <div>
              <Input
                className="mb-4"
                type="text"
                placeholder="1,000,000"
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Type of Travel Insurance Covered
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="travelInsurance"
                datas={travelInsurance}
              />
            </div>
          </RowDoubleGrid>

      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Motor Insurance
          </TextSmall>
        </div>
        <div className="col-span-1">
          <div className="flex text-green-deep">Client 1</div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox /> <TextThin>Review</TextThin>
          </div>
        </div>
      </RowDoubleGrid>
      
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Company Name
              </TextSmall>
            </div>
            <div>
              <Input
                className="mb-4"
                type="text"
                placeholder="1,000,000"
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Renewal Date
              </TextSmall>
            </div>
            <div>
              <Input
                className="mb-4"
                type="date"
                placeholder="1,000,000"
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
          </RowDoubleGrid>


      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Would you be interested in knowing more and / or receiving quotes on the following range of insurance(s)? 
          </TextSmall>
        </div>
        <div className="col-span-1">
          <div className="flex text-green-deep">Client 1</div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox /> <TextThin>Review</TextThin>
          </div>
        </div>
      </RowDoubleGrid>
      
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Mortgage insurance
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="interestMortgage"
                datas={interestMortgage}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Group insurance (Company Employee Benefits)
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="interestGroup"
                datas={interestGroup}
              />
            </div>
          </RowDoubleGrid>

          

        <RowDoubleGrid>
          <div>
            <TextSmall className="text-gray-light">Additional Notes</TextSmall>
          </div>
          <div>
            <Input
              className="mb-4"
              type="text"
              placeholder="Additional Notes"
              handleChange={(event) => setData(event.target.value)}
            />
          </div>
        </RowDoubleGrid>
    </SectionCardSingleGrid>
  )
}

export default OtherInsurance