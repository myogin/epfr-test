import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SectionFive } from "@/models/SectionFive";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import { log } from "console";
import React, { useState, useRef } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import { qa } from "./data/questions";
interface Props {
  id?: any;
}

const RiskProfile = (props: Props) => {
  const [notReviewAll, setNotReviewAll] = useState(false);

  const scrollPosition = useScrollPosition(5);

  const [sectionFive, setSectionFive] = useState<SectionFive>({
    id: 0,
    need: [],
    reason: [],
    answers: [
      [1, -100, -100, -100, -100, -100, -100, -100, -100],
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
    ],
    riskCapacity: [0, 0, 0, 0],
    riskAttitude: [0, 0, 0, 0],
    issues: [],
    status: 0,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("section5", JSON.stringify(sectionFive));
  }

  // handle input change / state change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setSectionFive((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const checkboxChange = (event: any) => {
    setNotReviewAll(!notReviewAll);
    setSectionFive((prevState) => {
      return { ...prevState, ["need"]: [!notReviewAll] };
    });
  };

  function finalAnswer(statusQ: boolean, score: number, index: number) {
    const tempAnswer = sectionFive.answers[0];
    statusQ ? (tempAnswer[0] = score) : (tempAnswer[0] = -100);
    const newAnswer = [tempAnswer, ...sectionFive.answers.slice(1)];

    return newAnswer;
  }

  const updateAnswersState = (
    statusQ: boolean,
    score: number,
    index: number
  ) => {
    setSectionFive((pre) => {
      return {
        ...pre,
        answers: finalAnswer(statusQ, score, index),
      };
    });
  };

  const [q1State, setQ1State] = useState(
    new Array(qa[0].answers.length).fill(false)
  );

  const handleAnswerChange = (event: any, position: any) => {
    const resetCheckedState = new Array(qa[0].answers.length).fill(false);

    const updatedCheckedState = resetCheckedState.map((item, index) => {
      if (index === position) {
        return (item = !q1State[index]);
      }
      return item;
    });

    setQ1State(updatedCheckedState);
    let statusQ = event.target.checked;
    let index = 0;
    let score = parseInt(event.target.value);

    updateAnswersState(statusQ, score, index);
  };

  return (
    <div id={props.id}>
      <div
        id="section-header-5"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec5" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec5"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 5. Risk Profile
        </HeadingPrimarySection>
      </div>
      {!notReviewAll ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            5.1 Risk Profile Questionarie
            {/* <div className="flex items-start justify-start gap-4">
              <input
                type="checkbox"
                onChange={handleAnswerChange}
                ref={(ref) => {
                  textInputRefs.current[0] = ref;
                }}
                className="p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
              />
              qwe
            </div> */}
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            {qa?.length &&
              qa.map((qs, index) => (
                <div className="mb-4" key={index}>
                  <RowSingle>
                    <TitleSmall className="text-gray-light">
                      {qs.question}
                    </TitleSmall>
                  </RowSingle>
                  <RowSingle className="py-6">
                    <span className="text-xs font-normal text-red">
                      Required
                    </span>
                  </RowSingle>
                  {qs.answers.map((answer: any, indexB: any) => (
                    <RowSingle key={index + indexB}>
                      <Checkbox
                        value={answer.score}
                        onChange={(e) => {
                          handleAnswerChange(e, indexB);
                        }}
                        dataId={indexB}
                        name={`qs${index}[]`}
                        isChecked={q1State[indexB]}
                      />
                      <TextThin className="text-gray-light">
                        {answer.answer}
                      </TextThin>
                    </RowSingle>
                  ))}
                </div>
              ))}
          </SectionCardSingleGrid>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            5.2 Scoring Criteria
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowFourthGrid>
              <div></div>
              <div>Risk Capacity</div>
              <div>Risk Capacity</div>
              <div></div>
            </RowFourthGrid>
            <RowFourthGrid>
              <div>Result of Risk Profile</div>
              <div>0 Conservative</div>
              <div>9 Balanced</div>
              <div>BALANCED</div>
            </RowFourthGrid>
          </SectionCardSingleGrid>
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div className="mb-4">
          <Checkbox
            isChecked={notReviewAll}
            onChange={checkboxChange}
            lableStyle="text-sm font-normal text-gray-light"
            label="Not applicable"
          />
        </div>
        {notReviewAll ? (
          <div>
            <TextArea
              handleChange={handleInputChange}
              className="my-4"
              label="The Reason"
              name="reason"
            />
          </div>
        ) : (
          ""
        )}
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default RiskProfile;
