import AuthLayout from "@/components/Layouts/AuthLayout";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useUserData } from "@/store/login/data";

const Overview = () => {
  const { data: session, status } = useSession();
  const { deleteEmail } = useUserData();
  useEffect(() => {
    deleteEmail();
  });
  console.log(session);

  return (
    <div>
      overview
      <hr />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

Overview.getLayout = function getLayout(content: any) {
  return <AuthLayout>{content}</AuthLayout>;
};

export default Overview;
