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
import {getWholeContext} from "@/services/pfrService";
import {productFindOne} from "@/services/productService";

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
    setProductRiderArr
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
    console.log("masuk sini nggak global one");
  };

  let dataProductName: Array<any> = [
    { id: 0, name: "Select Product" },
    { id: 1, name: "Product One" },
    { id: 2, name: "Product Two" },
  ];

  let recomendationType: Array<any> = [
    { id: 1, name: "Insurance" },
    { id: 2, name: "CIS" },
  ];

  let dataPaymentFreq: Array<any> = [
    { id: 0, name: "Monthly" },
    { id: 1, name: "Quarterly" },
    { id: 2, name: "Half-Yearly" },
    { id: 3, name: "Annually" },
    { id: 4, name: "Single" },
  ];

  let dataProvider: Array<any> = [
    { id: 1, name: "Singlife" },
    { id: 2, name: "AXA" },
    { id: 3, name: "Hoxing" },
  ];

  let dataPremiumType: Array<any> = [
    { id: 0, name: "CASH" },
    { id: 1, name: "CPF OA" },
    { id: 2, name: "CPF SA" },
    { id: 3, name: "CPF MEDISAVE" },
    { id: 4, name: "SRS" },
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

  const [initWhole, setInitWhole] = useState<any>({});
  // const [pfrData, setpfrData] = useState<any>(initPfrData);
  const [dataDependant, setDataDependant] = useState<any>([{}]);
  const [dataOwner, setDataOwner] = useState<any>([{}]);
  const [dataCompany, setCompany] = useState<any>(null);
  const [dataCategory, setCategory] = useState<any>([{}]);
  const [getSelectProducts, setSelectProducts] = useState<any>([{}]);
  
  const [getSelectedCategory, setSelectedCategory] = useState<any>(-1);
  const [getSelectedCompany, setSelectedCompany] = useState<any>(-1);
  const [getSelectedProduct, setSelectedProduct] = useState<any>(-1);
  const [getIlpFundsOfCompany, setIlpFundsOfCompany] = useState<any>([{}]);
  const [productValueSelect, setProductValueSelect] = useState(0);
  const [dataProductSelected, setDataProductSelected] = useState<any>({});
  const [benefitArr, setBenefitArr] = useState<any>([]);
  const [riderArr, setRiderArr] = useState<any>([]);

  
  useEffect(() => {
    const pfrId = localStorage.getItem("s9_PfrId");
    const resultCateg: Array<any> = []
    const resDataOwner: Array<any> = [];
    getWholeContext(pfrId).then((data) => {
      setInitWhole(data);
      // Get Dependant
      data.dependants.push({id: -1, name: "OTHER"})
      setDataDependant(data.dependants);

      // Get Company
      data.company.map((value: any, k: any) => {
        value['id'] = k;
        return value;
      });
      setCompany(data.company)
      
      // Get Clients
      data.clients.map((value: any, k: any) => {
        value['name'] = value.clientName;
        value['id'] = k;
        resDataOwner.push(value);
      });
      setDataOwner(resDataOwner)

      // Remap Get Categories
      data.category.map((value: any, k: any) => {
        resultCateg.push({
          id: k, 
          name: value.categoryName
        })
      })
      setCategory(resultCateg)
    });
    
    console.log('section9Recommend', section9Recommend)
    
  }, [section9Recommend]);

  const setProductData = (event: any) => {
    const { name, value } = event.target;
    setProduct(value, name, null)
  };

  const changeDataCategory = (event: any) => {
    const { name, value } = event.target;
    var selectedProducts: Array<any> = [];
    setSelectedCategory(value)
    

    const selectedCategoryType = (initWhole.category[value]) ? initWhole.category[value]['type'] : null
    const selectedCategoryId = (initWhole.category[value]) ? initWhole.category[value]['id'] : null
    
    var products = (initWhole.company[getSelectedCompany]) ? initWhole.company[getSelectedCompany]['products'] : null
    if(selectedCategoryType == 1) {  // IF ILP
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
      setProduct("", "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // console.log('categoryId', product['categoryId'])
          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      section9Recommend.product.modelPortfolioRiskCategory = Number(initWhole.section5Result[section9Recommend.product.nameOfOwner])
      const ilpFundsOfCompany = initWhole.ilpFunds.filter((fund:any, k:any) => {
        return fund['company'] == initWhole.company[getSelectedCompany]['id']
      })

      setIlpFundsOfCompany(ilpFundsOfCompany);
    }

    setSelectProducts(selectedProducts);
  };

  const changeDataProvider = (event: any) => {
    const { name, value } = event.target;
    console.log('value', value)
    var selectedProducts: Array<any> = [];
    setSelectedCompany(value)
    
    const selectedCategoryType = (initWhole.category[getSelectedCategory]) ? initWhole.category[getSelectedCategory]['type'] : null
    const selectedCategoryId = (initWhole.category[getSelectedCategory]) ? initWhole.category[getSelectedCategory]['id'] : null
    var products = (initWhole.company[value]) ? initWhole.company[value]['products'] : null
    
    if(selectedCategoryType == 1) {  // IF ILP
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
      setProduct("", "premiumType", null)
      if(products){
        products.map((product: any, k: any) => {
          // console.log('categoryId', product['categoryId'])

          if(product['categoryId'] == selectedCategoryId) {
            selectedProducts.push(product)
          }
        })
      }
    }

    if(selectedCategoryType == 1){
      section9Recommend.product.modelPortfolioRiskCategory = Number(initWhole.section5Result[section9Recommend.product.nameOfOwner])
      const ilpFundsOfCompany = initWhole.ilpFunds.filter((fund:any, k:any) => {
        return fund['company'] == initWhole.company[getSelectedCompany]['id']
      })

      setIlpFundsOfCompany(ilpFundsOfCompany);
    }

    setSelectProducts(selectedProducts);
  };

  const changeDataProductName = (params: any) => {
    setProductValueSelect(params);
    // Get One Product
    productFindOne(params).then((data) => {
      setProduct(data.product.name, 'name', null)
      setDataProductSelected(data)
    });

  };

  const handleBenefits = (event: any, index: any) => {
    const { name, value } = event.target;
    var resBenefit: Array<any> = [];
    dataProductSelected.benefits.map((valueBenefit: any, index: any) => {
      if(valueBenefit.id == value){
        resBenefit.push({benefitId:value,content:valueBenefit.content,title:valueBenefit.title})
      }
    });

    if(section9Recommend.product.benefit.length > 0){
      section9Recommend.product.benefit.map((resBen: any, resIBen:any) => {
        if(resBen.benefitId != value){
          resBenefit.push({benefitId:resBen.benefitId,content:resBen.content,title:resBen.title});
        }
      });
      
      if(resBenefit.length > 0){
        var resBenefit2: Array<any> = [];
        resBenefit.filter((vData:any, index:any) => {
          if(vData.benefitId != value){
            resBenefit2.push(vData);
          }
        });
        setProductArr(resBenefit2, 'benefit', null);
      }
    }else{
      setProductArr(resBenefit, 'benefit', null);
    }
  }

  const checkBenefit = (data: any) => {
    if(section9Recommend.product.benefit.length > 0){
      section9Recommend.product.benefit.map((value: any, index: any) => {
        if(data == value.benefitId){
          return true;
        }
      })
    }else{
      return false;
    }
  }

  const handleRisks = (event: any, index: any) => {
    const { name, value } = event.target;
    var resRisk: Array<any> = [];
    dataProductSelected.risks.map((valueRisk: any, index: any) => {
      if(valueRisk.id == value){
        resRisk.push({riskId:value,content:valueRisk.content,title:valueRisk.title})
      }
    });

    if(section9Recommend.product.risk.length > 0){
      section9Recommend.product.risk.map((resProdRisk: any, resIRisk:any) => {
        if(resProdRisk.riskId != value){
          resRisk.push({riskId:resProdRisk.riskId,content:resProdRisk.content,title:resProdRisk.title});
        }
      });

      if(resRisk.length > 0) {
        var resRisk2: Array<any> = [];
        resRisk.map((vData: any, index:any) => {
          if(vData.riskId != value){
            resRisk2.push(vData)
          }
        })
        setProductArr(resRisk2, 'risk', null);
      }
    }else{
      setProductArr(resRisk, 'risk', null);
    }
  }

  const checkRisk = (data: any) => {
    if(section9Recommend.product.risk.length > 0){
      section9Recommend.product.risk.map((value: any, index: any) => {
        if(data == value.riskId){
          return true;
        }
      })
    }else{
      return false;
    }
  }

  const setRiderAction = (event: any, index: any) => {
    const { name, value } = event.target;
    console.log('dataProductSelected', dataProductSelected)

    var resRiders: Array<any> = [];
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

    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((vRider: any, resIRider:any) => {
        if(parseInt(vRider.subjectId) != value){
          resRiders.push(vRider);
        }
      });

      if(resRiders.length > 0) {
        var resRiders2: Array<any> = [];
        resRiders.map((valueRes: any, index:any) => {
          if(valueRes.subjectId.toString() != value.toString()){
            resRiders2.push(valueRes);
          }
        })
        setProductRiderArr(resRiders2, 'riders', null);
      }
    }else{
      setProductRiderArr(resRiders, 'riders', null);
    }
  }

  const checkRiders = (data: any) => {
    if(section9Recommend.riders.length > 0){
      section9Recommend.riders.map((value: any, index: any) => {
        if(data == parseInt(value.subjectId)){
          return true;
        }
      })
    }else{
      return false;
    }
  }

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };
  
  return (
    <>
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
      {section9Recommend.product.type == 1 ? 
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
                            className="my-4 w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
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
                        <Input label="Premium Amounts" className="" name="premium" value={section9Recommend.product.premium} handleChange={(event) => setProductData(event)}/>
                      </div>
                      <div>
                        <Input label="Sum Assured" className="" name="sumAssured" value={section9Recommend.product.sumAssured} handleChange={(event) => setProductData(event)}/>
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
                        <Input label="Policy Term Years" className="" name="policyTerm" value={section9Recommend.product.policyTerm} handleChange={(event) => setProductData(event)}/>
                      </div>
                    </RowDoubleGrid>
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
                <HeadingSecondarySection className="mx-8 2xl:mx-60">Benefit Details</HeadingSecondarySection>
                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.benefits?.length > 0 &&
                    dataProductSelected.benefits.map((benefit: any, index: any) => (
                      <div
                        className="w-full p-5 border rounded-md border-gray-soft-strong"
                        key={index}
                      >
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
                </SectionCardSingleGrid>

                <HeadingSecondarySection className="mx-8 2xl:mx-60">Risk Details</HeadingSecondarySection>
                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.risks?.length > 0 &&
                    dataProductSelected.risks.map((risk: any, index: any) => (
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
                </SectionCardSingleGrid>

                <HeadingSecondarySection className="mx-8 2xl:mx-60">Rider Details</HeadingSecondarySection>
                <SectionCardSingleGrid className="mx-8 space-y-10 2xl:mx-60">
                  {dataProductSelected.riders?.length > 0 &&
                    dataProductSelected.riders.map((value: any, index: any) => (
                      <div
                        className="w-full p-5 border rounded-md border-gray-soft-strong"
                        key={index}
                      >
                        <div className="flex mb-5">
                          <Checkbox label={value.new_rider.riderName} name="riskData" isChecked={checkRiders(value.new_rider.id)} value={value.new_rider.id} onChange={(event) => setRiderAction(event, index)}/>
                        </div>
                        <div className="mb-5">
                          <p className="text-sm text-gray-light">{value.new_rider.riderFeature}</p>
                        </div>
                        {riderArr[index] === true ? (
                          <div className="space-y-10">
                            <div className="w-full p-5 border rounded-md border-gray-soft-strong">
                              <RowDoubleGrid>
                                <div>
                                  <Input label="Policy Term" className="my-4" />
                                  <Input label="Premium ($)" className="my-4" />
                                </div>
                                <div>
                                  <Input label="Sum Assured" className="my-4" />
                                  <Input label="Name of Insured" className="my-4" />
                                </div>
                              </RowDoubleGrid>
                            </div>

                            <RowSingleGrid>
                              <TextSmall>Rider Benefit</TextSmall>

                              {value.new_rider.benefit?.length > 0 &&
                                value.new_rider.benefit.map((valueBen: any, indexBen:any) => (
                                  <div
                                    className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                                    key={valueBen.id}
                                  >
                                    <div className="flex mb-5">
                                      <Checkbox label={valueBen.title}
                                      />
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

                              {value.new_rider.risk?.length > 0 &&
                                value.new_rider.risk.map((valueRisk:any, indexRisk: any) => (
                                  <div
                                    className="w-full p-5 mb-5 border rounded-md border-gray-soft-strong"
                                    key={valueRisk.id}
                                  >
                                    <div className="flex mb-5">
                                      <Checkbox label={valueRisk.title}
                                      />
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
                </SectionCardSingleGrid>
                <SectionCardFooter className="mx-8 2xl:mx-60">
                  <ButtonGreenMedium onClick={() => saveData(91)}>Save</ButtonGreenMedium>
                  <ButtonRedMedium>Cancel</ButtonRedMedium>
                </SectionCardFooter>
              </>
            ) : (
              ""
            )}    
          
          </>)

        : ('')}
    </>
    );
};

export default AddPlanRecommendation;
