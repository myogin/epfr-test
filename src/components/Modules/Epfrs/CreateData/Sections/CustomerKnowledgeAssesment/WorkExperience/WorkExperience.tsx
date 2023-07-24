import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import Checkbox from "@/components/Forms/Checkbox";
import { getLength } from "@/libs/helper";
import { useCustomerKnowledgeAssesment } from "@/store/epfrPage/createData/customerKnowledgeAssesment";
import React from "react";
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
  const { answers, updateWork } = useCustomerKnowledgeAssesment();
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowSingle>
        <TitleSmall className="text-gray-light">
          Do you have at least 3 consecutive years of working experience for the
          last 10 years in any of ther following? *
        </TitleSmall>
      </RowSingle>

      {qa[0].answers?.length &&
        qa[0].answers.map((answer: any, index: number) => (
          <RowSingleJointGrid pfrType={2} key={index}>
            <div className="col-span-2 text-gray-light">{answer.answer}</div>
            <div className="grid-cols-2 grid">
              {getPfrLength.map((e2, userIndex) => (
                <>
                  <Checkbox
                    onChange={() => {
                      updateWork(userIndex, index);
                    }}
                    isChecked={answers[userIndex].work[index]}
                  />
                </>
              ))}
            </div>
          </RowSingleJointGrid>
        ))}
    </SectionCardSingleGrid>
  );
};

export default WorkExperience;
