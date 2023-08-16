import React, { useEffect, useState } from "react";
import FlashlightLineIcon from "remixicon-react/FlashlightLineIcon";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
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
import RetrieveSingpassModal from "../../RetrieveSingpass/RetrieveSingpassModal";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import { getPfrStep, postPfrSections } from "@/services/pfrService";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import LoadingPage from "@/components/Attributes/Loader/LoadingPage";
import { useRouter } from "next/router";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
interface Props {
  id?: any;
  pfrType?: number;
}

const PersonalInformation = (props: Props) => {
  const router = useRouter();
  const [showAddDependent, setShowAddDependent] = useState(false);

  let getPfrLength = getLength(props.pfrType);

  const handleShowAddDependent = (params: boolean) => {
    setShowAddDependent(params);
  };

  const scrollPosition = useScrollPosition(1);
  const scrollPositionNext = useScrollPosition(2);

  let dependant = usePersonalInformation((state) => state.dependant);

  let setPfr = usePfrData((state) => state.setPfr);

  let fetchClient = usePersonalInformation((state) => state.fetchClient);
  let fetchClientSingpass = usePersonalInformation(
    (state) => state.fetchClientSingpass
  );
  let fetchDependent = usePersonalInformation((state) => state.fetchDependent);
  let fetchPfr = usePfrData((state) => state.fetchPfr);
  let fetchAccompainment = usePersonalInformation(
    (state) => state.fetchAccompainment
  );
  let setGlobal = usePersonalInformation((state) => state.setGlobal);
  let resetDependent = usePersonalInformation((state) => state.resetDependent);
  let fetchTrustedIndividuals = usePersonalInformation(
    (state) => state.fetchTrustedIndividuals
  );

  // Action join with section 2
  let setGlobalSectionTwo = useExistingPortofolio((state) => state.setGlobal);
  let idSectionTwo = useExistingPortofolio((state) => state.id);

  // Get status and editable status for checking active and non active the save function
  let status = usePersonalInformation((state) => state.status);
  let editableStatus = usePersonalInformation((state) => state.editableStatus);

  let id = usePersonalInformation((state) => state.id);
  let trustedActive = usePersonalInformation((state) => state.trustedActive);

  const [saveLoading, setSaveLoading] = useState(false);

  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section1")
        ? localStorage.getItem("section1")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state;
      }

      let storeDataSection = await postPfrSections(1, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        if (id === 0 || id === null || id === undefined) {
          setGlobal("id", storeDataSection.data.pfrId);
        } else {
          setGlobal("id", id);
        }

        if (
          idSectionTwo === 0 ||
          idSectionTwo === null ||
          idSectionTwo === undefined
        ) {
          setGlobalSectionTwo("id", storeDataSection.data.pfrId);
        } else {
          setGlobalSectionTwo("id", id);
        }
        setGlobal("editableStatus", 1);
        setPfr("section1", 1);
        setPfr("editableSection1", 1);
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
      let getSection1 = await getPfrStep(1, params);

      console.log(getSection1);

      setGlobal("reviewDate", getSection1.pfr.reviewDate);
      setGlobal("editableStatus", getSection1.pfr.editableSection1);
      setGlobal("status", getSection1.pfr.section1);

      fetchPfr(getSection1.pfr);

      // Fetch Client
      if (getSection1.clients.length > 0) {
        getSection1.clients.map((data: any, index: number) => {
          fetchClient(index, data);
          fetchClientSingpass(index, data);
        });
      }

      // Fetch Dependent
      if (getSection1.dependants.length > 0) {
        if (getSection1.dependants.length > 1) {
          resetDependent();
        }
        fetchDependent(getSection1.dependants);
      }

      // Fetch accompaintment
      if (getSection1.accompainments.length > 0) {
        getSection1.accompainments.map((data: any, index: number) => {
          fetchAccompainment(index, data);
        });
      }

      // Fetch trusted individual
      if (getSection1.trustedIndividuals.length > 0) {
        getSection1.trustedIndividuals.map((data: any, index: number) => {
          fetchTrustedIndividuals(data);
        });
      }

      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  // Load data first load
  useEffect(() => {
    if (!router.isReady) return;
    // If edit check the ID
    if (router.query.singpass === null || router.query.singpass === undefined) {
      if (router.query.id !== null && router.query.id !== undefined) {
        getSectionData(router.query.id);

        console.log("masuk sini ya lu");
      }
    }
  }, [router.isReady, router.query.id, router.query.singpass]);

  // Trigger the dependent data to showing the depdendent
  useEffect(() => {
    if (!router.isReady) return;

    if (dependant?.length && dependant[0].name !== "") {
      setShowAddDependent(true);
    }
  }, [dependant, router.isReady]);

  const [checkTi, setCheckTi] = useState(false);

  // Trigger the trusted individual data to showing the depdendent
  useEffect(() => {
    setCheckTi(trustedActive);
  }, [trustedActive]);

  // Save data when scrolling
  useEffect(() => {
    if (scrollPositionNext === "okSec2") {
      if (
        ((editableStatus === 0 || editableStatus === null) && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now");
        // setSaveLoading(true);
        storeData();
      } else {
        console.log("Your cannot save data");
      }
    }
  }, [scrollPositionNext, editableStatus, status]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
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
              <span>Section 1. Personal Information</span>
              {saveLoading ? (
                <span className="text-xs font-extralight text-gray-light">
                  Saving...
                </span>
              ) : (
                ""
              )}
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
      {checkTi ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            1.4 Trusted Individual
          </HeadingSecondarySection>
          <TrustedIndividual />
        </>
      ) : null}
      {editableStatus === 2 && status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 1" />
      ) : (
        ""
      )}
    </div>
  );
};

export default PersonalInformation;
