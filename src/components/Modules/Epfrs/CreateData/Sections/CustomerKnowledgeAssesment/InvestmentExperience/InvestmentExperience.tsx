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
  const { answers, updateInvestment } = useCustomerKnowledgeAssesment();
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowSingle>
        <TitleSmall className="text-gray-light">
          Have you transacted at least 6 times in a Collective Investment Scheme
          (eg. Unit Trust) or Investment Linked Policy (ILP) in the last 3
          years?
        </TitleSmall>
      </RowSingle>
      {/* {props.initData.every(checkValidate) ? (
        <RowSingleJointGrid pfrType={2} className="py-6">
          <div className="col-span-2"></div>
          <span className="text-xs font-normal text-red">Required</span>
        </RowSingleJointGrid>
      ) : (
        ""
      )} */}
      {qa[0].answers?.length &&
        qa[0].answers.map((answer: any, index: number) => (
          <RowSingleJointGrid pfrType={2} key={index}>
            <div className="col-span-2 text-gray-light">{answer.answer}</div>
            <div className="grid-cols-2 grid">
              {getPfrLength.map((e2, userIndex) => (
                <>
                  <Checkbox
                    onChange={() => {
                      updateInvestment(userIndex, index);
                    }}
                    isChecked={answers[userIndex].investment[index]}
                  />
                </>
              ))}
            </div>
          </RowSingleJointGrid>
        ))}
    </SectionCardSingleGrid>
  );
};

export default InvestmentExperience;
