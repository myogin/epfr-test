import SmallBadges from "@/components/Attributes/Badges/SmallBadges";
import ButtonBorder from "@/components/Forms/Buttons/ButtonBorder";

import { getPfrList } from "@/services/overview/overviewService";
import { useDetailDataEpfr } from "@/store/epfrPage/detailData";
import { Menu, Transition } from "@headlessui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import More2LineIcon from "remixicon-react/More2LineIcon";
import { pfrProgress } from "./overviewUtils";
import { useLoginData } from "@/store/login/logindata";
import LoadingList from "@/components/Attributes/Loader/LoadingList";
import { useRouter } from "next/router";

interface Props {}

const PfrTable = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pfrList, setPfrList] = useState([]);
  const { query } = useRouter();
  const { token } = useLoginData();
  const { ownerId } = useLoginData();
  useEffect(() => {
    async function getALldata() {
      setIsLoading(true);
      let res = await getPfrList(query);
      setPfrList(res.data);
      setIsLoading(false);
    }
    getALldata();
  }, [query]);

  if (isLoading)
    return (
      <>
        <LoadingList />
      </>
    );

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between py-6 mx-8 text-sm font-bold text-gray-light">
        <div className="basis-1/12">Type</div>
        <div className="basis-1/5">Owner</div>
        <div className="basis-1/5">Clients</div>
        <div className="basis-1/6">Created At</div>
        <div className="basis-1/12">Method</div>
        <div className="basis-1/6">EPFR Progress</div>
        <div className="basis-1/12"></div>
      </div>
      {pfrList.map((val, index) => (
        <RowData item={val} key={index} />
      ))}
      <div className="flex items-center justify-between py-6 mx-8">
        <div>
          <ButtonBorder>Previous</ButtonBorder>
        </div>
        <div>Page 1 of 10</div>
        <div>
          <ButtonBorder>Next</ButtonBorder>
        </div>
      </div>
    </div>
  );
};

function RowData({ item }: any) {
  return (
    <div className="flex flex-row justify-between py-6 mx-8 text-sm border-b hover:px-8 hover:mx-0 hover:border-green-deep hover:bg-green-soft text-gray-light border-gray-soft-light">
      <div className="basis-1/12">{item.type}</div>
      <div className="basis-1/5">{item.ownerDocument}</div>
      <div className="basis-1/5">{item.clients}</div>
      <div className="basis-1/6">{item.created_at}</div>
      <div className="basis-1/12">
        {item.methodData.split(",").map((e: any, i: any) => {
          if (e == "Manual") {
            return e;
          } else {
            return (
              <Fragment key={i}>
                <Image
                  src="/singpassSmall.png"
                  width={50}
                  height={8}
                  alt="singpasMethod"
                ></Image>
              </Fragment>
            );
          }
        })}
      </div>

      <div className="basis-1/6">
        <div className="flex items-center justify-start gap-3">
          <div className="w-full rounded-full bg-gray-soft-light">
            <div
              className={`${
                pfrProgress(item.pfr) == 100 ? "bg-green-deep" : "bg-red"
              } text-xs font-medium text-white text-center p-0.5 leading-none rounded-full`}
              style={{ width: `${pfrProgress(item.pfr)}%` }}
            >
              {" "}
              {pfrProgress(item.pfr) + "%"}
            </div>
          </div>
        </div>
      </div>

      <div className="text-right basis-1/12">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center text-sm font-semibold w-fit rounded-xl">
              <More2LineIcon />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <Link
                    href={`/create/${item.type.toLowerCase()}?id=${
                      item.pfr.id
                    }`}
                    className={
                      " text-gray-light block px-4 py-2 text-sm cursor-pointer"
                    }
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className={
                      "text-gray-light block px-4 py-2 text-sm cursor-pointer"
                    }
                  >
                    Duplicate
                  </a>
                </Menu.Item>
                {item.status != "Draft" && (
                  <Menu.Item>
                    <Link
                      href={`/signature/${item.pfr.id}`}
                      className={
                        "text-gray-light block px-4 py-2 text-sm cursor-pointer"
                      }
                    >
                      View Status
                    </Link>
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default PfrTable;
