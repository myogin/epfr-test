import { Inter } from "next/font/google";
import { Page } from "./_app";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import Link from "next/link";
import File3FillIcon from "remixicon-react/File3FillIcon";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import { useLoginData } from "@/store/login/logindata";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAllPfrData, validateToken } from "@/services/pfrService";
import { log } from "console";
import http from "@/libs/httpSetting";
import authHeader from "@/libs/authHeader";
import { signIn, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const EpfrPage: Page = () => {
  const router = useRouter();
  const { status } = useSession();
  const { setLogin, token } = useLoginData();

  const getGeneralData = async () => {
    if (router.query.edit) {
      const pfr: any = await getAllPfrData(router.query.pfrId);
    }
  };
  console.log(status);
  useEffect(() => {
    getGeneralData();
  });

  return (
    <>
      <Head>
        <title>Epfr Lite</title>
      </Head>
      <GlobalCard className="flex flex-col w-full min-h-screen">
        <div className="fixed pt-14 pl-14">
          <Link href="/" className="flex text-green-deep">
            <ArrowLeftSLineIcon /> Back to EPFR list
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <div className="mb-10">
            <TitleMedium>Please choose EPFR type</TitleMedium>
          </div>
          <div className="flex justify-between gap-10">
            <Link href="create/single">
              <div className="py-12 text-center border rounded-lg cursor-pointer px-11 border-gray-light hover:border-green-deep hover:bg-green-light">
                <button className="mb-3">
                  <File3FillIcon className="text-green-deep" size={50} />
                </button>
                <h2 className="text-md">Single EPFR Document</h2>
                <span className="text-sm text-gray-light">
                  This EPFR for one person
                </span>
              </div>
            </Link>
            <Link href="create/joint">
              <div className="py-12 text-center border rounded-lg cursor-pointer px-11 border-gray-light hover:border-green-deep hover:bg-green-light">
                <button className="mb-3">
                  <File3FillIcon className="text-green-deep" size={50} />
                </button>
                <h2 className="text-md">Joint EPFR Document</h2>
                <span className="text-sm text-gray-light">
                  This EPFR for two persons
                </span>
              </div>
            </Link>
          </div>
        </div>
      </GlobalCard>
    </>
  );
};

EpfrPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrPage;
