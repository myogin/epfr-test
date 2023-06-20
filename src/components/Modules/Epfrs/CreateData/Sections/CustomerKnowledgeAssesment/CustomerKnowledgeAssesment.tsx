import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import React, { useState } from "react";
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

interface Props {
  id?: any;
  pfrType?: number;
}

const CustomerKnowledgeAssesment = (props: Props) => {
  let { showDetailData } = useNavigationSection();

  const [isReview, setIsReview] = useState(true);

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const scrollPosition = useScrollPosition(6)
  return (
    <div id={props.id}>
      <div id="section-header-6" className={`sticky top-0 z-10 ${scrollPosition === "okSec6" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec6" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 6. Customer Knowledge Assesment
        </HeadingPrimarySection>
      </div>
      {isReview ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.1 Educational Qualifications
          </HeadingSecondarySection>
          <EducationalQualifications />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.2 Investment Experience
          </HeadingSecondarySection>
          <InvestmentExperience />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            6.3 Work Experience
          </HeadingSecondarySection>
          <WorkExperience />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            Customer Knowledge Assesment Outcome
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <div className="space-y-5">
              <span className="text-green-deep">YOU HAVE MET</span>
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
            isChecked={!isReview}
            onChange={() => setIsReview(!isReview)}
            lableStyle="text-sm font-normal text-gray-light"
            label="Not applicable"
          />
        </div>
        {!isReview ? (
          <div>
            <TextArea label="The Reason" rows={3} />
          </div>
        ) : (
          ""
        )}
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(7)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default CustomerKnowledgeAssesment;
