import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import RowSingleORDouble from "@/components/Attributes/Rows/Grids/RowSingleORDouble";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import Checkbox from "@/components/Forms/Checkbox";
import { getLength } from "@/libs/helper";
import { useCustomerKnowledgeAssesment } from "@/store/epfrPage/createData/customerKnowledgeAssesment";
import React, { Fragment } from "react";
interface Props {
  pfrType: number;
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
  let getPfrLength = getLength(props.pfrType);

  // zustand
  const { answers, updateInvestment, need } = useCustomerKnowledgeAssesment();
  const checkValidate = (e: any) => e == false;

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowSingle>
        <TitleSmall className="text-gray-light ">
          Have you transacted at least 6 times in a Collective Investment Scheme
          (eg. Unit Trust) or Investment Linked Policy (ILP) in the last 3
          years?
        </TitleSmall>
      </RowSingle>

      <RowSingleORDouble pfrType={props.pfrType}>
        {getPfrLength.map((e2, userIndex) => (
          <Fragment key={"as"+userIndex}>
            {answers[userIndex].investment.every(checkValidate) &&
            need[userIndex] ? (
              <div className="text-xs font-normal text-red">Required</div>
            ) : (
              <div></div>
            )}
          </Fragment>
        ))}
      </RowSingleORDouble>

      {props.pfrType > 1 ? (
        <RowSingleORDouble pfrType={props.pfrType}>
          <div>Client 1</div>
          <div>Client 2</div>
        </RowSingleORDouble>
      ) : (
        ""
      )}

      {qa[0].answers?.length &&
        qa[0].answers.map((answer: any, index: number) => (
          <RowSingleORDouble pfrType={props.pfrType} key={index}>
            {getPfrLength.map((e2, userIndex) => (
              <Fragment key={"asa"+userIndex}>
                <div>
                  <Checkbox
                    isDisabled={!need[userIndex]}
                    onChange={() => {
                      updateInvestment(userIndex, index, props.pfrType);
                    }}
                    isChecked={answers[userIndex].investment[index]}
                    label={answer.answer}
                  />
                </div>
              </Fragment>
            ))}
          </RowSingleORDouble>
        ))}
    </SectionCardSingleGrid>
  );
};

export default InvestmentExperience;
