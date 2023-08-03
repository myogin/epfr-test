import React, { useState } from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Page } from "@/pages/_app";
import LogoLfa from "../../public/LegacyFALogo.png";
import ChartLogin from "../../public/ChartLogin.png";
import Image from "next/image";
import Input from "@/components/Forms/Input";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import { useRouter } from "next/router";

const LoginPage: Page = () => {

  const {push} = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const actionLogin = () => {

    if(email === "" || password === "") {
      console.log("cannot login")
    }else {
      push('/dashboard');
    }
  }
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="py-28 lg:px-72 2xl:px-96 sm:px-10 md:px-28 basis-1/2 2xl:basis-3/5">
        <div className="mb-6">
          <Image src={LogoLfa} alt="logo" />
        </div>
        <div className="text-base font-normal mb-9 text-gray-light">
          {`Log in to your account and let’s get strated.`}
        </div>
        <div className="mb-12">
          <Input type="email" label="Email" className="mb-4" handleChange={(event) => setEmail(event.target.value)} />
          <Input type="password" label="Password" className="mb-4" handleChange={(event) => setPassword(event.target.value)} />
          Forgot your password?
        </div>
        <ButtonGreenMedium onClick={actionLogin} className="justify-center w-full">
          Log in
        </ButtonGreenMedium>
        <div className="w-full my-3 text-center">Or</div>
        <ButtonRedMedium className="justify-center w-full">
          Log in with singpass
        </ButtonRedMedium>
        <div className="w-full my-4 text-center">
        {`Don't have account.? Register Now`}
        </div>
        
      </div>
      <div className="space-y-32 bg-blue-midnight py-28 basis-1/2 2xl:basis-2/5">
        <div className="text-3xl text-white px-28">
          Hi, Welcome Back!
          <br />
          {`Let’s get start with wide range of insurance products that are
          tailored to our client’s needs.`}
        </div>
        <div>
        <Image src={ChartLogin} alt="Chart" />
        </div>
        
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(content: any) {
  return <AuthLayout>{content}</AuthLayout>;
};

export default LoginPage;
