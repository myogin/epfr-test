import React, { useEffect, useRef, useState } from "react";
import { Page } from "@/pages/_app";
import AuthLayout from "@/components/Layouts/AuthLayout";

import { useUserData } from "@/store/login/data";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { siteConfig } from "@/libs/config";
import { useLoginData } from "@/store/login/logindata";
import Loading from "@/components/Attributes/Loader/Loading";
import { resendService } from "@/services/login/loginService";
const Verify: Page = () => {
  const [isLoading, setLoading] = useState(false);
  const { push } = useRouter();
  const error = (text: string) => toast.error(text);
  const success = (text: string) => toast.success(text);
  const { userEmail, deleteEmail } = useUserData();
  const { data: session, status } = useSession();
  const { setLogin } = useLoginData();
  const [showResend,setShowResend] = useState(false);

  useEffect(() => {
    if (userEmail === "") {
      push("/");
    }
  }, []);
  const verify = async (code: number) => {
    setShowResend(true)
    setLoading(true);
    await signIn("login", {
      code: code,
      email: userEmail,
      redirect: false,
    }).then(async (res) => {
      if (res?.ok == false) {
        error("Code error. Check your code or re-send please");
      } else {
        const session = await getSession();
        setLogin(
          session?.user?.token,
          session?.user?.id,
          session?.user?.fullName
        );
        deleteEmail();
        push("/overview");
      }
    });

    setLoading(false);
  };

  const [resetTime,setResetTime] = useState(180)
  const [intervalId,setIntervalId] = useState<any>(0)
  const resend = async()=>{
    
  
    setLoading(true);
        resendService(userEmail)
        .then((res)=>{
          success("Please check your email for verification code")
          setLoading(false);
          const countInterval= setInterval(()=>{
            setResetTime(prev=>prev-1)
      
          }, 1000);
    setIntervalId(countInterval)

        })
        .catch(err=>{
          error("Please Contact Administrator")
          setLoading(false);

        })
  }

  useEffect(()=>{
    const countInterval= setInterval(()=>{
      setResetTime(prev=>prev-1)

    }, 1000);
    setIntervalId(countInterval)
  },[])

  useEffect(()=>{
    if(resetTime==0){
      clearInterval(intervalId);
      setIntervalId(0)
      setResetTime(180)
    }
  },[resetTime])

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
              <div className="mb-8">
                <div className="flex justify-between w-full gap-2">
                  <input
                    className="w-12 h-12 font-bold text-center rounded-md border-green-deep"
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
                    className="w-12 h-12 font-bold text-center rounded-md border-green-deep"
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
                    className="w-12 h-12 font-bold text-center rounded-md border-green-deep"
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
                    className="w-12 h-12 font-bold text-center rounded-md border-green-deep"
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
                    className="w-12 h-12 font-bold text-center rounded-md border-green-deep"
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
                    className="w-12 h-12 font-bold text-center rounded-md border-green-deep"
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
              <div className="text-center mb-2 cursor-pointer text-green-deep">
                 {intervalId!=0?(
                  <>
                  <span className="text-[#000000]">Resend code in {resetTime}</span>
                  </>
                 ):(<>
                  <button onClick={resend}>
                  Resend Code
                </button>
                 </>)} 
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
