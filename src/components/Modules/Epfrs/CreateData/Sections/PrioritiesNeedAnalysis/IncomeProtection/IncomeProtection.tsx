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
  const [newIncomeProtectionNeedClient, setIncomeProtectionNeedClient] = useState<Need>({
    client: 0,
    dependant: 0,
  });

  const [isChecked, setIsChecked] = useState(
    (incomeProtection.need.client.length > 0) ? incomeProtection.need.client[0][0] : false
  );

  const handleReview = () => {
    setIsChecked(!isChecked);
    console.log('incomeProtectionNeedClient',newIncomeProtectionNeedClient)
    setIncomeProtectionNeedClient({
      ...newIncomeProtectionNeedClient[0],
      client: 1,
    });

    console.log('asdasdasd', newIncomeProtectionNeedClient)

  }

  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <>
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          <div className="col-auto">
            <TextSmall className="uppercase text-gray-light">
              Income Protection Upon Death
            </TextSmall>
          </div>
          <div className="col-span-1">
            <div className="flex text-green-deep">Client 1 </div>
            <div className="flex items-center justify-start gap-2">
              <Checkbox isChecked={isChecked} onChange={handleReview}/> <TextThin>Review</TextThin>
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
              A. CAPITAN SUM REQUIRED
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
            <TextSmall className="text-gray-light">Final Expense ($)</TextSmall>
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
            <div className="col-span-1">
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
              Personal Debts ($)
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
          <div className="grid grid-cols-3 gap-4">
            <div className="col-end-1">
              <TextSmall className="text-gray-light">Others ($)</TextSmall>
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
            <TextSmall className="text-green-deep">
              B. TOTAL CASH OUT FLOW ($)
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
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          <div>
            <TextSmall className="text-green-deep">TOTAL A + B ($)</TextSmall>
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
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
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
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          <div>
            <TextSmall className="uppercase text-green-deep">
              NET AMPUNT REQUIRED ($)
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
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          <div>
            <TextSmall className="text-gray-light">
              Less: existing insurance coverage on death ($)
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

      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </>
  )
}

export default IncomeProtection