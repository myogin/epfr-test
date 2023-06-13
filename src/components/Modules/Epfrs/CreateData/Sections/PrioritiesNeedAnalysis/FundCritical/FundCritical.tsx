import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React from 'react'

const FundCritical = () => {
  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Fund Critical Illness Expense
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
              Annual Amount Needed ($)	
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
              Number of Years Needed
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
              Net Rate of Return (adjusted for inflation)
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
            <TextSmall className="uppercase text-green-deep">
            A CAPITAL SUM REQUIRED
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
              Medical Expense ($)
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
              Mortgage ($)
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
              <TextSmall className="text-gray-light">
              Loans / Others ($)
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
            <TextSmall className="uppercase text-green-deep">
            B. TOTAL CASH OUTFLOW ($)
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
            <TextSmall className="uppercase text-green-deep">
            TOTAL (A + B) ($)
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
              Less: existing insurance coverage on CI and/or Early CI ($)
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
              <TextSmall className="text-gray-light">
              Less: existing resource ($) (if any)
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

export default FundCritical