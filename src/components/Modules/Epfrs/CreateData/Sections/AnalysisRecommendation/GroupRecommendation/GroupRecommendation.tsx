import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";

import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState, useEffect } from "react";
import { useAnalysisRecommendationGroup } from "@/store/epfrPage/createData/analysisRecommendationGroup";

// Service
import {getPfr, getRecommendationGroup, pfrSection} from "@/services/pfrService";
import {getAllCompany} from "@/services/companyService";
import {productFindOne} from "@/services/productService";
// import {getPfrSection} from "@/services/getPfrSection";

import AddLineIcon from "remixicon-react/AddLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";


const GroupRecommendation = () => {
  let {
    section9RecommendGroup
  } = useAnalysisRecommendationGroup();

  let groupName: any = localStorage.getItem("group_name");

  let {showDetailData} = useNavigationSection();

  const showDetail = () => {
    showDetailData(92);
  };

  const saveData = (params: any) => {
    showDetailData(params);
  };

  // Code
  const [getPfrData, setPfrData] = useState<any>({});
  const [getRecommendationData, setRecommendationData] = useState<any>({});
  const [getProduct, setProduct] = useState<any>({});
  const [getDataTotalPremium, setDataTotalPremium] = useState<any>({});

  const [getPfr8, setPfr8] = useState<any>({});
  const [getPfr9, setPfr9] = useState<any>({});

  const [dataAnnualPayorBudget, setAnnualPayorBudget] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
  const [dataSinglePayorBudget, setSinglePayorBudget] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
  const [dataAnnualRemainBudget, setAnnualRemainBudget] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
  const [dataSingleRemainBudget, setSingleRemainBudget] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
  
  const [dataTotalAnnualPremium, setTotalAnnualPremium] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
  const [dataTotalSinglePremium, setTotalSinglePremium] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
  const [dataMaxAnnualPremium, setMaxAnnualPremium] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
  const [dataMaxSinglePremium, setMaxSinglePremium] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])

  const [dataProductAnnualPremium, setProductAnnualPremium] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
  const [dataProductSinglePremium, setProductSinglePremium] = useState<any>([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
  
  const [dataSubPremium, setDataSubPremium] = useState<any>(
    {"Monthly": 0,"Quarterly": 0,"Half-Yearly": 0,"Annually": 0,"SinglePayment": 0}
  );
  const [dataResDataTotalPremiumArr, setResDataTotalPremiumArr] = useState<any>(
    {"Monthly": 0,"Quarterly": 0,"Half-Yearly": 0,"Annually": 0,"SinglePayment": 0}
  );

  useEffect(() => {
    const pfrId = localStorage.getItem("s9_PfrId");
    const pfrGroupId = localStorage.getItem("s9_dataGroup");
    
    // Find Pfr Section 8
    const annualPayorBudget: Array<any> = [[]];
    const singlePayorBudget: Array<any> = [[]];
    const annualRemainBudget: Array<any> = [[]];
    const singleRemainBudget: Array<any> = [[]];
    
    console.log('pfrGroupId', pfrGroupId)

    // Find Group Recommend
    var resDataTotalPremiumArr: Array<any> = [];
    
    getRecommendationGroup(10653, pfrGroupId).then((data: any) => {
      setRecommendationData(data)
      if(data.products){
        if(data.products.length > 0){
          data.products.map((product: any) => {
              var dataName = getPremiumFrequencyName(product.premiumFrequency);
              if(dataName != undefined){
                const dataSubPremium = {
                  [dataName]: product['premium']
                }

                if(resDataTotalPremiumArr[dataName]){
                  resDataTotalPremiumArr[dataName] += product['premium'];
                }
              
                product['riders'].map((rider:any) => {
                  console.log('rirder',rider['premium'])
                  if(dataSubPremium[getPremiumFrequencyName(rider.premiumFrequency)]){
                    dataSubPremium[getPremiumFrequencyName(rider.premiumFrequency)] += rider['premium'];
                  }else{
                    dataSubPremium[getPremiumFrequencyName(rider.premiumFrequency)] = rider['premium'];
                  }

                  if(resDataTotalPremiumArr[getPremiumFrequencyName(rider.premiumFrequency)]){
                    resDataTotalPremiumArr[getPremiumFrequencyName(rider.premiumFrequency)] += rider['premium'];
                  }else{
                    resDataTotalPremiumArr[getPremiumFrequencyName(rider.premiumFrequency)] = rider['premium'];
                  }
                });

                if(product.riders.length > 0){
                  product['subTotal'] = dataSubPremium;
                }else{
                  product['subTotal'] = [];
                }
              }
          })
        }
      }
    });

    // Find Pfr 
    getPfr(10653).then((data:any) => {
      setPfrData(data)
    })    

    pfrSection(8, 10653).then((data: any) => {
      setPfr8(data)
      let payorBudgets = data['payorBudgets']
      payorBudgets.map((budget: any) => {
        if(budget['selection'] != 0) {
          let clientId = budget['clientType']
          let type = budget['type']
          annualPayorBudget[clientId][type]  = budget['annual']
          singlePayorBudget[clientId][type]  = budget['single']
          annualRemainBudget[clientId][type] = budget['annual']
          singleRemainBudget[clientId][type] = budget['single']
        }
      })
    });
    
    setAnnualPayorBudget(annualPayorBudget)
    setSinglePayorBudget(singlePayorBudget)
    setAnnualRemainBudget(annualRemainBudget)
    setSingleRemainBudget(singleRemainBudget)

    // Find Pfr Section 9
    pfrSection(9, 10653).then((data: any) => {
      setPfr9(data)
      calcReaminingBudgets(data)
      // getTotalPremium()
    });

      console.log('getRecommendationData', getRecommendationData)
  }, [section9RecommendGroup]);


  const getPremiumFrequencyName = (premiumFrequency: any) => {
    switch(Number(premiumFrequency)) {
      case 0 : return "Monthly";
      case 1 : return "Quarterly";
      case 2 : return "Half-Yearly";
      case 3 : return "Annually";
      case 4 : return "Single Payment";
    }
  }

  // Calc
  const calcReaminingBudgets = (resDta: any) => {
    console.log('resDta', resDta)
    var groupIdParam  = Number(localStorage.getItem("s9_dataGroup"))
    resDta.groups.map((group: any) => {
      let groupId = group['id']
      if(groupId == groupIdParam) {
        return
      }
      
      let products: any        = getProductsByFilteringGroupId(groupId, resDta.recommendedProduct)
      let ILPProducts: any     = getProductsByFilteringGroupId(groupId, resDta.ILPProduct)
      let CISProducts: any     = getProductsByFilteringGroupId(groupId, resDta.CISProduct)
      let customProducts: any  = getProductsByFilteringGroupId(groupId, resDta.customProduct)

      // console.log('products', products)

      products.map((product: any) => {
          setProductAnnualPremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]]);
          setProductSinglePremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]]);

          product['riders'].map((rider:any) => {
            rider['product']={
              categoryId: -1
            }
            calcPremium(rider, true)
          })
          calcPremium(product, false)
      })

      ILPProducts.map((product:any) => {
        setProductAnnualPremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
        setProductSinglePremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])

        product['riders'].map((rider: any) => {
          rider['product']={
            categoryId: -1
          }
          calcPremium(rider, true)
        })
        calcPremium(product, false)
      })

      customProducts.map((product:any) => {
        setProductAnnualPremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
        setProductSinglePremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])

        product['riders'].map((rider:any) => {
          rider['product']={
            categoryId: -1
          }
          calcPremium(rider, true)
        })
        calcPremium(product, false)
      })

      CISProducts.map((product: any) => {
        calcPremiumForCIS(product)
      })

      for(let i = 0 ; i < getPfrData.type ;i ++ ) {
        for(let j = 0 ; j < 5 ; j ++ ) {
          dataAnnualRemainBudget[i][j] = dataAnnualRemainBudget[i][j] - dataMaxAnnualPremium[i][j]
          dataSingleRemainBudget[i][j] = dataSingleRemainBudget[i][j] - dataMaxSinglePremium[i][j]
        }
      }
    })
  }

  const calcPremium = (product: any, isRider: any) => {
    let frequency = product['premiumFrequency']
    let clientId = product['nameOfOwner']
    let premiumType = product['premiumPaymentType']
    let premium = 0
    let categoryId = product['categoryId']
    
    if(categoryId != 8 && categoryId != 5) {
      if(frequency == 4) {
        premium = product['premium']
        
        dataTotalSinglePremium[clientId][premiumType] += product['premium'];
        setTotalSinglePremium(dataTotalSinglePremium);
        
        dataProductSinglePremium[clientId][premiumType] += premium;
        setProductSinglePremium(dataProductSinglePremium);

      } else if(frequency == 3) {
        premium = product['premium']
        
        dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 1
        setTotalAnnualPremium(dataTotalAnnualPremium);
        
        dataProductAnnualPremium[clientId][premiumType] += premium
        setProductAnnualPremium(dataProductAnnualPremium);

      } else if(frequency == 2) {
        premium = product['premium']*2
        
        dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 2
        setTotalAnnualPremium(dataTotalAnnualPremium);
        
        dataProductAnnualPremium[clientId][premiumType] += premium
        setProductAnnualPremium(dataProductAnnualPremium);

      } else if(frequency == 1) {
        premium = product['premium']*4
        
        dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 4
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][premiumType] += premium
        setProductAnnualPremium(dataProductAnnualPremium);

      } else {
        premium = product['premium']*12
       
        dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 12
        setTotalAnnualPremium(dataTotalAnnualPremium)
        
        dataProductAnnualPremium[clientId][premiumType] += premium
        setProductAnnualPremium(dataProductAnnualPremium)
      }

      if(isRider == false) {
        
        if(dataMaxSinglePremium[clientId][premiumType] < dataProductSinglePremium[clientId][premiumType]) {
          dataMaxSinglePremium[clientId][premiumType] += dataProductSinglePremium[clientId][premiumType]
        }

        if(dataMaxAnnualPremium[clientId][premiumType] < dataProductAnnualPremium[clientId][premiumType]) {
          console.log('if first', dataProductAnnualPremium[clientId][premiumType])
          dataMaxAnnualPremium[clientId][premiumType] += dataProductAnnualPremium[clientId][premiumType]
        }

      }

    } else {
      let cash = product['premium_for_hospitalization']['cash']
      let medisave =  product['premium_for_hospitalization']['cpfMedisave']
      let premium = cash + medisave
      if(frequency == 4) {

        dataTotalSinglePremium[clientId][0] += cash
        setTotalSinglePremium(dataTotalSinglePremium)

        dataTotalSinglePremium[clientId][3] += medisave
        setTotalSinglePremium(dataTotalSinglePremium)

        dataProductSinglePremium[clientId][0] += cash
        setProductSinglePremium(dataProductSinglePremium)

        dataProductSinglePremium[clientId][3] += medisave
        setProductSinglePremium(dataProductSinglePremium)

      } else if(frequency == 3) {

        dataTotalAnnualPremium[clientId][0] += cash
        setTotalAnnualPremium(dataTotalAnnualPremium);
        
        dataTotalAnnualPremium[clientId][3] += medisave
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][0] += cash
        setProductAnnualPremium(dataProductAnnualPremium);
        
        dataProductAnnualPremium[clientId][3] += medisave
        setProductAnnualPremium(dataProductAnnualPremium);

      } else if(frequency == 2) {

        premium = premium * 2
        dataTotalAnnualPremium[clientId][0] += cash*2
        setTotalAnnualPremium(dataTotalAnnualPremium)
        
        dataTotalAnnualPremium[clientId][3] += medisave*2
        setTotalAnnualPremium(dataTotalAnnualPremium)

        dataProductAnnualPremium[clientId][0] += cash*2
        setProductAnnualPremium(dataProductAnnualPremium)
        
        dataProductAnnualPremium[clientId][3] += medisave*2
        setProductAnnualPremium(dataProductAnnualPremium)

      } else if(frequency == 1) {

        premium = premium * 4
        dataTotalAnnualPremium[clientId][0] += cash*4
        setTotalAnnualPremium(dataTotalAnnualPremium)
        
        dataTotalAnnualPremium[clientId][3] += medisave*4
        setTotalAnnualPremium(dataTotalAnnualPremium)

        dataProductAnnualPremium[clientId][0] += cash*4
        setProductAnnualPremium(dataProductAnnualPremium)
        
        dataProductAnnualPremium[clientId][3] += medisave*4
        setProductAnnualPremium(dataProductAnnualPremium)

      } else {

        premium = premium * 12
        dataTotalAnnualPremium[clientId][0] += cash*12
        setTotalAnnualPremium(dataTotalAnnualPremium)
        
        dataTotalAnnualPremium[clientId][3] += medisave*12
        setTotalAnnualPremium(dataTotalAnnualPremium)

        dataProductAnnualPremium[clientId][0] += cash*12
        setProductAnnualPremium(dataProductAnnualPremium)
        
        dataProductAnnualPremium[clientId][3] += medisave*12
        setProductAnnualPremium(dataProductAnnualPremium)

      }

      if(isRider == false) {
        if(dataMaxSinglePremium[clientId][0] < dataProductSinglePremium[clientId][0]) {
          dataMaxSinglePremium[clientId][0] += dataProductSinglePremium[clientId][0]
        }
        if(dataMaxSinglePremium[clientId][3] < dataProductSinglePremium[clientId][3]) {
          dataMaxSinglePremium[clientId][3] += dataProductSinglePremium[clientId][3]
        }
        if(dataMaxAnnualPremium[clientId][0] < dataProductAnnualPremium[clientId][0]) {
          console.log('else first')

          dataMaxAnnualPremium[clientId][0] += dataProductAnnualPremium[clientId][0]
        }
        if(dataMaxAnnualPremium[clientId][3] < dataProductAnnualPremium[clientId][3]) {
          console.log('else second')

          dataMaxAnnualPremium[clientId][3] += dataProductAnnualPremium[clientId][3]
        }
      }

    }

  }

  const getProductsByFilteringGroupId = (groupId: any, products:any) => {
    console.log('productss', products)
    var result = [];
    if(products){
      if(products.length > 0){
        result = products.filter((product:any) => {
          if(product['groupId'] == groupId) {
            return true
          } else {
            return false
          }
        })
      }
    }
    return result
  }
  
  const calcPremiumForCIS = (product: any) => {
    let frequency = product['premiumFrequency']
    let clientId = product['nameOfOwner']
    let premiumType = product['premiumPaymentType']
    let premium = 0
    
    if(frequency == 4) {
      premium = product['premium']
      dataTotalSinglePremium[clientId][premiumType] += product['premium']
      if(dataMaxSinglePremium[clientId][premiumType] < premium) {
        dataMaxSinglePremium[clientId][premiumType] += premium
      }
    } else if(frequency == 3) {
      premium = product['premium']
      dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 1
      if(dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] += premium
      }
    } else if(frequency == 2) {
      premium = product['premium']*2
      dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 2
      if(dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] += premium
      }
    } else if(frequency == 1) {
      premium = product['premium']*4
      dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 4
      if(dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] += premium
      }
    } else {
      
      premium = product['premium']*12
      dataTotalAnnualPremium[clientId][premiumType] += product['premium'] * 12
      
      if(dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] = premium
      }
      
    }
  }

  // getTotalPremium() {

  //   this.products.forEach(product => {
  //       product['riders'].forEach(rider => {
  //         rider['categoryId']= -1
  //         this.calcPremium(rider, true)
  //       })
  //       this.calcPremium(product)
  //   })

  //   this.ILPProducts.forEach(product => {

  //     product['riders'].forEach(rider => {
  //       rider['categoryId']= -1
  //       this.calcPremium(rider, true)
  //     })
  //     this.calcPremium(product)
  //   })

  //   this.customProducts.forEach(product => {

  //     product['riders'].forEach(rider => {
  //       rider['categoryId']= -1
  //       this.calcPremium(rider, true)
  //     })
  //     this.calcPremium(product)
  //   })

  //   this.CISProducts.forEach(product => {
  //     this.calcPremiumForCIS(product)
  //   })

  // }

  // sumTotal(){
  //   var res = 0;
  //   if(this.products){
  //     if(this.products.length > 0){
  //       this.products.forEach(function(v, k){
  //         res += v.premium;
  //         if(v.premium_for_hospitalization){
  //           var getPfr9 = res + v.premium_for_hospitalization.cash + v.premium_for_hospitalization.cpfMedisave;
  //           res = getPfr9;
  //         }

  //         if(v.riders){
  //           if(v.riders.length > 0){
  //             v.riders.forEach(function(vRider){
  //               res += vRider.premium;
  //             });
  //           }
  //         }
  //       });
  //     }
  //   }

  //   return res;
  // }

  // sumTotalILP(){
  //   var res = 0;
  //   if(this.ILPProducts){
  //     if(this.ILPProducts.length > 0){
  //       this.ILPProducts.forEach(function(v, k){
  //         res += v.premium;
  //         if(v.premium_for_hospitalization){
  //           var getPfr9 = res + v.premium_for_hospitalization.cash + v.premium_for_hospitalization.cpfMedisave;
  //           res = getPfr9;
  //         }

  //         if(v.riders){
  //           if(v.riders.length > 0){
  //             v.riders.forEach(function(vRider){
  //               res += vRider.premium;
  //             });
  //           }
  //         }

  //       });

  //       if(this.customProducts.length > 0){
  //         this.customProducts.forEach(function(v, k){
  //           res += v.premium;
  //           if(v.premium_for_hospitalization){
  //             var getPfr9 = res + v.premium_for_hospitalization.cash + v.premium_for_hospitalization.cpfMedisave;
  //             res = getPfr9;
  //           }
  
  //           if(v.riders){
  //             if(v.riders.length > 0){
  //               v.riders.forEach(function(vRider){
  //                 res += vRider.premium;
  //               });
  //             }
  //           }
  
  //         });
  //       }

  //       if(this.CISProducts.length > 0){
  //         this.CISProducts.forEach(function(v, k){
  //           res += v.premium;
  //           if(v.premium_for_hospitalization){
  //             var getPfr9 = res + v.premium_for_hospitalization.cash + v.premium_for_hospitalization.cpfMedisave;
  //             res = getPfr9;
  //           }
  
  //           if(v.riders){
  //             if(v.riders.length > 0){
  //               v.riders.forEach(function(vRider){
  //                 res += vRider.premium;
  //               });
  //             }
  //           }
  
  //         });
  //       }
  //     }
  //   }
  //   console.log('res',res)
  //   return res;
  // }

  
  return (
    <>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        {/* Payor Budget */}
        <RowSingleGrid>
          <TextSmall>Payor Budget</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5"></th>
                  <th className="px-2 py-5" colSpan={2}>
                    Cash
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFOA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFSA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPF Medisave
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    SRS
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                </tr>
              </thead>
              <tbody>
                {getPfrData?.clients ? 
                  getPfrData.clients.map((data: any, index:any) => (
                    <>
                      <tr key={index}>
                        <td className="px-2 py-5">
                          Client {index+1}
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${dataAnnualPayorBudget[index][0]}
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataSinglePayorBudget[index][0] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataAnnualPayorBudget[index][1] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataSinglePayorBudget[index][1] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataAnnualPayorBudget[index][2] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataSinglePayorBudget[index][2] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataAnnualPayorBudget[index][3] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataSinglePayorBudget[index][3] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataAnnualPayorBudget[index][4] }
                        </td>
                        <td className="px-2 py-5 text-center">
                          ${ dataSinglePayorBudget[index][4] }
                        </td>
                      </tr>
                    </>
                  ))
                : ''}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Remaining Budget */}
        <RowSingleGrid>
          <TextSmall>Remaining Budget</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5"></th>
                  <th className="px-2 py-5" colSpan={2}>
                    Cash
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFOA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPFSA
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    CPF Medisave
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    SRS
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                  <th className="px-2 py-5">Annual</th>
                  <th className="px-2 py-5">Single</th>
                </tr>
              </thead>
              <tbody>
              {getPfrData?.clients ? 
                  getPfrData.clients.map((data: any, index:any) => (
                    <>
                      <tr>
                        <td className="px-2 py-5">Client {index + 1}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][0] - dataMaxAnnualPremium[index][0]) ? 0 : dataAnnualRemainBudget[index][0] - dataMaxAnnualPremium[index][0]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][0] - dataMaxSinglePremium[index][0]) ? 0 : dataSingleRemainBudget[index][0] - dataMaxSinglePremium[index][0]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][1] - dataMaxAnnualPremium[index][1]) ? 0 : dataAnnualRemainBudget[index][1] - dataMaxAnnualPremium[index][1]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][1] - dataMaxSinglePremium[index][1]) ? 0 : dataSingleRemainBudget[index][1] - dataMaxSinglePremium[index][1]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][2] - dataMaxAnnualPremium[index][2]) ? 0 : dataAnnualRemainBudget[index][2] - dataMaxAnnualPremium[index][2]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][2] - dataMaxSinglePremium[index][2]) ? 0 : dataSingleRemainBudget[index][2] - dataMaxSinglePremium[index][2]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][3] - dataMaxAnnualPremium[index][3]) ? 0 : dataAnnualRemainBudget[index][3] - dataMaxAnnualPremium[index][3]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][3] - dataMaxSinglePremium[index][3]) ? 0 : dataSingleRemainBudget[index][3] - dataMaxSinglePremium[index][3]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][4] - dataMaxAnnualPremium[index][4]) ? 0 : dataAnnualRemainBudget[index][4] - dataMaxAnnualPremium[index][4]}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][4] - dataMaxSinglePremium[index][4]) ? 0 : dataSingleRemainBudget[index][4] - dataMaxSinglePremium[index][4]}</td>
                      </tr>
                    </>
                  ))
              : ''}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Button Add Group */}
        <RowSingleGrid>
          <TextSmall>Product(s) / Rider(s)</TextSmall>
          <ButtonBox className="text-green-deep" onClick={showDetail}>
            <AddLineIcon />
          </ButtonBox>
        </RowSingleGrid>

        {/* Recommended Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Name of Plan(s) / Rider(s)</th>
                  <th className="px-2 py-5">Policy Term</th>
                  <th className="px-2 py-5">Sum Assured</th>
                  <th className="px-2 py-5">Premium Type</th>
                  <th className="px-2 py-5">Premium ($)</th>
                  <th className="px-2 py-5">Premium Frequency</th>
                  <th className="px-2 py-5">Name of Owner / Insured</th>
                  <th className="px-2 py-5">Client Choice</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Ilp Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Name of Plan(s) / Rider(s)</th>
                  <th className="px-2 py-5">Policy Term</th>
                  <th className="px-2 py-5">Sum Assured</th>
                  <th className="px-2 py-5">Premium Type</th>
                  <th className="px-2 py-5">Premium ($)</th>
                  <th className="px-2 py-5">Premium Frequency</th>
                  <th className="px-2 py-5">Name of Owner / Insured</th>
                  <th className="px-2 py-5">Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                  <td className="px-2 py-5">$0.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        <RowSingleGrid>
          <TextSmall>Group Name</TextSmall>
          <div>
            <Input value={groupName} readonly={true} />
          </div>
        </RowSingleGrid>
      </SectionCardSingleGrid>

      <SectionCardFooter className="mx-8 2xl:mx-60">
        <ButtonGreenMedium onClick={() => saveData(9)}>Save</ButtonGreenMedium>
        <ButtonRedMedium>Cancel</ButtonRedMedium>
      </SectionCardFooter>
    </>
  );
};

export default GroupRecommendation;
