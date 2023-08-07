import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import BalanceSheet from "@/components/Modules/Epfrs/CreateData/Sections/BalanceSheet/BalanceSheet";
import CashFlow from "@/components/Modules/Epfrs/CreateData/Sections/CashFlow/CashFlow";
import ExistingPortofolio from "@/components/Modules/Epfrs/CreateData/Sections/ExistingPortofolio/ExistingPortofolio";
import PersonalInformation from "@/components/Modules/Epfrs/CreateData/Sections/PersonalInformation/PersonalInformation";
import RiskProfile from "@/components/Modules/Epfrs/CreateData/Sections/RiskProfile/RiskProfile";
import AppSecondaryLayout from "@/components/Layouts/AppSecondaryLayout";
import { Page } from "@/pages/_app";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import Head from "next/head";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import CustomerKnowledgeAssesment from "@/components/Modules/Epfrs/CreateData/Sections/CustomerKnowledgeAssesment/CustomerKnowledgeAssesment";
import Affordability from "@/components/Modules/Epfrs/CreateData/Sections/Affordability/Affordability";
import AnalysisRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AnalysisRecommendation";
import SwitchingReplacement from "@/components/Modules/Epfrs/CreateData/Sections/SwitchingReplacement/SwitchingReplacement";
import ClientsAcknowledgment from "@/components/Modules/Epfrs/CreateData/Sections/ClientsAcknowledgment/ClientsAcknowledgment";
import RepresentativeDeclaration from "@/components/Modules/Epfrs/CreateData/Sections/RepresentativeDeclaration/RepresentativeDeclaration";
import PrioritiesNeedAnalysis from "@/components/Modules/Epfrs/CreateData/Sections/PrioritiesNeedAnalysis/PrioritiesNeedAnalysis";
import GroupRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/GroupRecommendation/GroupRecommendation";
import AddPlanRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AddPlanRecommendation/AddPlanRecommendation";
import ScrollSpy from "react-ui-scrollspy";
import SidebarLogo from "@/components/Layouts/Sidebar/SidebarLogo";
import { useRouter } from "next/router";
import { localOwnerId, localPfrId, localType } from "@/libs/helper";
import { getAllPfrData } from "@/services/pfrService";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import LoadingPage from "@/components/Attributes/Informations/LoadingPage";
import RetrieveClientDataNew from "@/components/Modules/Epfrs/CreateData/RetrieveSingpass/RetrieveClientDataNew";
import { siteConfig } from "@/libs/config";

