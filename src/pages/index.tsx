import React, { useEffect } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useLoginData } from "@/store/login/logindata";
import { localOwnerId, localPfrId, localToken, localType } from "@/libs/helper";

const EpfrLogin: Page = () => {
  const router = useRouter();
  const { status } = useSession();
  const { setLogin, token } = useLoginData();

  const loginTest = async (token1: any, typeEpfr: number) => {
    if (token1) {
      const result = await signIn("credentials", {
        token: token1,
        redirect: false,
      });

      if (result?.status == 200) {
        if(typeEpfr != null && typeEpfr != undefined) {
          let typeString = typeEpfr !== null ? typeEpfr == 1 ? "single" : "joint" : ""
          router.push("/create/"+typeString+"#section-1");
        }else {
          router.push("/epfr");
        }
        
      } else {
        router.push("/unauthorized");
      }
    }
  };

  useEffect(() => {

    let tokenFix = localToken();
    let ownerFix = localOwnerId();
    let pfrFix = localPfrId();
    let typeEpfrFix = localType();

    let localT = router.query.token == null || router.query.token == undefined ? tokenFix : router.query.token;
    let pfrId = router.query.pfrId == null || router.query.pfrId == undefined ? pfrFix : router.query.pfrId;
    let ownerId = router.query.ownerId == null || router.query.ownerId == undefined ? ownerFix : router.query.ownerId;
    let typeEpfr = router.query.typeEpfr == null || router.query.typeEpfr == undefined ? typeEpfrFix : router.query.typeEpfr;

    if (localT == undefined || localT == null) {
      router.push("/unauthorized");
    }
    setLogin(localT, ownerId, Number(pfrId), typeEpfr);
    loginTest(localT,typeEpfr);
  });
  return <div>...Loading</div>;
};

EpfrLogin.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrLogin;
