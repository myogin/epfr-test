import GlobalCard from '@/components/Attributes/Cards/GlobalCard';
import TitleMedium from '@/components/Attributes/Typography/TitleMedium';
import AppSecondaryLayout from '@/components/Layouts/AppSecondaryLayout';
import RetrieveClientData from '@/components/Modules/Epfrs/CreateData/RetrieveClientDatas/RetrieveClientData';
import Affordability from '@/components/Modules/Epfrs/CreateData/Sections/Affordability/Affordability';
import AddPlanRecommendation from '@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AddPlanRecommendation/AddPlanRecommendation';
import AnalysisRecommendation from '@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AnalysisRecommendation';
import GroupRecommendation from '@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/GroupRecommendation/GroupRecommendation';
import BalanceSheet from '@/components/Modules/Epfrs/CreateData/Sections/BalanceSheet/BalanceSheet';
import CashFlow from '@/components/Modules/Epfrs/CreateData/Sections/CashFlow/CashFlow';
import ClientsAcknowledgment from '@/components/Modules/Epfrs/CreateData/Sections/ClientsAcknowledgment/ClientsAcknowledgment';
import CustomerKnowledgeAssesment from '@/components/Modules/Epfrs/CreateData/Sections/CustomerKnowledgeAssesment/CustomerKnowledgeAssesment';
import ExistingPortofolio from '@/components/Modules/Epfrs/CreateData/Sections/ExistingPortofolio/ExistingPortofolio';
import PersonalInformationJoin from '@/components/Modules/Epfrs/CreateData/Sections/PersonalInformation/PersonalInformationJoin';
import PrioritiesNeedAnalysis from '@/components/Modules/Epfrs/CreateData/Sections/PrioritiesNeedAnalysis/PrioritiesNeedAnalysis';
import RepresentativeDeclaration from '@/components/Modules/Epfrs/CreateData/Sections/RepresentativeDeclaration/RepresentativeDeclaration';
import RiskProfile from '@/components/Modules/Epfrs/CreateData/Sections/RiskProfile/RiskProfile';
import SwitchingReplacement from '@/components/Modules/Epfrs/CreateData/Sections/SwitchingReplacement/SwitchingReplacement';
import { Page } from '@/pages/_app';
import { useNavigationSection } from '@/store/epfrPage/navigationSection';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
import ArrowLeftSLineIcon from 'remixicon-react/ArrowLeftSLineIcon';

const EpfrCreateJoint: Page = () => {

  let pfrType = 2;

  let showElement = useNavigationSection(
    (state: { sectionCreateEpfrId: number }) => state.sectionCreateEpfrId
  );

  let elementActive = null;

  switch (showElement) {
    case 100:
      elementActive = <RetrieveClientData />;
      break;
    case 1:
      elementActive = <PersonalInformationJoin />;
      break;
    case 2:
      elementActive = <ExistingPortofolio />;
      break;
    case 3:
      elementActive = <CashFlow />;
      break;
    case 4:
      elementActive = <BalanceSheet />;
      break;
    case 5:
      elementActive = <RiskProfile />;
      break;
    case 6:
      elementActive = <CustomerKnowledgeAssesment />;
      break;
    case 7:
      elementActive = <PrioritiesNeedAnalysis />;
      break;
    case 8:
      elementActive = <Affordability />;
      break;
    case 9:
      elementActive = <AnalysisRecommendation />;
      break;
    case 91:
      elementActive = <GroupRecommendation />;
      break;
    case 92:
      elementActive = <AddPlanRecommendation />;
      break;
    case 10:
      elementActive = <SwitchingReplacement />;
      break;
    case 11:
      elementActive = <ClientsAcknowledgment />;
      break;
    case 12:
      elementActive = <RepresentativeDeclaration />;
      break;
    default:
      elementActive = <PersonalInformationJoin />;
      break;
  }

  return (
    <>
      <Head>
        <title>New EPFR Document - Unicorn Project</title>
      </Head>
      <main className="flex-1 md:ml-80">
        <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
          <GlobalCard className="min-h-screen pt-16">
            <div className="flex flex-row items-center justify-between mx-8 2xl:mx-60 mb-14">
              <Link href="/" className="flex text-green-deep">
                <ArrowLeftSLineIcon /> Back
              </Link>
              <TitleMedium>New EPFR Documents</TitleMedium>
            </div>
            <div id="dataPfr" className="mx-8 2xl:mx-60">
              {elementActive}
            </div>
          </GlobalCard>
        </section>
      </main>
    </>
  );
};

EpfrCreateJoint.getLayout = function getLayout(content: any) {
  return <AppSecondaryLayout typeMenu="1">{content}</AppSecondaryLayout>;
};

export default EpfrCreateJoint;