import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonRedMedium from "@/components/Forms/Buttons/ButtonRedMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState, useEffect } from "react";
import { useAnalysisRecommendationProduct } from "@/store/epfrPage/createData/analysisRecommendationProduct";

// Model
import {getAllCompany} from "@/services/companyService";
import {getWholeContext, pfrSection, getRecommendation, postSection9Recommendation, updateSection9Recommendation} from "@/services/pfrService";
import {productFindOne} from "@/services/productService";
// import {getPfrSection} from "@/services/getPfrSection";

export class RecommendationStruct {
  selected = false;
  edit = false;
  subjectId = 0;
  name = "";
  type = 0; // Insure / CIS
  productType = 0; // product or rider
  id = 0;
  categoryId = 0;
  policyTerm = '';
  sumAssured = '';
  premiumPaymentType = '0';
  premium = 0;
  premiumFrequency = 0;
  funds =  [];
  modelPortfolioRiskCategory:number = 0;
  higherThanRiskProfile = 0;
  nameOfOwner = 0;
  nameOfInsure = "-1";
  nameOfInsureOther = "";
  benefit = [];
  risk = [];
  portfolio = 0;
  fundName = "";
  fundAmount = 0;
  premiumForHospitalization = {
    cash : 0,
    cpfMedisave : 0
  };
  groupId = 0;
  premiumType = null;
  feature = "";
}

