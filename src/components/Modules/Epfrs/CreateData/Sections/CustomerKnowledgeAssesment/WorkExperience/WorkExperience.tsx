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
const WorkExperience = (props: Props) => {
  let qa: Array<any> = [
    {
      id: 1,
      question:
        "Do you have at least 3 consecutive years of working experience for the last 10 years in any of ther following? *",
      answers: [
        { id: 1, answer: "Accountancy" },
        { id: 2, answer: "Actuarial Science" },
        { id: 3, answer: "Treasury" },
        { id: 4, answer: "Financial Risk Management" },
        {
          id: 5,
          answer: "Provision of legal advice in relevant financial areas",
        },
        {
          id: 6,
          answer:
            "Development / Structuring / Management / Training / Sale / Trading / Research on and Analysis of Investment Products",
        },
        { id: 7, answer: "No" },
      ],
    },
  ];
  let getPfrLength = getLength(props.pfrType);

  // zustand
  const { answers, updateWork, need } = useCustomerKnowledgeAssesment();

  const checkValidate = (e: any) => e == false;

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowSingle>
        <TitleSmall className="text-gray-light ">
          Do you have at least 3 consecutive years of working experience for the
          last 10 years in any of ther following? *
        </TitleSmall>
      </RowSingle>

      <RowSingleORDouble pfrType={props.pfrType}>
        {getPfrLength.map((e2, userIndex) => (
          <Fragment key={"sa"+userIndex}>
            {answers[userIndex].work.every(checkValidate) && need[userIndex] ? (
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
              <Fragment key={"sa"+userIndex}>
                <div>
                  <Checkbox
                    isDisabled={!need[userIndex]}
                    onChange={() => {
                      updateWork(userIndex, index, props.pfrType);
                    }}
                    isChecked={answers[userIndex].work[index]}
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

export default WorkExperience;
