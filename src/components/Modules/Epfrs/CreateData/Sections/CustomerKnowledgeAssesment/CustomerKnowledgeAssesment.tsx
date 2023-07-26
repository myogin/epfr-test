import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import React, { useEffect, useState } from "react";
import EducationalQualifications from "./EducationalQualifications/EducationalQualifications";
import InvestmentExperience from "./InvestmentExperience/InvestmentExperience";
import WorkExperience from "./WorkExperience/WorkExperience";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import Checkbox from "@/components/Forms/Checkbox";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import TextArea from "@/components/Forms/TextArea";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SectionSix } from "@/models/SectionSix";

interface Props {
  id?: any;
  pfrType?: number;
}

const CustomerKnowledgeAssesment = (props: Props) => {
  const [isReview, setIsReview] = useState(false);

  const scrollPosition = useScrollPosition(6);

  const [sectionSix, setSectionSix] = useState<SectionSix>({
    id: 0,
    need: [],
    reason: ["", ""],
    answers: {
      education: [
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ],
      investment: [false, false, false],
      work: [false, false, false, false, false, false, false],
    },

    outcome: [],
    outcomeChanged: true,
    issues: [],
    status: false,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("section6", JSON.stringify(sectionSix));
  }

  const checkboxChange = (event: any) => {
    setIsReview(!isReview);
    setSectionSix((prevState) => {
      return { ...prevState, ["need"]: [!isReview] };
    });
  };

  // handle input change / state change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setSectionSix((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleReasonChange = (e: any, user: number) => {
    const { name, value } = e.target;
    let newReason = sectionSix.reason;
    newReason[user] = value;

    setSectionSix((prevState) => {
      return { ...prevState, reason: newReason };
    });
  };

  // Educational Qualifications
  const eqChange = (question: number, index2: number) => {
    let tempVal = sectionSix.answers.education;

    if (
      (question === 0 && index2 === 11) ||
      (question === 1 && index2 === 10)
    ) {
      if (sectionSix.answers.education[question][index2] === false) {
        tempVal[question] = tempVal[question].map((e) => {
          return false;
        });
      }
    }

    if (question === 0 && index2 !== 11) {
      if (sectionSix.answers.education[question][index2] != true) {
        tempVal[question][11] = false;
      }
    }
    if (question === 1 && index2 !== 10) {
      if (sectionSix.answers.education[question][index2] != true) {
        tempVal[question][10] = false;
      }
    }

    tempVal[question][index2] = !tempVal[question][index2];

    setSectionSix((prevState) => {
      return {
        ...prevState,
        answers: {
          ...prevState.answers,
          education: tempVal,
        },
      };
    });
  };

  // 6.2 Investment Experience
  const ieChange = (index: number) => {
    let tempVal = sectionSix.answers.investment;
    if (index === 2) {
      if (sectionSix.answers.investment[index] === false) {
        tempVal = tempVal.map((e) => {
          return false;
        });
      }
    }

    if (index !== 2) {
      if (sectionSix.answers.investment[index] != true) {
        tempVal[2] = false;
      }
    }
    tempVal[index] = !tempVal[index];

    setSectionSix((prevState) => {
      return {
        ...prevState,
        answers: {
          ...prevState.answers,
          investment: tempVal,
        },
      };
    });
  };
  const wChange = (index: number) => {
    let tempVal = sectionSix.answers.work;
    if (index === 6) {
      if (sectionSix.answers.work[index] === false) {
        tempVal = tempVal.map((e) => {
          return false;
        });
      }
    }

    if (index !== 6) {
      if (sectionSix.answers.work[index] != true) {
        tempVal[6] = false;
      }
    }
    tempVal[index] = !tempVal[index];

    setSectionSix((prevState) => {
      return {
        ...prevState,
        answers: {
          ...prevState.answers,
          work: tempVal,
        },
      };
    });
  };
  const [haveMet, setHaveMet] = useState(false);

  useEffect(() => {
    const handleHaveMet = () => {
      let tempAnswer = [];
      tempAnswer.push(sectionSix.answers.education[0][11]);
      tempAnswer.push(sectionSix.answers.education[0][10]);
      tempAnswer.push(sectionSix.answers.investment[2]);
      tempAnswer.push(sectionSix.answers.work[6]);

      setHaveMet(tempAnswer.every((e) => e === false));
    };
    handleHaveMet();

    const checkValidate = () => {
      console.log(sectionSix.reason[0]);

      // if (sectionSix.need[0]) {
      //   if (sectionSix.reason[0] === "") {
      //     return false;
      //   }
      //   return true;
      // } else {
      //   if (sectionSix.answers.education[0].every((e) => e === false)) {
      //     return false;
      //   }
      //   if (sectionSix.answers.education[1].every((e) => e === false)) {
      //     return false;
      //   }
      //   if (sectionSix.answers.investment.every((e) => e === false)) {
      //     return false;
      //   }
      //   if (sectionSix.answers.work.every((e) => e === false)) {
      //     return false;
      //   }
      //   return true;
      // }
      return false;
    };
    const updateStatusSection6 = () => {
      setSectionSix((prevState) => {
        return { ...prevState, ["status"]: checkValidate() };
      });
    };
    updateStatusSection6();
  }, [sectionSix.reason, sectionSix.answers, sectionSix.need]);
  return (
    <div id={props.id}>
      <div
        id="section-header-6"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec6" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec6"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 6. Customer Knowledge Assesment
        </HeadingPrimarySection>
      </div>
      {!isReview ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.1 Educational Qualifications
          </HeadingSecondarySection>
          <EducationalQualifications
            initData={sectionSix.answers.education}
            updateState={eqChange}
          />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.2 Investment Experience
          </HeadingSecondarySection>
          <InvestmentExperience
            initData={sectionSix.answers.investment}
            updateState={ieChange}
          />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.3 Work Experience
          </HeadingSecondarySection>
          <WorkExperience
            initData={sectionSix.answers.work}
            updateState={wChange}
          />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            Customer Knowledge Assesment Outcome
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <div className="space-y-5">
              <span className="text-green-deep">
                {haveMet ? "YOU HAVE MET" : "YOU HAVE NOT MET"}
              </span>
              <p className="text-sm text-gray-light">
                The Customer Knowledge Assessment criteria and are deemed to
                possess the knowledge or experience for transactions in a
                Collective Invesment Scheme or an Investment Linked Policy.
              </p>
            </div>
          </SectionCardSingleGrid>
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 space-y-5 2xl:mx-60">
        <div>
          <Checkbox
            isChecked={isReview}
            onChange={checkboxChange}
            lableStyle="text-sm font-normal text-gray-light"
            label="Not applicable"
          />
        </div>
        {isReview ? (
          <div>
            <TextArea
              handleChange={(e) => {
                handleReasonChange(e, 0);
              }}
              className="my-4"
              label="The Reason"
              value={sectionSix.reason[0]}
              rows={3}
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

export default CustomerKnowledgeAssesment;
