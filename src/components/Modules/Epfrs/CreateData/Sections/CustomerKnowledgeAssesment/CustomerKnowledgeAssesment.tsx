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
import { getLength } from "@/libs/helper";
import RowSingleORDouble from "@/components/Attributes/Rows/Grids/RowSingleORDouble";
import { useCustomerKnowledgeAssesment } from "@/store/epfrPage/createData/customerKnowledgeAssesment";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { getPfrStep, postPfr, postPfrSections } from "@/services/pfrService";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import { useRouter } from "next/router";
import LoadingPage from "@/components/Attributes/Loader/LoadingPage";

interface Props {
  id?: any;
  pfrType: number;
}

const CustomerKnowledgeAssesment = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);
  const scrollPosition = useScrollPosition(6);
  // zustand
  const {
    answer,
    need,
    updateNeed,
    reason,
    updateReason,
    updateID,
    status,
    editableStatus,
    setGlobal,
    fetchAnswers,
  } = useCustomerKnowledgeAssesment();
  const [showSection, setShowSection] = useState(false);
  const [outcome, setOutcome] = useState([-1, -1]);

  useEffect(() => {
    function outcomeCalc() {
      // -1=empty,0=havenotmet, 1=havemet
      let outcome = [-1, -1];
      for (let i = 0; i < props.pfrType; i++) {
        if (
          answer[i].education[0].every((e) => e == false) &&
          answer[i].education[1].every((e) => e == false) &&
          answer[i].investment.every((e) => e == false) &&
          answer[i].work.every((e) => e == false)
        ) {
          outcome[i] = -1;
        } else if (
          answer[i].education[0][11] == true &&
          answer[i].education[1][10] == true &&
          answer[i].investment[2] == true &&
          answer[i].work[6] == true
        ) {
          outcome[i] = 0;
        } else {
          outcome[i] = 1;
        }
      }
      return outcome;
    }

    setOutcome(outcomeCalc());
  }, [answer, props.pfrType]);
  useEffect(() => {
    if (props.pfrType == 1) {
      setShowSection(need[0]);
    } else {
      if (need[0] || need[1]) {
        setShowSection(true);
      } else {
        setShowSection(false);
      }
    }
  }, [need, props.pfrType]);

  const scrollPositionBottom = useScrollPositionBottom(6);

  // get id from group 1 and paste to grou 2
  let { id } = usePersonalInformation();

  useEffect(() => {
    updateID(id);
  }, [id, updateID]);
  const [saveLoading, setSaveLoading] = useState(false);
  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section6")
        ? localStorage.getItem("section6")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state;
      }

      let storeDataSection = await postPfrSections(6, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        setGlobal("editableStatus", 1);
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  useEffect(() => {
    if (scrollPositionBottom === "Process6") {
      if (
        (editableStatus === 0 && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now section4");
        storeData();
      } else {
        console.log("Your data not complete Section 6");
      }
    }
  }, [scrollPositionBottom, editableStatus, status]);

  const router = useRouter();
  // fetching data for section 5 when position at 4
  const scrollPositionNext = useScrollPosition(5);

  useEffect(() => {
    if (scrollPositionNext === "okSec5") {
      if (router.query.id !== null && router.query.id !== undefined) {
        getSectionData(router.query.id);
        // getGeneralData(router.query.id);
      }
    }
  }, [scrollPositionNext]);

  const [loading, setLoading] = useState(false);

  const getSectionData = async (params: any) => {
    try {
      setLoading(true); // Set loading before sending API request
      let getSection6 = await getPfrStep(6, params);

      // fetching need,reason
      setGlobal("need", [getSection6.need[0].need, getSection6.need[1].need]);
      setGlobal("reason", [
        getSection6.reason[0].reason,
        getSection6.reason[1].reason,
      ]);

      fetchAnswers(getSection6.answers);

      console.log("section 6", JSON.parse(getSection6.answers[0].answer));

      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  return loading ? (
    <LoadingPage />
  ) : (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
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
      {showSection ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.1 Educational Qualifications
          </HeadingSecondarySection>
          <EducationalQualifications pfrType={props.pfrType} />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.2 Investment Experience
          </HeadingSecondarySection>
          <InvestmentExperience pfrType={props.pfrType} />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.3 Work Experience
          </HeadingSecondarySection>
          <WorkExperience pfrType={props.pfrType} />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            Customer Knowledge Assesment Outcome
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e, index) => (
                <div className="space-y-5" key={index}>
                  {props.pfrType > 1 && (
                    <>
                      <h3
                        key={"heading-secondary-" + index}
                        className="w-full mb-10 text-base font-bold"
                      >
                        Client {index + 1}
                      </h3>
                    </>
                  )}
                  {outcome[index] != -1 ? (
                    <>
                      <span className="text-green-deep">
                        {outcome[index] == 0
                          ? "YOU HAVE NOT MET"
                          : "YOU HAVE MET"}
                      </span>
                      <p className="text-sm text-gray-light">
                        {outcome[index] == 0
                          ? "the Customer Knowledge Assessment criteria and are deemed not to possess the knowledge or experience over for transactions in a Collective Invesment Scheme or an Investment Linked Policy."
                          : "the Customer Knowledge Assessment criteria and are deemed to possess the knowledge or experience over for transactions in a Collective Invesment Scheme or an Investment Linked Policy."}
                      </p>
                    </>
                  ) : (
                    "-"
                  )}
                </div>
              ))}
            </RowSingleORDouble>
          </SectionCardSingleGrid>
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleORDouble pfrType={props.pfrType}>
          {getPfrLength.map((e, index) => (
            <div className="flex-1" key={index}>
              {props.pfrType > 1 ? (
                <>
                  <h3
                    key={"heading-secondary-" + index}
                    className="w-full mb-10 text-base font-bold"
                  >
                    Client {index + 1}
                  </h3>
                </>
              ) : (
                ""
              )}
              <Checkbox
                isChecked={!need[index]}
                onChange={() => {
                  updateNeed(index, need[index], props.pfrType);
                }}
                lableStyle="text-sm font-normal text-gray-light"
                label="Not applicable"
              />
            </div>
          ))}
        </RowSingleORDouble>

        {/*  */}

        <RowSingleORDouble pfrType={props.pfrType}>
          {getPfrLength.map((e, index) => (
            <div className="flex-1" key={index}>
              <TextArea
                isDisabled={need[index]}
                className="my-4"
                label="The Reason"
                name="reason"
                defaultValue={reason[index]}
                handleChange={(e) => {
                  updateReason(index, e.target.value, props.pfrType);
                }}
                needValidation={!need[index]}
                logic={
                  reason[index] === "" ||
                  reason[index] === "-" ||
                  reason[index] === null ||
                  reason[index] === undefined
                    ? false
                    : true
                }
              />
            </div>
          ))}
        </RowSingleORDouble>
      </SectionCardSingleGrid>
      {editableStatus === 2 && status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 6" />
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomerKnowledgeAssesment;
