import React, { useEffect } from "react";
import Head from "next/head";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import { useRouter } from "next/router";
import CheckboxCircleFillIcon from "remixicon-react/CheckboxCircleFillIcon";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonBorderMedium from "@/components/Forms/Buttons/ButtonBorderMedium";
import { signIn, useSession } from "next-auth/react";
import { useLoginData } from "@/store/login/logindata";
import { localToken } from "@/libs/helper";

const EpfrLogin: Page = () => {
  const router = useRouter();
  const { status } = useSession();
  const { setLogin, token } = useLoginData();

  const loginTest = async (token1: any) => {
    if (token1) {
      const result = await signIn("credentials", {
        token: token1,
        redirect: false,
      });

      if (result?.status == 200) {
        router.push("/epfr");
      } else {
        router.push("/unauthorized");
      }
    }
  };

  useEffect(() => {
    let tokenFix = localToken();

    let localT = tokenFix === null ? router.query.token : tokenFix;

    if (localT == undefined || localT == null) {
      router.push("/unauthorized");
    }
    setLogin(localT, router.query.ownerId);
    loginTest(localT);
  });

  return <div>...Loading aja</div>;
};

EpfrLogin.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrLogin;
