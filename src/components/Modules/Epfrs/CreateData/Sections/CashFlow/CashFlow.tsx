import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import React, { useState, useEffect, Fragment } from "react";
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
import { clientIdentity, getLength } from "@/libs/helper";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";

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
  const scrollPositionBottom = useScrollPositionBottom(3);

  let {
    need,
    data,
    reason,
    totalNetSurplus,
    setNeed,
    setAnswerData,
    setReason,
  } = useCashFlow();

  let { id, setGlobal } = usePersonalInformation();

  let checkNeedData = checkAllNeed(need);

  const [reviewAll, setReviewAll] = useState(true);

  const handleReview = (index: number, params: any) => {
    setNeed(index, params);
  };

  const handleReason = (event: any) => {
    const { name, value } = event.target;
    const { groupdata, indexclient } = event.target.dataset;

    setReason(indexclient, value);
  };

  const handleAnswer = (event: any) => {
    const { name, value } = event.target;
    const { groupdata, indexclient } = event.target.dataset;

    setAnswerData(indexclient, name, value);
  };

  const storeData = async () => {
    let localDataOne = localStorage.getItem("section1")
      ? localStorage.getItem("section1")
      : "";

    let dataOneFix = {};
    if (localDataOne) {
      let data = JSON.parse(localDataOne);
      dataOneFix = data.state;
    }

    let localDataTwo = localStorage.getItem("section2")
      ? localStorage.getItem("section2")
      : "";

    let dataTwoFix = {};
    if (localDataTwo) {
      let data = JSON.parse(localDataTwo);
      dataTwoFix = data.state;
    }

    let localDataThree = localStorage.getItem("section3")
      ? localStorage.getItem("section3")
      : "";

    let dataThreeFix = {};
    if (localDataThree) {
      let data = JSON.parse(localDataThree);
      dataThreeFix = data.state;
    }

    const groupOneData = {
      section1: dataOneFix,
      section2: dataTwoFix,
      section3: dataThreeFix,
    };

    let storeDataGroupOne = await postPfr(1, JSON.stringify(groupOneData));

    console.log("test response");
    console.log(storeDataGroupOne.data.pfrId);
    console.log(storeDataGroupOne);

    if (storeDataGroupOne.data.result === "success") {
      if (id === 0 || id === null || id === undefined) {
        setGlobal("id", storeDataGroupOne.data.pfrId);
      }
    }
  };

  useEffect(() => {
    if (scrollPositionBottom === "Process3") {
      // console.log("oke")
      storeData();
    }
  }, [scrollPositionBottom]);

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

      {/* If check */}
      {reviewAll ? (
        <Fragment>
          <HeadingSecondaryDynamicGrid
            className={`mx-8 2xl:mx-60 ${
              props.pfrType == 2
                ? "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
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
                ? "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
                : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
            }`}
            pfrType={props.pfrType}
          >
            3.2 Annual Expense
          </HeadingSecondaryDynamicGrid>
          <AnnualExpenseCashFlow pfrType={props.pfrType} />
        </Fragment>
      ) : (
        ""
      )}
      <HeadingSecondaryDynamicGrid
        className={`mx-8 2xl:mx-60 ${
          props.pfrType == 2
            ? "lg:grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
            : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"
        }`}
        pfrType={props.pfrType}
      >
        3.3 Annual Net Cash Flow
      </HeadingSecondaryDynamicGrid>
      <AnnualNetCashFlow pfrType={props.pfrType} />
      {/*  */}
      {reviewAll ? (
        <>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((dataB, index) => (
                  <div className="flex-1" key={"cashflow-qa-" + index}>
                    {/* For Joint */}
                    {props.pfrType > 1 ? (
                      need && checkNeedData > 0 ? (
                        need[index] ? (
                          <>
                            <h3
                              key={"heading-secondary-" + index}
                              className="w-full mb-4 text-base font-bold"
                            >
                              {clientIdentity(index)}
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
                          <>
                            <h3
                              key={"heading-secondary-" + index}
                              className="w-full mb-4 text-base font-bold text-gray-soft-strong"
                            >
                              {clientIdentity(index)}
                            </h3>
                            <p className="text-sm font-normal text-gray-soft-strong">
                              {`Do you have any plans or are there any factors within
                          the next 12 months which may significantly increase or
                          decrease your current income and expenditure position
                          (eg. Receiving an inheritance or borrowing money for
                          investment or purchase of a holiday home, etc.) ?`}
                            </p>
                          </>
                        )
                      ) : (
                        ""
                      )
                    ) : need && checkNeedData > 0 ? (
                      need[index] ? (
                        // For single
                        <p className="text-sm font-normal text-gray-light">
                          {`Do you have any plans or are there any factors within
                          the next 12 months which may significantly increase or
                          decrease your current income and expenditure position
                          (eg. Receiving an inheritance or borrowing money for
                          investment or purchase of a holiday home, etc.) ?`}
                        </p>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {/* For Joint */}
                    {props.pfrType > 1 ? (
                      need && checkNeedData > 0 ? (
                        need[index] ? (
                          <Select
                            value={
                              data[index].answer.state
                                ? data[index].answer.state
                                : 0
                            }
                            className="my-4"
                            name="state"
                            indexClient={index}
                            datas={fillInformation}
                            handleChange={handleAnswer}
                          />
                        ) : (
                          <Select disabled={true} value="" className="my-4" />
                        )
                      ) : (
                        ""
                      )
                    ) : need && checkNeedData > 0 ? (
                      need[index] ? (
                        <Select
                          value={
                            data[index].answer.state
                              ? data[index].answer.state
                              : 0
                          }
                          className="my-4"
                          name="state"
                          indexClient={index}
                          datas={fillInformation}
                          handleChange={handleAnswer}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </RowDouble>
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((dataB, index) =>
                  need ? (
                    need[index] == 0 ? (
                      <div className="flex-1" key={index}></div>
                    ) : data[index].answer.state == 1 ? (
                      <div className="flex-1" key={index}>
                        <TextArea
                          defaultValue={
                            data[index].answer.answer
                              ? data[index].answer.answer
                              : ""
                          }
                          name="answer"
                          indexClient={index}
                          className="my-4"
                          needValidation={true}
                          handleChange={handleAnswer}
                          logic={
                            need ? (need[index] == 1 ? true : false) : false
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <div className="flex-1" key={index}>
                      <TextArea className="my-4" isDisabled={true} />
                    </div>
                  )
                )}
            </RowDouble>
          </SectionCardSingleGrid>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((dataB, index) => (
                  <div className="flex-1" key={index}>
                    {props.pfrType > 1 ? (
                      <h3
                        key={"heading-secondary-" + index}
                        className="w-full mb-10 text-base font-bold"
                      >
                        {clientIdentity(index)}
                      </h3>
                    ) : (
                      ""
                    )}
                    <Checkbox
                      isChecked={
                        need ? (need[index] == 1 ? true : false) : false
                      }
                      onChange={() =>
                        handleReview(
                          index,
                          need ? (need[index] == 0 ? 1 : 0) : 0
                        )
                      }
                      lableStyle="text-sm font-normal text-gray-light"
                      label="The Client would not like their cash flow to be taken into consideration for the Needs Analysis and Recommendation(s)"
                    />
                  </div>
                ))}
            </RowDouble>
            <RowDouble>
              {getPfrLength?.length &&
                getPfrLength.map((dataB, index) =>
                  need ? (
                    need[index] == 1 ? (
                      <div className="flex-1" key={index}></div>
                    ) : (
                      <div className="flex-1" key={index}>
                        <TextArea
                          defaultValue={reason ? reason[index] : ""}
                          name="reason"
                          indexClient={index}
                          className="my-4"
                          needValidation={true}
                          handleChange={handleReason}
                          logic={
                            reason
                              ? reason[index] == ""
                                ? true
                                : false
                              : false
                          }
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex-1" key={index}>
                      <TextArea className="my-4" isDisabled={true} />
                    </div>
                  )
                )}
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

const checkAllNeed = (params: any) => {
  let checkTotal = 0;
  if (params?.length) {
    params.map((data: any, index: any) => {
      if (data == 1) {
        checkTotal = 1;
      }
    });
  }

  return checkTotal;
};

export default CashFlow;
