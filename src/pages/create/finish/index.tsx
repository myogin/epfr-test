import React from "react";
import Head from "next/head";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import { useRouter } from "next/router";
import CheckboxCircleFillIcon from "remixicon-react/CheckboxCircleFillIcon";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonBorderMedium from "@/components/Forms/Buttons/ButtonBorderMedium";
import { siteConfig } from "@/libs/config";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";

const EpfrCreateFinish: Page = () => {
  const { push } = useRouter();

  const back = () => {
    const token = localStorage.getItem('token')?? '';
    const login = localStorage.getItem('login')?? '{}';
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    push("/");
  };

  return (
    <>
      <Head>
        <title>{`New EPFR Finish | ${siteConfig.siteName}`}</title>
      </Head>
      <GlobalCard className="flex flex-col items-center justify-center w-full min-h-screen pt-16 bg-gray-soft-white-soft">
        <div className="py-12 bg-white rounded-lg cursor-pointer px-11">
          <div className="flex items-center justify-between mb-10 text-left">
            <TitleMedium>Congratulation</TitleMedium>{" "}
            <CheckboxCircleFillIcon className="text-green-deep" size={30} />
          </div>
          <div className="text-md text-gray-light">
            You successfully submitted a new EPFR document. Please check your email to continue the signing step.
            <br />
            Please see your document security status:
          </div>
          
          {/* Document Security */}
          <div style={{border: '1px solid #000', marginTop: '1.5rem', padding: '0 1.5rem'}}>
            <div style={{marginTop: '1.5rem'}}>
              <TitleMedium>DOCUMENT SECURITY</TitleMedium>{" "}
            </div>

            <div className="mt-5">
              <RowFourthGrid className="mt-5">
                  <div className="font-bold">Recipent 1:</div>
                  <div className="text-sm">Email</div>
                  <div></div>
                  <div></div>
              </RowFourthGrid>
              <RowFourthGrid className="mt-5">
                  <div className="font-bold">Access Code</div>
                  <div className="text-sm">
                    <span className="mr-2">xxxxxxx</span>
                    <span className="mr-2">toggle eye icon</span>
                    <span>copy icon</span>
                  </div>
                  <div className="text-sm"></div>
                  <div className="text-sm"></div>
              </RowFourthGrid> 
            </div>

            <div style={{marginTop: '3rem'}}>
              <RowFourthGrid className="mt-5">
                  <div className="font-bold">Recipent 2:</div>
                  <div className="text-sm">Email</div>
                  <div></div>
                  <div></div>
              </RowFourthGrid>
              <RowFourthGrid className="mt-5">
                  <div className="font-bold">Access Code</div>
                  <div className="text-sm">NA</div>
                  <div></div>
                  <div></div>
              </RowFourthGrid>
            </div>

            <div style={{marginTop: '3rem'}}>
              <RowFourthGrid className="mt-5">
                  <div className="font-bold">Recipent 3:</div>
                  <div className="text-sm">Email</div>
                  <div></div>
                  <div></div>
              </RowFourthGrid>
              <RowFourthGrid className="mt-5">
                  <div className="font-bold">Access Code</div>
                  <div className="text-sm">NA</div>
                  <div></div>
                  <div></div>
              </RowFourthGrid>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <ButtonGreenMedium onClick={back}>Complete</ButtonGreenMedium>
            {/* or
            <ButtonBorderMedium
              className="font-semibold text-green-deep border-green-deep"
              onClick={back}
            >
              Create Other EPFR
            </ButtonBorderMedium> */}
          </div>
        </div>
      </GlobalCard>
    </>
  );
};

EpfrCreateFinish.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrCreateFinish;
