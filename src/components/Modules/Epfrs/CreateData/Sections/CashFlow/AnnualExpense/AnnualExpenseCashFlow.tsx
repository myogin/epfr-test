import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDinamycGrid from "@/components/Attributes/Rows/Grids/RowDinamycGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import Input from "@/components/Forms/Input";
import { getLength } from "@/libs/helper";
import { AnnualExpanse } from "@/models/SectionThree";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import React, { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";

interface Props {
  pfrType?: number;
}
const AnnualExpenseCashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let getPfrLength = getLength(props.pfrType);

  let { annualExpense } = useCashFlow();

  let arrPfrType: any[];

  if (props.pfrType == 1) {
    arrPfrType = [0];
  } else {
    arrPfrType = [0, 1];
  }

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDinamycGrid
        className={`${
          props.pfrType == 1
            ? "lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-3"
            : "lg:grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
        }`}
      >
        <div></div>
        {getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <>
              <div className="text-sm font-bold text-right">Monthly</div>
              <div className="text-sm font-bold text-right">Annual</div>
            </>
          ))}
      </RowDinamycGrid>
      {props.pfrType == 1 ? (
        <>
          {annualExpense.map((data, index) => (
            <RowTripleGrid className="items-center" key={index}>
              <div>
                <TextSmall className="text-gray-light">{data.title}</TextSmall>
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={data.values[0]}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={data.values[1]}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
            </RowTripleGrid>
          ))}
        </>
      ) : (
        <>
          {annualExpense.map((data, index) => (
            <RowTripleGrid className="items-center" key={index}>
              <div>
                <TextSmall className="text-gray-light">{data.title}</TextSmall>
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={data.values[0]}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={data.values[1]}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={data.values[2]}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <Input
                  className="my-4"
                  formStyle="text-right"
                  type="text"
                  value={data.values[3]}
                  handleChange={(event) => setData(event.target.value)}
                />
              </div>
            </RowTripleGrid>
          ))}
        </>
      )}

      <RowTripleGrid className="items-center">
        <div className="flex items-center justify-start">
          <TextSmall className="text-gray-light">Others</TextSmall>
          <ButtonBox className="text-green-deep">
            <AddLineIcon size={14} />
          </ButtonBox>
        </div>

        {arrPfrType?.length &&
          arrPfrType.map((dataValue, index) => (
            <>
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
            </>
          ))}
      </RowTripleGrid>
      <RowTripleGrid className="items-center">
        <div>
          <TextSmall className="text-green-deep">ANNUAL NET EXPENSE</TextSmall>
        </div>

        {arrPfrType?.length &&
          arrPfrType.map((dataValue, index) => (
            <>
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
            </>
          ))}
      </RowTripleGrid>
    </SectionCardSingleGrid>
  );
};

export default AnnualExpenseCashFlow;
