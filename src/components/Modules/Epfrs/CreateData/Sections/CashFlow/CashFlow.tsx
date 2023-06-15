import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import React, { useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import AnnualExpenseCashFlow from "./AnnualExpense/AnnualExpenseCashFlow";
import AnnualIncomeCashFlow from "./AnnualIncome/AnnualIncomeCashFlow";
import AnnualNetCashFlow from "./AnnualNetCashFlow/AnnualNetCashFlow";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { postPfr } from "@/services/pfrService";
import { SectionThree } from "@/models/SectionThree";

interface Props {
  id?: any;
}

const CashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let fillInformation = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const [notReviewAll, setNotReviewAll] = useState(false);

  const [sectionThree, setSectionThree] = useState<SectionThree>({
    id:0,
    need: [],
    reason: [],
    others: {
      annualExpense: [
        {
          editting: false,
          key: "",
          values: []
        }
      ],
      annualIncome: [
        {
          editting: false,
          key: "",
          values: []
        }
      ]
    },
    data: [
      {
        annualIncome: {
          annualGrossIncome: 0,
          additionalWages: 0,
          less: 0,
          others: 0,
        },
        annualSurplus: {
          annualSurplus: 0
        },
        answer: {
          state: "",
          answer: ""
        },
        reasonForSurplus: ""
      }
    ],
    annualExpense: [
      {
        key: "",
        title: "",
        selected: false,
        values: []
      }
    ],
    issues: [],
    totalNetSurplus: [],
    status: 0
  })

  const scrollPosition = useScrollPosition(3)

  // let post = postPfr(1)

  return (
    <div id={props.id}>
      <div id="section-header-3" className={`sticky top-0 z-10 ${scrollPosition === "okSec3" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec3" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 3. Cash Flow
        </HeadingPrimarySection>
      </div>
      {!notReviewAll ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            3.1 Annual Income
          </HeadingSecondarySection>
          <AnnualIncomeCashFlow data={sectionThree.data[0]} />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            3.2 Annual Expense
          </HeadingSecondarySection>
          <AnnualExpenseCashFlow />
        </>
      ) : (
        ""
      )}

      {notReviewAll ? (
        <SectionCardSingleGrid className="mx-8 2xl:mx-60">
          <RowSingle>
            <Checkbox
              isChecked={notReviewAll}
              onChange={() => setNotReviewAll(!notReviewAll)}
              lableStyle="text-sm font-normal text-gray-light"
              label="The Client would not like their cash flow to be taken into
            consideration for the Needs Analysis and Recommendation(s)"
            />
          </RowSingle>
          <RowSingle>
            <TextArea
              className="my-4"
              label="Reason is needed if Net Worth ≤ $0"
              defaultValue="test text area"
            />
          </RowSingle>
        </SectionCardSingleGrid>
      ) : (
        ""
      )}

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        3.3 Annual Net Cash Flow
      </HeadingSecondarySection>
      <AnnualNetCashFlow />
      {!notReviewAll ? (
        <>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <div>
              <p className="text-sm font-normal text-gray-light">
                Do you have any plans or are there any factors within the next
                12 months which may significantly increase or decrease your
                current income and expenditure position (eg. Receiving an
                inheritance or borrowing money for investment or purchase of a
                holiday home, etc.) ?
              </p>
            </div>
            <div>
              <Select
                value=""
                className="my-4"
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </div>
          </SectionCardSingleGrid>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowSingle>
              <Checkbox
                isChecked={notReviewAll}
                onChange={() => setNotReviewAll(!notReviewAll)}
                lableStyle="text-sm font-normal text-gray-light"
                label="The Client would not like their cash flow to be taken into
            consideration for the Needs Analysis and Recommendation(s)"
              />
            </RowSingle>
            <RowSingle>
              <TextArea
                className="my-4"
                label="Reason is needed if Net Worth ≤ $0"
                defaultValue="test text area"
              />
            </RowSingle>
          </SectionCardSingleGrid>
        </>
      ) : (
        ""
      )}
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(4)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default CashFlow;
