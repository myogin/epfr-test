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
import {
  clientIdentity,
  getLength,
  localOwnerId,
  localPfrId,
} from "@/libs/helper";
import { Accompaniment } from "@/models/SectionOne";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import RetrieveSingpassModal from "../../RetrieveSingpass/RetrieveSingpassModal";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
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

  const scrollPosition = useScrollPosition(1);
  const scrollPositionBottom = useScrollPositionBottom(1);

  let dependant = usePersonalInformation((state) => state.dependant);
  let accompaniment = usePersonalInformation((state) => state.accompaniment);
  let setTrustedIndividuals = usePersonalInformation((state) => state.setTrustedIndividuals);


  let checkAccompainment = CheckAccompainment(
    accompaniment,
    setTrustedIndividuals
  );

  // Get status and editable status for checking active and non active the save function
  let status = usePersonalInformation((state) => state.status);
  let editableStatus = usePersonalInformation((state) => state.editableStatus);

  useEffect(() => {
    if (dependant?.length && dependant[0].name !== "") {
      setShowAddDependent(true);
    }

    if (scrollPositionBottom === "Process1") {
      if (
        (editableStatus === 0 && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now");
      }else {
        console.log("Your data not complete Section 1");
      }
    }
  }, [dependant, editableStatus, status, scrollPositionBottom]);

  return (
    <div id={props.id}>
      {/* Sec 1 */}
      {props.pfrType === 1 ? (
        <>
          <div className="flex flex-row items-center justify-between mx-8 2xl:mx-60">
            <div className="flex items-center justify-between w-full px-3 py-3 text-sm border rounded-lg text-gray-light border-gray-soft-strong">
              <div>
                <TextSmall className="flex gap-4">
                  <FlashlightLineIcon /> AUTOFILL PROFILE FORM BY SINGPASS
                </TextSmall>
                <TextThin>
                  Singpass enables you to retrive your personal data from
                  partcipating Goverment agencies. With your consent, we can
                  auto-fill profile form.
                </TextThin>
              </div>
              <div className="flex items-start justify-end">
                <RetrieveSingpassModal clientType={0} />
              </div>
            </div>
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
              <div key={"as" + index}>
                <h3 className="w-full mb-10 text-base font-bold text-green-deep">
                  {clientIdentity(index)}
                </h3>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center justify-between w-full px-3 py-3 text-sm border rounded-lg text-gray-light border-gray-soft-light">
                    <div>
                      <TextSmall className="flex gap-4">
                        <FlashlightLineIcon /> AUTOFILL PROFILE FORM BY SINGPASS
                      </TextSmall>
                      <TextThin>
                        Singpass enables you to retrive your personal data from
                        partcipating Goverment agencies. With your consent, we
                        can auto-fill profile form.
                      </TextThin>
                    </div>
                    <div className="flex items-start justify-end">
                      <RetrieveSingpassModal clientType={index} />
                    </div>
                  </div>
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

function CheckAccompainment(
  accompaniment: Accompaniment[],
  setTrustedIndividuals: any
) {
  let checker = false;

  if (
    (accompaniment[0].education_level === "-" ||
      accompaniment[0].education_level === "") &&
    (accompaniment[0].english_spoken === "-" ||
      accompaniment[0].english_spoken === "") &&
    (accompaniment[0].english_written === "-" ||
      accompaniment[0].english_written === "") &&
    (accompaniment[1].education_level === "-" ||
      accompaniment[1].education_level === "") &&
    (accompaniment[1].english_spoken === "-" ||
      accompaniment[1].english_spoken === "") &&
    (accompaniment[1].english_written === "-" ||
      accompaniment[1].english_written === "")
  ) {
    checker = false;
  } else {
    if (
      accompaniment[0].age > 62 ||
      Number(accompaniment[0].english_spoken) === 2 ||
      Number(accompaniment[0].education_level) <= 2 ||
      accompaniment[1].age > 62 ||
      Number(accompaniment[1].english_spoken) === 2 ||
      Number(accompaniment[1].education_level) <= 2
    ) {
      checker = true;
      setTrustedIndividuals("condition1", true);
    }

    if (
      Number(accompaniment[0].english_spoken) === 2 ||
      Number(accompaniment[1].english_spoken) === 2
    ) {
      setTrustedIndividuals("condition2", true);
      checker = true;
    } else {
      setTrustedIndividuals("condition2", false);
    }
  }

  return checker;
}

export default PersonalInformation;
