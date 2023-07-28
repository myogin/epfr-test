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

  let { need, totalNetSurplus } = useCashFlow();

  const handleInputChange = () => {

  }
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div
          className={`col-span-3`}
        ></div>
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
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        <div className={`col-span-3`}>
          <TextSmall className="text-green-deep">
            ANNUAL SURPLUS / SHORTFALL
          </TextSmall>
        </div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              {need ? (
                need[index] ? (
                  <>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-deep">0</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      dataType="monthly"
                      className="my-4"
                      type="text"
                      name="less"
                      formStyle="text-right"
                      value=""
                      handleChange={handleInputChange}
                    />
                    <Input
                      dataType="annualy"
                      className="my-4"
                      type="text"
                      name="less"
                      formStyle="text-right"
                      value=""
                      handleChange={handleInputChange}
                    />
                  </>
                )
              ) : (
                <>
                  <div className="text-right">
                    <span className="text-green-deep">-</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-deep">-</span>
                  </div>
                </>
              )}
            </>
          ))}
      </RowDinamycGrid>
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
            : "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
        }`}
      >
        {props.pfrType > 1 ? (
          <div
            className={`col-span-3`}
          ></div>
        ) : null}

        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              <div className={`${props.pfrType > 1 ? "col-span-2" : ""}`}>
                <TextArea
                  className="my-4"
                  label="Reason is needed if Surplus Is ≤ $0"
                  defaultValue="test text area"
                />
              </div>
            </>
          ))}
      </RowDinamycGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualNetCashFlow;
