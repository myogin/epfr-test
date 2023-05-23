import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import Checkbox from "@/components/Forms/Checkbox";
import React from "react";

const InvestmentExperience = () => {
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

export default InvestmentExperience;
