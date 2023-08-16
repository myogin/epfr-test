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
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";

import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState, useEffect, Fragment } from "react";
import { useAnalysisRecommendationGroup } from "@/store/epfrPage/createData/analysisRecommendationGroup";

// Service
import {getPfr, getRecommendationGroup, pfrSection, removeRecommendation, saveGroup} from "@/services/pfrService";
import {getAllCompany} from "@/services/companyService";
import {productFindOne} from "@/services/productService";
// import {getPfrSection} from "@/services/getPfrSection";

import AddLineIcon from "remixicon-react/AddLineIcon";
import EditLineIcon from "remixicon-react/EditLineIcon";
import DeleteBin2LineIcon from "remixicon-react/DeleteBin2LineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";


const GroupRecommendation = () => {

  let router = useRouter();
  let pfrType = usePersonalInformation((state) => state.type);
  let pfrId = usePersonalInformation((state) => state.id);

  let {
    section9RecommendGroup
  } = useAnalysisRecommendationGroup();

  let groupName: any = localStorage.getItem("group_name");

  let {showDetailData} = useNavigationSection();

  const showDetail = (id :any) => {
    localStorage.setItem("s9_recommendId", id)
    showDetailData(92);
  };

  const showDetailAdd = () => {
    localStorage.setItem("s9_recommendId", "")
    showDetailData(92);
  };

  const currencyFormat = (num:any) => {
    if(num){
      let number = Number(num)
      return '$' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }else{
      return 0.00
    }
  }

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
    {"Monthly": 0,"Quarterly": 0,"HalfYearly": 0,"Annually": 0,"SinglePayment": 0}
  );
  const [dataResDataTotalPremiumArr, setResDataTotalPremiumArr] = useState<any>(
    {"Monthly": 0,"Quarterly": 0,"HalfYearly": 0,"Annually": 0,"SinglePayment": 0}
  );

  const [dataIcomes, setDataIcomes] = useState<any>([]);
  const [dataExpense, setDataExpense] = useState<any>([]);
  const [dataLoad, setLoad] = useState<any>(false);

  const premiumTypes: Array<any> = [
    'CASH',
    'CPFOA',
    'CPFSA',
    'CPF MEDISAVE',
    'SRS'
  ]
  // END STATE
  useEffect(() => {
    setAnnualPayorBudget([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
    setSinglePayorBudget([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
    setAnnualRemainBudget([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
    setSingleRemainBudget([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
    
    setTotalAnnualPremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
    setTotalSinglePremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
    setMaxAnnualPremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])
    setMaxSinglePremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]])

    setProductAnnualPremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
    setProductSinglePremium([[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],]);
    
    setDataSubPremium(
      {"Monthly": 0,"Quarterly": 0,"HalfYearly": 0,"Annually": 0,"SinglePayment": 0}
    );
    setResDataTotalPremiumArr(
      {"Monthly": 0,"Quarterly": 0,"HalfYearly": 0,"Annually": 0,"SinglePayment": 0}
    );

    // const pfrId = localStorage.getItem("s9_PfrId");
    const pfrGroupId = localStorage.getItem("s9_dataGroup");
    
    // Find Pfr Section 8
    const annualPayorBudget: Array<any> = [[],[]];
    const singlePayorBudget: Array<any> = [[],[]];
    const annualRemainBudget: Array<any> = [[],[]];
    const singleRemainBudget: Array<any> = [[],[]];
    

    // Find Group Recommend
    var resDataTotalPremiumArr: Array<any> = [];
    // Find Pfr Section 9
    pfrSection(9, pfrId).then((data: any) => {
      setPfr9(data)
      calcReaminingBudgets(data)
    });

    getRecommendationGroup(pfrId, pfrGroupId).then((data: any) => {
      console.log('data', data)
      if(data.products){
        if(data.products.length > 0){
          data.products.map((product: any) => {
              var dataName = getPremiumFrequencyName(product.premiumFrequency);
              if(dataName != undefined){
                setDataSubPremium({
                  ...dataSubPremium,
                  [dataName]: product['premium']
                })

              
                if(dataResDataTotalPremiumArr[dataName] >= 0){
                  dataResDataTotalPremiumArr[dataName] += product['premium'];
                }


                product.riders.map((rider:any) => {
                  if(dataName != undefined){
                    if(dataSubPremium[dataName] >= 0){
                      dataSubPremium[dataName] += rider['premium'];
                    }

                    if(dataResDataTotalPremiumArr[dataName] >= 0){
                      dataResDataTotalPremiumArr[dataName] += rider['premium'];
                    }
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
      setRecommendationData(data)
      getTotalPremium()
    });

    
    // Find Pfr 
    getPfr(pfrId).then((data:any) => {
      setPfrData(data)
    })    

    pfrSection(8, pfrId).then((data: any) => {
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

      const icome: Array<any> = [];
      data.annualIncome.map((income:any) => {
        income[Number(income['client'])-1] = Number(income['sum'])
      })

      const expenses: Array<any> = [];
      data.annualExpense.map((expense:any) => {
        expense[0] = Number(expense['sum1'])
        expense[1] = Number(expense['sum2'])
      })
    });

    setAnnualPayorBudget(annualPayorBudget)
    setSinglePayorBudget(singlePayorBudget)
    setAnnualRemainBudget(annualRemainBudget)
    setSingleRemainBudget(singleRemainBudget)

  }, [section9RecommendGroup, dataLoad]);


  const getPremiumFrequencyName = (premiumFrequency: any) => {
    switch(Number(premiumFrequency)) {
      case 0 : return "Monthly";
      case 1 : return "Quarterly";
      case 2 : return "HalfYearly";
      case 3 : return "Annually";
      case 4 : return "SinglePayment";
    }
  }

  // Calc
  const calcReaminingBudgets = (resDta: any) => {
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

          dataMaxAnnualPremium[clientId][0] += dataProductAnnualPremium[clientId][0]
        }
        if(dataMaxAnnualPremium[clientId][3] < dataProductAnnualPremium[clientId][3]) {

          dataMaxAnnualPremium[clientId][3] += dataProductAnnualPremium[clientId][3]
        }
      }

    }

  }

  const getProductsByFilteringGroupId = (groupId: any, products:any) => {
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

  const getTotalPremium = () => {

    if(getRecommendationData?.products){
      getRecommendationData.products.map((product: any) => {
        product['riders'].map((rider: any) => {
          rider['categoryId']= -1
          calcPremium(rider, true)
        })
        calcPremium(product, false)
      })
    }

    if(getRecommendationData?.ILP){
      getRecommendationData.ILP.map((product: any) => {
        product['riders'].map((rider: any) => {
          rider['categoryId']= -1
          calcPremium(rider, true)
        })
        calcPremium(product, false)
      })
    }

    if(getRecommendationData?.custom){
      getRecommendationData.custom.map((product: any) => {
        product['riders'].map((rider: any) => {
          rider['categoryId']= -1
          calcPremium(rider, true)
        })
        calcPremium(product, false)
      })
    }
    

    if(getRecommendationData?.CIS){
      getRecommendationData.CIS.map((product: any) => {
        calcPremiumForCIS(product)
      })
    }
  }

  const getPortfolioName = (portfolio:any) => {
    if(portfolio == undefined) {
      return "N/A"
    } else {
      return portfolio['name']
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [dataRemoveId, setRemoveId] = useState(false);
  const removeData = async (id: any, modalData: any) => {
    if(modalData){
      setRemoveId(id)
      setShowModal(true)
    }else{
      setShowModal(false)
      // var idpfr = localStorage.getItem("s9_PfrId");
      let rm = await removeRecommendation(pfrId, dataRemoveId);
      if(rm.status == 200){
        // showDetailData(91)
        setLoad(true)
      }
    }
  }
  const closeModal = () => {
    setShowModal(false);
  };

  const saveData = async (params: any) => {
    try{
      // const pfrId = localStorage.getItem("s9_PfrId");
      let save = await saveGroup({"name": groupName, "pfrId": pfrId});
      if(save.status == 200){
        // const pfrId = localStorage.setItem("s9_PfrId","0");
        showDetailData(params);
        let typePfrString = pfrType == 1 ? "single" : "joint" 
        if(Number(pfrId) > 0) {
          router.push(`/create/${typePfrString}?id=${pfrId}#section-9`)
        }else {
          router.push(`/create/${typePfrString}#section-9`)
        }
        
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const cancelData = (params: any) => {
    // const pfrId = localStorage.setItem("s9_PfrId","0");
    showDetailData(params)
    // const pfrId = localStorage.getItem("s9_PfrId");
    let typePfrString = pfrType == 1 ? "single" : "joint" 
        if(Number(pfrId) > 0) {
          router.push(`/create/${typePfrString}?id=${pfrId}#section-9`)
        }else {
          router.push(`/create/${typePfrString}#section-9`)
        }

  }

  return (
    <div className="min-h-screen pb-20 mb-20">
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
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95" >
                <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Are You Sure Want To Delete This Data ?
                  </Dialog.Title>

                  <div className="flex gap-4 mt-4">
                    <ButtonRedMedium onClick={() => removeData(0, false)}>
                      Delete
                    </ButtonRedMedium>
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
                      <tr key={index}>
                        <td className="px-2 py-5">
                          Client {index+1}
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataAnnualPayorBudget[index][0]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataSinglePayorBudget[index][0]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataAnnualPayorBudget[index][1]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataSinglePayorBudget[index][1]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataAnnualPayorBudget[index][2]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataSinglePayorBudget[index][2]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataAnnualPayorBudget[index][3]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataSinglePayorBudget[index][3]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataAnnualPayorBudget[index][4]) }
                        </td>
                        <td className="px-2 py-5 text-center">
                          { currencyFormat(dataSinglePayorBudget[index][4]) }
                        </td>
                      </tr>
                  ))
                : ''}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Annual Surplus */}
        <RowSingleGrid>
          <TextSmall>Annual Surplus</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5">Clients</th>
                  <th className="px-2 py-5">Annual Surplus</th>
                </tr>
              </thead>
              <tbody>
                {getPfrData?.clients ? 
                  getPfrData.clients.map((data: any, index:any) => (
                      <tr key={index}>
                        <td className="px-2 py-5">
                          Client {index+1}
                        </td>
                        <td className="px-2 py-5 text-center">
                          { getPfr8?.annualIncome ? isNaN(getPfr8.annualIncome[index] - getPfr8.annualExpense[index]) ? 0 : getPfr8.annualIncome[index] - getPfr8.annualExpense[index] : 0
                          }
                        </td>
                      </tr>
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
                      <tr key={"sds"+index}>
                        <td className="px-2 py-5">Client {index + 1}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][0] - dataMaxAnnualPremium[index][0]) ? 0 : currencyFormat(dataAnnualRemainBudget[index][0] - dataMaxAnnualPremium[index][0])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][0] - dataMaxSinglePremium[index][0]) ? 0 : currencyFormat(dataSingleRemainBudget[index][0] - dataMaxSinglePremium[index][0])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][1] - dataMaxAnnualPremium[index][1]) ? 0 : currencyFormat(dataAnnualRemainBudget[index][1] - dataMaxAnnualPremium[index][1])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][1] - dataMaxSinglePremium[index][1]) ? 0 : currencyFormat(dataSingleRemainBudget[index][1] - dataMaxSinglePremium[index][1])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][2] - dataMaxAnnualPremium[index][2]) ? 0 : currencyFormat(dataAnnualRemainBudget[index][2] - dataMaxAnnualPremium[index][2])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][2] - dataMaxSinglePremium[index][2]) ? 0 : currencyFormat(dataSingleRemainBudget[index][2] - dataMaxSinglePremium[index][2])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][3] - dataMaxAnnualPremium[index][3]) ? 0 : currencyFormat(dataAnnualRemainBudget[index][3] - dataMaxAnnualPremium[index][3])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][3] - dataMaxSinglePremium[index][3]) ? 0 : currencyFormat(dataSingleRemainBudget[index][3] - dataMaxSinglePremium[index][3])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataAnnualRemainBudget[index][4] - dataMaxAnnualPremium[index][4]) ? 0 : currencyFormat(dataAnnualRemainBudget[index][4] - dataMaxAnnualPremium[index][4])}</td>
                        <td className="px-2 py-5 text-center">{isNaN(dataSingleRemainBudget[index][4] - dataMaxSinglePremium[index][4]) ? 0 : currencyFormat(dataSingleRemainBudget[index][4] - dataMaxSinglePremium[index][4])}</td>
                      </tr>
                  ))
              : ''}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Button Add Group */}
        <RowSingleGrid>
          <TextSmall>Product(s) / Rider(s)</TextSmall>
          <ButtonBox className="text-green-deep" onClick={(event) => showDetailAdd()}>
            <AddLineIcon />
          </ButtonBox>
        </RowSingleGrid>

        {/* Recommended Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left border divide-y rounded-md divide-gray-soft-strong border-gray-soft-strong border-slate-500">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5 border border-gray-soft-strong">SN</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">Product/Rider Name</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">Premium Type</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">Premium($)</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">Premium Frequency</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">Owner</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">Action</th>
                </tr>
              </thead>
              <tbody>
                {getRecommendationData?.products ? 
                    getRecommendationData.products.map((dataProd: any, index:any) => (
                        dataProd['product']['categoryId'] != 8 && dataProd['product']['categoryId'] != 5 ? 
                        (
                          <Fragment key={"sd"+index}>
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={1 + dataProd.riders.length}>{index + 1}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong"><b>{dataProd.name}</b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{premiumTypes[dataProd.premiumPaymentType]}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{currencyFormat(dataProd.premium)}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{getPremiumFrequencyName(dataProd.premiumFrequency)}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={1 + dataProd.riders.length}>Client {dataProd.nameOfOwner + 1}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={1 + dataProd.riders.length}>
                                <ButtonBox className="pr-2 text-green-deep" onClick={(event) => showDetail(dataProd.id)}>
                                  <EditLineIcon size={14} key={index} />
                                </ButtonBox>
                                <ButtonBox className="text-amber-600" onClick={(event) => removeData(dataProd.id, true)}>
                                  <DeleteBin2LineIcon size={14} key={index} />
                                </ButtonBox>
                                
                              </td>
                            </tr>

                            {dataProd?.riders ? 
                              dataProd.riders.map((dataRide: any, index : any) => (
                                  <tr key={"sds" +index}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      <ul>
                                        <li>{ dataRide["name"] }</li>
                                      </ul>
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { premiumTypes[dataRide["premiumPaymentType"]] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{ dataRide["premium"] }</td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      {
                                        getPremiumFrequencyName(dataRide["premiumFrequency"])
                                      }
                                    </td>
                                  </tr>
                              ))
                            : ''}

                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}><b>Subtotal Premium ($)</b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong">
                                <span>
                                <b>
                                  {dataProd.premiumFrequency == 4 ? 
                                    <>{dataProd["totPremium"]} {getPremiumFrequencyName(dataProd["premiumFrequency"])}</>
                                  : ''}
                                </b>
                                </span>
                                <span>
                                <b>
                                  {dataProd.premiumFrequency != 4 ? 
                                    <>{dataProd["totPremium"]} Annually</>
                                  : ''}
                                </b>
                                </span>
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={2}></td>
                            </tr>  
                          </Fragment>
                          
                        )
                        : 
                        (<Fragment key={"Sds"+index}>
                          <tr>
                            <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={2 + dataProd['riders'].length}>
                              { index + 1 }
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={2}>
                              <b>{ dataProd["name"] }</b>
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">CASH</td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {
                                dataProd["premium_for_hospitalization"]["cash"]
                              }
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={2}>
                              {
                                getPremiumFrequencyName(
                                  dataProd["premiumFrequency"]
                                )
                              }
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={2 + dataProd['riders'].length}>
                              Client { dataProd["nameOfOwner"] + 1 }
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={2 + dataProd['riders'].length}>
                                <ButtonBox className="text-green-deep" onClick={(event) => showDetail(dataProd.id)}>
                                  <EditLineIcon size={14} key={index} />
                                </ButtonBox>
                                <ButtonBox className="text-amber-600" onClick={(event) => removeData(dataProd.id, true)}>
                                  <DeleteBin2LineIcon size={14} key={index} />
                                </ButtonBox>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-5 border border-gray-soft-strong">CPF MEDISAVE</td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {
                                dataProd["premium_for_hospitalization"][
                                  "cpfMedisave"
                                ]
                              }
                            </td>
                          </tr>

                          {dataProd?.riders ? 
                              dataProd.riders.map((dataRide: any, index:any) => (
                                  <tr key={"ssd"+index}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      <ul>
                                        <li>{ dataRide["name"] }</li>
                                      </ul>
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { premiumTypes[dataRide["premiumPaymentType"]] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{ dataRide["premium"] }</td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      {
                                        getPremiumFrequencyName(dataRide["premiumFrequency"])
                                      }
                                    </td>
                                  </tr>
                              ))
                          : ''}

                          <tr>
                            <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}><b>Subtotal Premium ($)</b></td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              <span>
                              <b>
                                {dataProd.premiumFrequency == 4 ? 
                                  <>{dataProd["totPremium"]} {getPremiumFrequencyName(dataProd["premiumFrequency"])}</>
                                : ''}
                              </b>
                              </span>
                              <span>
                              <b>
                                {dataProd.premiumFrequency != 4 ? 
                                  <>{dataProd["totPremium"]} Annually</>
                                : ''}
                              </b>
                              </span>
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong" colSpan={2}></td>
                          </tr> 
                        </Fragment>)        
                      
                    ))
                : ''}

              
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
                  <th className="px-2 py-5">Name of ILP Plan</th>
                  <th className="px-2 py-5">Premium Type</th>
                  <th className="px-2 py-5">Premium($)</th>
                  <th className="px-2 py-5">Fund Name</th>
                  <th className="px-2 py-5">Fund Amount (%)</th>
                  <th className="px-2 py-5">Owner</th>
                  <th className="px-2 py-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {getRecommendationData?.ILP ? 
                    getRecommendationData.ILP.map((dataProd: any, index:any) => (
                        <Fragment key={"sds"+index}>
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                  {index + 1}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}><b>
                                {dataProd.name}
                              </b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}>{premiumTypes[dataProd.premiumPaymentType]}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}>{currencyFormat(dataProd.premium)}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{dataProd.fund.length > 0 ? dataProd.fund[0].name : '' }</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{dataProd.fund.length > 0 ? dataProd.fund[0].fund : '' }</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                  Client {dataProd.nameOfOwner + 1}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                <ButtonBox className="pr-2 text-green-deep" onClick={(event) => showDetail(dataProd.id)}>
                                  <EditLineIcon size={14} key={index} />
                                </ButtonBox>
                                <ButtonBox className="text-amber-600" onClick={(event) => removeData(dataProd.id, true)}>
                                  <DeleteBin2LineIcon size={14} key={index} />
                                </ButtonBox>
                                
                              </td>
                            </tr> 
                            {dataProd?.fund ? 
                              dataProd.fund.map((dataFund:any, indexFund:any) => (
                                indexFund != 0 ?
                                  <tr key={"sds"+indexFund}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{dataFund.name}</td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{dataFund.fund}</td>
                                  </tr>
                                : ''
                              ))
                            : ''}  

                            {dataProd?.riders ? 
                              dataProd.riders.map((dataRide:any, indexRide:any) => (
                                  <tr key={"Sds"+indexRide}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { dataRide["name"] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { premiumTypes[dataRide["premiumPaymentType"]] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { dataRide["premium"] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                    <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                  </tr>
                              ))
                            : ''}
                            
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}><b>Subtotal Premium ($)</b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong">
                                <b>{ currencyFormat(dataProd["premium"]) }</b>
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}></td>
                            </tr>
                        </Fragment>        
                    ))
                : ''}

                {/* Data Custome Product */}
                {getRecommendationData?.custom ? 
                    getRecommendationData.custom.map((dataProd: any, index:any) => (
                        <Fragment key={"sds"+index}>
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                  {index + 1}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}><b>
                                {dataProd.name}
                              </b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}>{premiumTypes[dataProd.premiumPaymentType]}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}>{currencyFormat(dataProd.premium)}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{dataProd.fund.length > 0 ? dataProd.fund[0].name : '' }</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{dataProd.fund.length > 0 ? dataProd.fund[0].fund : '' }</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                  Client {dataProd.nameOfOwner + 1}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                <ButtonBox className="pr-2 text-green-deep" onClick={(event) => showDetail(dataProd.id)}>
                                  <EditLineIcon size={14} key={index} />
                                </ButtonBox>
                                <ButtonBox className="text-amber-600" onClick={(event) => removeData(dataProd.id, true)}>
                                  <DeleteBin2LineIcon size={14} key={index} />
                                </ButtonBox>
                                
                              </td>
                            </tr> 
                            {dataProd?.fund ? 
                              dataProd.fund.map((dataFund:any, indexFund:any) => (
                                indexFund != 0 ?
                                  <tr key={"sd"+indexFund}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{dataFund.name}</td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{dataFund.fund}</td>
                                  </tr>
                                : ''
                              ))
                            : ''}  

                            {dataProd?.riders ? 
                              dataProd.riders.map((dataRide:any, indexRide:any) => (
                                  <tr key={"sds"+indexRide}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { dataRide["name"] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { premiumTypes[dataRide["premiumPaymentType"]] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { dataRide["premium"] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                    <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                  </tr>
                              ))
                            : ''}
                            
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}><b>Subtotal Premium ($)</b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong">
                                <b>{ currencyFormat(dataProd["premium"]) }</b>
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}></td>
                            </tr>
                        </Fragment>        
                    ))
                : ''}

                {/* Data CIS */}
                {getRecommendationData?.CIS ? 
                    getRecommendationData.CIS.map((dataProd: any, index:any) => (
                        <Fragment key={"sds"+index}>
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                  {index + 1}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}><b>
                                {getPortfolioName(dataProd.cis)}
                              </b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}>{premiumTypes[dataProd.premiumPaymentType]}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0 ? 1 : dataProd['fund'].length}>{currencyFormat(dataProd.premium)}</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{dataProd.fund.length > 0 ? dataProd.fund[0].name : '' }</td>
                              <td className="px-2 py-5 border border-gray-soft-strong">{dataProd.fund.length > 0 ? dataProd.fund[0].fund : '' }</td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                  Client {dataProd.nameOfOwner + 1}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" rowSpan={dataProd['fund'].length == 0
                                ? 1 + dataProd['riders'].length : dataProd['fund'].length + dataProd['riders'].length}>
                                <ButtonBox className="pr-2 text-green-deep" onClick={(event) => showDetail(dataProd.id)}>
                                  <EditLineIcon size={14} key={index} />
                                </ButtonBox>
                                <ButtonBox className="text-amber-600" onClick={(event) => removeData(dataProd.id, true)}>
                                  <DeleteBin2LineIcon size={14} key={index} />
                                </ButtonBox>
                                
                              </td>
                            </tr> 
                            {dataProd?.fund ? 
                              dataProd.fund.map((dataFund:any, indexFund:any) => (
                                indexFund != 0 ?
                                  <tr key={"ss"+indexFund}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{dataFund.name}</td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">{dataFund.fund}</td>
                                  </tr>
                                : ''
                              ))
                            : ''}  

                            {dataProd?.riders ? 
                              dataProd.riders.map((dataRide:any, indexRide:any) => (
                                  <tr key={"sds"+indexRide}>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { dataRide["name"] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { premiumTypes[dataRide["premiumPaymentType"]] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong">
                                      { dataRide["premium"] }
                                    </td>
                                    <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                    <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                  </tr>
                              ))
                            : ''}
                            
                            <tr>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}><b>Subtotal Premium ($)</b></td>
                              <td className="px-2 py-5 border border-gray-soft-strong">
                                <b>{ currencyFormat(dataProd["premium"]) }</b>
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong" colSpan={3}></td>
                            </tr>
                        </Fragment>        
                    ))
                : ''}
              
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
        <ButtonGreenMedium onClick={() => saveData(200)}>Save</ButtonGreenMedium>
        <ButtonRedMedium onClick={() => cancelData(200)}>Cancel</ButtonRedMedium>
      </SectionCardFooter>
    </div>
  );
};

export default GroupRecommendation;
