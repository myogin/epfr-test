import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

import React, { useState } from "react";

const MaternityPlan = () => {
  
  interface additionalMaternityPlan {
    clients: Array<any>,
    dependants: Array<any>,
    key: string
  }

  const [additionalMaternityPlan, setadditionalMaternityPlan] = useState<additionalMaternityPlan>([])

  const [inputFields, setInputFields] = useState([
      {key: '', clients: []}
  ])

  const addColumn = () => {
    let newfield = { key: '', clients: [] }

    setInputFields([...inputFields, newfield])
  }

  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          MATERNITY PLAN
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
              Amount Needed ($)
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
              <TextSmall className="uppercase text-green-deep">
              Less : 
              </TextSmall>
              </div>
              <div className="col-span-1 ">
                <input type="checkbox" className='p-2 mb-5 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
                <button className="ml-2 mt-2 text-xs rounded-md border border-gray-soft-strong w-fit" onClick={() => addColumn()}>
                  <AddLineIcon />
                </button>
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

            {inputFields.map((input, index) => {
                return (
                  <RowDoubleGrid>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-end-1">
                        <ButtonBox className="text-red">
                          <CloseLineIcon size={14} />
                        </ButtonBox>
                      </div>
                      <div className="col-span-3">
                        <Input
                          className="mb-4"
                          type="text"
                          placeholder="Add Key"
                          handleChange={(event) => setData(event.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Input
                        className="mb-4"
                        type="text"
                        placeholder="Add New Value"
                        handleChange={(event) => setData(event.target.value)}
                      />
                    </div>
                  </RowDoubleGrid>
                )
            })}

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

export default MaternityPlan