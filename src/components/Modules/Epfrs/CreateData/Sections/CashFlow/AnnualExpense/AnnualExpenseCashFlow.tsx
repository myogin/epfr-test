import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Input from "@/components/Forms/Input";
import { AnnualExpanse } from "@/models/SectionThree";
import React, { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

interface Props {
  data?: any
}

const AnnualExpenseCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  // const [annualGrossIncome, setAnnualGrossIncome] = useState<any>(0);
  const [dataAnnualExpanse, setdataAnnualExpanse] = useState<AnnualExpanse[]>(props.data)

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowTripleGrid>
        <div></div>
        <div className="text-sm font-bold text-right">Monthly</div>
        <div className="text-sm font-bold text-right">Annual</div>
      </RowTripleGrid>
      {dataAnnualExpanse.map((value, index) => (
        <RowTripleGrid className="items-center" key={index}>
        <div>
          <TextSmall className="text-gray-light">{value.title}</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={value.values[0]}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={value.values[1]}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      ))}
      <RowTripleGrid className="items-center">
      <div className="flex items-center justify-start">
          <TextSmall className="text-gray-light">Others</TextSmall>
          <ButtonBox className="text-green-deep">
            <AddLineIcon size={14} />
          </ButtonBox>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value=""
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value=""
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-green-deep">ANNUAL NET EXPENSE</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value=""
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value=""
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualExpenseCashFlow;
