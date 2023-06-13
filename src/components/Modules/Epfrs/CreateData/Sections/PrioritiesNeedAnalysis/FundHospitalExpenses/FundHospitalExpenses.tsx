import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowDoubleGrid from '@/components/Attributes/Rows/Grids/RowDoubleGrid'
import TextSmall from '@/components/Attributes/Typography/TextSmall'
import TextThin from '@/components/Attributes/Typography/TextThin'
import ButtonBox from '@/components/Forms/Buttons/ButtonBox'
import Checkbox from '@/components/Forms/Checkbox'
import Input from '@/components/Forms/Input'
import Select from '@/components/Forms/Select'
import React from 'react'

const FundHospitalExpenses = () => {
  let desHospital: Array<any> = [
    { id: "Private ", name: "Private " },
    { id: "Public", name: "Public" }
  ];

  let desWard: Array<any> = [
    { id: "A", name: "A" },
    { id: "B1", name: "B1" },
    { id: "B2", name: "B2" },
    { id: "C", name: "C" }
  ];

  let desCover: Array<any> = [
    { id: "Basic Plan", name: "Basic Plan" },
    { id: "Rider", name: "Rider" },
    { id: "Basic Plan & Rider", name: "Basic Plan & Rider" }
  ];

  let exisHospital: Array<any> = [
    { id: "Private ", name: "Private " },
    { id: "Public", name: "Public" }
  ];

  let exisCovered: Array<any> = [
    { id: "A", name: "A" },
    { id: "B1", name: "B1" },
    { id: "B2", name: "B2" },
    { id: "C", name: "C" }
  ];

  let exisCover: Array<any> = [
    { id: "Basic Plan", name: "Basic Plan" },
    { id: "Rider", name: "Rider" },
    { id: "Basic Plan & Rider", name: "Basic Plan & Rider" }
  ];

  const setData = (params: any) => {
    console.log('params', params);
  };
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div className="col-auto">
          <TextSmall className="uppercase text-gray-light">
          Fund Hospital Expense
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
              Desired Choice of Hospital Type
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="desHospital"
                datas={desHospital}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Desired Choice of Ward Class
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="desWard"
                datas={desWard}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Desired Type of Cover
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="desCover"
                datas={desCover}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Name of Existing Hospitalization Plan (if any)
              </TextSmall>
            </div>
            <div>
              <Input
                className="mb-4"
                type="text"
                placeholder="Name of Existing Hospitalization Plan (if any)"
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Existing Type of Hospital Covered
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="exisHospital"
                datas={exisHospital}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Existing Class of Ward Covered
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="exisCovered"
                datas={exisCovered}
              />
            </div>
          </RowDoubleGrid>

          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
              Existing Type of Cover
              </TextSmall>
            </div>
            <div>
              <Select
                dataType="clientInfo"
                className="mb-10"
                name="exisCover"
                datas={exisCover}
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

export default FundHospitalExpenses