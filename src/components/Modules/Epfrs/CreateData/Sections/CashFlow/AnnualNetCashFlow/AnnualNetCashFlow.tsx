import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import TextArea from "@/components/Forms/TextArea";
import { getLength } from "@/libs/helper";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import React, { useState } from "react";

interface Props {
  pfrType?: any;
}

const AnnualNetCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let getPfrLength = getLength(props.pfrType);

  let { totalNetSurplus } = useCashFlow();

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        }`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}></div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
        }`}
      >
        <div className={`${props.pfrType == 1 ? "col-span-3" : "col-span-2"}`}>
          <TextSmall className="text-green-deep">
            ANNUAL SURPLUS / SHORTFALL
          </TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={totalNetSurplus ? totalNetSurplus[0] : 0}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={totalNetSurplus ? totalNetSurplus[1] : 0}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
            </>
          ))}
      </RowDinamycGrid>
      <RowSingle>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <div key={index}>
              <TextArea
                className="my-4"
                label="Reason is needed if Surplus Is ≤ $0"
                defaultValue="test text area"
              />
            </div>
          ))}
      </RowSingle>
    </SectionCardSingleGrid>
  );
};

export default AnnualNetCashFlow;
