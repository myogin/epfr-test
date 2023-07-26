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

interface Props {
  id?: any;
  pfrType: number;
}

const CustomerKnowledgeAssesment = (props: Props) => {
  const [isReview, setIsReview] = useState(false);
  let getPfrLength = getLength(props.pfrType);
  const scrollPosition = useScrollPosition(6);
  // zustand
  const { need, updateNeed, reason, updateReason } =
    useCustomerKnowledgeAssesment();
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
            <div className="space-y-5">
              <span className="text-green-deep">
                {/* {haveMet ? "YOU HAVE MET" : "YOU HAVE NOT MET"} */}
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
                isChecked={need ? (need[index] == 1 ? true : false) : false}
                onChange={() => {
                  updateNeed(index, need[index] == 1 ? 0 : 1);
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
              {need[index] == 1 ? (
                <TextArea
                  // handleChange={}
                  className="my-4"
                  label="The Reason"
                  name="reason"
                  value={reason[index]}
                  handleChange={(e) => {
                    updateReason(index, e.target.value);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </RowSingleORDouble>
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default CustomerKnowledgeAssesment;
