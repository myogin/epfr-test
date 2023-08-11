import { Inter } from "next/font/google";
import { Page } from "../_app";
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
import { siteConfig } from "@/libs/config";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { useCustomerKnowledgeAssesment } from "@/store/epfrPage/createData/customerKnowledgeAssesment";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";
import { useAffordability } from "@/store/epfrPage/createData/affordability";

const inter = Inter({ subsets: ["latin"] });

const EpfrPage: Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setLogin } = useLoginData();

  let { resetSectionOne } = usePersonalInformation();
  let { resetSectionTwo } = useExistingPortofolio();
  let { resetSectionThree } = useCashFlow();
  let { resetPfr } = usePfrData();
  let { resetSectionFour } = useBalanceSheet();
  let { resetSectionSix } = useCustomerKnowledgeAssesment();
  let { resetSectionSeven } = usePrioritiesNeedAnalysis();
  let { resetSectionEight } = useAffordability();

  const getGeneralData = async () => {
    if (router.query.edit) {
      const pfr: any = await getAllPfrData(router.query.pfrId);
    }
  };

  const goToCreatePfr = (params: string) => {
    resetSectionOne();
    resetSectionTwo();
    resetSectionThree();
    resetPfr();
    resetSectionFour();
    resetSectionSix();
    resetSectionSeven();
    resetSectionEight();

    router.push(`create/${params}`);
  };

  console.log(status);
  useEffect(() => {
    getGeneralData();
    setLogin(session?.user?.token, session?.user?.id);
  });

  return (
    <>
      <Head>
        <title>{`Choose Type | ${siteConfig.siteName}`}</title>
      </Head>
      <GlobalCard className="flex flex-col w-full min-h-screen">
        <div className="fixed pt-14 pl-14">
          <Link href="/overview" className="flex text-green-deep">
            <ArrowLeftSLineIcon /> Back to EPFR list
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <div className="mb-10">
            <TitleMedium>Please choose EPFR type</TitleMedium>
          </div>
          <div className="flex justify-between gap-10">
            <div
              onClick={() => goToCreatePfr("single")}
              className="py-12 text-center border rounded-lg cursor-pointer px-11 border-gray-light hover:border-green-deep hover:bg-green-light"
            >
              <button className="mb-3">
                <File3FillIcon className="text-green-deep" size={50} />
              </button>
              <h2 className="text-md">Single EPFR Document</h2>
              <span className="text-sm text-gray-light">
                This EPFR for one person
              </span>
            </div>
            <div
              onClick={() => goToCreatePfr("joint")}
              className="py-12 text-center border rounded-lg cursor-pointer px-11 border-gray-light hover:border-green-deep hover:bg-green-light"
            >
              <button className="mb-3">
                <File3FillIcon className="text-green-deep" size={50} />
              </button>
              <h2 className="text-md">Joint EPFR Document</h2>
              <span className="text-sm text-gray-light">
                This EPFR for two persons
              </span>
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
