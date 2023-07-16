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
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import HeadingSecondaryDynamicGrid from "@/components/Attributes/Sections/HeadingSecondaryDynamicGrid";
import RowDouble from "@/components/Attributes/Rows/Flexs/RowDouble";
import { getLength } from "@/libs/helper";

interface Props {
  id?: any;
  pfrType: number;
}

const CashFlow = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let getPfrLength = getLength(props.pfrType);

  let fillInformation = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  let { showDetailData } = useNavigationSection();
  const scrollPosition = useScrollPosition(3);

  const saveData = (params: any) => {
    showDetailData(params);
  };

  let { need, reason, totalNetSurplus } = useCashFlow();

  const [notReviewAll, setNotReviewAll] = useState(false);

  // let post = postPfr(1)

  return (
    <div id={props.id}>
      <div
        id="section-header-3"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec3" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec3"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 3. Cash Flow
        </HeadingPrimarySection>
      </div>
      {!notReviewAll ? (
        <>
          <HeadingSecondaryDynamicGrid
            className={`mx-8 2xl:mx-60 ${
              props.pfrType == 2
                ? "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
                : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
            }`}
            pfrType={props.pfrType}
          >
            3.1 Annual Income
          </HeadingSecondaryDynamicGrid>
          <AnnualIncomeCashFlow pfrType={props.pfrType} />
          <HeadingSecondaryDynamicGrid
            className={`mx-8 2xl:mx-60 ${
              props.pfrType == 2
                ? "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
                : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
            }`}
            pfrType={props.pfrType}
          >
            3.2 Annual Expense
          </HeadingSecondaryDynamicGrid>
          <AnnualExpenseCashFlow pfrType={props.pfrType} />
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
      <HeadingSecondaryDynamicGrid
        className={`mx-8 2xl:mx-60 ${
          props.pfrType == 2
            ? "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
            : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
        }`}
        pfrType={props.pfrType}
      >
        3.3 Annual Net Cash Flow
      </HeadingSecondaryDynamicGrid>
      <AnnualNetCashFlow pfrType={props.pfrType} />
      {!notReviewAll ? (
        <>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div className="flex-1" key={index}>
                    {props.pfrType > 1 ? (
                      <>
                        <h3
                          key={"heading-secondary-" + index}
                          className="w-full mb-4 text-base font-bold"
                        >
                          Client {++index}
                        </h3>
                        <p className="text-sm font-normal text-gray-light">
                          {`Do you have any plans or are there any factors within
                          the next 12 months which may significantly increase or
                          decrease your current income and expenditure position
                          (eg. Receiving an inheritance or borrowing money for
                          investment or purchase of a holiday home, etc.) ?`}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-normal text-gray-light">
                          {`Do you have any plans or are there any factors within
                          the next 12 months which may significantly increase or
                          decrease your current income and expenditure position
                          (eg. Receiving an inheritance or borrowing money for
                          investment or purchase of a holiday home, etc.) ?`}
                        </p>
                    )}
                    <Select
                      value=""
                      className="my-4"
                      datas={fillInformation}
                      handleChange={(event) =>
                        setData(eval(event.target.value))
                      }
                    />
                  </div>
                ))}
            </RowDouble>
          </SectionCardSingleGrid>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div className="flex-1" key={index}>
                    {props.pfrType > 1 ? (
                      <>
                        <h3
                          key={"heading-secondary-" + index}
                          className="w-full mb-10 text-base font-bold"
                        >
                          Client {++index}
                        </h3>
                      </>
                    ) : (
                      ""
                    )}
                    <Checkbox
                      isChecked={
                        need ? (need[index] == 1 ? true : false) : false
                      }
                      onChange={() => setNotReviewAll(!notReviewAll)}
                      lableStyle="text-sm font-normal text-gray-light"
                      label="The Client would not like their cash flow to be taken into
            consideration for the Needs Analysis and Recommendation(s)"
                    />
                  </div>
                ))}
            </RowDouble>
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <>
                    {need ? (
                      need[index] == 1 ? (
                        ""
                      ) : (
                        <div className="flex-1" key={index}>
                          <TextArea
                            className="my-4"
                            defaultValue="test text area"
                            needValidation={true}
                            logic={
                              need ? (need[index] == 1 ? true : false) : false
                            }
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex-1" key={index}>
                        <TextArea
                          className="my-4"
                          defaultValue="test text area"
                          needValidation={true}
                          logic={
                            need ? (need[index] == 1 ? true : false) : false
                          }
                        />
                      </div>
                    )}
                  </>
                ))}
            </RowDouble>
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
