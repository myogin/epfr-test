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
import React, { useRef, useEffect } from "react";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import CustomerKnowledgeAssesment from "@/components/Modules/Epfrs/CreateData/Sections/CustomerKnowledgeAssesment/CustomerKnowledgeAssesment";
import Affordability from "@/components/Modules/Epfrs/CreateData/Sections/Affordability/Affordability";
import AnalysisRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AnalysisRecommendation";
import SwitchingReplacement from "@/components/Modules/Epfrs/CreateData/Sections/SwitchingReplacement/SwitchingReplacement";
import ClientsAcknowledgment from "@/components/Modules/Epfrs/CreateData/Sections/ClientsAcknowledgment/ClientsAcknowledgment";
import RepresentativeDeclaration from "@/components/Modules/Epfrs/CreateData/Sections/RepresentativeDeclaration/RepresentativeDeclaration";
import PrioritiesNeedAnalysis from "@/components/Modules/Epfrs/CreateData/Sections/PrioritiesNeedAnalysis/PrioritiesNeedAnalysis";
import RetrieveClientData from "@/components/Modules/Epfrs/CreateData/RetrieveClientDatas/RetrieveClientData";
import GroupRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/GroupRecommendation/GroupRecommendation";
import AddPlanRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AddPlanRecommendation/AddPlanRecommendation";
import ScrollSpy from "react-ui-scrollspy";
import PrioritiesNeedAnalysisMenu from "@/components/Modules/Epfrs/CreateData/Sections/PrioritiesNeedAnalysis/PrioritiesNeedAnalysisMenu";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import SidebarLogo from "@/components/Layouts/Sidebar/SidebarLogo";
import { useRouter } from "next/router";

const EpfrCreateSingle: Page = () => {

  let { showDetailData, sectionCreateEpfrId } = useNavigationSection();

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

  // console.log("scroll position div "+parentScrollContainerRef.current?.id);

  let menuNavigation = [
    {
      id: 1,
      name: "Personal Information",
      url: "section-1",
    },
    {
      id: 2,
      name: "Existing Portfolio",
      url: "section-2",
    },
    {
      id: 3,
      name: "Cash Flow",
      url: "section-3",
    },
    {
      id: 4,
      name: "Balance Sheet",
      url: "section-4",
    },
    {
      id: 5,
      name: "Risk Profile",
      url: "section-5",
    },
    {
      id: 6,
      name: "Customer Knowledge Assesment",
      url: "section-6",
    },
    {
      id: 7,
      name: "Priorities & Need Analysis",
      url: "section-7",
    },
    {
      id: 8,
      name: "Affordability",
      url: "section-8",
    },
    {
      id: 9,
      name: "Analysis & Recommendation",
      url: "section-9",
    },
    {
      id: 10,
      name: "Switching / Replacement",
      url: "section-10",
    },
    {
      id: 11,
      name: "Client’s Acknowledgment",
      url: "section-11",
    },
    {
      id: 12,
      name: "Representative Declaration",
      url: "section-12",
    },
  ];

  let elementActive = null;

  switch (sectionCreateEpfrId) {
    case 100:
      elementActive = <RetrieveClientData />;
      break;
    case 91:
      elementActive = <GroupRecommendation />;
      break;
    case 92:
      elementActive = <AddPlanRecommendation />;
      break;
    default:
      elementActive = <RetrieveClientData />;
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

  return (
    <>
      <Head>
        <title>New EPFR Document</title>
      </Head>
      <aside
        className={`fixed top-0 z-10 w-56 min-h-screen px-6 py-16 bg-blue-midnight text-sm overflow-hidden`}
      >
        <div className="mb-7">
          <SidebarLogo />
        </div>
        <div className="mb-7">
          {" "}
          <Link href="/" className="flex text-white">
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
      <main className="flex-1 md:ml-56">
        <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
          <GlobalCard className="min-h-screen pt-16">
            <div className="flex flex-row items-center justify-between mx-8 2xl:mx-60 mb-14">
              <Link href="/" className="flex text-green-deep">
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
                    <PersonalInformation id="section-1" />
                    <ExistingPortofolio id="section-2" />
                    <CashFlow id="section-3" />
                    <BalanceSheet id="section-4" />
                    <RiskProfile id="section-5" />
                    <CustomerKnowledgeAssesment id="section-6" />
                    <PrioritiesNeedAnalysis id="section-7" />
                    <Affordability id="section-8" />
                    <AnalysisRecommendation id="section-9" />
                    <SwitchingReplacement id="section-10" />
                    <ClientsAcknowledgment id="section-11" />
                    <RepresentativeDeclaration id="section-12" />
                  </ScrollSpy>
                </div>
              )}
            </div>
          </GlobalCard>
        </section>
      </main>
    </>
  );
};

EpfrCreateSingle.getLayout = function getLayout(content: any) {
  return <AppSecondaryLayout typeMenu="1">{content}</AppSecondaryLayout>;
};

export default EpfrCreateSingle;
