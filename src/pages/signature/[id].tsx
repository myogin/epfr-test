import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { siteConfig } from "@/libs/config";
import { getPfrDetail } from "@/services/signature/signatureService";
import Head from "next/head";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EyeFillIcon from "remixicon-react/EyeFillIcon";
import EyeOffFillIcon from "remixicon-react/EyeOffFillIcon";
import FileCopy2FillIcon from "remixicon-react/FileCopy2FillIcon";
import QuillPenFillIcon from "remixicon-react/QuillPenFillIcon";
import LoadingListFull from "@/components/Attributes/Loader/LoadingListFull";

const SignaturePage = () => {
  const { query } = useRouter();
  const toastSuccess = (text: string) => toast.success(text);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (query?.id) {
      try {
        let res = getPfrDetail(Number(query?.id));
        res.then((res) => {
          setData(res);
          setIsLoading(false);
        });
      } catch (error) {}
    }
  }, [query.id]);

  function getEnvelopeName(data: any) {
    let envelope = data.split("/");

    return envelope[1];
  }

  function getDocumentName(data: any) {
    let envelope = data.split("/");
    let result = envelope[1].replace(".pdf", "");

    return result;
  }
  const refCode = useRef<any>([]);

  function toggleAcessCode(index: number) {
    if (refCode.current[index].type == "password") {
      refCode.current[index].type = "text";
    } else if (refCode.current[index].type == "text") {
      refCode.current[index].type = "password";
    }
  }
  function copyAcessCode(index: number) {
    navigator.clipboard.writeText(refCode.current[index].value);
    toastSuccess("Copy to clipboard");
  }
  function getTypeName(type: number) {
    if (type == 0) {
      return "Client";
    } else if (type == 1) {
      return "Agent";
    } else if (type == 2) {
      return "Trusted Individual";
    } else if (type == 3) {
      return "Supervisor (section13)";
    } else if (type == 4) {
      return "Supervisor (section14)";
    }
  }

  function getStatus(status: number) {
    if (status == 0) {
      return "Waiting";
    } else if (status == 1) {
      return "Signed";
    } else if (status == -1) {
      return "Declined";
    }
  }

  function getMethod(method: number) {
    if (method == 0) {
      return "Remote";
    } else {
      return "In-Person";
    }
  }
  if (isLoading)
    return (
      <>
        <LoadingListFull />
      </>
    );
  return (
    <>
      <Head>
        <title>{`Epfr Datas | ${siteConfig.siteName}`}</title>
      </Head>
      <main className="flex-1 md:ml-64 bg-white-bone">
        <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
          <GlobalCard className="min-h-screen pt-16 px-8">
            <div className="flex flex-row items-center justify-between ">
              <TitleMedium>EPFR Documents</TitleMedium>
            </div>
            <div className="mt-8">
              <div className="w-full p-4 border border-gray-soft-light bg-gray-soft rounded-t-xl font-bold">
                DETAIL ENVELOPE
              </div>
              <div className="w-full p-4 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 ">
                  <div className="font-bold max-w-[250px]">ID</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">
                    {data.pfr.id}
                  </div>
                  <div className="font-bold">Envelope Name</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">
                    {getEnvelopeName(data.pfr.pdf_1)}
                  </div>
                  <div className="font-bold">Author</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">
                    {data.pfr.owner.fullName}
                  </div>
                  <div className="font-bold">Date Created</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">
                    {moment(data.pfr.created_at).format(
                      "DD-MM-YYYY, h:mm:ss a"
                    )}
                  </div>
                  <div className="font-bold">Envelope Status</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">SERIAL</div>
                  <div className="font-bold">Recipient Parties</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">
                    {data.signers.map((e: any, i: any) => (
                      <Fragment key={i}>
                        <p className="mb-2">{e.name}</p>
                      </Fragment>
                    ))}
                  </div>
                  <div className="font-bold">Document</div>
                  <div className="lg:col-span-3 mb-2 lg:mb-0">
                    {getDocumentName(data.pfr.pdf_1)}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="w-full p-4 border border-gray-soft-light bg-gray-soft rounded-t-xl font-bold">
                DOCUMENT SECURITY
              </div>
              <div className="w-full p-4 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 ">
                  {data.signers.map((e: any, i: number) => (
                    <Fragment key={i}>
                      <div className="font-bold">Recipient {i + 1}:</div>
                      <div className="lg:col-span-3 mb-2 lg:mb-0">
                        {e.email}
                      </div>
                      <div className="font-bold">Access code:</div>
                      <div className="lg:col-span-3 mb-8 flex flex-row gap-4">
                        {e.access_code ? (
                          <>
                            <input
                              className="border-none"
                              type="password"
                              disabled={true}
                              value={e.access_code}
                              ref={(el) => {
                                refCode.current[i] = el;
                              }}
                            />

                            <button
                              onClick={() => {
                                toggleAcessCode(i);
                              }}
                            >
                              <EyeFillIcon />
                            </button>
                            <button
                              onClick={() => {
                                copyAcessCode(i);
                              }}
                            >
                              <FileCopy2FillIcon />
                            </button>
                          </>
                        ) : (
                          "NA"
                        )}
                      </div>
                    </Fragment>
                  ))}
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
              </div>
            </div>
            <div className="mt-8 bg-white">
              <div className="w-full p-4 border border-gray-soft-light bg-gray-soft rounded-t-xl  font-bold">
                SIGNATURE PROCESS
              </div>
              <div className="mt-4 w-full text-right pr-4 font-bold">
                In Progress
              </div>
              <div className="w-full p-4 ">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray ">
                      <tr>
                        <th scope="col" className="px-6 py-3 max-w-[50px]">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Method
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Signing
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.signers.map((el: any, index: number) => (
                        <Fragment key={index}>
                          <tr className="bg-white border-b ">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {el.name}
                            </td>
                            <td className="px-6 py-4">{el.email}</td>
                            <td className="px-6 py-4">
                              {getTypeName(el.type)}
                            </td>
                            <td className="px-6 py-4">
                              {getMethod(el.method)}
                            </td>
                            <td className="px-6 py-4">{getStatus(el.state)}</td>
                            <td className="px-6 py-4 ">
                              <QuillPenFillIcon />
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </GlobalCard>
        </section>
      </main>
    </>
  );
};

SignaturePage.getLayout = function getLayout(content: any) {
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default SignaturePage;
