import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDouble from "@/components/Attributes/Rows/Flexs/RowDouble";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { getLength } from "@/libs/helper";
import { getAllPfrData, postPfrSections } from "@/services/pfrService";
import { getPfrStep } from "@/services/pfrService";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import LoaderPage from "./components/LoaderPage";

interface Props {
  id?: any;
  pfrType: number;
}

const ClientsAcknowledgment = (props: Props) => {
  const scrollPosition = useScrollPosition(11);
  const scrollPositionNext = useScrollPosition(12);
  const scrollPositionBottomSection10 = useScrollPositionBottom(10);
  const [pfrId, setPfrId] = useState(0);
  const [editable, setEditable] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  let getPfrLength = getLength(props.pfrType);
  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const [productCount, setProductCount] = useState([0, 0]);
  const [deviateCount, setDeviateCount] = useState([0, 0]);
  const [outcomes, setOutComes] = useState([0, 0]);
  const [section6Need, setSection6Need] = useState([0, 0]);

  const sectionData = [
    [false, false, false],
    [0],
    [false],
    [false, false],
    [false, false],
    [false],
    [false, false],
    [false],
    [false],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ];

  const sectionDataTwo = [
    [false, false, false],
    [0],
    [false],
    [false, false],
    [false, false],
    [false],
    [false, false],
    [false],
    [false],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ];

  interface SectionEleven {
    id: number;
    data: Array<any>;
    remark: string | null;
    remark1: string | null;
    introducer: string | null;
    status: number;
    issues: Array<any>;
  }

  const [sectionElevenData, setSectionElevenData] = useState<SectionEleven>({
    id: pfrId,
    data: [sectionData, sectionDataTwo],
    remark: null,
    remark1: null,
    introducer: null,
    status: 0,
    issues: [],
  });

  const [sub4Options, setSub4Options] = useState([
    {
      label: "Insurance Application Form(s)",
      key: "insuranceApplicationForm",
      iKey: 0,
    },
    { label: "Benefit Illustration(s)", key: "benefitIllustration", iKey: 1 },
    { label: "Product Summary(ies)", key: "productSummary", iKey: 2 },
    {
      label: "Your Guide to Life Insurance",
      key: "yourGuideToLifeInsurance",
      iKey: 3,
    },
    {
      label: "Your Guide to Health Insurance",
      key: "yourGuideToHealthInsurance",
      iKey: 4,
    },
    {
      label: "Your Guide to Investment-Linked Insurance Plans",
      key: "yourGuideToInvestmentLinkedInsurance",
      iKey: 5,
    },
    { label: "Fund Summary(ies)", key: "fundSummary", iKey: 6 },
    {
      label: "Legacy FA Model Portfolio Fact Sheet(s)",
      key: "legacyFAModelPortfolio",
      iKey: 7,
    },
    { label: "Fund Fact Sheet(s)", key: "fundFactSheet", iKey: 8 },
    {
      label: "Product Highlight Sheet(s)",
      key: "productHighlightSheet",
      iKey: 9,
    },
    { label: "Prospectus(es)", key: "prospectus", iKey: 10 },
    {
      label: "Navigator Schedule - Funds Investment",
      key: "navigatorSchedule",
      iKey: 11,
    },
    {
      label: "Navigator Account Opening / Subscription Form",
      key: "navigatorAccountOpening",
      iKey: 12,
    },
    {
      label: "iFast Account Opening / Subscription Form",
      key: "ifastAccountOpening",
      iKey: 14,
    },
    {
      label: "Havenport Investment Account Opening Form",
      key: "havenportInvestmentAccount",
      iKey: 13,
    },
  ]);

  const [matrixData, setMatrixData] = useState([
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  ]);

  const [loading, setLoading] = useState(false);

  const fetchData = async() => {
    if(!pfrIdSectionOne && pfrIdSectionOne == 0) return;

    try {

      setLoading(true); // Set loading before sending API request

      setIsFetched(true);
    
    const s12Res: any = await getPfrStep(12, pfrIdSectionOne);
    // const s10Res: any = await getPfrStep(10, pfrId);
    // const s13Res: any = await getPfrStep(13, pfrId);

    if (s12Res["answer"] != null) {
      let data = JSON.parse(s12Res["answer"]["data"]);
      setSectionElevenData(data);

      getPfrLength.map((data, i) => {
        if (sectionElevenData.data[i][9] == undefined) {
          sectionElevenData.data[i][9] = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ];
        }
      });
      // for(let i = 0 ; i < pfrType ; i ++) {
      //   if(sectionElevenData.data[i][9] == undefined) {
      //     sectionElevenData.data[i][9] = [ false, false,false, false,false, false,false, false,false, false,false, false,false, false,false]
      //   }
      // }
    }

    let mat = s12Res["matrix"];
    setMatrixData((prevData) => {
      return prevData.map((client, idx) => {
        for (let j = 0; j < 15; j++) {
          client[j] = (mat[idx] & Math.pow(2, j)) == 0 ? false : true;
        }
        return client;
      });
    });

    let section6 = s12Res["section6"];
    section6.forEach((section: any) => {
      let outcome = section["outcome"];
      let clientId = section["clientType"] - 1;
      setOutComes((prevData) => {
        return prevData.map((data, ind) => {
          if (ind == clientId) {
            return outcome;
          } else {
            return data;
          }
        });
      });
    });

    let section6Needs = s12Res["section6Needs"];
    section6Needs.forEach((need: any) => {
      let clientId = need["clientId"];
      let _need = need["need"];
      setSection6Need((prevData) => {
        return prevData.map((data, ind) => {
          if (ind == clientId) {
            return _need;
          } else {
            return data;
          }
        });
        // return prevData[clientId] = _need;
      });
    });

    for (let i = 0; i < props.pfrType; i++) {
      // setSectionElevenData(prevData => {
      //   return prevData.map((client, idx) => {
      //     if(i === idx) {
      //       const copyData = client;
      //       if(section6Need[i] == 0 || productCount[i] == 0) {
      //         copyData[0][0] = false
      //         copyData[0][1] = false
      //         copyData[0][2] = false
      //       } else {
      //         if(outcomes[i] == 0) {
      //           copyData[0][0] = false
      //           copyData[0][1] = false
      //           copyData[0][2] = true
      //         } else {
      //           let deviate = deviateCount[i]
      //           if(deviate > 0) {
      //             copyData[0][0] = false
      //             copyData[0][1] = true
      //             copyData[0][2] = false
      //           } else {
      //             copyData[0][0] = true
      //             copyData[0][1] = false
      //             copyData[0][2] = false
      //           }
      //         }
      //       }
      //       return copyData;
      //     } else {
      //       return client;
      //     }
      //   })
      // });
      setSectionElevenData({
        ...sectionElevenData,
        data: sectionElevenData.data.map((client, idx) => {
          if (i === idx) {
            const copyData = client;
            if (section6Need[i] == 0 || productCount[i] == 0) {
              copyData[0][0] = false;
              copyData[0][1] = false;
              copyData[0][2] = false;
            } else {
              if (outcomes[i] == 0) {
                copyData[0][0] = false;
                copyData[0][1] = false;
                copyData[0][2] = true;
              } else {
                let deviate = deviateCount[i];
                if (deviate > 0) {
                  copyData[0][0] = false;
                  copyData[0][1] = true;
                  copyData[0][2] = false;
                } else {
                  copyData[0][0] = true;
                  copyData[0][1] = false;
                  copyData[0][2] = false;
                }
              }
            }
            return copyData;
          } else {
            return client;
          }
        }),
      });
    }

    // let section10 = s10Res;
    const section10 = JSON.parse(
      localStorage.getItem("section10") ?? "{'data':[]}"
    );
    let answers = section10["data"];
    answers.forEach((answer: any, i: any) => {
      let _1b = answer["answer1b"];
      if (i < props.pfrType) {
        // setSectionElevenData(prevData => {
        //   return prevData.map((client, idx) => {
        //     if(i === idx) {
        //       const copyData = client;
        //       copyData[1][0] = _1b;
        //       return copyData;
        //     } else {
        //       return client;
        //     }
        //   })
        // });
        setSectionElevenData({
          ...sectionElevenData,
          data: sectionElevenData.data.map((client, idx) => {
            if (i === idx) {
              const copyData = client;
              copyData[1][0] = _1b;
              return copyData;
            } else {
              return client;
            }
          }),
        });
      }
    });

    // if (s13Res["note"] != null) {
    //   var cekData = false;
    //   if (s13Res["note"]["nftf"]) {
    //     if (s13Res["note"]["nftf"] === true || s13Res["note"]["nftf"] === 1) {
    //       cekData = true;
    //     } else {
    //       cekData = false;
    //     }
    //   }
    //   setNftf(cekData);
    // }
    setLoading(false); // Set loading before sending API request
    } catch (error) {
      setLoading(false); // Set loading before sending API request
      console.error(error);
    }

    
  };

  const onCheckMatirx = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: any,
    iKey: any
  ) => {
    // setSectionElevenData(prevData => {
    //   return prevData.map((client, idx) => {
    //     if(i === idx) {
    //       const copyData = client;
    //       copyData[9][iKey] = e.target.checked;
    //       return copyData;
    //     } else {
    //       return client;
    //     }
    //   })
    // });
    setSectionElevenData({
      ...sectionElevenData,
      data: sectionElevenData.data.map((client, idx) => {
        if (i === idx) {
          const copyData = client;
          copyData[9][iKey] = e.target.checked;
          return copyData;
        } else {
          return client;
        }
      }),
    });
  };

  const onChangeSectionData = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: any,
    firstIndex: any,
    secondIndex: any
  ) => {
    // setSectionElevenData(prevData => {
    //   return prevData.map((client, idx) => {
    //     if(i === idx) {
    //       console.log("pfr index: ", i);
    //       console.log("section index: ", idx);
    //       const copyData = client;
    //       copyData[firstIndex][secondIndex] = e.target.checked;
    //       return copyData;
    //     } else {
    //       return client;
    //     }
    //   })
    // });
    setSectionElevenData({
      ...sectionElevenData,
      data: sectionElevenData.data.map((client, idx) => {
        if (i === idx) {
          const copyData = client;
          if (firstIndex == 6 && e.target.checked) {
            if (secondIndex == 1) {
              copyData[firstIndex][0] = false;
            } else {
              copyData[firstIndex][1] = false;
            }
          }
          copyData[firstIndex][secondIndex] = e.target.checked;
          return copyData;
        } else {
          return client;
        }
      }),
    });
  };

  const checkRemarkValidation = (clientId: number) => {
    return (
      sectionElevenData.data[clientId][6][0] ||
      sectionElevenData.data[clientId][6][1]
    );
  };

  const reasonForAccept = () => {
    for (let i = 0; i < props.pfrType; i++) {
      if (sectionElevenData.data[i][6][0] && sectionElevenData.data[i][6][1]) {
        return true;
      }
    }
    return false;
  };

  const reasonForDontAccept = () => {
    for (let i = 0; i < props.pfrType; i++) {
      if (sectionElevenData.data[i][6][1] == true) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (editable === 1 && sectionElevenData.status === 1 && !isFetched) {
      setEditable(2);
    }
    const tempStatus = getStatus();
    if (tempStatus !== sectionElevenData.status) {
      setSectionElevenData({
        ...sectionElevenData,
        status: tempStatus
      })
    }
    localStorage.setItem(
      "section11",
      JSON.stringify({
        ...sectionElevenData,
        editableStatus: editable,
      })
    );
    setIsFetched(false);
  }, [sectionElevenData]);

  useEffect(() => {
    localStorage.setItem(
      "section11",
      JSON.stringify({
        ...sectionElevenData,
        editableStatus: editable,
      })
    );
  }, [editable]);

  let pfrIdSectionOne:any = usePersonalInformation((state) => state.id);

  const checkPart7 = (clientId:number) => {
    return sectionElevenData.data[clientId][6][0] || sectionElevenData.data[clientId][6][1]
  }

  const getStatus = () => {
    sectionElevenData.issues = [];

    sectionElevenData.issues = []
    let containIssue = [false, false]

    getPfrLength.map((data, i) => {
      console.log("masuk sini harusnya product count " + productCount[i]);

      if(productCount[i] > 0 && sectionElevenData.data[i][3][0] == false) {
        containIssue[i] = true

        console.log("masuk sini harusnya" + productCount[i]);
        console.log("masuk sini harusnya ini apa" + sectionElevenData.data[i][3][0]);
      }
      for(let j  = 0 ; j < sub4Options.length ; j ++ ) {
        if(matrixData[i][j] == true && sectionElevenData.data[i][9][j] == false) {

          console.log("masuk sini harusnya apa ya matrix" + matrixData[i][j]);
          console.log("masuk sini harusnya ini apa 9 j" + sectionElevenData.data[i][9][j]);

          containIssue[i] = true
        }
      }

      if(containIssue[i] == true) {
        sectionElevenData.issues.push({
          subsectionId : 4 ,
          content : "Need to check",
          clientId : i + 1
        })
      }

      if(!checkPart7(i)) {
        sectionElevenData.issues.push({
          subsectionId : 7 ,
          content : "Need to check either accept or not.",
          clientId : i + 1
        })
      }

      if(deviateCount[i] > 0 && !sectionElevenData.data[i][6][1]) {
        sectionElevenData.issues.push({
          subsectionId : 7 ,
          content : "Need to check don't accept.",
          clientId : i + 1
        })
      }
    });

    if(reasonForAccept() && (sectionElevenData.remark1 == '' || sectionElevenData.remark1 == undefined)) {
      sectionElevenData.issues.push({
        subsectionId : 7 ,
        content : "Required field",
        clientId : 0
      })
    }
    if(reasonForDontAccept() && (sectionElevenData.remark == '' || sectionElevenData.remark == undefined)) {
      sectionElevenData.issues.push({
        subsectionId : 7 ,
        content : "Required field",
        clientId : 0
      })
    }

    // for(let i = 0 ; i < getPfrLength ; i ++ ) {
    // getPfrLength.map((data, i) => {
    //   if(sectionElevenData.data[i]?.answer1.a.answer == 1 && (sectionElevenData.data[i]?.answer1.a.reason == '' || sectionElevenData.data[i]?.answer1.a.reason == undefined)) {
    //     sectionElevenData.issues.push({
    //       subsectionId : 1,
    //       content : "Need to explain the reason",
    //       clientId : i + 1
    //     })
    //   }
    //   if(sectionElevenData.data[i]?.answer1.b == 1 && (sectionElevenData.data[i]?.answer3 == '' || sectionElevenData.data[i]?.answer3 == undefined)) {
    //     sectionElevenData.issues.push({
    //       subsectionId : 3,
    //       content : "Need to explain the reason",
    //       clientId : i + 1
    //     })
    //   }

    //   if(dataRowCompleted[i]) {
    //     sectionElevenData.issues.push({
    //       subsectionId : 3,
    //       content : "Need to complete point 2 - 10",
    //       clientId : i + 1
    //     })
    //   }
    // });

    if(sectionElevenData.issues.length == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  const router = useRouter();
  let pfrLocal = usePfrData((state) => state.pfr);

  useEffect(() => {
    // if (
    //   scrollPositionBottomSection10 === "Process10" &&
    //   sectionElevenData.id === 0
    // ) {
    //   const section1 = JSON.parse(localStorage.getItem("section1") ?? "{}");
    //   setPfrId(section1?.state?.id);
    //   setSectionElevenData({
    //     ...sectionElevenData,
    //     id: section1?.state?.id,
    //   });

      if (!router.isReady) return;
      // If edit check the ID
      // if (router.query.id !== null && router.query.id !== undefined) {
        if (scrollPositionBottomSection10 === "Process10") {
        if (sectionElevenData.id != Number(router.query.id)) {
          setSectionElevenData({
            ...sectionElevenData,
            id: Number(router.query.id),
            status: pfrLocal.section11
          });
        }
      }else {
        // if (scrollPositionBottomSection10 === "Process10") {
          const section1 = JSON.parse(localStorage.getItem('section1')?? '{}');
        if (sectionElevenData.id != Number(section1?.state?.id)) {
          setSectionElevenData({
            ...sectionElevenData,
            id: Number(section1?.state?.id),
            status: pfrLocal.section10
          });
        }
      }
      if (scrollPositionBottomSection10 == 'Process10') {
        setEditable(pfrLocal.editableSection11??0);
        fetchData();
      }
    // }
  }, [scrollPositionBottomSection10, router.isReady, router.query.id]);

  const [saveLoading, setSaveLoading] = useState(false);

  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section11")
        ? localStorage.getItem("section11")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data;
      }

      await postPfrSections(11, JSON.stringify(dataFix));

      setSaveLoading(false); // Stop loading
      setEditable(1);
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  useEffect(() => {
    if (scrollPositionNext === "okSec12") {
      if (
        (editable === 0 && sectionElevenData.status === 1) ||
        (editable === 2 && sectionElevenData.status === 1)
      ) {
        console.log("can save now");
        // setSaveLoading(true);
        storeData();
      } else {
        console.log("Your cannot save data");
      }
    }
  }, [scrollPositionNext]);

  return loading ? (
    <LoaderPage />
  ) : (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
      <div
        id="section-header-11"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec11" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec11"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 11. Client’s Acknowledgment
          {saveLoading ? (
            <span className="text-xs font-extralight text-gray-light">
              Saving...
            </span>
          ) : (
            ""
          )}
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid styles={{ margin: "0px" }}>
          <div className="col-span-3">
            <h2 className="text-xl font-bold 2xl:mx-60">
              1. Customer Knowledge Assessment Outcome
            </h2>
          </div>
          <div>
            {props.pfrType && props.pfrType > 1 && (
              <RowDouble>
                {getPfrLength.map((data, index) => (
                  <div key={"ssds" + index} className="flex-1">
                    <h3 className="w-full text-base font-bold text-green-deep">
                      Client {++index}
                    </h3>
                  </div>
                ))}
              </RowDouble>
            )}
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that I/we have been assessed to PASS the Customer
              Knowledge Assessment and I/we confirm that I/we WISH to receive
              advice concerning the unlisted Specified Investment Product from
              my/our Legacy FA Representative.
            </TextThin>
          </div>
          <div>
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 0, 0)}
                        isChecked={!!sectionElevenData.data[i][0][0]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that I/we have been assessed to PASS the Customer
              Knowledge Assessment and I/we confirm that I/we DO NOT WISH to
              receive advice concerning the unlisted Specified Investment
              Product from my/our Legacy FA Representative. In this regard, I/we
              am/are aware that I/we will not be able to rely on Section 27 of
              the Financial Advisers Act (Cap 110) to file a civil claim against
              Legacy FA Pte Ltd in the event of a loss. It is my/our
              responsibility to ensure the suitability of the unlisted Specified
              Investment Product selected.
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        isDisabled={true}
                        isChecked={!!sectionElevenData.data[i][0][1]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that I/we have been assessed to FAIL the Customer
              Knowledge Assessment and I/we understand that I/we will need to
              receive advice concerning the unlisted Specified Investment
              Product from my/our Legacy FA Representative and accept his/her
              recommendation(s) to proceed with the purchase of the investment
              product(s).
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 0, 2)}
                        isChecked={!!sectionElevenData.data[i][0][2]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        {`2. Replacement / Switching of Existing Insurance Policy / Investment
        Product`}
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`I/we am/are fully aware that I/we may incur fees and charges as a
              result of (a) the disposal of, or reduction in interest in, an
              existing insurance policy/investment product; and (b) the
              acquisition of, or increase in interest in, a new insurance
              policy/investment product. I/we confirm that I/we wish to proceed
              with the replacement / switch notwithstanding the fees, charges or
              disadvantages that may arise could outweigh any potential
              benefits.I/we will obtain my/our own advice on the tax
              implications and/or any ancillary implications in relation to the
              application of the new insurance policy/investment product.`}
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 1, 0)}
                        isChecked={!!sectionElevenData.data[i][1][0]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        {`3. Procedures, Charges and Restrictions on Withdrawal / Surrender /
        Claim`}
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`I/we acknowledge that my/our Legacy FA Representative has
              disclosed and explained the procedures, charges, and restrictions
              on withdrawal, surrender / termination or claim of the product(s)
              recommended.`}
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox isDisabled={true} isChecked={true} />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        4. Documents to Receive
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`Where investment-linked funds/collective investment schemes and
              participating plans are concerned, I/we acknowledge that my/our
              Legacy FA Representative has informed me/us of the frequency of
              the reports/statements and source from which I/we could reasonably
              expect to receive for the product(s) I/we have chosen to purchase.`}
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 3, 0)}
                        isChecked={!!sectionElevenData.data[i][3][0]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`I/we acknowledge that my Legacy FA Representative has explained
              the contents within this document and has furnished me/us with the
              endorsed copy of this document as well as the following documents
              (where applicable):`}
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox isDisabled={true} isChecked={true} />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        {/* 4.1 */}
        {sub4Options.map((option) => {
          return (
            <RowFourthGrid key={`sub_${option.iKey}`}>
              <div className="col-span-3">
                <TextThin>{option.label}</TextThin>
              </div>
              <div className="text-right">
                <RowDouble className="mb-5">
                  {(() => {
                    let htmlBlock = [];
                    for (let i = 0; i < props.pfrType; i++) {
                      const css =
                        matrixData[i][option.iKey] == true &&
                        !sectionElevenData.data[i][9][option.iKey]
                          ? "text-xs text-red"
                          : "text-xs";
                      const label =
                        matrixData[i][option.iKey] == true &&
                        !sectionElevenData.data[i][9][option.iKey]
                          ? "Required field"
                          : "";
                      htmlBlock.push(
                        <div className="flex-1" key={i}>
                          <Checkbox
                            isChecked={
                              !!sectionElevenData.data[i][9][option.iKey]
                            }
                            onChange={(e) => onCheckMatirx(e, i, option.iKey)}
                            lableStyle={css}
                            label={label}
                          />
                        </div>
                      );
                    }
                    return htmlBlock;
                  })()}
                </RowDouble>
              </div>
            </RowFourthGrid>
          );
        })}
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        5. Personal Data Collection & Marketing Consent
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`I/we hereby give my/our consent to Legacy FA Pte Ltd to collect, use, and/or 
            disclose my/our personal data for the purpose of performing financial needs 
            analysis and planning, including providing financial advice, product 
            recommendation and reviews of my/our financial plans.`}
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox isDisabled={true} isChecked={true} />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we hereby give my/our consent to Legacy FA Pte Ltd to contact
              me/us regarding any marketing and promotional materials on
              financial products and services.
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 4, 1)}
                        isChecked={!!sectionElevenData.data[i][4][1]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            {`6. I/We understand that the above recommendation(s) is/are based on the facts furnished 
            in this "Personal Financial Record"; and any incomplete or inaccurate information 
            provided by me/us may affect the suitability of the recommendation(s) made. 
            If I/we choose not to provide information requested or do not accept my/our 
            Legacy FA Representative's recommendation(s) and choose to purchase another product(s) 
            which is/are not recommended by my/our Legacy FA Representative, it is 
            my/our responsibility to ensure the suitability of the product(s) selected.`}
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox isDisabled={true} isChecked={true} />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </HeadingSecondarySection>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        7. My/Our Legacy FA Representative Has Explained in Detail The
        Recommendation(s) Made and I/We :
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        {getPfrLength.map((data, index) => {
          if (!checkRemarkValidation(index)) {
            return (
              <span className="text-xs text-red" key={"dss" + index}>
                Client {index + 1} needs to check either one.
              </span>
            );
          }
        })}

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>Accept the recommendation(s)</TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={"asa" + i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 6, 0)}
                        isChecked={!!sectionElevenData.data[i][6][0]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
        <TextArea
          needValidation={
            reasonForAccept() &&
            (sectionElevenData.remark1 == "" ||
              sectionElevenData.remark1 == undefined)
          }
          label="Remarks"
          className="mb-10"
          defaultValue={sectionElevenData.remark}
        />

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`Do not accept the recommendation(s) and wish to purchase my/our
              own choice of product(s)`}
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 6, 1)}
                        isChecked={!!sectionElevenData.data[i][6][1]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
        <TextArea
          needValidation={
            reasonForDontAccept() &&
            (sectionElevenData.remark == "" ||
              sectionElevenData.remark == undefined)
          }
          label="Remarks"
          className="mb-10"
        />
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        8. Introducer Disclosure Acknowledgement
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              {`I/we hereby confirm that I/we am/are referred by Introducer`}
              <input
                type="text"
                onChange={(e) =>
                  setSectionElevenData({
                    ...sectionElevenData,
                    introducer: e.target.value,
                  })
                }
                className="mx-2 border-t-0 border-b border-l-0 border-r-0"
              />
              and that I/we am/are informed of the following:
            </TextThin>
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 7, 0)}
                        isChecked={!!sectionElevenData.data[i][7][0]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
        <TextThin>
          {`(a) that the Introducer is not permitted to give advice or provide recommendations on any investment product to me/us, 
        market any collective investment scheme, or arrange any contract of insurance in respect of life policies; and`}
        </TextThin>
        <TextThin>
          {`(b) the amount of remuneration that the introducer may be entitled to receive/pass on for carrying out this introduction.`}
        </TextThin>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            {`9. I Acknowledge and Agree to The Purchase of Financial Products Using Remote Signature in This Non-Face-To-Face Transaction`}
          </div>
          <div className="text-right">
            <RowDouble className="mb-5">
              {(() => {
                let htmlBlock = [];
                for (let i = 0; i < props.pfrType; i++) {
                  htmlBlock.push(
                    <div className="flex-1" key={i}>
                      <Checkbox
                        onChange={(e) => onChangeSectionData(e, i, 8, 0)}
                        isChecked={!!sectionElevenData.data[i][8][0]}
                      />
                    </div>
                  );
                }
                return htmlBlock;
              })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </HeadingSecondarySection>

      {editable === 2 && sectionElevenData.status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 11" />
      ) : (
        ""
      )}

      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default ClientsAcknowledgment;
