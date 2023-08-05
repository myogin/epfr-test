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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserData } from "@/store/login/data";
import Loading from "@/components/Forms/Loading/Loading";

const LoginPage: Page = () => {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);

  const error = (text: string) => toast.error(text);
  const success = (text: string) => toast.success(text);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const actionLogin = () => {
    if (email === "" || password === "") {
      console.log("cannot login");
    } else {
      push("/dashboard");
    }
  };
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

        setLoading(false);
      })
      .catch((err) => {
        const msg = err.response.data.error;
        setLoading(false);
        error(msg);
      });
  };
  return (
    <div className="grid grid-cols-1 w-full lg:grid-cols-2">
      <Loading isLoading={isLoading} />
      <div className="grid place-items-center h-screen">
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

          {/* <div className="w-full my-3 text-center">Or</div>
        <ButtonRedMedium className="justify-center w-full">
          Log in with singpass
        </ButtonRedMedium> */}
          <div className="w-full my-4 text-center">
            {/* {`Don't have account.? Register Now`} */}
          </div>
        </div>
      </div>
      <div className="bg-blue-midnight w-full hidden lg:block">
        <div className="text-3xl text-white p-20">
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
