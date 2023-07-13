import React, { useEffect, useState } from "react";
import FlashlightLineIcon from "remixicon-react/FlashlightLineIcon";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";
import Toggle from "@/components/Forms/Toggle";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Dependent from "./Dependents/Dependent";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import Client from "./Clients/Client";
import Accompainment from "./Accompaintment/Accompainment";
import TrustedIndividual from "./TrustedIndividuals/TrustedIndividual";
import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import { clientIdentity, getLength } from "@/libs/helper";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
interface Props {
  id?: any;
  pfrType?: number;
}

const PersonalInformation = (props: Props) => {
  const [showAddDependent, setShowAddDependent] = useState(false);

  let getPfrLength = getLength(props.pfrType);

  const handleShowAddDependent = (params: boolean) => {
    setShowAddDependent(params);
  };

  let { showDetailData } = useNavigationSection();

  const showDetail = (params: any) => {
    showDetailData(params);
  };

  const scrollPosition = useScrollPosition(1);

  let {
    ownerId,
    type,
    id,
    dependant,
    accompaniment,
    issues,
    status,
    setTrustedIndividuals,
  } = usePersonalInformation();

  let checkAccompainment = CheckAccompainment(
    accompaniment,
    setTrustedIndividuals
  );

  useEffect(() => {
    if (dependant?.length && dependant[0].name !== "") {
      setShowAddDependent(true);
    }
  }, [dependant]);

  console.log(getPfrLength);

  return (
    <div id={props.id}>
      {/* Sec 1 */}
      {props.pfrType === 1 ? (
        <>
          <div className="flex flex-row items-center justify-between mx-8 2xl:mx-60">
            <button
              className="flex items-center justify-between w-full px-3 py-3 text-sm border rounded-lg text-gray-light border-gray-soft-strong"
              onClick={() => showDetail(100)}
            >
              <span className="flex">
                <FlashlightLineIcon /> AUTOFILL PROFILE FORM
              </span>
              <span className="px-4 py-3 text-white rounded-lg bg-green-deep">
                Import
              </span>
            </button>
          </div>
          <div
            id="section-header-1"
            className={`sticky top-0 z-10 ${
              scrollPosition === "okSec1"
                ? "bg-white py-1 ease-in shadow-lg"
                : ""
            }`}
          >
            <HeadingPrimarySection
              className={`mx-8 2xl:mx-60 ${
                scrollPosition === "okSec1"
                  ? "text-gray-light text-xl font-bold mb-5 mt-5"
                  : "text-2xl font-bold mb-10 mt-10"
              }`}
            >
              Section 1. Personal Information
            </HeadingPrimarySection>
          </div>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            1.1 Client Details
          </HeadingSecondarySection>
        </>
      ) : (
        <>
        <div
            id="section-header-1"
            className={`sticky top-0 z-10 ${
              scrollPosition === "okSec1"
                ? "bg-white py-1 ease-in shadow-lg"
                : ""
            }`}
          >
            <HeadingPrimarySection
              className={`mx-8 2xl:mx-60 ${
                scrollPosition === "okSec1"
                  ? "text-gray-light text-xl font-bold mb-5 mt-5"
                  : "text-2xl font-bold mb-10 mt-10"
              }`}
            >
              Section 1. Personal Information
            </HeadingPrimarySection>
          </div>
          <SectionCardDoubleGrid className="mx-8 2xl:mx-60">
            {getPfrLength.map((data, index) => (
                <div key={index}>
                  <h3 className="w-full mb-10 text-base font-bold text-green-deep">{clientIdentity(index)}</h3>
                  <div className="flex flex-row items-center justify-between">
                    <button className="flex items-center justify-between w-full px-3 py-3 text-sm border rounded-lg text-gray-light border-gray-soft-light">
                      <span className="flex">
                        <FlashlightLineIcon /> AUTOFILL PROFILE FORM
                      </span>
                      <span className="px-4 py-3 text-white rounded-lg bg-green-deep">
                        Import
                      </span>
                    </button>
                  </div>
                </div>
              ))}
          </SectionCardDoubleGrid>
        </>
      )}
      <Client pfrType={props.pfrType} />
      
      {/* Sec 2 */}
      <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
        <div className="text-xl font-bold">1.2 Dependent Information</div>
        <Toggle
          isChecked={showAddDependent}
          onChange={() => handleShowAddDependent(!showAddDependent)}
          toggleName={showAddDependent ? "Review" : "Not Review"}
        />
      </HeadingSecondarySectionDoubleGrid>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        {showAddDependent ? <Dependent /> : ""}
      </SectionCardSingleGrid>
      {/* Sec 3 */}
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        1.3 Client Accompainment Assestment
      </HeadingSecondarySection>
      <Accompainment pfrType={props.pfrType} />
      {/* Sec 4 */}
      {checkAccompainment ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            1.4 Trusted Individual
          </HeadingSecondarySection>
          <TrustedIndividual />
        </>
      ) : null}
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

function CheckAccompainment(accompaniment: any, setTrustedIndividuals: any) {
  let checker = false;

  if (
    (accompaniment[0].education_level === "-" ||
      accompaniment[0].education_level === "") &&
    (accompaniment[0].english_spoken === "-" ||
      accompaniment[0].english_spoken === "") &&
    (accompaniment[0].english_written === "-" ||
      accompaniment[0].english_written === "")
  ) {
    checker = false;
  } else {
    if (
      accompaniment[0].age > 62 ||
      Number(accompaniment[0].english_spoken) === 2 ||
      Number(accompaniment[0].education_level) <= 2
    ) {
      checker = true;
      setTrustedIndividuals("condition1", true);
    }

    if (Number(accompaniment[0].english_spoken) === 2) {
      setTrustedIndividuals("condition2", true);
      checker = true;
    } else {
      setTrustedIndividuals("condition2", false);
    }
  }

  return checker;
}

export default PersonalInformation;
