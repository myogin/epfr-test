import { useSession } from "next-auth/react";
import React, { Suspense, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useUserData } from "@/store/login/data";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import SubNavbar from "@/components/Attributes/Navs/SubNavbar";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import SelectFilter from "@/components/Forms/Filters/SelectFilter";
import Head from "next/head";
import PfrSummaryDetail from "./_component/PfrSummaryDetail";
import { useDetailDataEpfr } from "@/store/epfrPage/detailData";
import PfrTable from "./_component/PfrTable";
import PfrButtonModal from "./_component/PfrButtonModal";
import Search2LineIcon from "remixicon-react/Search2LineIcon";
import { useFilterDataSubMenu } from "@/store/shared/filterDataSubMenu";
import { useLoginData } from "@/store/login/logindata";
import axios from "axios";
import { siteConfig } from "@/libs/config";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};
const Overview = () => {
  const { data: session, status } = useSession();
  const { setLogin } = useLoginData();

  const { deleteEmail } = useUserData();

  useEffect(() => {
    deleteEmail();
    setLogin(session?.user?.token, session?.user?.id);
  });

  let showElement = useDetailDataEpfr(
    (state: { dataId: number }) => state.dataId
  );

  const { epfrSubMenu } = useFilterDataSubMenu();

  const setData = (params: any) => {};

  let months: Array<any> = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Feb" },
    { id: 3, name: "Mar" },
    { id: 4, name: "Apr" },
    { id: 5, name: "Mei" },
    { id: 6, name: "Jun" },
    { id: 7, name: "Jul" },
    { id: 8, name: "Agst" },
    { id: 9, name: "Sept" },
    { id: 10, name: "Oct" },
    { id: 11, name: "Nov" },
    { id: 12, name: "Dec" },
  ];

  let types: Array<any> = [
    { id: 1, name: "Single" },
    { id: 2, name: "Joint" },
  ];

  let years: Array<any> = [];

  let currentYear = new Date().getFullYear();
  for (let i: number = currentYear; i >= 2000; i--) {
    years.push({ id: i, name: i });
  }

  let menu = [
    {
      id: 1,
      name: "Draft Process",
      icon: "",
      type: 1,
    },
    {
      id: 2,
      name: "Sign Process",
      icon: "",
      type: 1,
    },
    {
      id: 3,
      name: "Completed",
      icon: "",
      type: 1,
    },
    {
      id: 4,
      name: "",
      icon: <Search2LineIcon />,
      type: 2,
    },
  ];

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
              <PfrButtonModal />
            </div>
            <div id="subNavbar" className="mx-8">
              <SubNavbar typeMenu="epfrSubMenu" menu={menu} />
            </div>
            <div id="filter" className="flex gap-3 mx-8 my-5">
              <SelectFilter
                datas={months}
                handleChange={(event) => setData(event.target.value)}
              />
              <SelectFilter
                datas={years}
                handleChange={(event) => setData(event.target.value)}
              />
              <SelectFilter
                datas={types}
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
            <div id="dataPfr">
              <PfrTable />
            </div>
          </GlobalCard>
          {showElement > 0 ? (
            <GlobalCard className="min-h-screen pt-16 bg-white">
              <div className="flex flex-row items-center justify-between mx-8 my-5">
                <TitleMedium>Summary Details</TitleMedium>
              </div>
              <div id="detailSummary" className="mx-8">
                <PfrSummaryDetail />
              </div>
            </GlobalCard>
          ) : (
            ""
          )}
        </section>
      </main>
    </>
  );
};

Overview.getLayout = function getLayout(content: any) {
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default Overview;
