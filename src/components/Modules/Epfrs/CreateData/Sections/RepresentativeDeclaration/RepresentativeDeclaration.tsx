import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { getPfrStep, postPfr, postPfrSections } from "@/services/pfrService";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
  pfrType?: number;
}

const RepresentativeDeclaration = (props: Props) => {
  
  const [pfrId, setPfrId] = useState(0);

  const { push } = useRouter();

  const [sectionTwelveData, setSectionTwelveData] = useState({
    id: pfrId,
    explain: '',
    jfw: false,
    spv: "0",
    spvOther: "",
    nftf: false,
    section12AnswerData: [],
    issues : [],
    status: 0
  })

  const scrollPosition = useScrollPosition(11);
  const scrollPositionBottomSection11 = useScrollPositionBottom(11);

  const saveData = async() => {
      // const groupFourData = {
      //   section10: JSON.parse(localStorage.getItem('section10')?? '{}'),
      //   section12: JSON.parse(localStorage.getItem('section11')?? '{}'),
      //   section13: JSON.parse(localStorage.getItem('section12')?? '{}'),
      // }
      const localData = localStorage.getItem("section10")
      ? localStorage.getItem("section10")
      : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data;
      }

      await postPfrSections(12, JSON.stringify(dataFix));
  }

  const finish = async () => {
    await saveData();
    push('/create/finish')
  }

  const review = async () => {
    await saveData();
    push(`/create/review/${props.pfrType === 1? 'single': 'joint'}`);
  }

  const [requiredNFTF, setRequiredNFTF] = useState(false);
  const [isJointFieldWork, setIsJointFieldWork] = useState(false);
  const [explain, setExplain] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const fetchData = async () => {
    // console.log("Fetching ...");

    // const s12Res: any = await getPfrStep(12, pfrId);
    const s12Res: any = JSON.parse(localStorage.getItem('section11')?? "false");
    const s13Res: any = await getPfrStep(13, pfrId);

    if(s13Res['note'] != null) {
      sectionTwelveData.explain = s13Res['note']['note']
      sectionTwelveData.jfw = s13Res['note']['jfw']
      sectionTwelveData.spv = s13Res['note']['spv']
      sectionTwelveData.spvOther = s13Res['note']['spvOther']
      var cekData = false;
      if(s13Res['note']['nftf']){
        if((s13Res['note']['nftf'] === true) || s13Res['note']['nftf'] === 1){
          cekData = true;
        }else{
          cekData = false;
        }
      }
      sectionTwelveData.nftf = cekData;
    }
    setSupervisor(s13Res['spv']);
    
    if (!s12Res) {
      return;
    }

    const checkData = s12Res["data"] ?? null;

    if (checkData !== null) {
      // const data = JSON.parse(checkData);
      const data = checkData;

      if (data[0][8][0] || data[1][8][0]) {
        setRequiredNFTF(true);
      } else {
        setRequiredNFTF(false);
      }
    }
  };



  useEffect(() => {
    if (scrollPositionBottomSection11 === "Process11" && sectionTwelveData.id === 0) {
      const section1 = JSON.parse(localStorage.getItem('section1')?? '{}');
      setPfrId(section1?.state?.id);
      setSectionTwelveData({
        ...sectionTwelveData,
        id: section1?.state?.id
      })
      fetchData();
    }
  }, [scrollPositionBottomSection11]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    // setNewProduct({
    //   ...sectionTenData.originalProduct[params],
    //   index: params
    // });
    setShowModal(true);
  };

  const closeModal = () => {
  //   setNewProductErrors([]);
  //   setNewProduct(productData);
    setShowModal(false);
  };

  useEffect(() => {
    localStorage.setItem('section12', JSON.stringify(sectionTwelveData));
  }, [sectionTwelveData]);

  return (
    <div id={props.id}>
      <div className="sticky top-0 z-10 bg-white">
        <HeadingPrimarySection className="mx-8 mt-10 mb-10 text-2xl font-bold 2xl:mx-60">
          Section 12. Representative Declaration
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            1. Where applicable,I have explained to the client the possible
            disadvantages of product switching / replacement and informed
            him/her of other options available besides product switching /
            replacement.
          </TextThin>
        </RowSingleGrid>
        <RowSingleGrid>
          <TextThin>
            2. Where applicable, I have also explained the basis for product
            switching / replacement and why the product switch / replacement is
            suitable for the client below.
          </TextThin>
        </RowSingleGrid>
        <RowSingleGrid>
          <TextArea handleChange={(e) => setSectionTwelveData({
            ...sectionTwelveData,
            explain: e.target.value
          })} />
        </RowSingleGrid>
        <RowSingleGrid>
          <TextThin>
            {`3. The recommendation(s) made by me is/are based on the above needs
            analysis which has taken into account the information disclosed by
            the client in this 'Personal Financial Record'.`}
          </TextThin>
        </RowSingleGrid>

        <RowSingleGrid>
          <TextThin>
            {`4. The information provided to me in this 'Personal Financial
            Record' is strictly confidential and is only to be used for the
            purpose of fact-finding as part of the process of recommending
            suitable insurance/investment product(s) and shall not be used for
            any other purposes.`}
          </TextThin>
        </RowSingleGrid>

        <RowDoubleGrid className="border rounded-md border-green-deep bg-green-light">
          <div className="flex items-center justify-start gap-20 p-4">
            <span>5. This is Joint Field Work</span>
            <span>
              <Checkbox
                onChange={(e) => {
                  setSectionTwelveData({
                    ...sectionTwelveData,
                    jfw: e.target.checked
                  });
                  setIsJointFieldWork(e.target.checked);
                }}
              />
            </span>
          </div>
          {isJointFieldWork && (
            <RowDoubleGrid className="mb-0">
              <div className="flex items-center justify-end gap-4 p-4">
                <span>Supervisor Name</span>
              </div>
              <div className="flex items-center justify-start gap-4 p-4">
                {/* <Select className="border rounded-md"
                datas={['one', 'two']}
                handleChange={(event) => console.log(event.target.value)}
              /> */}
                <select
                  className="w-full px-2 py-2 text-sm border rounded-md cursor-pointer text-gray-light border-gray-soft-strong"
                  onChange={(event) => console.log(event.target.value)}
                  required={isJointFieldWork}
                >
                  <option selected disabled={true} value="">
                    Please choose supervisor
                  </option>
                  <option value={supervisor}>
                    {supervisor}
                  </option>
                  {/* {["one", "two"]?.length &&
                    ["one", "two"].map((val, index) => (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    ))} */}
                </select>
              </div>
            </RowDoubleGrid>
          )}
        </RowDoubleGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        For NFTF Transaction
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I have sought consent and obtained a screenshot of client for
              identity verification
            </TextThin>
          </div>
          <div>
            <Checkbox
              onChange={(e) => {
                setSectionTwelveData({
                  ...sectionTwelveData,
                  nftf: e.target.checked
                })
              }}
              label="Required field"
              lableStyle={
                (requiredNFTF && !sectionTwelveData.nftf) ? "text-xs text-red" : "text-xs invisible"
              }
              class=" justify-end"
            />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <SectionCardFooter className="mx-8 2xl:mx-60">
        <ButtonGreenMedium onClick={review}>
          Review
        </ButtonGreenMedium>
        <ButtonGreenMedium onClick={openModal}>
          Sign Now <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>

        <Transition appear show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                {/* <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Siging Method
                    </Dialog.Title>

                    <div className="mt-2">

                      <div className="flex">
                        <div className={`w-full my-4 space-y-3`}>
                            <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
                              Client(s), Trusted Individual(s), Agent
                            </label>

                          <select
                            name="clientName"
                            className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                            onChange={(e) => {
                              console.log(e.target.selectedIndex)
                            }}
                          >
                            <option key='remote' value='0'>
                              Remote
                            </option>
                            <option key='face2face' value='0'>
                              Face to face
                            </option>
                          </select>
                        </div>

                        <div className="flex">
                          <div className={`w-full my-4 space-y-3`}>
                              <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
                                Supervisor
                              </label>

                            <select
                              name="clientName"
                              className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                              onChange={(e) => {
                                console.log(e.target.selectedIndex)
                              }}
                            >
                              <option key='remote' value='0'>
                                Remote
                              </option>
                              <option key='face2face' value='1'>
                                Face to face
                              </option>
                            </select>
                          </div>
                        </div>

                      </div>

                    </div>
                    
                  </Dialog.Panel>
                </Transition.Child> */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Singing Method
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex">
                        <div className={`w-full my-4 space-y-3`}>
                            <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
                              Client(s), Trusted Individual(s), Agent
                            </label>

                            <select
                              name="clientName"
                              className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                              onChange={(e) => {
                                console.log(e.target.selectedIndex)
                              }}
                            >
                              <option key='remote' value='0'>
                                Remote
                              </option>
                              <option key='face2face' value='0'>
                                Face to face
                              </option>
                            </select>
                        </div>
                      </div>

                      <div className="flex">
                        <div className={`w-full my-4 space-y-3`}>
                            <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
                              Supervisor
                            </label>

                            <select
                              name="clientName"
                              className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                              onChange={(e) => {
                                console.log(e.target.selectedIndex)
                              }}
                            >
                              <option key='remote' value='0'>
                                Remote
                              </option>
                              <option key='face2face' value='0'>
                                Face to face
                              </option>
                            </select>
                        </div>
                      </div>
                    </div>
                    {/* {(newProductErrors.length > 0) && (
                      <div className="mt-4">
                        {newProductErrors.map(({name}) => (
                          <p key={name} style={{fontSize: '14px', color: 'red'}}>
                            - {name} is required
                          </p>
                        ))}
                      </div>
                    )} */}
                    <div className="flex gap-4 mt-4">
                      <ButtonGreenMedium onClick={finish}>
                        Sign
                      </ButtonGreenMedium>
                      <ButtonTransparentMedium onClick={closeModal}>
                        Cancel
                      </ButtonTransparentMedium>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </SectionCardFooter>
    </div>
  );
};

export default RepresentativeDeclaration;