const CreatePfrPage: Page = () => {
  const router = useRouter();
  const { pfrType } = router.query;

  let pfrTypeId = pfrType === "single" ? 1 : 2;

  let { showDetailData, sectionCreateEpfrId } = useNavigationSection();
  let { setGlobal, fetchClient } = usePersonalInformation();

  const parentScrollContainerRef = useRef<HTMLDivElement | null>(null);

  const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    showDetailData(1);

    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      var headerOffset = 0;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  let menuNavigation = siteConfig.epfrMenu;

  let elementActive = null;

  switch (sectionCreateEpfrId) {
    case 100:
      elementActive = <RetrieveClientDataNew />;
      break;
    case 91:
      elementActive = <GroupRecommendation />;
      break;
    case 92:
      elementActive = <AddPlanRecommendation />;
      break;
    default:
      elementActive = <RetrieveClientDataNew />;
      break;
  }

  let switchDisplay = false;

  if (
    sectionCreateEpfrId == 100 ||
    sectionCreateEpfrId == 91 ||
    sectionCreateEpfrId == 92
  ) {
    switchDisplay = true;
  }

  const [loading, setLoading] = useState(false);

  const getGeneralData = async (params: any) => {
    try {
      setLoading(true); // Set loading before sending API request

      let generalData = await getAllPfrData(params);

      setGlobal("ownerId", params);
      // Fetch Client
      if (generalData.clients.length > 0) {
        generalData.clients.map((data: any, index: number) => {
          storeDataClientToState(index, data);
        });
      }

      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  const storeDataClientToState = (index: number, data: any) => {
    fetchClient(index, data);
  };

  const setStartingDoc = (localOwner: any, localT: any) => {

    setGlobal("ownerId", localOwner);
    setGlobal("type", localT == null ? pfrTypeId : localT);
  };


  useEffect(() => {

    if (!router.isReady) return;

    let localOwner = localOwnerId();
    let localT = localType();

    setStartingDoc(localOwner, localT);

    if (router.query.id !== null && router.query.id !== undefined) {
      getGeneralData(router.query.id);
    }
    
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{`New EPFR Document | ${siteConfig.siteName}`}</title>
      </Head>
      <aside
        className={`fixed top-0 z-10 w-56 min-h-screen px-6 py-16 bg-blue-midnight text-sm overflow-hidden`}
      >
        <div className="mb-7">
          <SidebarLogo />
        </div>
        <div className="mb-7">
          {" "}
          <Link href="/epfr" className="flex text-white">
            <ArrowLeftSLineIcon /> Back to EPFR list
          </Link>
        </div>
        <div className="space-y-8">
          {menuNavigation.map((val, index) => (
            <a
              key={"epfr-menu" + val.id}
              className={`flex flex-row cursor-pointer`}
              onClick={(e) => onPress(e)}
              href={"#" + val.url}
            >
              <div
                data-to-scrollspy-id={val.url}
                className="flex flex-row items-center justify-start gap-2 sub-menu-epfr"
              >
                <span className="w-6 h-6 px-2 py-1 text-xs text-center bg-white rounded-md text-blue-midnight">
                  {val.id}
                </span>
                <span>{val.name}</span>
              </div>
            </a>
          ))}
        </div>
      </aside>
      {loading ? (
        <main className="flex-1 md:ml-56">
          <div className="flex flex-row items-center justify-center h-screen mx-8 2xl:mx-60">
            <LoadingPage />
          </div>
        </main>
      ) : (
        <main className="flex-1 md:ml-56">
          <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
            <GlobalCard className="min-h-screen pt-16">
              <div className="flex flex-row items-center justify-between mx-8 2xl:mx-60 mb-14">
                <Link href="/epfr" className="flex text-green-deep">
                  <ArrowLeftSLineIcon /> Back
                </Link>
                <TitleMedium>New EPFR Documents</TitleMedium>
              </div>
              <div id="dataPfr">
                {switchDisplay ? (
                  <>{elementActive}</>
                ) : (
                  <div ref={parentScrollContainerRef}>
                    <ScrollSpy
                      // parentScrollContainerRef={parentScrollContainerRef}
                      activeClass="sub-menu-epfr-active"
                      offsetBottom={300}
                      scrollThrottle={80}
                      useBoxMethod
                    >
                      <PersonalInformation pfrType={pfrTypeId} id="section-1" />
                      <ExistingPortofolio pfrType={pfrTypeId} id="section-2" />
                      <CashFlow pfrType={pfrTypeId} id="section-3" />
                      <BalanceSheet pfrType={pfrTypeId} id="section-4" />
                      <RiskProfile pfrType={pfrTypeId} id="section-5" />
                      <CustomerKnowledgeAssesment
                        pfrType={pfrTypeId}
                        id="section-6"
                      />
                      <PrioritiesNeedAnalysis
                        pfrType={pfrTypeId}
                        id="section-7"
                      />
                      <Affordability pfrType={pfrTypeId} id="section-8" />
                      <AnalysisRecommendation
                        pfrType={pfrTypeId}
                        id="section-9"
                      />
                      <SwitchingReplacement
                        pfrType={pfrTypeId}
                        id="section-10"
                      />
                      <ClientsAcknowledgment
                        pfrType={pfrTypeId}
                        id="section-11"
                      />
                      <RepresentativeDeclaration
                        pfrType={pfrTypeId}
                        id="section-12"
                      />
                    </ScrollSpy>
                  </div>
                )}
              </div>
            </GlobalCard>
          </section>
        </main>
      )}
    </>
  );
};

CreatePfrPage.getLayout = function getLayout(content: any) {
  return <AppSecondaryLayout typeMenu="1">{content}</AppSecondaryLayout>;
};

export default CreatePfrPage;
