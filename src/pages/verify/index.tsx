import React, { useEffect, useRef, useState } from "react";
import { Page } from "@/pages/_app";
import AuthLayout from "@/components/Layouts/AuthLayout";

import { useUserData } from "@/store/login/data";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Loading from "@/components/Forms/Loading/Loading";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { siteConfig } from "@/libs/config";
const Verify: Page = () => {
  const [isLoading, setLoading] = useState(false);
  const { push } = useRouter();
  const error = (text: string) => toast.error(text);
  const success = (text: string) => toast.success(text);
  const { userEmail, deleteEmail } = useUserData();

  useEffect(() => {
    if (userEmail === "") {
      push("/");
    }
  });
  const verify = async (code: number) => {
    setLoading(true);
    const result = await signIn("login", {
      code: code,
      email: userEmail,
      redirect: false,
    });

    if (result?.status == 200) {
      // setLogin()
      push("/overview");
    } else {
      error("Code error. Check your code or re-send please");
    }
    setLoading(false);
  };
  const inputRef = useRef<any[]>([]);
  const [codeNumber, setCodeNumber] = useState<any[]>(["", "", "", "", "", ""]);
  const [mixInput, setMixInput] = useState(0);
  const verifyCode = (index: number) => {
    let temp = codeNumber.map((e, i) => {
      if (index == i) {
        return inputRef.current[index].value.substr(-1);
      } else {
        return e;
      }
    });
    setCodeNumber(temp);
    if (index != 5) {
      inputRef.current[index + 1].focus();
    } else {
      const finalCode = parseInt(temp.join(""));
      verify(finalCode);
    }
    setMixInput(parseInt(temp.join("")));
  };
  function handleFocusVerify(e: any) {
    e.target.select();
  }

  return (
    <>
      <Head>
        <title>{`Code Verification | ${siteConfig.siteName}`}</title>
      </Head>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="grid h-screen place-items-center">
          <div className="w-[400px]">
            <div className="flex flex-col">
              <div className="mb-6">
                <Image
                  src="/LegacyFALogo.png"
                  alt="logo"
                  width={146}
                  height={48}
                />
              </div>
              <div className="mb-10 text-base font-normal text-gray-light">
                {`Please check your email`}
                <br />
                <span className="text-sm text-gray-light">
                  {`We have sent a message to your email regarding the verification code`}
                </span>
              </div>
              <div className="mb-10">
                <div className="flex justify-between w-full gap-2">
                  <input
                    className="w-12 rounded-md"
                    autoFocus
                    type="text"
                    value={codeNumber[0]}
                    onFocus={(e) => {
                      handleFocusVerify(e);
                    }}
                    onChange={() => {
                      verifyCode(0);
                    }}
                    ref={(element) => {
                      inputRef.current[0] = element;
                    }}
                  />
                  <input
                    className="w-12 rounded-md"
                    type="text"
                    value={codeNumber[1]}
                    onFocus={(e) => {
                      handleFocusVerify(e);
                    }}
                    onChange={() => {
                      verifyCode(1);
                    }}
                    ref={(element) => {
                      inputRef.current[1] = element;
                    }}
                  />
                  <input
                    className="w-12 rounded-md"
                    type="text"
                    value={codeNumber[2]}
                    onFocus={(e) => {
                      handleFocusVerify(e);
                    }}
                    onChange={() => {
                      verifyCode(2);
                    }}
                    ref={(element) => {
                      inputRef.current[2] = element;
                    }}
                  />
                  <input
                    className="w-12 rounded-md"
                    type="text"
                    value={codeNumber[3]}
                    onFocus={(e) => {
                      handleFocusVerify(e);
                    }}
                    onChange={() => {
                      verifyCode(3);
                    }}
                    ref={(element) => {
                      inputRef.current[3] = element;
                    }}
                  />
                  <input
                    className="w-12 rounded-md"
                    type="text"
                    value={codeNumber[4]}
                    onFocus={(e) => {
                      handleFocusVerify(e);
                    }}
                    onChange={() => {
                      verifyCode(4);
                    }}
                    ref={(element) => {
                      inputRef.current[4] = element;
                    }}
                  />
                  <input
                    className="w-12 rounded-md"
                    type="text"
                    value={codeNumber[5]}
                    onFocus={(e) => {
                      handleFocusVerify(e);
                    }}
                    onChange={() => {
                      verifyCode(5);
                    }}
                    ref={(element) => {
                      inputRef.current[5] = element;
                    }}
                  />
                </div>
              </div>

              <ButtonGreenMedium
                onClick={() => {
                  verify(mixInput);
                }}
                className="justify-center w-full"
              >
                Verify
              </ButtonGreenMedium>
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
            <Image src="/ChartLogin.png" alt="Chart" width={800} height={800} />
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
Verify.getLayout = function getLayout(content: any) {
  return <AuthLayout>{content}</AuthLayout>;
};

export default Verify;
