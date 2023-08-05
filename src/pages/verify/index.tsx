import React, { useEffect, useRef, useState } from "react";
import { Page } from "@/pages/_app";
import AuthLayout from "@/components/Layouts/AuthLayout";
import Input from "@/components/Forms/Input";
import axios from "axios";
import { useUserData } from "@/store/login/data";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { log } from "console";
import Image from "next/image";
import Loading from "@/components/Forms/Loading/Loading";
import style from "./_component/verify.module.css";

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
      push("/overview");
    } else {
      error("Code error. Check your code or re-send please");
    }
    setLoading(false);
  };
  const inputRef = useRef<any[]>([]);
  const [codeNumber, setCodeNumber] = useState<any[]>(["", "", "", "", "", ""]);
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
  };
  function handleFocusVerify(e: any) {
    e.target.select();
  }

  return (
    <div className="grid grid-cols-1 w-full lg:grid-cols-2">
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
      <div className="grid place-items-center h-screen">
        <div className="min-w-[400px] ">
          <div className="mb-6">
            <Image src="/LegacyFALogo.png" alt="logo" width={146} height={48} />
          </div>
          <div className="text-base font-normal mb-9 text-gray-light">
            {`Please check your email for code`}
          </div>
          {/* <div className="mb-12">
            <Input
              type="text"
              label="Code"
              className="mb-4"
              handleChange={(event) => setCode(event.target.value)}
            />
          </div> */}
          <div className={`mb-12 ${style.div}`}>
            <input
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
        {/* <div className="w-full my-3 text-center">Or</div>
        <ButtonRedMedium className="justify-center w-full">
          Log in with singpass
        </ButtonRedMedium> */}
        <div className="w-full my-4 text-center">
          {/* {`Don't have account.? Register Now`} */}
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
          <Image src="/ChartLogin.png" alt="Chart" width={800} height={800} />
        </div>
      </div>
    </div>
  );
};
Verify.getLayout = function getLayout(content: any) {
  return <AuthLayout>{content}</AuthLayout>;
};

export default Verify;
