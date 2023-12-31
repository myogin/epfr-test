import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { siteConfig } from "@/libs/config";

interface Props {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <Head>
        <title>{`Dashboard | ${siteConfig.siteName}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isHydrated ? (
        <div className="flex flex-row w-full min-h-screen font-sans bg-white">
          <Sidebar />
          {children}
        </div>
      ) : null}
    </>
  );
};

export default DashboardLayout;
