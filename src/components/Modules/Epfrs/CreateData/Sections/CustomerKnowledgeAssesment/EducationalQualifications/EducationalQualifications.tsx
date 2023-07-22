import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import Checkbox from "@/components/Forms/Checkbox";
import React, { useEffect, useState } from "react";
import MultipleCheckbox from "../components/MultipleCheckbox";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
interface Props {
  initData: any;
  updateState: (index1: number, index2: number) => void;
  pfrType: number;
}

const EducationalQualifications = (props: Props) => {
  let qa: Array<any> = [
    {
      id: 1,
      question:
        "Do you have a Diploma or higher qualication(s) in any of the following?",
      answers: [
        { id: 1, answer: "Accountancy" },
        { id: 2, answer: "Actuarial Science" },
        { id: 3, answer: "Capital Markets" },
        { id: 4, answer: "Commerce" },
        { id: 5, answer: "Computational Finance" },
        {
          id: 6,
          answer: "Business / Business Studies / Administration / Management",
        },
        { id: 7, answer: "Economics" },
        { id: 8, answer: "Finance" },
        { id: 9, answer: "Financial Engineering" },
        { id: 10, answer: "Financial Planning" },
        { id: 11, answer: "Insurance" },
        { id: 12, answer: "No" },
      ],
    },
    {
      id: 2,
      question:
        "Do you have a professional finanace-related qualification(s) in any of the following?",
      answers: [
        { id: 1, answer: "Chartered Financial Analyst (CFA)" },
        { id: 2, answer: "Chartered Institute of Securities & Investment" },
        { id: 3, answer: "Chartered Alternative Investment Analyst (CAIA)" },
        { id: 4, answer: "Certified Financial Technician (CFTe)" },
        { id: 5, answer: "Financial Risk Manager (FRM)" },
        { id: 6, answer: "Chartered Financial Consultant (ChFC)" },
        { id: 7, answer: "Associate Financial Planner (AFP)" },
        { id: 8, answer: "Associate Wealth Planner (AWP)" },
        { id: 9, answer: "Certified Financial Planner (CFP)" },
        { id: 10, answer: "CMFAS Exams (M8 & M8A, or M9& M9A, or M6 & M7)" },
        { id: 11, answer: "No" },
      ],
    },
  ];

  const checkValidate = (data: boolean) => data === false;

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowSingle>
        <TitleSmall className="text-gray-light">
          1. Do you have a Diploma or higher qualication(s) in any of the
          following?
        </TitleSmall>
      </RowSingle>

      {props.initData[0].every(checkValidate) ? (
        <RowSingle className="py-6">
          <span className="text-xs font-normal text-red">Required</span>
        </RowSingle>
      ) : (
        ""
      )}

      {qa[0].answers?.length &&
        qa[0].answers.map((answer: any, index: number) => (
          <RowSingleJointGrid pfrType={props.pfrType} key={index}>
            <TextThin className="text-gray-light">{answer.answer}</TextThin>
            <Checkbox
              onChange={() => props.updateState(0, index)}
              isChecked={props.initData[0][index]}
            />
          </RowSingleJointGrid>
        ))}

      {/*  */}
      <RowSingle>
        <TitleSmall className="text-gray-light">
          2. Do you have a professional finanace-related qualification(s) in any
          of the following?
        </TitleSmall>
      </RowSingle>
      {props.initData[1].every(checkValidate) ? (
        <RowSingle className="py-6">
          <span className="text-xs font-normal text-red">Required</span>
        </RowSingle>
      ) : (
        ""
      )}
      {qa[1].answers?.length &&
        qa[1].answers.map((answer: any, index: number) => (
          <RowSingle key={answer.id}>
            <Checkbox
              onChange={() => props.updateState(1, index)}
              isChecked={props.initData[1][index]}
            />
            <TextThin className="text-gray-light">{answer.answer}</TextThin>
          </RowSingle>
        ))}
    </SectionCardSingleGrid>
  );
};

export default EducationalQualifications;
