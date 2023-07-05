import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBorder from "@/components/Forms/Buttons/ButtonBorder";
import ButtonBorderMedium from "@/components/Forms/Buttons/ButtonBorderMedium";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Input from "@/components/Forms/Input";
import { Datas } from "@/models/SectionThree";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import React, { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

interface Props {
  data?: any;
}

const AnnualIncomeCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let { data } = useCashFlow();

  const [annualGrossIncome, setAnnualGrossIncome] = useState<any>(0);
  const [additionalWages, setAdditionalWages] = useState<any>(0);
  const [other, setOther] = useState<any>(0);
  const [cpfContribution, setCpfContribution] = useState<any>(0);
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowTripleGrid>
        <div></div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Annual Gross Income</TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
              <Input
                className="my-4"
                formStyle="text-right"
                type="text"
                value={d.annualIncome.annualGrossIncome / 12}
                handleChange={(event) => setAnnualGrossIncome(event.target.value)}
              />
            </div>
            <div>
              <Input
                className="my-4"
                formStyle="text-right"
                type="text"
                value={d.annualIncome.annualGrossIncome * 12}
                handleChange={(event) => setAnnualGrossIncome(event.target.value)}
              />
            </div>
            </>
          ))}
        
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Additional Wages</TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right"
                value={d.annualIncome.additionalWages / 12}
                handleChange={(event) => setAdditionalWages(event.target.value)}
              />
            </div>
            <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right"
                value={d.annualIncome.additionalWages * 12}
                handleChange={(event) => setAdditionalWages(event.target.value)}
              />
            </div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div className="flex items-center justify-start">
          <TextSmall className="text-gray-light">Others</TextSmall>
          <ButtonBox className="text-green-deep">
            <AddLineIcon size={14} />
          </ButtonBox>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right"
                value={other}
                handleChange={(event) => setOther(event.target.value)}
              />
            </div>
            <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right"
                value={other}
                handleChange={(event) => setOther(event.target.value)}
              />
            </div>
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">
            Less Employee’s CPF Contribution
          </TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right"
                value={cpfContribution}
                handleChange={(event) => setCpfContribution(event.target.value)}
              />
            </div>
            <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right"
                value={cpfContribution}
                handleChange={(event) => setCpfContribution(event.target.value)}
              />
            </div>
            </>
          ))}
        
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-green-deep">ANNUAL NET INCOME</TextSmall>
        </div>
        {data?.length &&
          data.map((d, index) => (
            <>
              <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right text-green-deep"
                value={cpfContribution}
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
            <div>
              <Input
                className="my-4"
                type="text"
                formStyle="text-right text-green-deep"
                value={cpfContribution}
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
            </>
          ))}
        
      </RowTripleGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualIncomeCashFlow;
