import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import Select from '@/components/Forms/Select'
import React from 'react'

const EstatePlanning = () => {
  let planningWritten: Array<any> = [
    { id: 'Yes', name: "Yes" },
    { id: 'No', name: "No" }
  ];

  let planningDependants: Array<any> = [
    { id: 'Yes', name: "Yes" },
    { id: 'No', name: "No" }
  ];

  let planningAttorney: Array<any> = [
    { id: 'Yes', name: "Yes" },
    { id: 'No', name: "No" }
  ];

  let planningNomination: Array<any> = [
    { id: 'Yes', name: "Yes" },
    { id: 'No', name: "No" }
  ];

  let planningSection: Array<any> = [
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
          ESTATE PLANNING
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
              Do you have a Will written?
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="planningWritten"
                datas={planningWritten}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              When was it last updated?
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
            <div>
              <TextSmall className="text-gray-light">
              Were there any Provisions made for Special Needs Dependant's?
              </TextSmall>
            </div>
            <div>
            <Select
                dataType="clientInfo"
                className="mb-10"
                name="planningDependants"
                datas={planningDependants}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Have you given a Lasting Power Attorney?
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="planningAttorney"
                datas={planningAttorney}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Have you done your CPF nomination?
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="planningNomination"
                datas={planningNomination}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Have you named any beneficiaries under Section 49M / 49L?
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="planningSection"
                datas={planningSection}
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

export default EstatePlanning