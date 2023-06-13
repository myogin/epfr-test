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
import React, { useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
}

const RiskProfile = (props: Props) => {
  let qa: Array<any> = [
    {
      id: 1,
      question: "1. What is your investment time horizon?",
      answers: [
        { id: 1, answer: "Less than 1 year" },
        { id: 2, answer: "1 to 3 years" },
        { id: 3, answer: "4 to 6 years" },
        { id: 4, answer: "7 to 9 years" },
        { id: 5, answer: "More than 10 years" },
      ],
    },
    {
      id: 2,
      question: "2. What is your age group?",
      answers: [
        { id: 1, answer: "65 and above" },
        { id: 2, answer: "55 to 54 years" },
        { id: 3, answer: "36 to 54 years" },
        { id: 4, answer: "35 and below" },
      ],
    },
    {
      id: 3,
      question:
        "3. If you were to contemplate an investment today, what percentage would that amount be in relation to your total savings and investments? (Total savings and investments include all assets you have in cash, bonds, unit trusts, stocks)",
      answers: [
        { id: 1, answer: "Less than 25%" },
        { id: 2, answer: "25% to 50%" },
        { id: 3, answer: "51% to 75%" },
        { id: 4, answer: "More than 75%" },
      ],
    },
    {
      id: 4,
      question:
        "4. Which statement best describes your investment knowledge / experience?",
      answers: [
        {
          id: 1,
          answer:
            "I have very little investment knowledge / experience about investments and financial markets",
        },
        {
          id: 2,
          answer:
            "I have a moderate level of investment knowledge / experience about investments and financial markets",
        },
        {
          id: 3,
          answer:
            "I have extensive investment knowledge / experience about investments and financial markets",
        },
      ],
    },
    {
      id: 5,
      question:
        "5. Is there a coming financial need which may require you to liquidate the investment being contemplated?. If so, what timeframe?",
      answers: [
        { id: 1, answer: "No" },
        { id: 2, answer: "Yes, more than 8 years" },
        { id: 3, answer: "Yes, between 5 to 8 years" },
        { id: 4, answer: "Yes, within 2 to 4 years" },
      ],
    },
    {
      id: 6,
      question:
        "6. The value of investment may fluctuate over time. What percentage of decline in your investment portfolio are you able to accept in a 12-month period?",
      answers: [
        { id: 1, answer: "I will not be able to accept any losses." },
        { id: 2, answer: "3% to 5%" },
        { id: 3, answer: "6% to 9%" },
        { id: 4, answer: "10% to 20%" },
        { id: 4, answer: "More than 20%" },
      ],
    },
    {
      id: 7,
      question:
        "7. If the markets you are invested in face a sudden decline in value, what would be your most likely response?",
      answers: [
        {
          id: 1,
          answer: "Sell all the remaining investments avoid further losses.",
        },
        {
          id: 2,
          answer:
            "Sell a portion of the investments to protect some capital and hold on to the rest",
        },
        {
          id: 3,
          answer:
            "Hold on to the investments in the hope that the markets will recover",
        },
        {
          id: 4,
          answer: "Buy more of the investments now that prices are lower",
        },
      ],
    },
    {
      id: 8,
      question:
        "8. If you were to consider making an investment, what would your objective be?",
      answers: [
        {
          id: 1,
          answer:
            "Keep me hard earned money safe from potential downside risk and liquid so that I can draw upon it for shortterm needs.",
        },
        {
          id: 2,
          answer:
            "I want the investment to yield a steady stream of income to supplement my earning capacity. Growth is of a lesser priority than generating the income stream",
        },
        {
          id: 3,
          answer:
            "I want ther investment to generate a steady stream of income as well as capital growth. Both income and growth are equally important to me.",
        },
        {
          id: 4,
          answer:
            "I want to focus on growth of my investments. Generating an income stream is not an important consideration of the investments.",
        },
        {
          id: 5,
          answer:
            "I want to generate significant long-term growth for my investments. I understand that it will necessitate a higher proportion of the investment in equities.",
        },
      ],
    },
    {
      id: 9,
      question:
        "9. Different asset classes have different risk/return relationships. Which asset classes would you be most comfortable with?",
      answers: [
        {
          id: 1,
          answer: "Saving accounts, fixed deposits, money market instruments.",
        },
        { id: 2, answer: "Bonds" },
        {
          id: 3,
          answer:
            "Portfolio of Bonds + Equities OR Portfolio of Bond + Equity Mutual Funds",
        },
        { id: 4, answer: "Equities" },
        { id: 5, answer: "Options, futures, warrants" },
      ],
    },
  ];

  const [notReviewAll, setNotReviewAll] = useState(false);

  const scrollPosition = useScrollPosition(5);

  const [sectionFive, setSectionFive] = useState<SectionFive>({
    id: 0,
    need: [],
    reason: [],
    answers: [],
    riskCapacity: [],
    riskAttitude: [],
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
                <div className="mb-4" key={qs.id}>
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
                    <RowSingle key={answer.id}>
                      <Checkbox />
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
