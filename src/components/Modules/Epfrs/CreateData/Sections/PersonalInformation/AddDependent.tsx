import SubSectionCardDoubleGrid from '@/components/Attributes/Cards/SubSectionCardDoubleGrid'
import Input from '@/components/Forms/Input'
import React from 'react'

const AddDependent = () => {

    const setData = (params : any) => {
        console.log(params);
    }

  return (
    <SubSectionCardDoubleGrid>
        <div>
          <Input
            className="my-4"
            label="Relationship"
            type="text"
            placeholder="Child"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="my-4"
            label="NRIC"
            type="text"
            placeholder="12981289129"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="my-4"
            label="Date Of Birth"
            type="text"
            placeholder="20 January 2002"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="my-4"
            label="Sex"
            type="text"
            placeholder="Woman"
            handleChange={(event) => setData(event.target.value)}
          />
          
        </div>
        <div>
        <Input
            className="my-4"
            label="Name"
            type="text"
            placeholder="Michelle"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="my-4"
            label="Birth Cert Number"
            type="text"
            placeholder="00000"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="my-4"
            label="Age"
            type="text"
            placeholder="20"
            handleChange={(event) => setData(event.target.value)}
          />
          <Input
            className="my-4"
            label="Years to Support"
            type="text"
            placeholder="15"
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
    </SubSectionCardDoubleGrid>
  )
}

export default AddDependent