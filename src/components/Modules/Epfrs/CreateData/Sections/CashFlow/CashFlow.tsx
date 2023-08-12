import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import Checkbox from "@/components/Forms/Checkbox";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import React, { useState, useEffect, Fragment } from "react";
import AnnualExpenseCashFlow from "./AnnualExpense/AnnualExpenseCashFlow";
import AnnualIncomeCashFlow from "./AnnualIncome/AnnualIncomeCashFlow";
import AnnualNetCashFlow from "./AnnualNetCashFlow/AnnualNetCashFlow";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getPfrStep, postPfrSections } from "@/services/pfrService";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import HeadingSecondaryDynamicGrid from "@/components/Attributes/Sections/HeadingSecondaryDynamicGrid";
import RowDouble from "@/components/Attributes/Rows/Flexs/RowDouble";
import { clientIdentity, getLength } from "@/libs/helper";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import { useRouter } from "next/router";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";

interface Props {
  id?: any;
  pfrType: number;
}

const CashFlow = (props: Props) => {
  const router = useRouter();
  let getPfrLength = getLength(props.pfrType);

  let fillInformation = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  const scrollPosition = useScrollPosition(3);
  const scrollPositionNext = useScrollPosition(4);
  const scrollPositionBottom = useScrollPositionBottom(2);
  let pfrLocal = usePfrData((state) => state.pfr);

  let status = useCashFlow((state) => state.status);
  let editableStatus = useCashFlow((state) => state.editableStatus);
  let need = useCashFlow((state) => state.need);
  let data = useCashFlow((state) => state.data);
  let reason = useCashFlow((state) => state.reason);
  let totalNetSurplus = useCashFlow((state) => state.totalNetSurplus);
  let setNeed = useCashFlow((state) => state.setNeed);
  let setAnswerData = useCashFlow((state) => state.setAnswerData);
  let setReason = useCashFlow((state) => state.setReason);

  // Action join section 4
  // Action join with section 2
  let setGlobalSectionFour = useBalanceSheet((state) => state.updateID);
  let idSectionFour = useBalanceSheet((state) => state.id);

  const [saveLoading, setSaveLoading] = useState(false);

  let { id } = usePersonalInformation();
  let { setGlobal } = useCashFlow();
  let fetchAnnual = useCashFlow((state) => state.fetchAnnual)
  let fetchExpense = useCashFlow((state) => state.fetchExpense)

  let checkNeedData = checkAllNeed(need);

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

  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section3")
        ? localStorage.getItem("section3")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state;
      }

      let storeDataSection = await postPfrSections(3, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        if (
          idSectionFour === 0 ||
          idSectionFour === null ||
          idSectionFour === undefined
        ) {
          setGlobalSectionFour(storeDataSection.data.pfrId);
        } else {
          setGlobalSectionFour(id);
        }

        setGlobal("editableStatus", 1);
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  const [loading, setLoading] = useState(false);

  const getSectionData = async (params: any) => {
    try {
      setLoading(true); // Set loading before sending API request
      let getSection3 = await getPfrStep(3, params);

      console.log(getSection3);
      console.log(getSection3.annualIncome);
      console.log(getSection3.annualExpenses);

      // setGlobal("editableStatus", getSection2.pfr.editableSection1);
      // setGlobal("status", getSection2.pfr.section1);

      // Fetch annual
      if (getSection3.annualExpenses.length > 0) {
        getSection3.annualExpenses.map((data: any, index: number) => {
          fetchExpense(index, data);
        });
      }

      // Fetch annual expense
      if (getSection3.annualIncome.length > 0) {
        getSection3.annualIncome.map((data: any, index: number) => {
          fetchAnnual(index, data);
        });
      }

      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  // Get data when scroll from section 2
  useEffect(() => {
    if (!router.isReady) return;
    // If edit check the ID
    if (router.query.id !== null && router.query.id !== undefined) {
      if (scrollPositionBottom === "Process2") {
        setGlobal("editableStatus", pfrLocal.editableSection3);
        setGlobal("id", router.query.id);
        setGlobal("status", pfrLocal.section3);
        getSectionData(router.query.id);
        console.log("Get data Section 3");
      }
    }
  }, [scrollPositionBottom, router.isReady, router.query.id]);

  useEffect(() => {
    if (scrollPositionNext === "okSec4") {
      if (
        (editableStatus === 0 && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now");
        storeData();
      } else {
        console.log("Your data not complete Section 3");
      }
    }
  }, [scrollPositionNext, editableStatus, status]);

  return (
    <div id={props.id} className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong">
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
          {saveLoading ? (
            <span className="text-xs font-extralight text-gray-light">
              Saving...
            </span>
          ) : (
            ""
          )}
        </HeadingPrimarySection>
      </div>
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
                        data[index].answer.state ? data[index].answer.state : 0
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
                      logic={need ? (need[index] == 1 ? true : false) : false}
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
                  isChecked={need ? (need[index] == 1 ? true : false) : false}
                  onChange={() =>
                    handleReview(index, need ? (need[index] == 0 ? 1 : 0) : 0)
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
                        reason ? (reason[index] == "" ? true : false) : false
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
      {editableStatus === 2 && status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 3" />
      ) : (
        ""
      )}
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
