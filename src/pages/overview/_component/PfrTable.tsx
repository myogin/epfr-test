import ButtonBorder from "@/components/Forms/Buttons/ButtonBorder";

import {
  getPfrList,
  deletePfr,
  duplucatePfr,
} from "@/services/overview/overviewService";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import More2LineIcon from "remixicon-react/More2LineIcon";
import { pfrProgress } from "./overviewUtils";
import LoadingList from "@/components/Attributes/Loader/LoadingList";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { useExistingPortofolio } from "@/store/epfrPage/createData/existingPortofolio";
import { useCashFlow } from "@/store/epfrPage/createData/cashFlow";
import { useRouter } from "next/router";
import { useAffordability } from "@/store/epfrPage/createData/affordability";
import { useAnalysisRecommendation } from "@/store/epfrPage/createData/analysisRecommendation";
import { useAnalysisRecommendationGroup } from "@/store/epfrPage/createData/analysisRecommendationGroup";
import { useAnalysisRecommendationProduct } from "@/store/epfrPage/createData/analysisRecommendationProduct";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { useCustomerKnowledgeAssesment } from "@/store/epfrPage/createData/customerKnowledgeAssesment";

import DeleteRowIcon from "remixicon-react/DeleteBin2FillIcon";
import Edit2FillIcon from "remixicon-react/Edit2FillIcon";
import FileCopyFillIcon from "remixicon-react/FileCopyFillIcon";
import Eye2FillIcon from "remixicon-react/Eye2LineIcon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {}

