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

const EpfrLogin: Page = () => {
  const router = useRouter();
  const { status } = useSession();
  const { setLogin, token } = useLoginData();

  const loginTest = async (token: any) => {
    if (token) {
      const result = await signIn("credentials", {
        token: token,
      });
    }
  };
  if (router.query.error) {
    router.push("/unauthorized");
  }

  useEffect(() => {
    setLogin(router.query.token, router.query.ownerId);
    loginTest(router.query.token);
  });
  return <div>...Loading</div>;
};

EpfrLogin.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrLogin;
