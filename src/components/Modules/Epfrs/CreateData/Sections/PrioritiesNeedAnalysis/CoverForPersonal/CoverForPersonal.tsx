import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React from 'react'

const CoverForPersonal = () => {
  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Cover for Personal Accident
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
              mount Needed ($)
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
            <div className="grid grid-cols-3 gap-4">
              <div className="col-end-1">
              <TextSmall className="text-gray-light">
              Less : existing personal accident benefits ($)
              </TextSmall>
              </div>
              <div className="col-span-1 mt-2">
                <Checkbox/>
              </div>
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
            <TextSmall className="uppercase text-green-deep">
            Net amount required ($)
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

export default CoverForPersonal