const PfrTable = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pfrList, setPfrList] = useState([]);
  const { query } = useRouter();
  async function getALldata() {
    setIsLoading(true);
    let res = await getPfrList(query);
    setPfrList(res.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getALldata();
  }, [query]);

  const router = useRouter();

  let { resetSectionOne } = usePersonalInformation();
  let { resetSectionTwo } = useExistingPortofolio();
  let { resetSectionThree } = useCashFlow();
  let { resetPfr } = usePfrData();
  let { resetSectionFour } = useBalanceSheet();
  let { resetSectionSix } = useCustomerKnowledgeAssesment();
  let { resetSectionSeven } = usePrioritiesNeedAnalysis();
  let { resetSectionEight } = useAffordability();
  let { resetSectionNine } = useAnalysisRecommendation();
  let { resetGroupRecommendation } = useAnalysisRecommendationGroup();
  let { resetRecommendationProduct } = useAnalysisRecommendationProduct();

  const goToCreatePfr = (params: string) => {
    resetSectionOne();
    resetSectionTwo();
    resetSectionThree();
    resetPfr();
    resetSectionFour();
    resetSectionSix();
    resetSectionSeven();
    resetSectionEight();
    resetSectionNine();
    resetGroupRecommendation();
    resetRecommendationProduct();
    router.push(`create/${params}`);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idPfr, setIdPfr] = useState(null);
  const error = (text: string) => toast.error(text);
  const success = (text: string) => toast.success(text);

  const closeModalDelete = () => {
    setIdPfr(null);
    setShowModalDelete(false);
  };
  const openModalDelete = (pfrId: any) => {
    setIdPfr(pfrId);
    setShowModalDelete(true);
  };
  const deletePfrBtn = () => {
    setShowModalDelete(false);
    setIsLoading(true);
    deletePfr(idPfr)
      .then((res) => {
        success("Delete Success");
        getALldata();
      })
      .catch((err) => {
        error("Delete error please contact Administrator");
        setIsLoading(false);
      });
  };

  const [showModalDuplicate, setShowModalDuplicate] = useState(false);
  // const [dataDuplicate, setDataDuplicate] = useState({});
  const [selectedTypePfr, setSelectedTypePfr] = useState<undefined | number>(
    undefined
  );
  const [newTypePfr, setNewTypePfr] = useState<undefined | number>(undefined);
  const [targetClient, setTargetClient] = useState<undefined | number>(0);
  const [targetClientShow, setTargetClientShow] = useState(false);

  const closeModalDuplicate = () => {
    setSelectedTypePfr(undefined);
    setNewTypePfr(undefined);
    setIdPfr(null);
    setShowModalDuplicate(false);
  };

  const openModalDuplicate = (pfrId: any, type: string) => {
    if (type == "single") {
      setSelectedTypePfr(1);
      setNewTypePfr(1);
    } else if (type == "joint") {
      setSelectedTypePfr(2);
      setNewTypePfr(2);
    }

    setIdPfr(pfrId);
    setShowModalDuplicate(true);
  };
  const duplicatePfr = () => {
    let newDuplicate = {
      pfrId: idPfr,
      currentType: selectedTypePfr,
      newType: newTypePfr,
      targetClient: targetClient,
    };

    setShowModalDuplicate(false);
    setIsLoading(true);
    duplucatePfr(newDuplicate)
      .then((res) => {
        success("Delete Success");
        getALldata();
      })
      .catch((err) => {
        error("Delete error please contact Administrator");
        setIsLoading(false);
      });
  };

  const handleChangeTypePfr = (e: any) => {
    setNewTypePfr(e);

    if (selectedTypePfr == 2 && newTypePfr == 2) {
      setTargetClientShow(true);
    } else {
      setTargetClientShow(false);
      setTargetClient(0);
    }
  };
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
      {pfrList.map((item: any, index) => (
        <Fragment key={index}>
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
                        {({ active }) => (
                          <button
                            onClick={() =>
                              goToCreatePfr(
                                `${item.type.toLowerCase()}?id=${item.pfr.id}`
                              )
                            }
                            className={classNames(
                              active
                                ? "bg-gray-soft-light text-gray-light"
                                : "text-gray-light",
                              "flex w-full px-4 py-2 text-sm cursor-pointer text-left"
                            )}
                          >
                            <Edit2FillIcon size={20} className="mr-1" />
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => openModalDelete(item.pfr.id)}
                            className={classNames(
                              active
                                ? "bg-gray-soft-light text-gray-light"
                                : "text-gray-light",
                              "flex w-full px-4 py-2 text-sm cursor-pointer text-left "
                            )}
                          >
                            <DeleteRowIcon size={20} className="mr-1" /> Delete
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              openModalDuplicate(
                                item.pfr.id,
                                item.type.toLowerCase()
                              )
                            }
                            className={classNames(
                              active
                                ? "bg-gray-soft-light text-gray-light"
                                : "text-gray-light",
                              "flex w-full px-4 py-2 text-sm cursor-pointer text-left"
                            )}
                          >
                            <FileCopyFillIcon size={20} className="mr-1" />
                            Duplicate
                          </button>
                        )}
                      </Menu.Item>
                      {item.status != "Draft" && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={`/signature/${item.pfr.id}`}
                              className={classNames(
                                active
                                  ? "bg-gray-soft-light text-gray-light"
                                  : "text-gray-light",
                                "flex w-full px-4 py-2 text-sm cursor-pointer text-left"
                              )}
                            >
                              <Eye2FillIcon size={20} className="mr-1" />
                              View Status
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* modal delete */}
            <Transition appear show={showModalDelete} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModalDelete}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-opacity-25 bg-gray-light" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-[350px] p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="mb-10 text-xl font-medium leading-6 text-gray-light"
                        >
                          Are you sure to delete PFR ?
                        </Dialog.Title>
                        <div className="flex justify-between">
                          <button
                            className="bg-red hover:bg-[#d90000] text-white font-bold py-2 px-4 rounded"
                            onClick={deletePfrBtn}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gray-soft-thin hover:bg-gray-soft-strong text-white font-bold py-2 px-4 rounded"
                            onClick={closeModalDelete}
                          >
                            Cancel
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            {/* modal duplicate */}
            <Transition appear show={showModalDuplicate} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModalDuplicate}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-opacity-25 bg-gray-light" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-[350px] p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="mb-8 text-xl font-medium leading-6 text-gray-light text-center"
                        >
                          Duplicate a new PFR
                        </Dialog.Title>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="font-bold">Current PFR Type:</div>
                          <div>{selectedTypePfr}</div>
                          <div className="font-bold">New PFR Type:</div>
                          <div>
                            <select
                              className="cursor-pointer rounded"
                              defaultValue={newTypePfr}
                              onChange={(e: any) =>
                                handleChangeTypePfr(e.target.value)
                              }
                            >
                              <option value={1}>SINGLE</option>
                              <option value={2}>JOINT</option>
                            </select>
                          </div>
                          {targetClientShow && (
                            <>
                              <div className="font-bold">
                                Which client will be used?
                              </div>
                              <div>
                                <select
                                  className="cursor-pointer rounded"
                                  defaultValue={targetClient}
                                  onChange={(e: any) =>
                                    setTargetClient(e.target.value)
                                  }
                                >
                                  <option value={0}>Select</option>
                                  <option value={1}>Client 1</option>
                                  <option value={2}>Client 2</option>
                                </select>
                              </div>
                            </>
                          )}

                          <div className="mt-4">
                            <button
                              className="bg-green-deep hover:bg-[#0c9553] text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={duplicatePfr}
                            >
                              Duplicate
                            </button>
                            <button
                              className="bg-red hover:bg-[#d90000] text-white font-bold py-2 px-4 rounded"
                              onClick={closeModalDuplicate}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </Fragment>
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
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default PfrTable;
