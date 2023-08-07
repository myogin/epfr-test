import React, { useEffect, useState } from "react";
import { Page } from "@/pages/_app";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserData } from "@/store/login/data";
import Loading from "@/components/Forms/Loading/Loading";
import Image from "next/image";
import Input from "@/components/Forms/Input";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ChartLogin from "../../public/ChartLogin.png";
import LogoLfa from "../../public/LegacyFALogo.png";
import Head from "next/head";
import { siteConfig } from "@/libs/config";

const LoginPage: Page = () => {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);

  const error = (text: string) => toast.error(text);
  const success = (text: string) => toast.success(text);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userEmail, setUserEmail } = useUserData();

  const login = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const msg = res.data.result;
        setUserEmail(email);
        // success(msg);
      })
      .then((data) => {
        push("/verify");
      })
      .catch((err) => {
        const msg = err.response.data.error;
        error(msg);
      });
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>{`Login | ${siteConfig.siteName}`}</title>
      </Head>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="grid h-screen place-items-center">
          <div className="min-w-[400px] ">
            <div className="mb-6">
              <Image src={LogoLfa} alt="logo" />
            </div>
            <div className="text-base font-normal mb-9 text-gray-light">
              {`Log in to your account and let’s get strated.`}
            </div>
            <div className="mb-12">
              <Input
                type="email"
                label="Email"
                className="mb-4"
                handleChange={(event) => setEmail(event.target.value)}
              />
              <Input
                type="password"
                label="Password"
                className="mb-4"
                handleChange={(event) => setPassword(event.target.value)}
              />
              <ButtonGreenMedium
                onClick={login}
                className="justify-center w-full"
              >
                Log in
              </ButtonGreenMedium>
              {/* Forgot your password? */}
            </div>
          </div>
        </div>
        <div className="hidden w-full bg-blue-midnight lg:block">
          <div className="p-20 text-3xl text-white">
            Hi, Welcome Back!
            <br />
            {`Let’s get start with wide range of insurance products that are
          tailored to our client’s needs.`}
          </div>
          <div>
            <Image src={ChartLogin} alt="Chart" />
          </div>
        </div>
        <Loading isLoading={isLoading} />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

LoginPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default LoginPage;
