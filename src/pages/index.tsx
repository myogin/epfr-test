import React, { useEffect } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useLoginData } from "@/store/login/logindata";
import { localOwnerId, localPfrId, localToken } from "@/libs/helper";

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
    let ownerFix = localOwnerId();
    let pfrFix = localPfrId();

    let localT = tokenFix === null ? router.query.token : tokenFix;
    let pfrId = pfrFix === null ? router.query.pfrId : pfrFix;
    let ownerId = ownerFix === null ? router.query.ownerId : ownerFix;

    if (localT == undefined || localT == null) {
      router.push("/unauthorized");
    }
    setLogin(localT, ownerId, Number(pfrId));
    loginTest(localT);
  });
  return <div>...Loading</div>;
};

EpfrLogin.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrLogin;
