import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import React, { useState } from "react";

const AnnualIncomeCashFlow = () => {
  const setData = (params: any) => {
    console.log(params);
  };

  const [annualGrossIncome, setAnnualGrossIncome] = useState<any>(0);
  const [additionalWages, setAdditionalWages] = useState<any>(0);
  const [other, setOther] = useState<any>(0);
  const [cpfContribution, setCpfContribution] = useState<any>(0);
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowTripleGrid>
        <div></div>
        <div className="text-sm font-bold text-right">Monthly</div>
        <div className="text-sm font-bold text-right">Annual</div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Annual Gross Income</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setAnnualGrossIncome(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setAnnualGrossIncome(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Additional Wages</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            type="text"
            formStyle="text-right"
            value={additionalWages}
            handleChange={(event) => setAdditionalWages(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            type="text"
            formStyle="text-right"
            value={additionalWages}
            handleChange={(event) => setAdditionalWages(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Others</TextSmall>
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
        <div>
          <Input
            className="my-4"
            type="text"
            formStyle="text-right"
            value={other}
            handleChange={(event) => setOther(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">
            Less Employee’s CPF Contribution
          </TextSmall>
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
        <div>
          <Input
            className="my-4"
            type="text"
            formStyle="text-right"
            value={cpfContribution}
            handleChange={(event) => setCpfContribution(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-green-deep">ANNUAL NET INCOME</TextSmall>
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
        <div>
          <Input
            className="my-4"
            type="text"
            formStyle="text-right text-green-deep"
            value={cpfContribution}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualIncomeCashFlow;
