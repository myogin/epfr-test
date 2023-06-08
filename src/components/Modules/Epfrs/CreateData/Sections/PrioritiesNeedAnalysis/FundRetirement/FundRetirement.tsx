import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import React from 'react'
import Select from '@/components/Forms/Select'

const FundRetirement = () => {
   // Variable Select Box
   let incomeMethod: Array<any> = [
    { id: 0, name: "Annual Income" },
    { id: 1, name: "Annual Expense" }
  ];

  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Fund Retirement Lifestyle
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
              Expected Retirement Age
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
              Number of Years to Retirement
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
              Either Income Method of Calculation
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="clientTitle"
                datas={incomeMethod}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Less : Future value of existing resources for goal ($)
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
              Annual Income ($)
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
              Rate of Income Increment (%)
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
              Income at Retirement Age ($)
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
              (%) of Income Required at Retirement Age
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
{/* -- */}
        <RowDoubleGrid>
          <div>
            <TextSmall className="uppercase text-green-deep">
            Income required at Retirement ($)
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
              Retirement Expense (in today's value) ($)
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
              Inflation Rate (%)
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

{/* -- */}
        <RowDoubleGrid>
          <div>
            <TextSmall className="uppercase text-green-deep">
            Expenses at Retirement ($)
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
                Years to Receive Retirement Income
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
                <TextSmall className="text-gray-light">
                Amount Needed at Retirement Age ($)
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
                Less : Future value of existing resource for retirement ($)
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

{/* -- */}
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

export default FundRetirement