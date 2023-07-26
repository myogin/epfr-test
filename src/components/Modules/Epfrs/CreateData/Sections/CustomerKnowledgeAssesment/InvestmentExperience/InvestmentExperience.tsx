import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import Checkbox from "@/components/Forms/Checkbox";
import React from "react";
interface Props {
  initData: any;
  updateState: (index: number) => void;
}
const InvestmentExperience = (props: Props) => {
  let qa: Array<any> = [
    {
      id: 1,
      question:
        "Have you transacted at least 6 times in a Collective Investment Scheme (eg. Unit Trust) or Investment Linked Policy (ILP) in the last 3 years? ",
      answers: [
        { id: 1, answer: "Unit Trust" },
        { id: 2, answer: "Investment-linked Policy" },
        { id: 3, answer: "No" },
      ],
    },
  ];
  const checkValidate = (data: boolean) => data === false;
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowSingle>
        <TitleSmall className="text-gray-light">
          Have you transacted at least 6 times in a Collective Investment Scheme
          (eg. Unit Trust) or Investment Linked Policy (ILP) in the last 3
          years?
        </TitleSmall>
      </RowSingle>
      {props.initData.every(checkValidate) ? (
        <RowSingle className="py-6">
          <span className="text-xs font-normal text-red">Required</span>
        </RowSingle>
      ) : (
        ""
      )}
      {qa[0].answers?.length &&
        qa[0].answers.map((answer: any, index: number) => (
          <RowSingle key={answer.id}>
            <Checkbox
              onChange={() => props.updateState(index)}
              isChecked={props.initData[index]}
            />
            <TextThin className="text-gray-light">{answer.answer}</TextThin>
          </RowSingle>
        ))}
    </SectionCardSingleGrid>
  );
};

export default InvestmentExperience;
