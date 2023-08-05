import AuthLayout from "@/components/Layouts/AuthLayout";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useUserData } from "@/store/login/data";
import { useLoginData } from "@/store/login/logindata";

const Overview = () => {
  const { data: session, status } = useSession();
  const {setLogin} = useLoginData();

  const { deleteEmail } = useUserData();

  console.log("Test")
  console.log(session?.user?.id);
  console.log();

  useEffect(() => {
    deleteEmail();
    
    setLogin(session?.user?.token, session?.user?.id)
    

  });

 

  return (
    <div>
      overview
      <hr />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
};

Overview.getLayout = function getLayout(content: any) {
  return <AuthLayout>{content}</AuthLayout>;
};

export default Overview;
