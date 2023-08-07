import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

import { siteConfig } from "@/libs/config";
import Head from "next/head";
import React from "react";

const SignaturePage = () => {
  return (
    <>
      <Head>
        <title>{`Epfr Datas | ${siteConfig.siteName}`}</title>
      </Head>
      <main className="flex-1 md:ml-64 bg-white-bone">
        <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
          <GlobalCard className="min-h-screen pt-16">
            <div className="flex flex-row items-center justify-between mx-8">
              <TitleMedium>EPFR Documents</TitleMedium>
            </div>
            <div>tes</div>
          </GlobalCard>
        </section>
      </main>
    </>
  );
};

SignaturePage.getLayout = function getLayout(content: any) {
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default SignaturePage;
