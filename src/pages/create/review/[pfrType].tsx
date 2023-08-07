import AppSecondaryLayout from "@/components/Layouts/AppSecondaryLayout";
import { Page } from "@/pages/_app";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import Head from "next/head";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import RetrieveClientData from "@/components/Modules/Epfrs/CreateData/RetrieveClientDatas/RetrieveClientData";
import GroupRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/GroupRecommendation/GroupRecommendation";
import AddPlanRecommendation from "@/components/Modules/Epfrs/CreateData/Sections/AnalysisRecommendation/AddPlanRecommendation/AddPlanRecommendation";
import SidebarLogo from "@/components/Layouts/Sidebar/SidebarLogo";
import { useRouter } from "next/router";
import Review from "@/components/Modules/Epfrs/CreateData/Sections/Review/Review";
import { siteConfig } from "@/libs/config";

const ReviewPage: Page = () => {
  const router = useRouter();
  const { pfrType } = router.query;

  let pfrTypeId = pfrType;

  return (
    <>
      <Head>
        <title>{`PFR Review | ${siteConfig.siteName}`}</title>
      </Head>
      <aside
        className={`fixed top-0 z-10 w-56 min-h-screen px-6 py-16 bg-blue-midnight text-sm overflow-hidden`}
      >
        <div className="mb-7">
          <SidebarLogo />
        </div>
        <div className="mb-7">
          {" "}
          <Link href={`/create/${pfrType}#section-12`} className="flex text-white">
            <ArrowLeftSLineIcon /> Back to Section 12
          </Link>
        </div>
      </aside>
      <main className="flex-1 md:ml-56">
        <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
            <Review />
        </section>
      </main>
    </>
  );
};

ReviewPage.getLayout = function getLayout(content: any) {
  return <AppSecondaryLayout typeMenu="1">{content}</AppSecondaryLayout>;
};

export default ReviewPage;
