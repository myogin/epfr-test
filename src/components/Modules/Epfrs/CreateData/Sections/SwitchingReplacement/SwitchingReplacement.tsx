import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDouble from "@/components/Attributes/Rows/Flexs/RowDouble";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import ButtonTransparentMedium from "@/components/Forms/Buttons/ButtonTransparentMedium";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { getLength } from "@/libs/helper";
import { getAllPfrData, getPfrStep, postPfrSections } from "@/services/pfrService";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import LoaderPage from "./components/LoaderPage";

interface Props {
  id?: any;
  pfrType: number;
}

const SwitchingReplacement = (props: Props) => {
  const scrollPosition = useScrollPosition(10);
  const scrollPositionNext = useScrollPosition(11);
  const scrollPositionBottomSection9 = useScrollPositionBottom(9);
  const [pfrId, setPfrId] = useState(0);
  const [editable, setEditable] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  let getPfrLength = getLength(props.pfrType);

  const fillInformation = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  const premiumTypes: Array<any> = [
    { id: "0", name: "Premium(Single)" },
    { id: "1", name: "Premium(Annual)" },
    { id: "2", name: "Investment" },
  ];

  const clientTypes = getPfrLength.map((data, index) => ({
    id: index,
    name: `Client ${index + 1}`,
  }));

  const productData = {
    index: -1,
    owner: 0,
    companyName: "",
    typeOfProduct: "",
    premium: "0",
    premiumType: 0,
    benefit: "",
    Inception: "",
    Maturity: "",
  };

  const sectionData = {
    answer1: {
      a: {
        answer: 0,
        reason: "",
      },
      b: 0,
    },
    answer2: 0,
    answer3: "",
    answer4: {
      companyName: null,
      typeOfProduct: null,
      premium: 0,
      premiumType: null,
      benefit: null,
      inceptionDate: null,
      maturityDate: null,
    },
    answer5: 0,
    answer6: 0,
    answer7: 0,
    answer8: 0,
    answer9: 0,
    answer10: 0,
  };

  const products: any[] = [];

  const [showReason, setShowReason] = useState([0, 0]);
  const [showReasonTwo, setShowReasonTwo] = useState([0, 0]);
  const [showProductDetailTable, setShowProductDetailTable] = useState(0);
  const [newProduct, setNewProduct] = useState(productData);
  const [newProductErrors, setNewProductErrors] = useState<Array<any>>([]);
  const [dataRowCompleted, setDataRowCompleted] = useState([false, false]);
  const [sectionTenData, setSectionTenData] = useState({
    id: pfrId,
    need: 0,
    data: [sectionData, sectionData],
    issues: Array<any>(),
    originalProduct: products,
    originalProductAlias: products,
    status: 0,
  });

  const setData = (params: any, index: number) => {
    setShowReason(
      showReason.map((data, i) => {
        if (i == index) {
          return params;
        } else {
          return data;
        }
      })
    );
    setSectionTenData({
      ...sectionTenData,
      data: sectionTenData.data?.map((item, i) => {
        if (i == index) {
          return {
            ...item,
            answer1: {
              ...item.answer1,
              a: {
                ...item.answer1.a,
                answer: params,
              },
            },
          };
        } else {
          return item;
        }
      }),
    });
  };

  const setDataTwo = (params: any, index: number) => {
    setShowReasonTwo(
      showReasonTwo.map((data, i) => {
        if (i == index) {
          return params;
        } else {
          return data;
        }
      })
    );
    setSectionTenData({
      ...sectionTenData,
      data: sectionTenData.data?.map((item, i) => {
        if (i == index) {
          return {
            ...item,
            answer1: {
              ...item.answer1,
              b: params,
            },
            answer5: 1,
            answer6: 1,
            answer7: 1,
            answer8: 1,
            answer9: 1,
            answer10: 1,
          };
        } else {
          return item;
        }
      }),
    });
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalEdit = (params: any) => {
    setNewProduct({
      ...sectionTenData.originalProduct[params],
      index: params,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setNewProductErrors([]);
    setNewProduct(productData);
    setShowModal(false);
  };

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const addProductData = () => {
    const errors = checkNewProduct();
    if (errors.length) return;

    const productList = sectionTenData.originalProduct;

    if (newProduct.index !== -1) {
      productList[newProduct.index] = newProduct;
    } else {
      productList.push(newProduct);
    }

    setNewProduct(productData);
    setSectionTenData({
      ...sectionTenData,
      originalProduct: productList,
    });
    closeModal();
  };

  const removeProductData = (index: any) => {
    const productList = sectionTenData.originalProduct;
    productList.splice(index, 1);
    setSectionTenData({
      ...sectionTenData,
      originalProduct: productList,
    });
  };

  const checkNewProduct = () => {
    let errors = [];
    if (newProduct.owner < 0) {
      errors.push({ name: "Client" });
    }

    if (newProduct.companyName.trim() === "") {
      errors.push({ name: "Company Name" });
    }

    if (newProduct.typeOfProduct.trim() === "") {
      errors.push({ name: "Type Of Product" });
    }

    if (newProduct.premium.trim() === "0") {
      errors.push({ name: "Premium Amount" });
    }

    if (newProduct.premiumType < 0) {
      errors.push({ name: "Premium Type" });
    }

    if (newProduct.benefit.trim() === "") {
      errors.push({ name: "Benefit Provided" });
    }

    setNewProductErrors(errors);
    return errors;
  };

  const [saveLoading, setSaveLoading] = useState(false);

  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section10")
        ? localStorage.getItem("section10")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data;
      }

      await postPfrSections(10, JSON.stringify(dataFix));

      setSaveLoading(false); // Stop loading
      console.log('stored data editable: ', 1);
      setEditable(1);
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  const getStatus = () => {
    sectionTenData.issues = [];

    // for(let i = 0 ; i < getPfrLength ; i ++ ) {
    getPfrLength.map((data, i) => {
      if(sectionTenData.data[i]?.answer1.a.answer == 1 && (sectionTenData.data[i]?.answer1.a.reason == '' || sectionTenData.data[i]?.answer1.a.reason == undefined)) {
        sectionTenData.issues.push({
          subsectionId : 1,
          content : "Need to explain the reason",
          clientId : i + 1
        })
      }
      if(sectionTenData.data[i]?.answer1.b == 1 && (sectionTenData.data[i]?.answer3 == '' || sectionTenData.data[i]?.answer3 == undefined)) {
        sectionTenData.issues.push({
          subsectionId : 3,
          content : "Need to explain the reason",
          clientId : i + 1
        })
      }

      if(dataRowCompleted[i]) {
        sectionTenData.issues.push({
          subsectionId : 3,
          content : "Need to complete point 2 - 10",
          clientId : i + 1
        })
      }
    });

    if(sectionTenData.issues.length == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  const validationPoint = (i:number) => {
    var dataCount = 0;
    if(sectionTenData.originalProduct.length > 0){
      sectionTenData.originalProduct.forEach(function(v, k){
        if(v.companyName){
          if(v.companyName == '' || v.companyName == null || v.companyName == undefined){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.typeMaturity){
          if(v.typeMaturity == '' || v.typeMaturity == null || v.typeMaturity == undefined || v.typeMaturity == 0){ 
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.typeOfProduct){
          if(v.typeOfProduct == '' || v.typeOfProduct == null || v.typeOfProduct == undefined){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.premium){
          if(v.premium == '' || v.premium == null || v.premium == undefined){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.premiumType){
          if(v.premiumType == '' || v.premiumType == null || v.premiumType == undefined || v.premiumType == 0){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }
        
        if(v.benefit){
          if(v.benefit == '' || v.benefit == null || v.benefit == undefined || v.benefit == 0){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }
      });

      // check if section 4 error
      if(dataCount > 0){

        // If Joint
        if(props.pfrType > 1){
          var dataResI = 0;
          getPfrLength.map((data, indexType) => {
            if(sectionTenData.data[indexType].answer1.b == 1){
              dataResI += 1;
            }
          })

          if(dataResI > 1){
            setDataRowCompleted([true, true]);
          }
          // else{
          //   if(sectionTenData.data[i].answer3){
          //     this.dataRowCompleated[i] = false;
          //   }else{
          //     this.dataRowCompleated[i] = true;
          //   }
          // }

        // If Not Joint
        }else{
          // if(sectionTenData.data[i].answer3){
          //   this.dataRowCompleated[i] = false;
          // }else{
          //   this.dataRowCompleated[i] = true;
          // } 
          let temp = dataRowCompleted;
          temp[i] = true;
          setDataRowCompleted(temp);
        }

      // Else if point 4 not error
      }else{
        getPfrLength.map((data, indexType) => {
          if(sectionTenData.data[indexType].answer1.b == 1){
            if(sectionTenData.data[indexType].answer3 === '' || sectionTenData.data[indexType].answer3 === null || sectionTenData.data[indexType].answer3 === undefined){
              console.log('false', indexType)
              let temp = dataRowCompleted;
              temp[indexType] = true;
              setDataRowCompleted(temp);
            }else{
              let temp = dataRowCompleted;
              temp[indexType] = false;
              setDataRowCompleted(temp);
            }
          }
        });
      }
      
    }else{
      if(sectionTenData.data[i].answer3){
        let temp = dataRowCompleted;
        temp[i] = false;
        setDataRowCompleted(temp);
      }else{
        let temp = dataRowCompleted;
        temp[i] = true;
        setDataRowCompleted(temp);
      }
    }
  }

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (pfrId == 0) return;

    try {
      setLoading(true); // Set loading before sending API request
      setIsFetched(true);

    const res1 = await getAllPfrData(pfrId);
    console.log('fetch data');
    setSectionTenData({
      ...sectionTenData,
      status: Number(res1['pfr']['status']),
    })

    const data = await getPfrStep(10, pfrId);
    
    let answers = data['data'];
    let originalProducts = data['originalProducts']
    let need = data['need']
    if(need != null) {
      setSectionTenData({
        ...sectionTenData,
        need: need['need']
      });
    }

    if(answers.length != 0) {
      getPfrLength.map((data: any, index: number) => {
      // answers.forEach((answer:any, index: number) => {
        let answer = answers[index];
        console.log("Answer of Index ", index, " :", answer['answer1a']);
        setShowReason([answers[0]['answer1a'], answers[1]['answer1a']]);
        setShowReasonTwo([answers[0]['answer1b'], answers[1]['answer1b']]);
        setSectionTenData({
          ...sectionTenData,
          data: sectionTenData.data?.map((item, i) => {
            if (i == index) {
              return {
                ...item,
                answer1: {
                  a: {
                    answer: answer['answer1a'],
                    reason: answer['reason1a']
                  },
                  b : answer['answer1b'],
                },
                answer2: answer['answer2'],
                answer3: answer['answer3'],
                answer4: {
                  companyName : answer['companyName'],
                  typeOfProduct : answer['typeOfProduct'],
                  premium : answer['premium'],
                  premiumType : answer['premiumType'],
                  typeMaturity: answer['typeMaturity'],
                  benefit : answer['benefit'],
                  inceptionDate : answer['inception'],
                  maturityDate : answer['maturity'],
                },
                answer5: answer['answer5'],
                answer6: answer['answer6'],
                answer7: answer['answer7'],
                answer8: answer['answer8'],
                answer9: answer['answer9'],
                answer10: answer['answer10'],
              }
            } else {
              return item;
            }
          }),
        })
        // sectionTenData.data.push(
        //   new Answer().setData(answer)
        // )
      })
    }

    originalProducts.forEach((product: any) => {
      let p : any = product;

      const todayDate = new Date()
      todayDate.setDate(todayDate.getDate() - 1)

      if(p.Inception !== "") {
        p.InceptionBsDate =  new Date(p.Inception)
      }else {

        p.InceptionBsDate =  new Date(todayDate.toString())
      }

      p.MaturityBsDate = new Date(p.Maturity)
      sectionTenData.originalProduct.push(p)

      let pAlias : any = product;

      if(pAlias.Inception !== "") {

        pAlias.InceptionBsDate =  new Date(pAlias.Inception)
      }else {

        pAlias.InceptionBsDate =  new Date(todayDate.toString())
      }

      pAlias.MaturityBsDate = new Date(pAlias.Maturity)
      sectionTenData.originalProductAlias.push(pAlias)
    })
    
    checkValidation();
    setLoading(false); // Set loading before sending API request
    } catch (error) {
      setLoading(false); // Set loading before sending API request
      console.error(error);
    }

    
  }

  const checkValidation = async () => {
    const res = await getAllPfrData(pfrId);
    var dataCount = 0;
    var dataResultCount = 0;
    if(sectionTenData.originalProduct.length > 0){
      sectionTenData.originalProduct.forEach(function(v, k){
        if(v.companyName){
          if(v.companyName == '' || v.companyName == null || v.companyName == undefined){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }
        if(v.typeMaturity){
          if(v.typeMaturity == '' || v.typeMaturity == null || v.typeMaturity == undefined || v.typeMaturity == 0){ 
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.typeOfProduct){
          if(v.typeOfProduct == '' || v.typeOfProduct == null || v.typeOfProduct == undefined){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.premium){
          if(v.premium == '' || v.premium == null || v.premium == undefined){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }

        if(v.premiumType){
          if(v.premiumType == '' || v.premiumType == null || v.premiumType == undefined || v.premiumType == 0){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }
        
        if(v.benefit){
          if(v.benefit == '' || v.benefit == null || v.benefit == undefined || v.benefit == 0){
            dataCount += 1;
          }
        }else{
          dataCount += 1;
        }
      });

      if(dataCount > 0){
        if(Number(res['pfr']['type']) > 1){
          var dataResI = 0;
          for (let indexType = 0; indexType < Number(res['pfr']['type']); indexType++) {
            if(sectionTenData.data[indexType].answer1.b == 1){
              dataResI += 1;
            }
          }

          if(dataResI > 1){
            // this.dataRowCompleated = [true, true];
            dataResultCount = 2
          }else{
            // this.dataRowCompleated[0] = true;
            dataResultCount = 1
          }
        }else{
          // this.dataRowCompleated[0] = true;  
          dataResultCount = 1
        }
      }else{
        // this.dataRowCompleated = [false, false];
        dataResultCount = 0
      }
    }

    var dataResult1 = 0;
    for (let indexType = 0; indexType < Number(res['pfr']['type']); indexType++) {
      if(sectionTenData.data[indexType].answer1.b == 1){
        if(sectionTenData.data[indexType].answer3 === '' || sectionTenData.data[indexType].answer3 === null || sectionTenData.data[indexType].answer3 === undefined){
          dataResult1 += 1
        }
      }
    }

    if(dataResultCount > 1){
      setDataRowCompleted([true, true]);
    }else if(dataResultCount == 1){
      let temp = dataRowCompleted;
      temp[0] = true;
      setDataRowCompleted(temp);
    }else{
      if(dataResult1 > 1){
        setDataRowCompleted([true, true]);
      }else if(dataResult1 == 1){
        let temp = dataRowCompleted;
        temp[0] = true;
        setDataRowCompleted(temp);
      }else{
        setDataRowCompleted([false, false]);
      }
    }
  }

  const router = useRouter();
  let pfrLocal = usePfrData((state) => state.pfr);

  // useEffect(() => {
  //   // if (scrollPositionBottomSection9 === "Process9" && sectionTenData.id === 0) {
  //   //   const section1 = JSON.parse(localStorage.getItem('section1')?? '{}');
  //     // setPfrId(section1?.state?.id);
  //   //   setSectionTenData({
  //   //     ...sectionTenData,
  //   //     id: section1?.state?.id
  //   //   });
  //   // }

  //   if (!router.isReady) return;
  //   setIsFetched(true);
  //   // If edit check the ID
  //   if (router.query.id !== null && router.query.id !== undefined) {
  //     setPfrId(Number(router.query.id));
  //     // if (scrollPositionBottomSection9 === "Process9") {
  //     if (sectionTenData.id != Number(router.query.id)) {
  //       setSectionTenData({
  //         ...sectionTenData,
  //         id: Number(router.query.id),
  //         status: pfrLocal.section10
  //       });
  //       console.log('query editable: ',pfrLocal.editableSection10);
  //       setEditable(pfrLocal.editableSection10??0);
  //     }
  //   }else {
  //     // if (scrollPositionBottomSection9 === "Process9") {
  //     const section1 = JSON.parse(localStorage.getItem('section1')?? '{}');
  //     setPfrId(Number(section1?.state?.id));
  //     if (sectionTenData.id != Number(section1?.state?.id)) {
  //       console.log("section fetching ...", isFetched);
  //       console.log("section Id: ", sectionTenData.id, " | one Id: ", section1?.state?.id);
  //       setSectionTenData({
  //         ...sectionTenData,
  //         id: Number(section1?.state?.id),
  //         status: pfrLocal.section10
  //       });
  //       // console.log('section one editable: ', pfrLocal.editableSection10);
  //       // setEditable(pfrLocal.editableSection10??0);
  //     }
  //   }

  //   if (scrollPositionBottomSection9 === 'Process9') {
  //     setEditable(pfrLocal.editableSection11??0);
  //     fetchData();
  //   }

  // }, [scrollPositionBottomSection9, router.isReady, router.query.id]);

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
        if (scrollPositionBottomSection9 === "Process9") {
        if (sectionTenData.id != Number(router.query.id)) {
          setSectionTenData({
            ...sectionTenData,
            id: Number(router.query.id),
            status: pfrLocal.section11
          });
        }
      }else {
        // if (scrollPositionBottomSection9 === "Process9") {
          const section1 = JSON.parse(localStorage.getItem('section1')?? '{}');
        if (sectionTenData.id != Number(section1?.state?.id)) {
          setSectionTenData({
            ...sectionTenData,
            id: Number(section1?.state?.id),
            status: pfrLocal.section10
          });
        }
      }
      if (scrollPositionBottomSection9 == 'Process9') {
        setEditable(pfrLocal.editableSection11??0);
        fetchData();
      }
    // }
  }, [scrollPositionBottomSection9, router.isReady, router.query.id]);

  useEffect(() => {
    getPfrLength.map((data, index) => {
      if (showReasonTwo[index] == 0) {
        const productList = sectionTenData.originalProduct.filter(
          (val) => val.owner !== index
        );
        setSectionTenData({
          ...sectionTenData,
          originalProduct: productList,
        });
      }
    });
  }, [showReasonTwo]);

  useEffect(() => {
    if (editable === 1 && sectionTenData.status === 1 && !isFetched) {
      setEditable(2);
    }
    const tempStatus = getStatus();
    if (tempStatus !== sectionTenData.status) {
      setSectionTenData({
        ...sectionTenData,
        status: tempStatus
      })
    }
    localStorage.setItem("section10", JSON.stringify({
      ...sectionTenData,
      editableStatus: editable
    }));
    setIsFetched(false);
  }, [sectionTenData]);

  useEffect(() => {
    localStorage.setItem('section10', JSON.stringify({
      ...sectionTenData,
      editableStatus: editable
    }));
  }, [editable]);

  useEffect(() => {
    console.log("Scroll Pos editable: ", editable);
    if (scrollPositionNext === "okSec11") {
      // setSectionTenData({
      //   ...sectionTenData,
      //   status: getStatus()
      // })
      if (
        (editable === 0 && sectionTenData.status === 1) ||
        (editable === 2 && sectionTenData.status === 1)
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
    <div id={props.id}>
      <div
        id="section-header-10"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec10" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec10"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 10. Switching / Replacement
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
        {/* {props.pfrType && props.pfrType > 1 && (
          <RowDouble className="mb-10">
            {getPfrLength.map((data, index) => (
              <div className="flex-1">
                <h3
                  key={"heading-secondary-" + index}
                  className="w-full mb-4 text-base font-bold text-green-deep">
                  Client {index + 1}
                </h3>
              </div>
            ))}
          </RowDouble>
        )} */}
        <TextThin className="mb-5">
          1a. Have you withdrawn / surrendered / terminated, in part or in full
          any existing insurance policy or investment product within the last 12
          months?
        </TextThin>
        <RowDouble className="mb-10">
          {getPfrLength?.length &&
            getPfrLength.map((data, index) => {
              return (
                <div key={"asas" + index} className="flex-1">
                  <TextThin>Client {index + 1}</TextThin>
                  <Select
                    value={showReason[index]}
                    datas={fillInformation}
                    handleChange={(event) =>
                      setData(eval(event.target.value), index)
                    }
                  />
                  {showReason.includes(1) ? (
                    <RowSingleGrid>
                      <TextArea
                        isDisabled={sectionTenData.data[index]?.answer1?.a?.answer==0}
                        label="Please state reasons:"
                        defaultValue={
                          sectionTenData.data[index]?.answer1?.a?.reason
                        }
                        needValidation={
                          showReason[index] == 1 &&
                          sectionTenData.data[
                            index
                          ]?.answer1?.a?.reason.trim() == ""
                        }
                        handleChange={function (event) {
                          setSectionTenData({
                            ...sectionTenData,
                            data: sectionTenData.data?.map((item, i) => {
                              if (i == index) {
                                return {
                                  ...item,
                                  answer1: {
                                    ...item.answer1,
                                    a: {
                                      ...item.answer1.a,
                                      reason: event.target.value,
                                    },
                                  },
                                };
                              } else {
                                return item;
                              }
                            }),
                          });
                        }}
                      />
                    </RowSingleGrid>
                  ) : null}
                </div>
              );
            })}
        </RowDouble>

        {/* Question 1.b */}
        <TextThin className="mb-5">
          1b. Are you switching / replacing in part or in full any existing
          insurance policy or investment product purchased from Legacy FA Pte
          Ltd or any other Financial Institution(s)?
        </TextThin>
        <RowDouble className="mb-10">
          {getPfrLength?.length &&
            getPfrLength.map((data, index) => (
              <div key={"sdds" + index} className="flex-1">
                <TextThin>Client {index + 1}</TextThin>
                <Select
                  value={showReasonTwo[index]}
                  datas={fillInformation}
                  handleChange={(event) =>
                    setDataTwo(eval(event.target.value), index)
                  }
                />
              </div>
            ))}
        </RowDouble>
        {showReasonTwo.includes(1) ? (
          <>
            <TextThin className="mb-5">
              2. Is the switch / replacement of insurance policy and/or
              investment product advised by the Representative ?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asasa" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer2
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer2: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <TextThin className="mb-5">
              3. What are the reason(s) for switching / replacing your insurance
              policy and/or investment product?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"saas" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <TextArea
                      label="Please state reasons:"
                      defaultValue=""
                      needValidation={
                        showReasonTwo[index] == 1 &&
                        sectionTenData.data[index]?.answer3.trim() == ""
                      }
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer3: event.target.value
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                        validationPoint(index);
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <div className="mb-5">
              <RowSingleGrid>
                <TextThin>4. Do you have details of original product?</TextThin>
                <Select
                  value={showProductDetailTable}
                  datas={fillInformation}
                  handleChange={function (event) {
                    setShowProductDetailTable(eval(event.target.value));
                  }}
                />
              </RowSingleGrid>
            </div>

            {showProductDetailTable === 1 && (
              <SectionCardSingleGrid>
                <div className="w-full">
                  <ButtonBox onClick={openModal} className="text-green-deep">
                    <AddLineIcon />
                  </ButtonBox>

                  <Transition appear show={showModal} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
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
                            <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Original Product
                              </Dialog.Title>
                              <div className="mt-2">
                                <div className="flex">
                                  <div className={`w-full my-4 space-y-3`}>
                                    <label
                                      htmlFor=""
                                      className="w-full text-sm font-bold text-gray-light"
                                    >
                                      Client
                                    </label>

                                    <select
                                      name="clientName"
                                      className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
                                      onChange={(e) => {
                                        console.log(e.target.selectedIndex);
                                        setNewProduct({
                                          ...newProduct,
                                          owner: e.target.selectedIndex,
                                        });
                                      }}
                                    >
                                      {getPfrLength.map((data, index) => {
                                        if (showReasonTwo[index] === 1) {
                                          return (
                                            <option key={index} value={index}>
                                              Client {index + 1}
                                            </option>
                                          );
                                        }
                                      })}
                                    </select>
                                  </div>
                                  {/* <Select
                                    className="my-4"
                                    label="Client"
                                    name="clientName"
                                    datas={getPfrLength.map((data, index) => {
                                      if (showReasonTwo[index] === 1) {
                                        return {id: 0, name: `Client`};
                                      } else {
                                        return;
                                      }
                                    })}
                                    handleChange={(e) =>{
                                      setNewProduct({
                                        ...newProduct,
                                        owner: e.target.selectedIndex - 1,
                                      });
                                    }}
                                  /> */}
                                  {/* <Input
                                  className="my-4"
                                  label="Client"
                                  name="clientName"
                                  type="text"
                                  value={newProduct.owner}
                                  placeholder="Client name"
                                  handleChange={(e) =>
                                    console.log(e.target.value)
                                  }
                                /> */}
                                </div>
                                <div className="flex">
                                  <Input
                                    className="my-4"
                                    label="Company Name"
                                    name="companyName"
                                    type="text"
                                    value={newProduct.companyName}
                                    handleChange={(e) =>
                                      setNewProduct({
                                        ...newProduct,
                                        companyName: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex">
                                  <Input
                                    className="my-4"
                                    label="Type Of Product"
                                    name="typeOfProduct"
                                    type="text"
                                    value={newProduct.typeOfProduct}
                                    handleChange={(e) =>
                                      setNewProduct({
                                        ...newProduct,
                                        typeOfProduct: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex">
                                  <Select
                                    className="my-4"
                                    label="Premium/Investment"
                                    name="premiumType"
                                    datas={premiumTypes}
                                    value={newProduct.premiumType}
                                    handleChange={(e) =>
                                      setNewProduct({
                                        ...newProduct,
                                        premiumType: e.target.selectedIndex,
                                      })
                                    }
                                  />
                                  {/* <DatePicker className="w-full px-0 py-2 my-4 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong" selected={newProduct.dateOfBirth} onChange={(date) => checkBirthDate(date)} /> */}
                                  {/* <Input
                                    className="my-4"
                                    label="Date Of Birth"
                                    type="date"
                                    name="dateOfBirth"
                                    value={newProduct.dateOfBirth}
                                    handleChange={(event) =>
                                      checkBirthDate(event.target.value)
                                    }
                                  /> */}
                                </div>
                                <div className="flex">
                                  <Input
                                    onWheel={(e) => e.currentTarget.blur()}
                                    className="my-4"
                                    label="Premium Amount"
                                    name="premium"
                                    type="number"
                                    value={newProduct.premium}
                                    handleChange={(e) =>
                                      setNewProduct({
                                        ...newProduct,
                                        premium: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex">
                                  <Input
                                    className="my-4"
                                    label="Benefit Provided"
                                    name="benefit"
                                    type="text"
                                    value={newProduct.benefit}
                                    handleChange={(e) =>
                                      setNewProduct({
                                        ...newProduct,
                                        benefit: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              {newProductErrors.length > 0 && (
                                <div className="mt-4">
                                  {newProductErrors.map(({ name }) => (
                                    <p
                                      key={name}
                                      style={{ fontSize: "14px", color: "red" }}
                                    >
                                      - {name} is required
                                    </p>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-4 mt-4">
                                <ButtonGreenMedium onClick={addProductData}>
                                  Save
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
                </div>
                {sectionTenData?.originalProduct.length > 0 && (
                  <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
                    <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
                      <thead className="text-left bg-white-bone">
                        <tr className="border-b border-gray-soft-strong">
                          <th className="px-2 py-5">SN</th>
                          <th className="px-2 py-5">Client</th>
                          <th className="px-2 py-5">Company Name</th>
                          <th className="px-2 py-5">Type Of Product</th>
                          <th className="px-2 py-5">
                            Premium/Investment Amount
                          </th>
                          <th className="px-2 py-5">Benefits Provided</th>
                          <th className="px-2 py-5"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectionTenData.originalProduct.map((data, index) => (
                          <tr className="test" key={"product-" + index}>
                            <td className="px-2 py-5">{index + 1}</td>
                            <td className="px-2 py-5">
                              {clientTypes[data.owner].name}
                            </td>
                            <td className="px-2 py-5">{data.companyName}</td>
                            <td className="px-2 py-5">{data.typeOfProduct}</td>
                            <td className="px-2 py-5">
                              <p>{premiumTypes[data.premiumType].name}</p>
                              <p>{data.premium}</p>
                            </td>
                            <td className="px-2 py-5">{data.benefit}</td>
                            <td className="w-1/12 px-2 py-5">
                              <div className="flex w-full gap-2">
                                <ButtonBox
                                  onClick={() => openModalEdit(index)}
                                  className="text-green-deep"
                                >
                                  <PencilLineIcon size={14} />
                                </ButtonBox>
                                <ButtonBox
                                  onClick={() => removeProductData(index)}
                                  className="text-red"
                                >
                                  <CloseLineIcon size={14} />
                                </ButtonBox>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCardSingleGrid>
            )}

            <TextThin className="mb-5">
              5. Has the Representative explained to you that you may incur
              transaction costs without gaining any real benefit from the
              replacement?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asas" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer5
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer5: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <TextThin className="mb-5">
              6. Has the Representative explained to you that you may incur
              penalties for terminating any of your existing policies?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asaa" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer6
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer6: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <TextThin className="mb-5">
              7. Has the Representative explained to you that the replacement
              plan may offer a lower level of benefit at a higher cost or same
              cost, or offer the same level of benefit at a higher cost?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asa" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer7
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer7: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <TextThin className="mb-5">
              8. Has the Representative explained to you that the replacement
              plan may be less suitable and the terms and conditions may differ?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asadd" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer8
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer8: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <TextThin className="mb-5">
              9. Has the Representative explained to you that you may not be
              insurable at standard terms?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asa" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer9
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer9: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>

            <TextThin>
              10. Has the Representative explained to you that there may be
              other options available besides policy replacement (eg. Free
              switching facilities for investment policy)?
            </TextThin>
            <RowDouble className="mb-10">
              {getPfrLength?.length &&
                getPfrLength.map((data, index) => (
                  <div key={"asda" + index} className="flex-1">
                    <TextThin>Client {index + 1}</TextThin>
                    <Select
                      disabled={!eval(showReasonTwo[index] + "")}
                      value={
                        !eval(showReasonTwo[index] + "")
                          ? -1
                          : sectionTenData.data[index]?.answer10
                      }
                      datas={fillInformation}
                      handleChange={function (event) {
                        setSectionTenData({
                          ...sectionTenData,
                          data: sectionTenData.data?.map((item, i) => {
                            if (i == index) {
                              return {
                                ...item,
                                answer10: eval(event.target.value),
                              };
                            } else {
                              return item;
                            }
                          }),
                        });
                      }}
                    />
                  </div>
                ))}
            </RowDouble>
          </>
        ) : null}
      </SectionCardSingleGrid>

      {editable === 2 && sectionTenData.status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 10" />
      ) : (
        ""
      )}

      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default SwitchingReplacement;
