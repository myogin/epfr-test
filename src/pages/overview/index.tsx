import React, { useCallback } from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import SelectFilter from "@/components/Forms/Filters/SelectFilter";
import Head from "next/head";
import { useDetailDataEpfr } from "@/store/epfrPage/detailData";
import PfrTable from "./_component/PfrTable";
import PfrButtonModal from "./_component/PfrButtonModal";
import { siteConfig } from "@/libs/config";
import PfrNavbar from "./_component/PfrNavbar";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Overview = () => {
  // const { data: session, status } = useSession();
  // console.log(session);

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
    { id: "types", name: "Types" },
    { id: "single", name: "Single" },
    { id: "joint", name: "Joint" },
  ];

  let years: Array<any> = [];

  let currentYear = new Date().getFullYear();
  for (let i: number = currentYear; i >= 2000; i--) {
    years.push({ id: i, name: i });
  }

  // handle filter
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const router = useRouter();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleTypesFilter = (value: string) => {
    if (value != "types") {
      router.push(pathname + "?" + createQueryString("type_like", value));
    } else {
      const { type_like, ...newQuery } = router.query;
      router.replace({
        query: { ...newQuery },
      });
    }
  };

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
              <PfrNavbar />
            </div>
            <div id="filter" className="flex gap-3 mx-8 my-5">
              {/* <SelectFilter
                datas={months}
                handleChange={(event) => setData(event.target.value)}
              />
              <SelectFilter
                datas={years}
                handleChange={(event) => setData(event.target.value)}
              /> */}
              <SelectFilter
                datas={types}
                handleChange={(event) => handleTypesFilter(event.target.value)}
              />
            </div>
            <div id="dataPfr">
              <PfrTable />
            </div>
          </GlobalCard>
        </section>
      </main>
    </>
  );
};

Overview.getLayout = function getLayout(content: any) {
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default Overview;
