import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import React, { useState } from "react";

const AnnualExpenseCashFlow = () => {
  const setData = (params: any) => {
    console.log(params);
  };

  const [annualGrossIncome, setAnnualGrossIncome] = useState<any>(0);

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowTripleGrid>
        <div></div>
        <div className="text-sm font-bold text-right">Monthly</div>
        <div className="text-sm font-bold text-right">Annual</div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Household</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Transportation</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Dependents</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Personal</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Luxury</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Insurance Premium</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-gray-light">Loan Repayment</TextSmall>
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
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
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
        <div>
          <Input
            className="my-4"
            formStyle="text-right"
            type="text"
            value={annualGrossIncome}
            handleChange={(event) => setData(event.target.value)}
          />
        </div>
      </RowTripleGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualExpenseCashFlow;
