import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

import { siteConfig } from "@/libs/config";
import Head from "next/head";
import React from "react";

const SignaturePage = () => {
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="font-bold">ID</div>
                  <div className="md:col-span-2">11014</div>
                  <div className="font-bold">Envelope Name</div>
                  <div className="md:col-span-2">-LL 1-04072023.pdf</div>
                  <div className="font-bold">Author</div>
                  <div className="md:col-span-2">RIAN ADMIN</div>
                  <div className="font-bold">Date Created</div>
                  <div className="md:col-span-2">04-07-2023, 6:00:50 pm</div>
                  <div className="font-bold">Envelope Status</div>
                  <div className="md:col-span-2">SERIAL</div>
                  <div className="font-bold">Recipient Parties</div>
                  <div className="md:col-span-2">test</div>
                  <div className="font-bold">Document</div>
                  <div className="md:col-span-2">-LL 1-04072023</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="w-full p-4 border border-gray-soft-light bg-gray-soft rounded-t-xl font-bold">
                DOCUMENT SECURITY
              </div>
              <div className="w-full p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3"></div>
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
                      <tr className="bg-white border-b ">
                        <td className="px-6 py-4">1</td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          LL 1
                        </td>
                        <td className="px-6 py-4">
                          adriyana@legacyfa-asia.com{" "}
                        </td>
                        <td className="px-6 py-4">Client</td>
                        <td className="px-6 py-4">$In-Person </td>
                        <td className="px-6 py-4">Waiting </td>
                        <td className="px-6 py-4">true </td>
                      </tr>
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
