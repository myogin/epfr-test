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
import { getAllPfrData } from "@/services/pfrService";

const inter = Inter({ subsets: ["latin"] });

const EpfrPage: Page = () => {
  const { setLogin } = useLoginData();
  const router = useRouter();

  const getGeneralData =async () => {
    if(router.query.edit) {
      const pfr:any = await getAllPfrData(router.query.pfrId);
    } 
  }

  useEffect(() => {
    getGeneralData();
    setLogin(router.query.token,router.query.ownerId);
  });
  return (
    <>
      <Head>
        <title>Epfr Apps</title>
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
            <div className="py-12 text-center border rounded-lg cursor-pointer px-11 border-gray-light hover:border-green-deep hover:bg-green-light">
              <Link href="create/single">
                <button className="mb-3">
                  <File3FillIcon className="text-green-deep" size={50} />
                </button>
                <h2 className="text-md">Single EPFR Document</h2>
                <span className="text-sm text-gray-light">
                  This EPFR for one person
                </span>
              </Link>
            </div>
            <div className="py-12 text-center border rounded-lg cursor-pointer px-11 border-gray-light hover:border-green-deep hover:bg-green-light">
              <Link href="create/joint">
                <button className="mb-3">
                  <File3FillIcon className="text-green-deep" size={50} />
                </button>
                <h2 className="text-md">Joint EPFR Document</h2>
                <span className="text-sm text-gray-light">
                  This EPFR for two persons
                </span>
              </Link>
            </div>
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