const AddPlanRecommendation = () => {
  let {
    section9Recommend,
    setParent,
    setProduct,
    setProductArr,
    setProductRiderArr,
    setProductRiderBenefitArr,
    setProductRiderRiskArr,
    setProductHospital,
    editRecommendationProduct,
    resetRecommendationProduct
  } = useAnalysisRecommendationProduct();

  let benefits: Array<any> = [
    {
      id: 1,
      name: "Protection",
      description:
        "Provides coverage against death and terminal illness.Guaranteed Issuance",
    },
    {
      id: 2,
      name: "Guaranted Issuance",
      description:
        "No medical underwriting required.Guaranteed Retirement Income Benefit",
    },
    {
      id: 3,
      name: "Guaranted Retirement Income Benefit",
      description:
        "At the selected Retirement Age (i.e. at the end of the accumulation period), as part of the Retirement Income Benefit, the monthly Guaranteed Retirement Income Benefit will be paid for a period of 10 years. Payments of the monthly Guaranteed Retirement Income Benefit will start one month following the selected Retirement Age. At the end of the Retirement Income Period, while the Policy is in force and upon survival of the Life Assured, the Maturity Payout, which consists of the non-guaranteed Reversionary Bonus accrued over the Policy Term, together with the Terminal Bonus (if any), will also be payable.Withdrawal of Reinvested Retirement Income Benefit",
    },
  ];

  let riders: Array<any> = [
    {
      id: 1,
      name: "Easy Term",
      checked: false,
      description:
        "EasyTerm is a non-participating Supplementary Benefit that offers protection against Death, Terminal Illness and Total and Permanent Disability (TPD) during the period of the benefit term. This benefit does not have any cash value. Premium rates relating to this Supplementary Benefit are level and guaranteed within premium payment term.",
    },
    {
      id: 2,
      name: "Free Look",
      checked: false,
      description:
        "If You decide that this Policy is not suitable for Your needs, a full refund of the premiums less any expenses incurred will be made to You upon receipt of Your written notification of cancellation to the Insurer within 14 days from the date You receive Your Policy. If this Policy was sent to You by post, You are considered to have received it 7 days after posting.",
    },
  ];

  let riderBenefits: Array<any> = [
    {
      id: 1,
      name: "Exclusions",
      description:
        "There are certain conditions under which no benefits will be payable. Please refer to the product summary / policy contract for the full list of exclusions.Free Look",
    },
    {
      id: 2,
      name: "Exclusions 2",
      description:
        "There are certain conditions under which no benefits will be payable. Please refer to the product summary / policy contract for the full list of exclusions.Free Look 2",
    },
  ];

  let riderRisks: Array<any> = [
    {
      id: 1,
      name: "Risk One",
      description:
        "EasyTerm is a non-participating Supplementary Benefit that offers protection against Death, Terminal Illness and Total and Permanent Disability (TPD) during the period of the benefit term. This benefit does not have any cash value. Premium rates relating to this Supplementary Benefit are level and guaranteed within premium payment term.",
    },
    {
      id: 2,
      name: "Risk Two",
      description:
        "If You decide that this Policy is not suitable for Your needs, a full refund of the premiums less any expenses incurred will be made to You upon receipt of Your written notification of cancellation to the Insurer within 14 days from the date You receive Your Policy. If this Policy was sent to You by post, You are considered to have received it 7 days after posting.",
    },
  ];

  let risks: Array<any> = [
    {
      id: 1,
      name: "Early Surrender",
      description:
        "An early surrender of the policy usually involves high costs and the surrender value may be less than the total premiums paid.Exclusions",
    },
    {
      id: 2,
      name: "Exclusions",
      description:
        "There are certain conditions under which no benefits will be payable. Please refer to the product summary / policy contract for the full list of exclusions.Free Look",
    },
    {
      id: 3,
      name: "Free Look",
      description:
        "If You decide that this Policy is not suitable for Your needs, a full refund of the premiums less any expenses incurred will be made to You upon receipt of Your written notification of cancellation to the Insurer within 14 days from the date You receive Your Policy. If this Policy was sent to You by post, You are considered to have received it 7 days after posting.",
    },
  ];

  const changeData = (params: any) => {
    
  };

  let dataProductName: Array<any> = [
    { id: 0, name: "Select Product" },
    { id: 1, name: "Product One" },
    { id: 2, name: "Product Two" },
  ];

  let recomendationType: Array<any> = [
    { id: 0, name: "Insurance" },
    { id: 1, name: "CIS" },
  ];


  let dataProvider: Array<any> = [
    { id: 1, name: "Singlife" },
    { id: 2, name: "AXA" },
    { id: 3, name: "Hoxing" },
  ];

  
  let dataCurrency: Array<any> = [
    { id: 1, name: "Singapore Dollar" },
    { id: 2, name: "US Dollar" },
  ];

  let initPfrData = {
    productId : null,
    groupId : null,
    pfrId : 0,
    product : new RecommendationStruct,
    riders : [],
    extraRiders : [],
  }
  const [dataLoading, setLoading] = useState(false);
  const [initWhole, setInitWhole] = useState<any>({});
  const [dataCISPremiumType, setCISDataPremiumType]  = useState<any>([{ id: 4, name: "Single Payment" }]);
  const [dataPremiumType, setDataPremiumType]  = useState<any>([{ id: 0, name: "CASH" },{ id: 1, name: "CPF OA" },{ id: 2, name: "CPF SA" },{ id: 3, name: "CPF MEDISAVE" },{ id: 4, name: "SRS" }]);
  const [dataPaymentFreq, setDataPaymentFreq] = useState<any>([{ id: 0, name: "Monthly" },{ id: 1, name: "Quarterly" },{ id: 2, name: "Half-Yearly" },{ id: 3, name: "Annually" },{ id: 4, name: "Single" }])

  // const [pfrData, setpfrData] = useState<any>(initPfrData);
  const [dataDependant, setDataDependant] = useState<any>([{}]);
  const [dataOwner, setDataOwner] = useState<any>([{}]);
  const [dataCompany, setCompany] = useState<any>(null);
  const [dataCompanyCis, setCompanyCis] = useState<any>(null);
  const [dataCategory, setCategory] = useState<any>([{}]);
  const [getSelectProducts, setSelectProducts] = useState<any>([{}]);
  const [getSelectProductone, setSelectProductOne] = useState<any>([{}]);
  
  const [getSelectedCategory, setSelectedCategory] = useState<any>(-1);
  const [getSelectedCompany, setSelectedCompany] = useState<any>(-1);
  const [getIlpFundsOfCompany, setIlpFundsOfCompany] = useState<any>([{}]);
  const [productValueSelect, setProductValueSelect] = useState(0);
  const [dataProductSelected, setDataProductSelected] = useState<any>({});
  const [riderArr, setRiderArr] = useState<any>([]);
  const [riderBenefit, setRiderBenefit] = useState<any>(false);
  const [dataSelectedCategoryType, setDataSelectedCategoryType] = useState<any>(-1);
  const [dataSelectedCategoryId, setDataSelectedCategoryId] = useState<any>(-1);
  const [dataOutcomes, setDataOutcomes] = useState<any>([{}]);
  const [cisData, setCisData] = useState<any>([{}]);
  const [section5Data, setSection5data] = useState<any>([{}]);
  const [cisModelPortofolioRisks, setCisModelPortofolioRisk] = useState<any>([{}]);

  const [annualPayorBudget, setAnnualPayor] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const [singlePayorBudget, setSinglePayorBudget] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  let dataPremiumTypeIlp: Array<any> = [
    { id: 0, name: "Single" },
    { id: 1, name: "Regular" },
  ];

  let higherThanRiskProfile: Array<any> = [
    { id: 0, name: "No" },
  ]
  
  useEffect(() => {

    setInitWhole({});
    setCISDataPremiumType([{ id: 4, name: "Single Payment" }]);
    setDataPremiumType([{ id: 0, name: "CASH" },{ id: 1, name: "CPF OA" },{ id: 2, name: "CPF SA" },{ id: 3, name: "CPF MEDISAVE" },{ id: 4, name: "SRS" }]);
    setDataPaymentFreq([{ id: 0, name: "Monthly" },{ id: 1, name: "Quarterly" },{ id: 2, name: "Half-Yearly" },{ id: 3, name: "Annually" },{ id: 4, name: "Single" }])
    setAnnualPayor([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]);

    setSinglePayorBudget([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]);
    
    const pfrId = localStorage.getItem("s9_PfrId");
    const pfrGroupId = localStorage.getItem("s9_dataGroup");
    const resPfrGroupId = pfrGroupId == '0' ? null : 0
    const resultCateg: Array<any> = []
    const resDataOwner: Array<any> = [];
    getWholeContext(pfrId).then((data) => {
      console.log('getWholeContext', data)
      setInitWhole(data);

      // For Cis If ProductGroupId Exist
      if(section9Recommend.product.type == 1) {
        var setDataArrs: Array<any> = [];
        const dataArr: Array<any> = [];

        data.company.map((value: any, k: any) => {
          value['idReal'] = value.id;
          value['id'] = k;
          if(value.products.length > 0){
            value.products.map((valueProds: any, indexProds: any) => {
              if(valueProds.rider.length > 0){
                valueProds.rider.map((valueRider: any, indexRide: any) => {
                  if(section9Recommend.riders.length > 0){
                    section9Recommend.riders.map((valSectRide: any, indexSectRide: any) => {
                      if(parseInt(valSectRide.subjectId) == parseInt(valueRider.riderId)){
                        var Arrs: Array<any> = [];
                        setDataArrs[valueRider.rider.riderName] = true;
                        // setRiderArr(Arrs);
                      }
                    })
                  }
                });
              }
            });
          }
          
          // Cis Data
            // initWhole.cis.map((dataCis: any, indexCis:any) => {
            //   // 
            //   if((dataOutcomes[section9Recommend.product.nameOfOwner] == 1 || dataCis.platform.mustPassCKA == 0) &&  value == dataCis.platform.companyId &&
            //     ((dataCis.maxBudget == 0 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] <= 29999) ||
            //     (dataCis.maxBudget == 1 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] > 29999 && 
            //     dataCis.riskCategory == section9Recommend.product.modelPortfolioRiskCategory) ||
            //     (dataCis.maxBudget == 2 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] > 19999 &&
            //     dataCis.riskCategory == section9Recommend.product.modelPortfolioRiskCategory))){
            //       dataArr.push(dataCis)
            //       return value;
            //   }
            // })
        });
        
        
        setCompany(data.company)
        // setCisDataProduct(dataArr) 
        setRiderArr(setDataArrs);

        // let cisData = data.cis.findIndex((cis: any) => {
        //   return cis['id'] == section9Recommend.product.portfolio
        // });

        // setCisData(cisData)

        // if(cisData != -1) {
        //   var selectedCompany = initWhole.cis[cisData]['platform']['companyId']
        //   var selectedPortfolio = initWhole.cis[cisData]
        //   onChangePortfolio()
        // }
      }else{
        // Get Company
        var setDataArrs: Array<any> = [];
        data.company.map((value: any, k: any) => {
          value['idReal'] = value.id;
          value['id'] = k;
          if(value.products.length > 0){
            value.products.map((valueProds: any, indexProds: any) => {
              if(valueProds.rider.length > 0){
                valueProds.rider.map((valueRider: any, indexRide: any) => {
                  if(section9Recommend.riders.length > 0){
                    section9Recommend.riders.map((valSectRide: any, indexSectRide: any) => {
                      if(parseInt(valSectRide.subjectId) == parseInt(valueRider.riderId)){
                        var Arrs: Array<any> = [];
                        setDataArrs[valueRider.rider.riderName] = true;
                        // setRiderArr(Arrs);
                      }
                    })
                  }
                });
              }
            });
          }
          return value;
        });
        // 
        setRiderArr(setDataArrs);
        setCompany(data.company)
      }

      // Get Dependant
      data.dependants.push({id: -1, name: "OTHER"})
      setDataDependant(data.dependants);
      
      // Get Clients
      data.clients.map((value: any, k: any) => {
        value['name'] = value.clientName;
        value['id'] = k;
        resDataOwner.push(value);
      });
      setDataOwner(resDataOwner)

      // Remap Get Categories
      data.category.map((value: any, k: any) => {
        let realId = value.id;
        resultCateg.push({
          idReal: realId,
          id: k, 
          name: value.categoryName
        })
      })
      setCategory(resultCateg)

      // Section5
      const section5Arr: Array<any> = data.section5Result
      // data.section5Result.map((outcome:any, i: any) => {
      //   section5Arr.push(outcome['outcome']);
      // })

      setSection5data(section5Arr)

      // Section6
      const section6Outcome: Array<any> = []
      data.outcomes.map((outcome:any, i: any) => {
        section6Outcome.push(outcome['outcome']);
      })
      setDataOutcomes(section6Outcome)

      // Get Model Portofolio Risk
      const resModelPort: Array<any> = [];
      if(section5Arr[section9Recommend.product.nameOfOwner] == '0'){
        resModelPort.push({
          id: 1,
          name: 'Capital Preservation'
        })
      }

      if(section5Arr[section9Recommend.product.nameOfOwner] == '1'){
        resModelPort.push({
          id: 2,
          name: 'Conservative'
        })
      }

      if(section5Arr[section9Recommend.product.nameOfOwner] == '2'){
        resModelPort.push({
          id: 3,
          name: 'Balanced'
        })
      }

      if(section5Arr[section9Recommend.product.nameOfOwner] == '3'){
        resModelPort.push({
          id: 4,
          name: 'Growth'
        })
      }

      if(section5Arr[section9Recommend.product.nameOfOwner] == '4'){
        resModelPort.push({
          id: 5,
          name: 'Aggressive'
        })
      }

      if(section5Arr[section9Recommend.product.nameOfOwner] == '5'){
        resModelPort.push({
          id: 6,
          name: 'N/A - Client not following model portfolio'
        })
      }

      setCisModelPortofolioRisk(resModelPort)

      showEdit(data)
    });
    
    pfrSection(8, pfrId).then((data) => {
      let payorBudgets = data['payorBudgets']
      payorBudgets.map((budget:any) => {
        if(budget['selection'] != 0) {
          let clientId = budget['clientType']
          let type = budget['type']
          annualPayorBudget[clientId][type] = budget['annual']
          singlePayorBudget[clientId][type] = budget['single']

          setAnnualPayor(annualPayorBudget)
          setSinglePayorBudget(singlePayorBudget)
        }
      })
    })

    // Set Insurance


    // Set Cis
    console.log('section9Recommend', section9Recommend)
    setDataSelectedCategoryId(section9Recommend.product.categoryId);
    setCompany(section9Recommend.product.companyId);
  }, [section9Recommend]);

  const showEdit = (resData:any) => {
    let s9_recommendId = localStorage.getItem("s9_recommendId")
    if(s9_recommendId){
      if(section9Recommend.product.id == 0){
        getRecommendation(s9_recommendId).then((data:any) => {
          console.log('data', data)
          if(data.type == 0){
            let resCateg = null;
            let resComp = null;
            
            resData.category.map((vData:any, iData: any) => {
              if(vData.id == data.product.categoryId){
                resCateg = iData;
              }
            });

            resData.company.map((vD:any, i:any) => {
              if(vD.products.length > 0){
                vD.products.map((vP:any) => {
                  if(vP.id == data.product.id){
                    resComp = vD.id;
                  }
                })
              }
            });

            editRecommendationProduct({
              "section9Recommend": {
                "groupId": data.groupId,
                "pfrId": data.pfrId,
                "riders": data.riders,
                "product": {
                  "productType": 0,
                  "subjectId": data.subjectId,
                  "name": data.name,
                  "id": data.product.id,
                  "categoryId": data.product.categoryId,
                  "companyId": data.product.companyId,
                  "policyTerm": data.policyTerm,
                  "sumAssured": data.sumAssured,
                  "premiumPaymentType": data.premiumPaymentType,
                  "premium": data.premium,
                  "premiumFrequency": data.premiumFrequency,
                  "funds": data.funds ? data.funds : [],
                  "modelPortfolioRiskCategory": data.modelPortfolioRiskCategory,
                  "higherThanRiskProfile": data.higherThanRiskProfile,
                  "nameOfOwner": data.nameOfOwner,
                  "nameOfInsure": data.nameOfInsure,
                  "nameOfInsureOther": data.nameOfInsureOther,
                  "benefit": data.benefit,
                  "risk": data.risk,
                  "portfolio": data.portfolio,
                  "premiumForHospitalization": data.premiumForHospitalization,
                  "groupId": data.groupId,
                  "premiumType": data.premiumType,
                  "feature": data.product.feature,
                  "type": data.type,
                  "fundName": "",
                  "fundAmount": 0
                },
                "extraRiders": []
              }
            })

            setSelectedCategory(resCateg)
            setSelectedCompany(resComp)
            
            onEditProvider(resData, resCateg, resComp)
            setProductValueSelect(data.product.id)
            changeDataProductName(data.product.id)
          }else{
            setCisDataProvider(data.cis.companyId)
            onEditCis(resData, data.cis.companyId, data.cis.id)
          }
        });
      }
    }
  }

  // On Edit Cis
  const onEditCis = (resData: any, companyIds: any, cisIds: any) => {
    // provider
    const dataArr: Array<any> = [];
    setCisDataProvider(companyIds);
    
    if(resData.cis.length > 0){
      resData.cis.map((dataCis: any, indexCis:any) => {
        // 
        if((dataOutcomes[section9Recommend.product.nameOfOwner] == 1 || dataCis.platform.mustPassCKA == 0) &&  companyIds == dataCis.platform.companyId &&
          ((dataCis.maxBudget == 0 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] <= 29999) ||
          (dataCis.maxBudget == 1 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] > 29999 && 
          dataCis.riskCategory == section9Recommend.product.modelPortfolioRiskCategory) ||
          (dataCis.maxBudget == 2 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] > 19999 &&
          dataCis.riskCategory == section9Recommend.product.modelPortfolioRiskCategory))){
            dataArr.push(dataCis)
        }
      })
      
      setCisDataProduct(dataArr) 
    }
    
    //     
    let pfrId = localStorage.getItem("s9_PfrId");
    var resId = (pfrId != null) ? pfrId.toString() : '0';
    setParent(resId, 'pfrId', null)
    
    setProduct(cisIds, 'portfolio', null)

    if(cisIds == 0) {
      section9Recommend.product.fundName = ""
      section9Recommend.product.funds = []
    }else {
      let index = resData.cis.findIndex((cis: any) => {
        if(cis['id'] == cisIds) {
          return true
        }
      })

      var selectedPortfolio = resData.cis[index]
      setCisDataBenRisk(selectedPortfolio);
      
      var dataFundArr: Array<any> = [];
      
      benefits = new Array(selectedPortfolio['benefit'].length).fill(false)
      risks = new Array(selectedPortfolio['risk'].length).fill(false)
      setPremiumPaymentType(selectedPortfolio['payment']);
      resData.cis[index]['platform']['funds'].map((fund: any) => {
        dataFundArr.push({
          name : fund['fund']['name'],
          fundCode : fund['fund']['fundCode'],
          allocation : fund['allocation']
        })
      })
      setProductArr(dataFundArr, 'funds', null)
    }
  }

  const onEditProvider = (resInitWhole:any, resCateg: any, resComp: any) => {
    var selectedProducts: Array<any> = [];
    // setProduct(value, 'modelPortfolioRiskCategory', null)
    setSelectedCategory(resCateg)
    setSelectedCompany("")
    setProductValueSelect(0);
    
    const selectedCategoryType = (resInitWhole.category[resCateg]) ? resInitWhole.category[resCateg]['type'] : null
    setDataSelectedCategoryType(selectedCategoryType)
    const selectedCategoryId = (resInitWhole.category[resCateg]) ? resInitWhole.category[resCateg]['id'] : null
    setDataSelectedCategoryId(selectedCategoryId)
    // Check Product Company
    var pushComp: Array<any> = [];
    // 
    
    const pfrId = localStorage.getItem("s9_PfrId");
    getWholeContext(pfrId).then((data) => {
      data.company.map((valueComp: any, indexComp:any) => {
        valueComp['id'] = indexComp;
        if(valueComp.products.length > 0){
          var pushProd: Array<any> = [];
          valueComp.products.map((valueFil: any, indexFil: any) => {
            if(valueFil.categoryId == selectedCategoryId){
              pushProd.push(valueFil);
            }
          });
         
          valueComp.products = pushProd;
  
          if(valueComp.products.length > 0){
            pushComp.push(valueComp);
          }
        }
      });
      // 
      setCompany(pushComp)
    });
    
    
    var products = (resInitWhole.company[getSelectedCompany]) ? resInitWhole.company[getSelectedCompany]['products'] : null
    if(selectedCategoryType == 1) {  // IF ILP
      if(section9Recommend.product.premiumType == -1){
        setProduct('0', 'premiumType', null)
      }
      if(products){
        products.map((product: any, k: any) => {
          if(product['categoryId'] == selectedCategoryId
          && product['ilp'] != null
          && product['ilp']['platform']['fundType'] == section9Recommend.product.premiumType
          && product['ilp']['riskCategory'] == resInitWhole.section5Result[section9Recommend.product.nameOfOwner]) {
            selectedProducts.push(product)
          }
        })
      }
    }else{
      setProduct('-1', "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // 
          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      var modelPortfolioRiskCategory = Number(resInitWhole.section5Result[section9Recommend.product.nameOfOwner])
      setProduct(modelPortfolioRiskCategory.toString(), 'modelPortfolioRiskCategory', null)
      const ilpFundsOfCompany = resInitWhole.ilpFunds.filter((fund:any, k:any) => {
        if(resInitWhole.company[getSelectedCompany]){
          return fund['companyId'] == resInitWhole.company[getSelectedCompany]['idReal']
        }
      })
      setIlpFundsOfCompany(ilpFundsOfCompany);
    }

    setSelectProducts(selectedProducts);
    
    //

    var selectedProducts: Array<any> = [];
    setSelectedCompany(resComp)
    
    const selectedCategoryType1 = (resInitWhole.category[getSelectedCategory]) ? resInitWhole.category[getSelectedCategory]['type'] : null
    setDataSelectedCategoryType(selectedCategoryType)

    const selectedCategoryId1 = (resInitWhole.category[getSelectedCategory]) ? resInitWhole.category[getSelectedCategory]['id'] : null
    var products = (resInitWhole.company[resComp]) ? resInitWhole.company[resComp]['products'] : null
    if(selectedCategoryType == 1) {  // IF ILP
      if(section9Recommend.product.premiumType == -1){
        setProduct('0', 'premiumType', null)
      }

      if(products){
        products.map((product: any, k: any) => {
          if(product['categoryId'] == selectedCategoryId
          && product['ilp'] != null
          && product['ilp']['platform']['fundType'] == section9Recommend.product.premiumType
          && product['ilp']['riskCategory'] == resInitWhole.section5Result[section9Recommend.product.nameOfOwner]) {
            selectedProducts.push(product)
          }
        })
      }
    }else{
      setProduct('-1', "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // 

          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      var modelPortfolioRiskCategory = Number(resInitWhole.section5Result[section9Recommend.product.nameOfOwner])
      setProduct(modelPortfolioRiskCategory.toString(), 'modelPortfolioRiskCategory', null)
      const ilpFundsOfCompany = resInitWhole.ilpFunds.filter((fund:any, k:any) => {
        if(resInitWhole.company[getSelectedCompany]){
          return fund['companyId'] == resInitWhole.company[getSelectedCompany]['idReal']
        }
      })
      
      setIlpFundsOfCompany(ilpFundsOfCompany);
    }
    
    setSelectProducts(selectedProducts);
  }

  const onChangePortfolio = () => {
    if(section9Recommend.product.portfolio == 0) {
      section9Recommend.product.fundName = ""
      section9Recommend.product.funds = []
    }else {
      let index = initWhole.cis.findIndex((cis: any) => {
        if(cis['id'] == section9Recommend.product.portfolio) {
          return true
        }
      })

      var selectedPortfolio = initWhole.cis[index]
      var dataFundArr: Array<any> = [];
      
      benefits = new Array(selectedPortfolio['benefit'].length).fill(false)
      risks = new Array(selectedPortfolio['risk'].length).fill(false)
      setPremiumPaymentType(selectedPortfolio['payment']);
      initWhole.cis[index]['platform']['funds'].map((fund: any) => {
        dataFundArr.push({
          name : fund['fund']['name'],
          fundCode : fund['fund']['fundCode'],
          allocation : fund['allocation']
        })
      })
      setProductArr(dataFundArr, 'funds', null)
    }
  }

  const setProductData = (event: any) => {
    const { name, value } = event.target;
    setProduct(value, name, null)
  };

  const changeDataCategory = (event: any) => {
    const { name, value } = event.target;
    var selectedProducts: Array<any> = [];
    // setProduct(value, 'modelPortfolioRiskCategory', null)
    setSelectedCategory(value)
    setSelectedCompany("")
    setProductValueSelect(0);
    
    const selectedCategoryType = (initWhole.category[value]) ? initWhole.category[value]['type'] : null
    setDataSelectedCategoryType(selectedCategoryType)
    const selectedCategoryId = (initWhole.category[value]) ? initWhole.category[value]['id'] : null
    setDataSelectedCategoryId(selectedCategoryId)
    // Check Product Company
    var pushComp: Array<any> = [];
    // 
    
    const pfrId = localStorage.getItem("s9_PfrId");
    getWholeContext(pfrId).then((data) => {
      data.company.map((valueComp: any, indexComp:any) => {
        valueComp['id'] = indexComp;
        if(valueComp.products.length > 0){
          var pushProd: Array<any> = [];
          valueComp.products.map((valueFil: any, indexFil: any) => {
            if(valueFil.categoryId == selectedCategoryId){
              pushProd.push(valueFil);
            }
          });
         
          valueComp.products = pushProd;
  
          if(valueComp.products.length > 0){
            pushComp.push(valueComp);
          }
        }
      });
      // 
      setCompany(pushComp)
    });
    
    
    var products = (initWhole.company[getSelectedCompany]) ? initWhole.company[getSelectedCompany]['products'] : null
    if(selectedCategoryType == 1) {  // IF ILP
      if(section9Recommend.product.premiumType == -1){
        setProduct('0', 'premiumType', null)
      }
      if(products){
        products.map((product: any, k: any) => {
          if(product['categoryId'] == selectedCategoryId
          && product['ilp'] != null
          && product['ilp']['platform']['fundType'] == section9Recommend.product.premiumType
          && product['ilp']['riskCategory'] == initWhole.section5Result[section9Recommend.product.nameOfOwner]) {
            selectedProducts.push(product)
          }
        })
      }
    }else{
      setProduct('-1', "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // 
          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      var modelPortfolioRiskCategory = Number(initWhole.section5Result[section9Recommend.product.nameOfOwner])
      setProduct(modelPortfolioRiskCategory.toString(), 'modelPortfolioRiskCategory', null)
      const ilpFundsOfCompany = initWhole.ilpFunds.filter((fund:any, k:any) => {
        if(initWhole.company[getSelectedCompany]){
          return fund['companyId'] == initWhole.company[getSelectedCompany]['idReal']
        }
      })
      setIlpFundsOfCompany(ilpFundsOfCompany);
    }

    setSelectProducts(selectedProducts);
  };

  const changeDataProvider = (event: any) => {
    const { name, value } = event.target;
    var selectedProducts: Array<any> = [];
    setSelectedCompany(value)
    
    const selectedCategoryType = (initWhole.category[getSelectedCategory]) ? initWhole.category[getSelectedCategory]['type'] : null
    setDataSelectedCategoryType(selectedCategoryType)

    const selectedCategoryId = (initWhole.category[getSelectedCategory]) ? initWhole.category[getSelectedCategory]['id'] : null
    var products = (initWhole.company[value]) ? initWhole.company[value]['products'] : null
    if(selectedCategoryType == 1) {  // IF ILP
      if(section9Recommend.product.premiumType == -1){
        setProduct('0', 'premiumType', null)
      }

      if(products){
        products.map((product: any, k: any) => {
          if(product['categoryId'] == selectedCategoryId
          && product['ilp'] != null
          && product['ilp']['platform']['fundType'] == section9Recommend.product.premiumType
          && product['ilp']['riskCategory'] == initWhole.section5Result[section9Recommend.product.nameOfOwner]) {
            selectedProducts.push(product)
          }
        })
      }
    }else{
      setProduct('-1', "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // 

          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      var modelPortfolioRiskCategory = Number(initWhole.section5Result[section9Recommend.product.nameOfOwner])
      setProduct(modelPortfolioRiskCategory.toString(), 'modelPortfolioRiskCategory', null)
      const ilpFundsOfCompany = initWhole.ilpFunds.filter((fund:any, k:any) => {
        if(initWhole.company[getSelectedCompany]){
          return fund['companyId'] == initWhole.company[getSelectedCompany]['idReal']
        }
      })
      
      setIlpFundsOfCompany(ilpFundsOfCompany);
    }
    
    setSelectProducts(selectedProducts);
  };

  const changeDataPremiumType = (event: any) => {
    const { name, value } = event.target;
    
    setProduct(value, 'premiumType', null)
    
    var selectedProducts: Array<any> = [];
    
    const selectedCategoryType = (initWhole.category[getSelectedCategory]) ? initWhole.category[getSelectedCategory]['type'] : null
    setDataSelectedCategoryType(selectedCategoryType)
    const selectedCategoryId = (initWhole.category[getSelectedCategory]) ? initWhole.category[getSelectedCategory]['id'] : null
    var products = (initWhole.company[getSelectedCompany]) ? initWhole.company[getSelectedCompany]['products'] : null
    
    if(selectedCategoryType == 1) {  // IF ILP
      if(section9Recommend.product.premiumType == -1){
        
        setProduct('0', 'premiumType', null)
      }

      if(products){
        products.map((product: any, k: any) => {
          if(product['categoryId'] == selectedCategoryId
          && product['ilp'] != null
          && product['ilp']['platform']['fundType'] == value
          && product['ilp']['riskCategory'] == initWhole.section5Result[section9Recommend.product.nameOfOwner]) {
            selectedProducts.push(product)
          }
        })
      }
    }else{
      setProduct('-1', "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // 

          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      var modelPortfolioRiskCategory = Number(initWhole.section5Result[section9Recommend.product.nameOfOwner])
      setProduct(modelPortfolioRiskCategory.toString(), 'modelPortfolioRiskCategory', null)
      const ilpFundsOfCompany = initWhole.ilpFunds.filter((fund:any, k:any) => {
        if(initWhole.company[getSelectedCompany]){
          
          
          return fund['companyId'] == initWhole.company[getSelectedCompany]['idReal']
        }
      })
      
      setIlpFundsOfCompany(ilpFundsOfCompany);
    }
    
    
    
    setSelectProducts(selectedProducts);
  };

  const changeDataProductName = (params: any) => {
    let pfrId = localStorage.getItem("s9_PfrId");
    var resId = (pfrId != null) ? pfrId.toString() : '0';
    setParent(resId, 'pfrId', null)

    setProductValueSelect(params);
    // Get One Product
    productFindOne(params).then((data) => {
      setProduct(data.product.name, 'name', null)
      setProduct(data.product.id, 'subjectId', null)
      setProduct(data.product.feature, 'feature', null)
      // Handle Premium Type
      var dataProduct: Array<any> = []
      if(data.product.name){
        if(getSelectProducts.length > 0){
          getSelectProducts.map((valueProd:any) => {
            if(valueProd.name == data.product.name){
              dataProduct = valueProd;
            }
          })
        }
        setSelectProductOne(dataProduct);
        
        
        // Set Premium Type
        if(dataSelectedCategoryType == 1){
          let dataPt: Array<any> = [];
          if(getSelectProductone?.ilp){
            if(getSelectProductone['ilp'].paymentType == 0){
              dataPt = [
                { id: 0, name: "CASH" },
              ];
            }else if(getSelectProductone['ilp'].paymentType == 1){
              dataPt = [
                { id: 1, name: "CPF OA" },
              ];
            }else if(getSelectProductone['ilp'].paymentType == 2){
              dataPt = [
                { id: 2, name: "CPF SA" },
              ];
            }else if(getSelectProductone['ilp'].paymentType == 3){
              dataPt = [
                { id: 3, name: "CPF MEDISAVE" },
              ];
            }else if(getSelectProductone['ilp'].paymentType == 4){
              dataPt = [
                { id: 4, name: "SRS" },
              ];
            }
            setDataPremiumType(dataPt);
          }
        }

        // Set Premium Frequency
        console.log('dataSelectedCategoryType', dataSelectedCategoryType)
        // if(dataSelectedCategoryType != 1){
          let dataFq: Array<any> = [];
          if(dataSelectedCategoryType != 1 || section9Recommend.product.premiumType == 1){
            dataFq.push({ id: 0, name: "Monthly" })
          }
          
          if(dataSelectedCategoryType != 1 || section9Recommend.product.premiumType == 1){
            dataFq.push({ id: 1, name: "Quarterly" })
          }
          
          if(dataSelectedCategoryType != 1 || section9Recommend.product.premiumType == 1){
            dataFq.push({ id: 2, name: "Half-Yearly" })
          }
          
          if(dataSelectedCategoryType != 1 || section9Recommend.product.premiumType == 1){
            dataFq.push({ id: 3, name: "Annually" })
          }
          
          if(dataSelectedCategoryType != 1 || section9Recommend.product.premiumType == 0){
            dataFq.push({ id: 4, name: "Single Payment" })
          }

          setDataPaymentFreq(dataFq)
        // }

        var lengthData = 0;
        var dataFunds: Array<any> = [];

        if(getSelectProductone['ilp']){
          if(getSelectProductone['ilp'].platform.funds.length > 0){
            getSelectProductone['ilp'].platform.funds.map((valueRes:any, indexRes:any) => {
              dataFunds.push({
                allocation: valueRes.allocation,
                fundId: valueRes.fundId,
                groupId: valueRes.fund.groupId,
                name: valueRes.fund.name,
              });
            })
          }
        }

        setProductArr(dataFunds, 'funds', null);
      }   
      setDataProductSelected(data)

      // Hospitalization
      if(dataSelectedCategoryId == 8 || dataSelectedCategoryId == 5){
        setProductHospital(0, 'cash');
        setProductHospital(0, 'cpfMedisave');
      }
    });

    
  };

  const handleBenefits = (event: any, index: any) => {
    const { name, value } = event.target;
    
    var dataBenVal = -1;
    if(section9Recommend.product.benefit.length > 0){
      section9Recommend.product.benefit.map((resBen: any, resIBen:any) => {
        if(resBen.benefitId == value){
          dataBenVal = resIBen
        }
      });
    }

    if(dataBenVal >= 0){
      var resBenefit: Array<any> = [];
      section9Recommend.product.benefit.map((resBen: any, resIBen:any) => {
        if(resBen.benefitId != value){
          resBenefit.push({benefitId:resBen.benefitId,content:resBen.content,title:resBen.title});
        }
      });
      setProductArr(resBenefit, 'benefit', null);
    }else{
      var resBenefit: Array<any> = [];
      section9Recommend.product.benefit.map((resBen: any, resIBen:any) => {
          resBenefit.push({benefitId:resBen.benefitId,content:resBen.content,title:resBen.title});
      });
      dataProductSelected.benefits.map((valueBenefit: any, index: any) => {
        if(valueBenefit.id == value){
          resBenefit.push({benefitId:value,content:valueBenefit.content,title:valueBenefit.title})
        }
      });
      setProductArr(resBenefit, 'benefit', null);
    }
  }

  const checkBenefit = (data: any) => {
    let result = false;
    if(section9Recommend.product.benefit.length > 0){
      section9Recommend.product.benefit.map((value: any, index: any) => {
        if(data == value.benefitId){
          result = true;
        }
      })
      return result;
    }else{
      return false;
    }
  }

  const handleRisks = (event: any, index: any) => {
    const { name, value } = event.target;

    var resIndexRiskVal = -1;
    if(section9Recommend.product.risk.length > 0){
      section9Recommend.product.risk.map((resProdRisk: any, resIRisk:any) => {
        if(resProdRisk.riskId != value){
          resIndexRiskVal = resIRisk;
        }
      });
    }

    if(resIndexRiskVal >= 0){
      var resRisk: Array<any> = [];
      section9Recommend.product.risk.map((resProdRisk: any, resIRisk:any) => {
        if(resProdRisk.riskId != value){
          resRisk.push({riskId:resProdRisk.riskId,content:resProdRisk.content,title:resProdRisk.title});
        }
      });
      setProductArr(resRisk, 'risk', null);
    }else{
      var resRisk: Array<any> = [];
      section9Recommend.product.risk.map((resProdRisk: any, resIRisk:any) => {
          resRisk.push({riskId:resProdRisk.riskId,content:resProdRisk.content,title:resProdRisk.title});
      });

      dataProductSelected.risks.map((valueRisk: any, index: any) => {
        if(valueRisk.id == value){
          resRisk.push({riskId:value,content:valueRisk.content,title:valueRisk.title})
        }
      });
      setProductArr(resRisk, 'risk', null);
    }
  }

  const checkRisk = (data: any) => {
    let result = false;
    if(section9Recommend.product.risk.length > 0){
      section9Recommend.product.risk.map((value: any, index: any) => {
        if(data == value.riskId){
          result = true;
        }
      })

      return result;
    }else{
      return false;
    }
  }

  // Data Riders
  const setRiderAction = (event: any, index: any) => {
    const { name, value } = event.target;
    var resData = -1;
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == value){
          resData = resIRider;
        }
      });
    }

    if(resData >= 0){
      
      var resRiders: Array<any> = [];
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) != value){
          resRiders.push(vRider);
        }
      });
      setProductRiderArr(resRiders, 'riders', null);
    }else{
      var resRiders: Array<any> = [];
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
          resRiders.push(vRider);
      });
      dataProductSelected.riders.map((dataVal: any, index: any) => {
        if(dataVal.new_rider.id == value){
          resRiders.push({
            selected: false,
            edit: false,
            subjectId: value,
            name: dataVal.new_rider.riderName,
            type: 0, // Insure / CIS
            productType: 0, // product or rider
            id: 0,
            categoryId: 0,
            policyTerm: '',
            sumAssured: '',
            premiumPaymentType: '0',
            premium: 0,
            premiumFrequency: 0,
            funds:  [],
            modelPortfolioRiskCategory: 0,
            higherThanRiskProfile: 0,
            nameOfOwner: 0,
            nameOfInsure: "-1",
            nameOfInsureOther: "",
            benefit: [],
            risk: [],
            portfolio: 0,
            fundName: "",
            fundAmount: 0,
            premiumForHospitalization: {
              cash: 0,
              cpfMedisave: 0
            },
            groupId: 0,
            premiumType: null,
            feature: dataVal.new_rider.riderFeature,
          })
        }
      });
      setProductRiderArr(resRiders, 'riders', null);
    }
  }

  const checkRiders = (data: any) => {
    let result = false;
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((value: any, index: any) => {
        if(parseInt(data) == parseInt(value.subjectId)){
          result = true;
        }
      })

      return result;
    }else{
      return false;
    }
  }

  const getRiderValue = (data: any, name: any) => { 
    if(section9Recommend.riders.length > 0){
      if(name == 'nameOfInsure'){
        return dataOwner[section9Recommend.product.nameOfOwner]['name'];
      }
      let result = "";
      section9Recommend.riders.map((value: any, index: any) => {
        if(parseInt(data) == parseInt(value.subjectId)){
          result = value[name];
        }
      })

      return result;
    }else{
      return "";
    }
  }

  const handleRiderProduct = (event: any, id: any) => {
    const { name, value } = event.target;
    // 
    // 
    // 
    const resRiders: Array<any> = [];
    const resRiders2: Array<any> = [];

    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == id){
          var resData: any = {
            selected: vRider.selected,
            edit: vRider.edit,
            subjectId: vRider.subjectId,
            name: vRider.name,
            type: vRider.type,
            productType: vRider.productType,
            id: vRider.id,
            categoryId: vRider.categoryId,
            policyTerm: vRider.policyTerm,
            sumAssured: vRider.sumAssured,
            premiumPaymentType: vRider.premiumPaymentType,
            premium: vRider.premium,
            premiumFrequency: vRider.premiumFrequency,
            funds: vRider.funds,
            modelPortfolioRiskCategory: vRider.modelPortfolioRiskCategory,
            higherThanRiskProfile: vRider.higherThanRiskProfile,
            nameOfOwner: vRider.nameOfOwner,
            nameOfInsure: vRider.nameOfInsure,
            nameOfInsureOther: vRider.nameOfInsureOther,
            benefit: vRider.benefit,
            risk: vRider.risk,
            portfolio: vRider.portfolio,
            fundName: vRider.fundName,
            fundAmount: vRider.fundAmount,
            premiumForHospitalization: {
              cash: vRider.cash,
              cpfMedisave: vRider.cpfMedisave,
            },
            groupId: vRider.groupId,
            premiumType: vRider.premiumType,
            feature: vRider.feature,
          };
          resData[name] = value;
          resRiders.push(resData);
        }else{
          resRiders.push(vRider);
        }
      });
      setProductRiderArr(resRiders, 'riders', null);
    }
  }

  // Rider Benefit
  const setRiderBenefitAction = (event: any, riderId:any, benefitId:any) => { 
    const { name, value } = event.target;
    var dataBenefit: Array<any> = [];
    var resData = -1;
    
    
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == riderId){
          if(vRider.benefit.length > 0){
            vRider.benefit.map((valueBen:any, resIBen:any) => {
              if(valueBen.benefitId == benefitId){
                resData = resIBen;
              }
            })
          }
        }
      });
    }

    if(resData >= 0){
      var resRiderBenefit: Array<any> = [];
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == riderId){
          if(vRider.benefit.length > 0){
            vRider.benefit.map((valueBen:any, resIBen:any) => {
              if(valueBen.benefitId != benefitId){
                resRiderBenefit.push({
                  benefitId: valueBen.benefitId,
                  content: valueBen.content,
                  title: valueBen.title,
                });
              }
            })
          }
        }
      });
      setProductRiderBenefitArr(resRiderBenefit, riderId)
    }else{
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == riderId){
          if(vRider.benefit.length > 0){
            vRider.benefit.map((valueBen:any, resIBen:any) => {
              dataBenefit.push(valueBen);
            })
          }
        }
      });

      if(dataProductSelected.riders.length > 0){
        dataProductSelected.riders.map((valueProd:any, indexProd:any) => {
          if(valueProd.new_rider.id == riderId){
            if(valueProd.new_rider.benefit.length > 0){
              valueProd.new_rider.benefit.map((valueBen: any, indexBen: any) => {
                if(valueBen.id == benefitId){
                  dataBenefit.push({
                    benefitId: benefitId,
                    content: valueBen.content,
                    title: valueBen.title,
                  });
                }
              })
            }
          }
        });
        
        setProductRiderBenefitArr(dataBenefit, riderId)
      }
    }
  }

  const checkRiderBenefit = (benefitId:any, riderId:any) => {
    let result = false;
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((value: any, index: any) => {
        if(parseInt(riderId) == parseInt(value.subjectId)){
          if(value.benefit.length > 0){
            value.benefit.map((valueBen:any) => {
              if(valueBen.benefitId == benefitId){
                result = true;
              }
            })
          }
        }
      })

      return result
    }else{
      return false;
    }
  }

  // Rider Risk
  const setRiderRiskAction = (event: any, riderId:any, riskId:any) => { 
    const { name, value } = event.target;
    var dataRisk: Array<any> = [];
    var resData = -1;

    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == riderId){
          if(vRider.risk.length > 0){
            vRider.risk.map((valueRisk:any, resIRisk:any) => {
              if(valueRisk.riskId == riskId){
                resData = resIRisk;
              }
            })
          }
        }
      });
    }

    if(resData >= 0){
      var resRiderRisk: Array<any> = [];
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == riderId){
          if(vRider.risk.length > 0){
            vRider.risk.map((valueRisk:any, resIRisk:any) => {
              if(valueRisk.riskId != riskId){
                resRiderRisk.push({
                  riskId: valueRisk.riskId,
                  content: valueRisk.content,
                  title: valueRisk.title,
                });
              }
            })
          }
        }
      });
      setProductRiderRiskArr(resRiderRisk, riderId)
    }else{
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) == riderId){
          if(vRider.risk.length > 0){
            vRider.risk.map((valueRisk:any, resIRisk:any) => {
              dataRisk.push(valueRisk);
            })
          }
        }
      });

      if(dataProductSelected.riders.length > 0){
        dataProductSelected.riders.map((valueProd:any, indexProd:any) => {
          if(valueProd.new_rider.id == riderId){
            if(valueProd.new_rider.risk.length > 0){
              valueProd.new_rider.risk.map((valueRisk: any, resIndexRiskVal: any) => {
                if(valueRisk.id == riskId){
                  dataRisk.push({
                    riskId: riskId,
                    content: valueRisk.content,
                    title: valueRisk.title,
                  });
                }
              })
            }
          }
        });
        
        setProductRiderRiskArr(dataRisk, riderId)
      }
    }
  }

  const checkRiderRisk = (riskId:any, riderId:any) => {
    let result = false;
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((value: any, index: any) => {
        if(parseInt(riderId) == parseInt(value.subjectId)){
          if(value.risk.length > 0){
            value.risk.map((valueRisk:any) => {
              if(valueRisk.riskId == riskId){
                result = true;
              }
            })
          }
        }
      })

      return result
    }else{
      return false;
    }
  }

  // Check Data Validation
  const riderBenefitValidation = (riderId:any) => {
    var dataRes = 0;
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((value: any, index: any) => {
        if(parseInt(riderId) == parseInt(value.subjectId)){
          if(value.benefit.length > 0){
            dataRes = 1
          }
        }
      })
    }
    
    if(dataRes > 0){
      return true
    }else{
      return false
    }
  }

  const riderRiskValidation = (riderId:any) => {
    var dataRes = 0;
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((value: any, index: any) => {
        if(parseInt(riderId) == parseInt(value.subjectId)){
          if(value.risk.length > 0){
            dataRes = 1
          }
        }
      })
    }
    
    if(dataRes > 0){
      return true
    }else{
      return false
    }
  }

  // Get Fund Group Name 
  const getFundName = (groupId:any) => {
    var result = '-';
    if(initWhole.ilpFundGroups.length > 0){
      initWhole.ilpFundGroups.map((value:any) => {
        if(value.id == groupId){
          result = value.name
        }
      })
    }

    return result;
  }

  const checkDataIlpFundsOfCompany = (groupId: any) => {
    var resArr: Array<any> = [];
    getIlpFundsOfCompany.map((fund:any) => {
      if(fund['groupId'] == groupId){
        resArr.push(fund);
      }
    })

    return resArr
  }

  const checkDataIlpFundsOfCompany2 = (groupId: any) => {
    var resArr2: Array<any> = [];
    getIlpFundsOfCompany.map((fund:any) => {
      if(fund['groupId'] == groupId){
        resArr2.push(fund);
      }
    })

    return resArr2
  }

  // Handle Product Fund
  const setProductFund = (event:any, resAllocation:any, groupId: any, indexPlatform:any) => {
    const { name, value } = event.target;
    var dataFunds: Array<any> = [];
    var resData = -1;
    
    
    if(section9Recommend.product.funds.length > 0){
      section9Recommend.product.funds.map((vFund: any, resIFund:any) => {
        if(parseInt(vFund.fundId) == value){
            resData = resIFund;
        }
      });
    }

    if(resData >= 0){
      var resFund: Array<any> = [];
      section9Recommend.product.funds.map((vFund: any, resIFund:any) => {
        if(parseInt(vFund.fundId) != value){
          resFund.push(vFund);
        }
      });
      setProductArr(resFund, 'funds', null)
    }else{
      section9Recommend.product.funds.map((vFund: any, resIFund:any) => {
          dataFunds.push(vFund);
      });

      if(getSelectProductone.ilp.platform.funds.length > 0){
        var dataMap = checkDataIlpFundsOfCompany2(groupId);
        dataMap.map((valueMap:any, indexMap:any) => {
          if(valueMap.id == value){
            dataFunds[indexPlatform] = {
              allocation: resAllocation,
              fundId:valueMap.id,
              groupId: valueMap.groupId,
              name: valueMap.name,
            }
          }
        });
        
        setProductArr(dataFunds, 'funds', null)
      }
    }

  }

  const checkFundValues = (dataI:any) => {
    if(section9Recommend.product.funds.length > 0){
      return section9Recommend.product?.funds[dataI].fundId;
    }else{
      return "";
    }
  }

  let { showDetailData } = useNavigationSection();

  // Hospitalization
  const handleHospilization = (event:any) => {
    const { name, value } = event.target;
    setProductHospital(value, name);
  }

  /// CIS
  const [cisDataProductIndex, setCisDataProductIndex] = useState<any>(-1);

  const [cisDataProduct, setCisDataProduct] = useState<any>([{}]);
  const [dataPremiumPaymentType, setPremiumPaymentType] = useState<any>([{}]);
  const [cisDataProvider, setCisDataProvider] = useState<any>(-1);
  const [cisDataBenRisk, setCisDataBenRisk] = useState<any>([{}]);


  const changeCisDataProvider = (event: any) => {
    const { name, value } = event.target;
    const dataArr: Array<any> = [];
    setCisDataProvider(value);
    
    if(initWhole.cis.length > 0){
      initWhole.cis.map((dataCis: any, indexCis:any) => {
        // 
        if((dataOutcomes[section9Recommend.product.nameOfOwner] == 1 || dataCis.platform.mustPassCKA == 0) &&  value == dataCis.platform.companyId &&
          ((dataCis.maxBudget == 0 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] <= 29999) ||
          (dataCis.maxBudget == 1 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] > 29999 && 
          dataCis.riskCategory == section9Recommend.product.modelPortfolioRiskCategory) ||
          (dataCis.maxBudget == 2 && singlePayorBudget[section9Recommend.product.nameOfOwner][dataCis.payment] > 19999 &&
          dataCis.riskCategory == section9Recommend.product.modelPortfolioRiskCategory))){
            dataArr.push(dataCis)
        }
      })
      
      setCisDataProduct(dataArr) 
    }
  }

  const changeCISDataProductName = (event: any) => {
    const { name, value } = event.target;
    
    let pfrId = localStorage.getItem("s9_PfrId");
    var resId = (pfrId != null) ? pfrId.toString() : '0';
    setParent(resId, 'pfrId', null)
    
    setProduct(value, name, null)

    if(value == 0) {
      section9Recommend.product.fundName = ""
      section9Recommend.product.funds = []
    }else {
      let index = initWhole.cis.findIndex((cis: any) => {
        if(cis['id'] == value) {
          return true
        }
      })

      var selectedPortfolio = initWhole.cis[index]
      setCisDataBenRisk(selectedPortfolio);
      
      var dataFundArr: Array<any> = [];
      
      benefits = new Array(selectedPortfolio['benefit'].length).fill(false)
      risks = new Array(selectedPortfolio['risk'].length).fill(false)
      setPremiumPaymentType(selectedPortfolio['payment']);
      initWhole.cis[index]['platform']['funds'].map((fund: any) => {
        dataFundArr.push({
          name : fund['fund']['name'],
          fundCode : fund['fund']['fundCode'],
          allocation : fund['allocation']
        })
      })
      setProductArr(dataFundArr, 'funds', null)
    }
  }

  // Save & Update
  const saveData = async (params:any) => {
    setLoading(true)
    try {
      if(section9Recommend.pfrId){
        console.log('section9Recommend', section9Recommend)
        let storeData = await updateSection9Recommendation(JSON.stringify(section9Recommend));
        if(storeData.status == 200){
          resetRecommendationProduct()
          localStorage.setItem("s9_recommendId", storeData.data.resullt);
          showDetailData(params);
        }
      }else{
        let pfrId = localStorage.getItem("s9_PfrId");
        var resId = (pfrId != null) ? pfrId.toString() : '0';
        setParent(resId, 'pfrId', null)
        // section9Recommend['pfrId'] = resId;
        let storeData = await postSection9Recommendation(JSON.stringify(section9Recommend));
        if(storeData.status == 200){
          resetRecommendationProduct()
          localStorage.setItem("s9_recommendId", storeData.data.resullt);
          showDetailData(params);
        }
      }
      setLoading(false); // Stop loading in case of error
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error('error', error);
    }
  }

  const cancleData = (params:any) => {
    resetRecommendationProduct()
    showDetailData(params);
  }


  return (
    <>
      {dataLoading == true ? <>
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
      </>: ''}
      <HeadingSecondarySection className="mx-8 2xl:mx-60">Product Details</HeadingSecondarySection>
      <div className="grid grid-cols-1 mx-8 2xl:mx-60">
        <RowDoubleGrid>
          <div>
            <Select
              datas={dataOwner}
              label="Name of Owner"
              className="my-4"
              name="nameOfOwner"
              value={section9Recommend.product.nameOfOwner}
              handleChange={(event) => setProductData(event)}
            />
          </div>
          <div>
            <Select
              datas={recomendationType}
              label="Recommendation Type"
              className="my-4"
              name="type"
              value={section9Recommend.product.type}
              handleChange={(event) =>
                setProductData(event)
              }
            />
          </div>
        </RowDoubleGrid>
      </div>
      {section9Recommend.product.type == 0 ? 
          (<> 
            <SectionCardSingleGrid className="mx-8 2xl:mx-60">
              <RowDoubleGrid>
                <div>
                  <Select
                    datas={dataCategory}
                    label="Category"
                    className="my-4"
                    name="category"
                    value={getSelectedCategory}
                    handleChange={(event) => changeDataCategory(event)}
                  />
                </div>
                <div>
                  <Select
                    datas={dataCompany}
                    label="Provider Name"
                    className="my-4"
                    name="company"
                    value={getSelectedCompany}
                    handleChange={(event) => changeDataProvider(event)}
                  />
                </div>
              </RowDoubleGrid>

              <RowDoubleGrid>
                {dataSelectedCategoryType == 1 ? (<>
                  <div>
                    <Select
                      datas={dataPremiumTypeIlp}
                      label="Premium Type"
                      className="my-4"
                      name="productIndex"
                      value={section9Recommend.product.premiumType}
                      handleChange={(event) => changeDataPremiumType(event)}
                    />
                  </div>
                </>) : ''}
                <div>
                  <Select
                    datas={getSelectProducts}
                    label="Product Name"
                    className="my-4"
                    name="productIndex"
                    value={productValueSelect}
                    handleChange={(event) => changeDataProductName(event.target.value)}
                  />
                </div>
              </RowDoubleGrid> 

              {productValueSelect > 0 ? (
                  <>
                    <RowDoubleGrid>
                      <div>
                        <div className={`w-full my-4 space-y-3`}>
                          <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
                            Name of Insured (If Different From Owner)
                          </label>
                          <select placeholder="Please select data" value={section9Recommend.product.nameOfInsure} name="nameOfInsure"
                            className="w-full px-0 py-2 my-4 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                            onChange={(event) => setProductData(event)}>
                            <option value="-">Please select data</option>
                            {dataDependant?.length &&
                              dataDependant.map((val: any, index: any) => (
                                <option key={index} value={val.name}>
                                  {val.name}
                                </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        {section9Recommend.product.nameOfInsure == 'OTHER' ? 
                          <Input label="Other" className="my-4" name="nameOfInsureOther" value={section9Recommend.product.nameOfInsureOther} handleChange={(event) => setProductData(event)}/>
                        : ''} 
                      </div>
                    </RowDoubleGrid>
                    <RowDoubleGrid>
                      <div>
                        <Select
                          datas={dataCurrency}
                          label="Currency"
                          className=""
                          name="currency"
                          value={section9Recommend.product.currency} 
                          handleChange={(event) => setProductData(event)}
                        />
                       
                      </div>
                      <div>
                        <Select
                          datas={dataPremiumType}
                          label="Premium Payment Type"
                          className=""
                          name="premiumPaymentType"
                          value={section9Recommend.product.premiumPaymentType} 
                          handleChange={(event) => setProductData(event)}
                        />
                      </div>
                    </RowDoubleGrid>
                    <RowDoubleGrid>
                      <div>
                        <Input label="Premium Amounts" className="" name="premium" value={section9Recommend.product.premium} handleChange={(event) => setProductData(event)} needValidation={true} logic={section9Recommend.product.premium === null || section9Recommend.product.premium === 0 ? false : true}/>
                      </div>
                      <div>
                        <Input label="Sum Assured" className="" name="sumAssured" value={section9Recommend.product.sumAssured} handleChange={(event) => setProductData(event)}
                        needValidation={true} logic={section9Recommend.product.sumAssured === "" || section9Recommend.product.sumAssured === "-"  ? false : true}/>
                      </div>
                    </RowDoubleGrid>
                    <RowDoubleGrid>
                      <div>
                        <Select
                          datas={dataPaymentFreq}
                          label="Payment Frequency"
                          className=""
                          name="premiumFrequency"
                          value={section9Recommend.product.premiumFrequency} 
                          handleChange={(event) => setProductData(event)}
                        />
                      </div>
                      <div>
                        <Input label="Policy Term Years" className="" name="policyTerm" value={section9Recommend.product.policyTerm} handleChange={(event) => setProductData(event)}
                        needValidation={true} logic={section9Recommend.product.policyTerm === "" || section9Recommend.product.policyTerm === "-"  ? false : true}/>
                      </div>
                    </RowDoubleGrid>
                    {(section9Recommend.product.funds.length > 0) ? (<>
                      <RowSingleGrid>
                        <TextSmall>FUND NAME & PERCENTAGE</TextSmall>
                        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
                          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
                            <thead className="bg-white-bone">
                              <tr className="border-b border-gray-soft-strong">
                                <td className='px-2 py-2 align-top'>
                                  <TextSmall className="uppercase text-gray-light">
                                    GROUP NAME
                                  </TextSmall>
                                </td>
                                <td className='px-2 py-2 align-top'>
                                  <TextSmall className="uppercase text-gray-light">
                                    ALLOCATION(%)
                                  </TextSmall>
                                </td>
                                <td className='px-2 py-2 align-top'>
                                  <TextSmall className="uppercase text-gray-light">
                                    FUND NAME
                                  </TextSmall>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {getSelectProductone?.ilp &&
                                    getSelectProductone.ilp.platform.funds.map((dataPlatform: any, indexPlatform:any) => (
                                    <tr key={"asada"+indexPlatform}>
                                      <td className="px-2 py-2">
                                        <span>{getFundName(dataPlatform.fund.groupId)}</span>
                                      </td>
                                      <td className="px-2 py-2">
                                        <span>{dataPlatform.allocation}</span>
                                      </td>
                                      <td className="px-2 py-2">
                                        <select
                                          value={checkFundValues(indexPlatform)}
                                          name="dataFund"
                                          className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                                          onChange={(event) => setProductFund(event, dataPlatform.allocation, dataPlatform.fund.groupId, indexPlatform)}
                                          disabled={getSelectProductone.ilp.platform.fixed == 1 ? true : false}
                                        >
                                          <option value="-">Please select data</option>
                                          {checkDataIlpFundsOfCompany(dataPlatform.fund.groupId).length &&
                                            checkDataIlpFundsOfCompany(dataPlatform.fund.groupId).map((val:any, indexVal:any) => (
                                                <option key={indexVal} value={val.id}>
                                                  {val.name}
                                                </option>
                                            ))
                                          }
                                        </select>
                                      </td>
                                    </tr> 
                                  )
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </RowSingleGrid>
                    </>) : ''}
                    
                    {dataSelectedCategoryId == 8 || dataSelectedCategoryId == 5 ? (
                      <>
                        <RowSingleGrid>
                        <TextSmall>PREMIUM FREQUENCY</TextSmall>
                        <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
                          <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
                            <tbody className="bg-white-bone">
                              <tr>
                                <td className="px-2 py-2">CASH</td>
                                <td className="px-2 py-2">
                                  <Input className="" name="cash" value={section9Recommend.product.premiumForHospitalization.cash} handleChange={(event) => handleHospilization(event)} needValidation={true} logic={section9Recommend.product.premiumForHospitalization.cash === null || section9Recommend.product.premiumForHospitalization.cash === 0 ? false : true}/>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-2 py-2">CPF MEDISAVE</td>
                                <td className="px-2 py-2">
                                  <Input className="" name="cpfMedisave" value={section9Recommend.product.premiumForHospitalization.cpfMedisave} handleChange={(event) => handleHospilization(event)} needValidation={true} logic={section9Recommend.product.premiumForHospitalization.cpfMedisave === null || section9Recommend.product.premiumForHospitalization.cpfMedisave === 0 ? false : true}/>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        </RowSingleGrid>
                      </>
                    ): ''}

                    <RowSingleGrid>
                      <TextSmall>Product Feature</TextSmall>
                      <p className="text-sm text-gray-light">
                        {dataProductSelected.product?.feature}
                      </p>
                    </RowSingleGrid>
                  </>
                ) : (
                  ""
              )}
            </SectionCardSingleGrid>

            {productValueSelect > 0 ? (
              <>
                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.benefits?.length > 0 ? 
                    (<>
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold">Benefit Details</h2>
                    </div>
                    {dataProductSelected.benefits.map((benefit: any, index: any) => (
                      <div className="w-full p-5 border rounded-md border-gray-soft-strong" key={index}>
                        <div className="flex items-center justify-start gap-4 mb-5">
                          <Checkbox label={benefit.title} name="benefitData" isChecked={checkBenefit(benefit.id)} value={benefit.id} onChange={(event) => handleBenefits(event, index) }/>
                        </div>
                        <div>
                          <p className="text-sm text-gray-light">
                            {benefit.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    </>)
                    : ''
                  }
                </SectionCardSingleGrid>

                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.risks?.length > 0 ? (<>
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold">Risk Details</h2>
                    </div>
                    {dataProductSelected.risks.map((risk: any, index: any) => (
                      <div
                        className="w-full p-5 border rounded-md border-gray-soft-strong"
                        key={index}
                      >
                        <div className="flex items-center justify-start gap-4 mb-5">
                          <Checkbox label={risk.title} name="riskData" isChecked={checkRisk(risk.id)} value={risk.id} onChange={(event) => handleRisks(event, index)}/>
                        </div>
                        <div>
                          <p className="text-sm text-gray-light">
                            {risk.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>) 
                  : ''}
                </SectionCardSingleGrid>

                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.riders?.length > 0 ? (<>
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold">Rider Details</h2>
                    </div>
                    {dataProductSelected.riders.map((value: any, index: any) => (
                      <div
                        className="w-full p-5 border rounded-md border-gray-soft-strong"
                        key={index}
                      >
                        <div className="flex mb-5">
                          <Checkbox label={value.new_rider.riderName} name="riderData" isChecked={checkRiders(value.new_rider.id)} value={value.new_rider.id} onChange={(event) => setRiderAction(event, index)}/>
                        </div>
                        <div className="mb-5">
                          <p className="text-sm text-gray-light">{value.new_rider.riderFeature}</p>
                        </div>
                        {riderArr[value.new_rider.riderName] === true ? (
                          <div className="space-y-10">
                            <div className="w-full p-5 border rounded-md border-gray-soft-strong">
                              <RowDoubleGrid>
                                <div>
                                  <Input label="Policy Term" className="my-4" name="policyTerm" value={getRiderValue(value.new_rider.id, 'policyTerm')} handleChange={(event) => handleRiderProduct(event, value.new_rider.id)} needValidation={true} logic={getRiderValue(value.new_rider.id, 'policyTerm') === "" || getRiderValue(value.new_rider.id, 'policyTerm') === "-" || !getRiderValue(value.new_rider.id, 'policyTerm')  ? false : true}/>
                                  <Input label="Premium ($)" className="my-4" name="premium" value={getRiderValue(value.new_rider.id, 'premium')} handleChange={(event) => handleRiderProduct(event, value.new_rider.id)} needValidation={true} logic={getRiderValue(value.new_rider.id, 'policyTerm') === "" || getRiderValue(value.new_rider.id, 'premium') === "-" || !getRiderValue(value.new_rider.id, 'premium')  ? false : true}/>
                                </div>
                                <div>
                                  <Input label="Sum Assured" className="my-4" name="sumAssured" value={getRiderValue(value.new_rider.id, 'sumAssured')} handleChange={(event) => handleRiderProduct(event, value.new_rider.id)} needValidation={true} logic={getRiderValue(value.new_rider.id, 'policyTerm') === "" || getRiderValue(value.new_rider.id, 'sumAssured') === "-" || !getRiderValue(value.new_rider.id, 'sumAssured')  ? false : true}/>
                                  <Input label="Name of Insured" className="my-4" name="nameOfInsure" readonly value={getRiderValue(value.new_rider.id, 'nameOfInsure')}  handleChange={(event) => handleRiderProduct(event, value.new_rider.id)}/>
                                </div>
                              </RowDoubleGrid>
                            </div>

                            <RowSingleGrid>
                              <TextSmall>Rider Benefit</TextSmall>
                              
                              {riderBenefitValidation(value.new_rider.id) == false ? 
                                (<>
                                  <span className="w-full text-xs text-left text-red">Required Field</span>
                                </>) 
                                : ''
                              }
                              
                              {value.new_rider.benefit?.length > 0 &&
                                value.new_rider.benefit.map((valueBen: any, indexBen:any) => (
                                  <div
                                    className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                                    key={valueBen.id}
                                  >
                                    <div className="flex mb-5">
                                      <Checkbox label={valueBen.title} name="riderBenefitData" isChecked={checkRiderBenefit(valueBen.id, value.new_rider.id)} value={valueBen.id} onChange={(event) => setRiderBenefitAction(event, value.new_rider.id, valueBen.id)}/>
                                    </div>
                                    <div className="mb-5">
                                      <p className="text-sm text-gray-light">
                                        {valueBen.content}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </RowSingleGrid>

                            <RowSingleGrid>
                              <TextSmall>Rider Risk</TextSmall>
                              
                              {riderRiskValidation(value.new_rider.id) == false ? 
                                (<>
                                  <span className="w-full text-xs text-left text-red">Required Field</span>
                                </>) 
                                : ''
                              }
                              {value.new_rider.risk?.length > 0 &&
                                value.new_rider.risk.map((valueRisk:any, indexRisk: any) => (
                                  <div
                                    className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                                    key={valueRisk.id}
                                  >
                                    <div className="flex mb-5">
                                      <Checkbox label={valueRisk.title}  name="riderRiskData" isChecked={checkRiderRisk(valueRisk.id, value.new_rider.id)} value={valueRisk.id} onChange={(event) => setRiderRiskAction(event, value.new_rider.id, valueRisk.id)}/>
                                    </div>
                                    <div className="mb-5">
                                      <p className="text-sm text-gray-light">
                                        {valueRisk.content}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </RowSingleGrid>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </>) 
                  : '' }
                </SectionCardSingleGrid>
              </>
            ) : (
              ""
            )}    
          
          </>)

      : ''}

      {section9Recommend.product.type >= 1 ? 
        (
        <>
          <div className="grid grid-cols-1 mx-8 2xl:mx-60">
            <RowDoubleGrid>
              <div>
                <div className="w-full my-4 space-y-3">
                  <label className="w-full text-sm font-bold text-gray-light">
                    Provider Name
                  </label>
                  <select placeholder="Please select data" value={cisDataProvider} name="company"
                    className="w-full px-0 py-2 my-4 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                    onChange={(event) => changeCisDataProvider(event)}>
                    <option value="-">Please select data</option>
                    {dataCompany?.length &&
                      dataCompany.map((val: any, index: any) => (
                        <option key={val.idReal} value={val.idReal}>
                          {val.name}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                  <Select
                    datas={cisDataProduct}
                    label="Product Name"
                    className="my-4"
                    name="portfolio"
                    value={section9Recommend.product.portfolio}
                    handleChange={(event) => changeCISDataProductName(event)}
                  />
                </div>
            </RowDoubleGrid>
            
            {(section9Recommend.product.portfolio >= 1) ? (<>
              <RowSingleGrid>
                <TextSmall>FUND NAME & PERCENTAGE</TextSmall>
                <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
                  <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
                    <thead className="bg-white-bone">
                      <tr className="border-b border-gray-soft-strong">
                        <td className='px-2 py-2 align-top'>
                          <TextSmall className="uppercase text-gray-light">
                            SN
                          </TextSmall>
                        </td>
                        <td className='px-2 py-2 align-top'>
                          <TextSmall className="uppercase text-gray-light">
                            FUND NAME
                          </TextSmall>
                        </td>
                        <td className='px-2 py-2 align-top'>
                          <TextSmall className="uppercase text-gray-light">
                            CODE
                          </TextSmall>
                        </td>
                        <td>
                          <TextSmall>
                            ALLOCATION(%)
                          </TextSmall>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {section9Recommend?.product &&
                            section9Recommend.product.funds.map((dataPlatform: any, indexPlatform:any) => (
                            <tr key={"aassa"+indexPlatform}>
                              <td className="px-2 py-2">
                                <span>{indexPlatform + 1}</span>
                              </td>
                              <td className="px-2 py-2">
                                <span>{dataPlatform.name}</span>
                              </td>
                              <td className="px-2 py-2">
                                {dataPlatform.fundCode}
                              </td>
                              <td className="px-2 py-2">
                                {dataPlatform.allocation}
                              </td>
                            </tr> 
                          )
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </RowSingleGrid>
            </>) : ''}
            
            <RowDoubleGrid>
              <div>
                <Select
                  datas={cisModelPortofolioRisks}
                  label="Model Portofolio Risk Category"
                  className="my-4"
                  name="modelPortfolioRiskCategory"
                  value={section9Recommend.product.modelPortfolioRiskCategory}
                  handleChange={(event) => setProductData(event)}
                />
              </div>
              <div>
                <Select
                  datas={higherThanRiskProfile}
                  label="Higher Than Client Risk Profile"
                  className="my-4"
                  name="higherThanRiskProfile"
                  value={section9Recommend.product.higherThanRiskProfile}
                  handleChange={(event) => setProductData(event)}
                />
              </div>
            </RowDoubleGrid>
            
            <RowDoubleGrid>
              <div>
                <Input label="Premium Payment Type" className="" name="premiumPaymentType" 
                value={section9Recommend.product.premiumPaymentType} 
                handleChange={(event) => setProductData(event)} needValidation={true} 
                logic={section9Recommend.product.premiumPaymentType === null || section9Recommend.product.premiumPaymentType === '' ? false : true}/>
              </div>
              <div>
                <Select
                  datas={dataCISPremiumType}
                  label="Payment Frequency"
                  className=""
                  name="premiumPaymentType"
                  value={section9Recommend.product.premiumPaymentType} 
                  handleChange={(event) => setProductData(event)}
                />
              </div>
            </RowDoubleGrid>
            <RowSingleGrid>
              <div>
                <Input label="Premium ($)" className="" name="premium" value={section9Recommend.product.premium} handleChange={(event) => setProductData(event)} needValidation={true} logic={section9Recommend.product.premium === null || section9Recommend.product.premium === 0 ? false : true}/>
              </div>
            </RowSingleGrid>

            {cisDataBenRisk.length > 0 ? (
              <>
                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {cisDataBenRisk.benefits?.length > 0 ? 
                    (<>
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold">Benefit Details</h2>
                    </div>
                    {cisDataBenRisk.benefits.map((benefit: any, index: any) => (
                      <div className="w-full p-5 border rounded-md border-gray-soft-strong" key={index}>
                        <div className="flex items-center justify-start gap-4 mb-5">
                          <Checkbox label={benefit.title} name="benefitData" isChecked={checkBenefit(benefit.id)} value={benefit.id} onChange={(event) => handleBenefits(event, index) }/>
                        </div>
                        <div>
                          <p className="text-sm text-gray-light">
                            {benefit.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    </>)
                    : ''
                  }
                </SectionCardSingleGrid>

                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {cisDataBenRisk.risk?.length > 0 ? (<>
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold">Risk Details</h2>
                    </div>
                    {cisDataBenRisk.risk.map((risk: any, index: any) => (
                      <div
                        className="w-full p-5 border rounded-md border-gray-soft-strong"
                        key={index}
                      >
                        <div className="flex items-center justify-start gap-4 mb-5">
                          <Checkbox label={risk.title} name="riskData" isChecked={checkRisk(risk.id)} value={risk.id} onChange={(event) => handleRisks(event, index)}/>
                        </div>
                        <div>
                          <p className="text-sm text-gray-light">
                            {risk.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>) 
                  : ''}
                </SectionCardSingleGrid>

                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.riders?.length > 0 ? (<>
                    <div className="flex flex-row items-center justify-between">
                      <h2 className="text-xl font-bold">Rider Details</h2>
                    </div>
                    {dataProductSelected.riders.map((value: any, index: any) => (
                      <div
                        className="w-full p-5 border rounded-md border-gray-soft-strong"
                        key={index}
                      >
                        <div className="flex mb-5">
                          <Checkbox label={value.new_rider.riderName} name="riderData" isChecked={checkRiders(value.new_rider.id)} value={value.new_rider.id} onChange={(event) => setRiderAction(event, index)}/>
                        </div>
                        <div className="mb-5">
                          <p className="text-sm text-gray-light">{value.new_rider.riderFeature}</p>
                        </div>
                        {riderArr[value.new_rider.riderName] === true ? (
                          <div className="space-y-10">
                            <div className="w-full p-5 border rounded-md border-gray-soft-strong">
                              <RowDoubleGrid>
                                <div>
                                  <Input label="Policy Term" className="my-4" name="policyTerm" value={getRiderValue(value.new_rider.id, 'policyTerm')} handleChange={(event) => handleRiderProduct(event, value.new_rider.id)} needValidation={true} logic={getRiderValue(value.new_rider.id, 'policyTerm') === "" || getRiderValue(value.new_rider.id, 'policyTerm') === "-" || !getRiderValue(value.new_rider.id, 'policyTerm')  ? false : true}/>
                                  <Input label="Premium ($)" className="my-4" name="premium" value={getRiderValue(value.new_rider.id, 'premium')} handleChange={(event) => handleRiderProduct(event, value.new_rider.id)} needValidation={true} logic={getRiderValue(value.new_rider.id, 'policyTerm') === "" || getRiderValue(value.new_rider.id, 'premium') === "-" || !getRiderValue(value.new_rider.id, 'premium')  ? false : true}/>
                                </div>
                                <div>
                                  <Input label="Sum Assured" className="my-4" name="sumAssured" value={getRiderValue(value.new_rider.id, 'sumAssured')} handleChange={(event) => handleRiderProduct(event, value.new_rider.id)} needValidation={true} logic={getRiderValue(value.new_rider.id, 'policyTerm') === "" || getRiderValue(value.new_rider.id, 'sumAssured') === "-" || !getRiderValue(value.new_rider.id, 'sumAssured')  ? false : true}/>
                                  <Input label="Name of Insured" className="my-4" name="nameOfInsure" readonly value={getRiderValue(value.new_rider.id, 'nameOfInsure')}  handleChange={(event) => handleRiderProduct(event, value.new_rider.id)}/>
                                </div>
                              </RowDoubleGrid>
                            </div>

                            <RowSingleGrid>
                              <TextSmall>Rider Benefit</TextSmall>
                              
                              {riderBenefitValidation(value.new_rider.id) == false ? 
                                (<>
                                  <span className="w-full text-xs text-left text-red">Required Field</span>
                                </>) 
                                : ''
                              }
                              
                              {value.new_rider.benefit?.length > 0 &&
                                value.new_rider.benefit.map((valueBen: any, indexBen:any) => (
                                  <div
                                    className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                                    key={valueBen.id}
                                  >
                                    <div className="flex mb-5">
                                      <Checkbox label={valueBen.title} name="riderBenefitData" isChecked={checkRiderBenefit(valueBen.id, value.new_rider.id)} value={valueBen.id} onChange={(event) => setRiderBenefitAction(event, value.new_rider.id, valueBen.id)}/>
                                    </div>
                                    <div className="mb-5">
                                      <p className="text-sm text-gray-light">
                                        {valueBen.content}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </RowSingleGrid>

                            <RowSingleGrid>
                              <TextSmall>Rider Risk</TextSmall>
                              
                              {riderRiskValidation(value.new_rider.id) == false ? 
                                (<>
                                  <span className="w-full text-xs text-left text-red">Required Field</span>
                                </>) 
                                : ''
                              }
                              {value.new_rider.risk?.length > 0 &&
                                value.new_rider.risk.map((valueRisk:any, indexRisk: any) => (
                                  <div
                                    className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                                    key={valueRisk.id}
                                  >
                                    <div className="flex mb-5">
                                      <Checkbox label={valueRisk.title}  name="riderRiskData" isChecked={checkRiderRisk(valueRisk.id, value.new_rider.id)} value={valueRisk.id} onChange={(event) => setRiderRiskAction(event, value.new_rider.id, valueRisk.id)}/>
                                    </div>
                                    <div className="mb-5">
                                      <p className="text-sm text-gray-light">
                                        {valueRisk.content}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </RowSingleGrid>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </>) 
                  : '' }
                </SectionCardSingleGrid>
              </>
            ) : (
              ""
            )}  
          </div>
        </>
        )
      : ''}
       <SectionCardFooter className="mx-8 2xl:mx-60">
          <ButtonGreenMedium onClick={() => saveData(91)}>Save</ButtonGreenMedium>
          <ButtonRedMedium onClick={() => cancleData(91)}>Cancel</ButtonRedMedium>
        </SectionCardFooter>
    </>
    );
};

export default AddPlanRecommendation;
