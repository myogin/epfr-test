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
import React, { useState, useRef, useEffect } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import {
  qa,
  calcRiskCapacity,
  calcRiskAttitude,
  getStatusRiskCapacity,
  getStatusRiskAttitude,
  getResultStatus,
} from "./data/questions";
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
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
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

  function finalAnswer(
    statusQ: boolean,
    score: number,
    user: number,
    question: number
  ) {
    const tempAnswer = sectionFive.answers[user];
    statusQ ? (tempAnswer[question] = score) : (tempAnswer[question] = -100);
    let newAnswer;
    if (user === 0) {
      newAnswer = [tempAnswer, ...sectionFive.answers.slice(1)];
    } else {
      newAnswer = [
        ...sectionFive.answers.slice(0, 1),
        tempAnswer,
        ...sectionFive.answers.slice(2),
      ];
    }

    return newAnswer;
  }

  const updateAnswersState = (
    statusQ: boolean,
    score: number,
    user: number,
    question: number
  ) => {
    setSectionFive((pre) => {
      return {
        ...pre,
        answers: finalAnswer(statusQ, score, user, question),
      };
    });
  };

  const [riskCapacity, setRiskCapacity] = useState<number[]>([0, 0, 0, 0]);
  const [riskAttitude, setRiskAttitude] = useState<number[]>([0, 0, 0, 0]);

  const [statusRiskCapacity, setStatusRiskCapacity] = useState<string[]>([
    "Capital Preservation",
    "Capital Preservation",
  ]);

  const [statusRiskAttitude, setStatusRiskAttitude] = useState<string[]>([
    "Capital Preservation",
    "Capital Preservation",
  ]);

  const [resultAttitude, setResultAttitude] = useState<string[]>([
    "Capital Preservation",
    "Capital Preservation",
  ]);

  useEffect(() => {
    // run something every time sectionFive.answers changes
    setRiskCapacity(calcRiskCapacity(sectionFive.answers));
    setRiskAttitude(calcRiskAttitude(sectionFive.answers));
  }, [sectionFive.answers]);

  useEffect(() => {
    setSectionFive((pre: any) => {
      return {
        ...pre,
        riskCapacity: riskCapacity,
      };
    });
    setSectionFive((pre: any) => {
      return {
        ...pre,
        riskAttitude: riskAttitude,
      };
    });
    setStatusRiskCapacity(getStatusRiskCapacity(riskCapacity));
    setStatusRiskAttitude(getStatusRiskAttitude(riskAttitude));

    setResultAttitude(getResultStatus(riskCapacity, riskAttitude));
  }, [riskCapacity, riskAttitude]);

  // end handle q1-9state

  const [q0State, setQ0State] = useState(qa[0].answers);

  const handleQ0Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q0State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q0State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ0State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 0);
  };

  const [q1State, setQ1State] = useState(qa[1].answers);

  const handleQ1Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q1State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q1State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ1State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 1);
  };

  const [q2State, setQ2State] = useState(qa[2].answers);

  const handleQ2Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q2State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q2State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ2State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 2);
  };

  const [q3State, setQ3State] = useState(qa[3].answers);

  const handleQ3Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q3State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q3State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ3State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 3);
  };

  const [q4State, setQ4State] = useState(qa[4].answers);

  const handleQ4Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q4State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q4State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ4State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 4);
  };

  const [q5State, setQ5State] = useState(qa[5].answers);

  const handleQ5Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q5State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q5State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ5State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 5);
  };

  const [q6State, setQ6State] = useState(qa[6].answers);

  const handleQ6Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q6State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q6State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ6State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 6);
  };

  const [q7State, setQ7State] = useState(qa[7].answers);

  const handleQ7Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q7State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q7State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ7State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 7);
  };

  const [q8State, setQ8State] = useState(qa[8].answers);

  const handleQ8Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q8State.map((e: any) => {
      return { ...e, u1: false };
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          return { ...item, u1: !q8State[index].u1 };
        } else {
          return { ...item };
        }
      }
    );
    setQ8State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 8);
  };
  // end handle q1-9state
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
                      {(() => {
                        switch (index) {
                          case 0:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ0Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q0State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 1:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ1Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q1State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 2:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ2Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q2State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 3:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ3Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q3State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 4:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ4Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q4State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 5:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ5Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q5State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 6:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ6Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q6State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 7:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ7Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q7State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          case 8:
                            return (
                              <>
                                <Checkbox
                                  value={answer.score}
                                  onChange={(e) => {
                                    handleQ8Change(e, indexB, 0);
                                  }}
                                  dataId={indexB}
                                  isChecked={q8State[indexB].u1}
                                />

                                <TextThin className="text-gray-light">
                                  {answer.answer}
                                </TextThin>
                              </>
                            );
                          default:
                            return null;
                        }
                      })()}
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
              <div>Risk Attitude</div>
              <div></div>
            </RowFourthGrid>
            <RowFourthGrid>
              <div>Result of Risk Profile</div>
              <div>
                {riskCapacity[0]} {statusRiskCapacity[0]}
              </div>
              <div>
                {riskAttitude[0]} {statusRiskAttitude[0]}
              </div>
              <div>{resultAttitude[0]}</div>
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
