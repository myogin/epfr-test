import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import Checkbox from "@/components/Forms/Checkbox";
import React from "react";

const WorkExperience = () => {
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

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      {qa?.length &&
        qa.map((question, index) => (
          <div key={question.id}>
            <RowSingle>
              <TitleSmall className="text-gray-light">
                {question.question}
              </TitleSmall>
            </RowSingle>
            <RowSingle className="py-6">
              <span className="text-xs font-normal text-red">Required</span>
            </RowSingle>
            {question.answers?.length &&
              question.answers.map(
                (answer: any, indexAnswer: React.Key | undefined) => (
                  <RowSingle key={answer.id}>
                    <Checkbox />
                    <TextThin className="text-gray-light">
                      {answer.answer}
                    </TextThin>
                  </RowSingle>
                )
              )}
          </div>
        ))}
    </SectionCardSingleGrid>
  );
};

export default WorkExperience;
