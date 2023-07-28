import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDouble from "@/components/Attributes/Rows/Flexs/RowDouble";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getLength } from "@/libs/helper";
import { getAllPfrData } from "@/services/pfrService";
import { getPfrStep } from "@/services/pfrService";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useEffect, useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
  pfrType: number;
}

const pfrId = 10343;
const pfrType = 1;

const ClientsAcknowledgment = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);
  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const [productCount, setProductCount] = useState([0, 0]);
  const [deviateCount, setDeviateCount] = useState([0, 0]);
  const [outcomes, setOutComes] = useState([0, 0]);
  const [section6Need, setSection6Need] = useState([0, 0]);
  const [nftf, setNftf] = useState(false);

  const sectionData = [
    [
      false,
      false,
      false
    ],
    [
        0
    ],
    [
        false
    ],
    [
        false,
        false
    ],
    [
        false,
        false
    ],
    [
        false
    ],
    [
        false,
        false
    ],
    [
        false
    ],
    [
        false
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
        false
    ]
  ];

  const sectionDataTwo = [
    [
      false,
      false,
      false
    ],
    [
        0
    ],
    [
        false
    ],
    [
        false,
        false
    ],
    [
        false,
        false
    ],
    [
        false
    ],
    [
        false,
        false
    ],
    [
        false
    ],
    [
        false
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
        false
    ]
  ];

  interface SectionEleven {
    id: number,
    data: Array<any>,
    remark: string | null,
    remark1: string | null,
    introducer: string | null,
    status: number,
    issues: Array<any>
  }

  const [sectionElevenData, setSectionElevenData] = useState<SectionEleven>({
    id: 0,
    data: [
      sectionData,
      sectionDataTwo
    ],
    remark: null,
    remark1: null,
    introducer: null,
    status: 1,
    issues: []
  });

  const [sub4Options, setSub4Options] = useState([
    {label : "Insurance Application Form(s)", key : "insuranceApplicationForm", iKey: 0 },
    {label : "Benefit Illustration(s)", key : "benefitIllustration", iKey: 1 },
    {label : "Product Summary(ies)", key : "productSummary", iKey: 2 },
    {label : "Your Guide to Life Insurance", key : "yourGuideToLifeInsurance", iKey: 3 },
    {label : "Your Guide to Health Insurance", key : "yourGuideToHealthInsurance", iKey: 4 },
    {label : "Your Guide to Investment-Linked Insurance Plans", key : "yourGuideToInvestmentLinkedInsurance", iKey: 5 },
    {label : "Fund Summary(ies)", key : "fundSummary", iKey: 6 },
    {label : "Legacy FA Model Portfolio Fact Sheet(s)", key : "legacyFAModelPortfolio", iKey: 7 },
    {label : "Fund Fact Sheet(s)", key : "fundFactSheet", iKey: 8 },
    {label : "Product Highlight Sheet(s)", key : "productHighlightSheet", iKey: 9 },
    {label : "Prospectus(es)", key : "prospectus", iKey: 10 },
    {label : "Navigator Schedule - Funds Investment", key : "navigatorSchedule", iKey: 11 },
    {label : "Navigator Account Opening / Subscription Form", key : "navigatorAccountOpening", iKey: 12 },
    {label : "iFast Account Opening / Subscription Form", key : "ifastAccountOpening", iKey: 14 },
    {label : "Havenport Investment Account Opening Form", key : "havenportInvestmentAccount", iKey: 13 },
  ]);

  const [matrixData, setMatrixData] = useState([
    [ false, false,false, false,false, false,false, false,false, false,false, false,false, false,false],
    [ false, false,false, false,false, false,false, false,false, false,false, false,false, false,false]
  ]);

  const fetchData = async () => {
    const s12Res:any = await getPfrStep(12, pfrId);
    const s10Res:any = await getPfrStep(10, pfrId);
    const s13Res:any = await getPfrStep(13, pfrId);

    if (s12Res['answer'] != null) {
      let data = JSON.parse(s12Res['answer']['data']);
      setSectionElevenData(data);

      getPfrLength.map((data, i) => {
        if(sectionElevenData.data[i][9] == undefined) {
          sectionElevenData.data[i][9] = [ false, false,false, false,false, false,false, false,false, false,false, false,false, false,false]
        }
      })
      // for(let i = 0 ; i < pfrType ; i ++) {
      //   if(sectionElevenData.data[i][9] == undefined) {
      //     sectionElevenData.data[i][9] = [ false, false,false, false,false, false,false, false,false, false,false, false,false, false,false]
      //   }
      // }
    }

    let mat = s12Res['matrix'];
    setMatrixData(prevData => {
      return prevData.map((client, idx) => {
        for(let j = 0 ; j < 15 ; j ++ ) {
          client[j] = (mat[idx] & Math.pow(2, j)) == 0 ? false : true;
        }
        return client;
      });
    });

    let section6 = s12Res['section6'];
    section6.forEach((section:any) => {
      let outcome = section['outcome'];
      let clientId = section['clientType'] - 1;
      setOutComes(prevData => {
        return prevData.map((data, ind) => {
          if (ind == clientId) {
            return outcome;
          } else {
            return data;
          }
        });
      });
    });

    let section6Needs = s12Res['section6Needs']
    section6Needs.forEach((need:any) => {
      let clientId = need['clientId']
      let _need = need['need']
      setSection6Need(prevData => {
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

    for(let i = 0 ; i < pfrType ; i ++ ) {
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
          if(i === idx) {
            const copyData = client;
            if(section6Need[i] == 0 || productCount[i] == 0) {
              copyData[0][0] = false
              copyData[0][1] = false
              copyData[0][2] = false
            } else {
              if(outcomes[i] == 0) {
                copyData[0][0] = false
                copyData[0][1] = false
                copyData[0][2] = true
              } else {
                let deviate = deviateCount[i]
                if(deviate > 0) {
                  copyData[0][0] = false
                  copyData[0][1] = true
                  copyData[0][2] = false
                } else {
                  copyData[0][0] = true
                  copyData[0][1] = false
                  copyData[0][2] = false
                }
              }
            }
            return copyData;
          } else {
            return client;
          }
        })
      });
    }

    let section10 = s10Res;
    let answers = section10['data'];
    answers.forEach( (answer:any, i:any) => {
      let _1b = answer['answer1b']
      if(i < pfrType) {
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
            if(i === idx) {
              const copyData = client;
              copyData[1][0] = _1b;
              return copyData;
            } else {
              return client;
            }
          })
        });
      }
    });

    if(s13Res['note'] != null) {
      var cekData = false;
      if(s13Res['note']['nftf']){
        if((s13Res['note']['nftf'] === true) || s13Res['note']['nftf'] === 1){
          cekData = true;
        }else{
          cekData = false;
        }
      }
      setNftf(cekData);
    }
  }

  const onCheckMatirx = (e:React.ChangeEvent<HTMLInputElement>, i:any, iKey:any) => {
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
        if(i === idx) {
          const copyData = client;
          copyData[9][iKey] = e.target.checked;
          return copyData;
        } else {
          return client;
        }
      })
    });
  }

  const onChangeSectionData = (e:React.ChangeEvent<HTMLInputElement>, i:any, firstIndex:any, secondIndex:any) => {
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
        if(i === idx) {
          console.log("section index: ", idx);
          const copyData = client;
          copyData[firstIndex][secondIndex] = e.target.checked;
          console.log('Copy Data: ', copyData);
          return copyData;
        } else {
          return client;
        }
      })
    });
  }

  const scrollPosition = useScrollPosition(11)

  useEffect(() => {

    if(scrollPosition === "okSec11") {
      fetchData();
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem('section11', JSON.stringify(sectionElevenData));
  }, [sectionElevenData]);

  return (
    <div id={props.id}>
      <div id="section-header-11" className={`sticky top-0 z-10 ${scrollPosition === "okSec11" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec11" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 11. Client’s Acknowledgment
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid styles={{margin: '0px'}}>
          <div className="col-span-3">
            <h2 className="text-xl font-bold 2xl:mx-60">
              1. Customer Knowledge Assessment Outcome
            </h2>
          </div>
          <div>
            {props.pfrType && props.pfrType > 1 && (
              <RowDouble>
                {getPfrLength.map((data, index) => (
                  <div className="flex-1">
                    <h3
                      key={"heading-secondary-" + index}
                      className="w-full text-base font-bold text-green-deep">
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
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 0, 0)} isChecked={!!sectionElevenData.data[i][0][0]} />
                </div>);
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
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox isDisabled={true} isChecked={!!sectionElevenData.data[i][0][1]} />
                </div>);
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
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 0, 2)} isChecked={!!sectionElevenData.data[i][0][2]} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        2. Replacement / Switching of Existing Insurance Policy / Investment
        Product
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we am/are fully aware that I/we may incur fees and charges as a
              result of (a) the disposal of, or reduction in interest in, an
              existing insurance policy/investment product; and (b) the
              acquisition of, or increase in interest in, a new insurance
              policy/investment product. I/we confirm that I/we wish to proceed
              with the replacement / switch notwithstanding the fees, charges or
              disadvantages that may arise could outweigh any potential
              benefits.I/we will obtain my/our own advice on the tax
              implications and/or any ancillary implications in relation to the
              application of the new insurance policy/investment product.
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 1, 0)} isChecked={!!sectionElevenData.data[i][1][0]} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        3. Procedures, Charges and Restrictions on Withdrawal / Surrender /
        Claim
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that my/our Legacy FA Representative has
              disclosed and explained the procedures, charges, and restrictions
              on withdrawal, surrender / termination or claim of the product(s)
              recommended.
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox isDisabled={true} isChecked={true} />
                </div>);
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
              Where investment-linked funds/collective investment schemes and
              participating plans are concerned, I/we acknowledge that my/our
              Legacy FA Representative has informed me/us of the frequency of
              the reports/statements and source from which I/we could reasonably
              expect to receive for the product(s) I/we have chosen to purchase.
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 3, 0)} isChecked={!!sectionElevenData.data[i][3][0]} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that my Legacy FA Representative has explained
              the contents within this document and has furnished me/us with the
              endorsed copy of this document as well as the following documents
              (where applicable):
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox isDisabled={true} isChecked={true} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        {/* 4.1 */}
        {
          sub4Options.map((option) => {

            return (
              <RowFourthGrid key={`sub_${option.iKey}`}>
                <div className="col-span-3">
                  <TextThin>
                    {option.label}
                  </TextThin>
                </div>
                <div className="text-right">
                  <RowDouble className="mb-5">
                  {(() => {
                    let htmlBlock = [];
                    for (let i=0; i<props.pfrType; i++) {
                      const css = (matrixData[i][option.iKey] == true && !sectionElevenData.data[i][9][option.iKey])? "text-xs text-red": "text-xs";
                      const label = (matrixData[i][option.iKey] == true && !sectionElevenData.data[i][9][option.iKey])? "Required field": "";
                      htmlBlock.push(<div className="flex-1">
                        <Checkbox isChecked={!!sectionElevenData.data[i][9][option.iKey]} onChange={(e) => onCheckMatirx(e, i, option.iKey)} lableStyle={css} label={label} />
                      </div>);
                  }
                  return htmlBlock;
                  })()}
            </RowDouble>
                </div>
              </RowFourthGrid>
            )
          })
        }

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
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox isDisabled={true} isChecked={true} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I/we hereby give my/our consent to Legacy FA Pte Ltd to contact me/us regarding 
            any marketing and promotional materials on financial products and services.
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 4, 1)} isChecked={!!sectionElevenData.data[i][4][1]} />
                </div>);
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
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox isDisabled={true} isChecked={true} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </HeadingSecondarySection>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        7. My/Our Legacy FA Representative Has Explained in Detail The Recommendation(s) Made and I/We :
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Accept the recommendation(s)
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 6, 0)} isChecked={!!sectionElevenData.data[i][6][0]} />
                </div>);
              }
              return htmlBlock;
            })()}
          </RowDouble>
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Do not accept the recommendation(s) and wish to purchase my/our own choice of product(s)
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 6, 1)} isChecked={!!sectionElevenData.data[i][6][1]} />
                </div>);
              }
              return htmlBlock;
            })()}
          </RowDouble>
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        8. Introducer Disclosure Acknowledgement
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I/we hereby confirm that I/we am/are referred by Introducer
            <input 
            type="text" 
            onChange={(e) => setSectionElevenData({
              ...sectionElevenData,
              introducer: e.target.value
            })} 
            className="mx-2 border-t-0 border-b border-l-0 border-r-0"/> 
            and that I/we am/are informed of the following:
            </TextThin>
          </div>
          <div className="text-right">
          <RowDouble className="mb-5">
            {(() => {
              let htmlBlock = [];
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 7, 0)} isChecked={!!sectionElevenData.data[i][7][0]} />
                </div>);
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
              for (let i=0; i<props.pfrType; i++) {
                htmlBlock.push(<div className="flex-1">
                  <Checkbox onChange={(e) => onChangeSectionData(e, i, 8, 0)} isChecked={!!sectionElevenData.data[i][8][0]} />
                </div>);
              }
              return htmlBlock;
            })()}
            </RowDouble>
          </div>
        </RowFourthGrid>
      </HeadingSecondarySection>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default ClientsAcknowledgment;
