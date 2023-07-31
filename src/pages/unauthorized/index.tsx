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

const Unauthorized: Page = () => {
  const { push } = useRouter();

  const back = () => {
    push("/");
  };

  return (
    <>
      <Head>
        <title>Unauthorized</title>
      </Head>
      <GlobalCard className="flex flex-col items-center justify-center w-full min-h-screen pt-16 bg-gray-soft-white-soft">
        <div className="flex flex-col  text-center">
          <h1 className="text-[240px] text-gray-soft-strong">403</h1>
          <span className="font-bold mb-8">Access Denied</span>
          <p>
            We are sorry the page you are trying to access has restricted <br />
            access. Please refer to system administrator.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <ButtonGreenMedium onClick={back}>Go back</ButtonGreenMedium>
        </div>
      </GlobalCard>
    </>
  );
};

Unauthorized.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default Unauthorized;
