import React from "react";
import Head from "next/head";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import { useRouter } from "next/router";
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon'
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonBorderMedium from "@/components/Forms/Buttons/ButtonBorderMedium";

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
        <title>New EPFR Finish - Unicorn Project</title>
      </Head>
      <GlobalCard className="flex flex-col items-center justify-center w-full min-h-screen pt-16 bg-gray-soft-white-soft">
        <div className="py-12 bg-white rounded-lg cursor-pointer px-11">
          <div className="flex items-center justify-between mb-10 text-left">
            <TitleMedium>Congratulation</TitleMedium> <CheckboxCircleFillIcon className="text-green-deep" size={30} />
          </div>
          <div className="text-md text-gray-light">
            You successfully submitted new epfr document. Check your email inbox
            to continue signing step.
            <br />
            Now you will be redirected to old system. Click proceed to continue
            this action.
          </div>
          <div className="flex items-center gap-4 mt-4">
            <ButtonGreenMedium onClick={back}>Proceed</ButtonGreenMedium>
            or
            <ButtonBorderMedium className="font-semibold text-green-deep border-green-deep" onClick={back}>Create Other EPFR</ButtonBorderMedium>
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
