import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import TextArea from "@/components/Forms/TextArea";
import { Menu, Transition } from "@headlessui/react";
import React, { useState, useEffect, Fragment } from "react";
import ArrowDropDownLineIcon from "remixicon-react/ArrowDropDownLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonBox from "@/components/Forms/Buttons/ButtonBox";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import dynamic from "next/dynamic";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useAnalysisRecommendation } from "@/store/epfrPage/createData/analysisRecommendation";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  getWholeContext,
  pfrSection,
  getRecommendation,
  getPfr,
} from "@/services/pfrService";
import { useRouter } from "next/router";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface Props {
  id?: any;
  pfrType?: number;
}

const AnalysisRecommendationBackup = (props: Props) => {
  const router = useRouter();
  let { section9, setParent } = useAnalysisRecommendation();
  const scrollPositionBottom = useScrollPositionBottom(8);
  const scrollPositionNext = useScrollPosition(10);
  const scrollPosition = useScrollPosition(9);

  const currencyFormat = (num: any) => {
    if (num) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0.0;
    }
  };

  const [editorData, setEditor] = useState({
    overView1: EditorState.createEmpty(),
    overView2: EditorState.createEmpty(),
    reasonForBenefit: EditorState.createEmpty(),
    reasonForRisk: EditorState.createEmpty(),
    reasonForDeviation: EditorState.createEmpty(),
  });

  const premiumTypes: Array<any> = [
    "CASH",
    "CPFOA",
    "CPFSA",
    "CPF MEDISAVE",
    "SRS",
  ];

  const [dataGroup, setGroup] = useState();

  const handleOverView1 = (editorState: any) => {
    console.log("editorState", editorState);
    setEditor({ ...editorData, overView1: editorState });
    setParent(
      "overView1",
      draftToHtml(convertToRaw(editorData.overView1.getCurrentContent()))
    );
  };

  const handleOverView2 = (editorState: any) => {
    setEditor({ ...editorData, overView2: editorState });
    setParent(
      "overView2",
      draftToHtml(convertToRaw(editorData.overView2.getCurrentContent()))
    );
  };

  const handleReasonBenefit = (editorState: any) => {
    setEditor({ ...editorData, reasonForBenefit: editorState });
    setParent(
      "reasonForBenefit",
      draftToHtml(convertToRaw(editorData.reasonForBenefit.getCurrentContent()))
    );
  };

  const handleReasonRisk = (editorState: any) => {
    setEditor({ ...editorData, reasonForRisk: editorState });
    setParent(
      "reasonForRisk",
      draftToHtml(convertToRaw(editorData.reasonForRisk.getCurrentContent()))
    );
  };

  const handleReasonDeviation = (editorState: any) => {
    setEditor({ ...editorData, reasonForDeviation: editorState });
    setParent(
      "reasonForDeviation",
      draftToHtml(
        convertToRaw(editorData.reasonForDeviation.getCurrentContent())
      )
    );
  };

  let pfrId = usePersonalInformation((state) => state.id);

  let { showDetailData } = useNavigationSection();
  const showDetail = (params: any, data: any) => {
    localStorage.setItem("s9_dataGroup", "0");
    localStorage.setItem("group_name", params);

    showDetailData(91);
  };
  const saveData = (params: any) => {
    showDetailData(params);
  };

  const [getPfr8, setPfr8] = useState<any>({});
  const [getPfr9, setPfr9] = useState<any>({});
  const [getClients, setClients] = useState<any>([]);

  const [dataAnnualPayorBudget, setAnnualPayorBudget] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataSinglePayorBudget, setSinglePayorBudget] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataPayorBudgetMap, setPayorBudgetMap] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataTotalAnnualPremium, setTotalAnnualPremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataTotalSinglePremium, setTotalSinglePremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataTotalAnnualPremiumChoice, setTotalAnnualPremiumChoice] =
    useState<any>([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  const [dataTotalSinglePremiumChoice, setTotalSinglePremiumChoice] =
    useState<any>([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  const [dataMaxAnnualPremium, setMaxAnnualPremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataMaxSinglePremium, setMaxSinglePremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataProductAnnualPremium, setProductAnnualPremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataProductSinglePremium, setProductSinglePremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataMaxAnnualPremiumChoice, setMaxAnnualPremiumChoice] = useState<any>(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
  );
  const [dataMaxSinglePremiumChoice, setMaxSinglePremiumChoice] = useState<any>(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
  );
  const [dataProductAnnualPremiumChoice, setProductAnnualPremiumChoice] =
    useState<any>([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  const [dataProductSinglePremiumChoice, setProductSinglePremiumChoice] =
    useState<any>([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  const [
    dataTotalRecomendationSinglePremiumChoice,
    setTotalRecomendationSinglePremiumChoice,
  ] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [
    dataProductRecomendationSinglePremiumChoice,
    setProductRecomendationSinglePremiumChoice,
  ] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [
    dataTotalRecomendationAnnualPremiumChoice,
    setTotalRecomendationAnnualPremiumChoice,
  ] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [
    dataProductRecomendationAnnualPremiumChoice,
    setProductRecomendationAnnualPremiumChoice,
  ] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [
    dataTotalCISILPAnnualPremiumChoice,
    setTotalCISILPAnnualPremiumChoice,
  ] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [
    dataTotalCISILPSinglePremiumChoice,
    setTotalCISILPSinglePremiumChoice,
  ] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataSumAnnualPremium, setSumAnnualPremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataSumSinglePremium, setSumSinglePremium] = useState<any>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [dataSumAnnualPremiumChoice, setSumAnnualPremiumChoice] = useState<any>(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
  );
  const [dataSumSinglePremiumChoice, setSumSinglePremiumChoice] = useState<any>(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
  );
  const [dataSubPremium, setDataSubPremium] = useState<any>({
    Monthly: 0,
    Quarterly: 0,
    HalfYearly: 0,
    Annually: 0,
    SinglePayment: 0,
  });
  const [dataResDataTotalPremiumArr, setResDataTotalPremiumArr] = useState<any>(
    { Monthly: 0, Quarterly: 0, HalfYearly: 0, Annually: 0, SinglePayment: 0 }
  );
  const [dataRowOfGroupCell, setRowOfGroupCell] = useState<any>({
    product: {},
    ilp: {},
    cis: {},
    cisilp: {},
    productAndRiders: {},
    benefit: {},
    risk: {},
  });
  const [dataRowsGroup, setRowsGroup] = useState<any>([]);
  const [dataProductAndRiders, setProductAndRiders] = useState([{}]);
  const [dataBenefits, setBenefits] = useState([{}]);
  const [dataRisks, setRisks] = useState([{}]);
  const [dataOutcome, setOutcome] = useState([0, 0]);

  let pfrLocal = usePfrData((state) => state.pfr);

  useEffect(() => {
    if (!router.isReady) return;

    console.log("id", pfrId);

    localStorage.setItem("section9", JSON.stringify(section9));
    // const pfrId = idPfr;

    setAnnualPayorBudget([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setSinglePayorBudget([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setPayorBudgetMap([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalAnnualPremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalSinglePremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setMaxAnnualPremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setMaxSinglePremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setProductAnnualPremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setProductSinglePremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setMaxAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setMaxSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setProductAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setProductSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalRecomendationSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setProductRecomendationSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalRecomendationAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setProductRecomendationAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalCISILPAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setTotalCISILPSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setSumAnnualPremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setSumSinglePremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setSumAnnualPremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setSumSinglePremiumChoice([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setDataSubPremium({
      Monthly: 0,
      Quarterly: 0,
      HalfYearly: 0,
      Annually: 0,
      SinglePayment: 0,
    });
    setResDataTotalPremiumArr({
      Monthly: 0,
      Quarterly: 0,
      HalfYearly: 0,
      Annually: 0,
      SinglePayment: 0,
    });
    setRowOfGroupCell({
      product: {},
      ilp: {},
      cis: {},
      cisilp: {},
      productAndRiders: {},
      benefit: {},
      risk: {},
    });

    setProductAndRiders([]);
    setBenefits([]);
    setRisks([]);
    setOutcome([0, 0]);

    if (router.query.id !== null && router.query.id !== undefined) {
      if (scrollPositionBottom === "Process8") {
        setParent("editableStatus", pfrLocal.editableSection9);
        setParent("pfrId", router.query.id);
        setParent("status", pfrLocal.section9);
        // getSectionData(router.query.id);

        // Section 9
        pfrSection(9, pfrId).then((data: any) => {
          console.log("data", data);
          setPfr9(data);
          setRowsGroup(data.rowGroups);
          var dataType: Array<any> = [];
          for (var i = 0; i < data.clients.length; i++) {
            dataType[i] = i;
          }
          console.log("dataType", dataType);
          setClients(dataType);

          // Res Answer
          console.log("data", data);
          var overView1 = "";
          var overView2 = "";
          var reasonForBenefit = "";
          var reasonForRisk = "";
          var reasonForDeviation = "";

          if (data.answer) {
            if (data.answer.overView1) {
              overView1 = data.answer.overView1;
            }

            if (data.answer.overView2) {
              overView2 = data.answer.overView2;
            }

            if (data.answer.reasonForBenefit) {
              reasonForBenefit = data.answer.reasonForBenefit;
            }

            if (data.answer.reasonForRisk) {
              reasonForRisk = data.answer.reasonForRisk;
            }

            if (data.answer.reasonForDeviation) {
              reasonForDeviation = data.answer.reasonForDeviation;
            }
          }

          setEditor({
            ...editorData,
            overView1: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(overView1).contentBlocks,
                convertFromHTML(overView1).entityMap
              )
            ),
            overView2: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(overView2).contentBlocks,
                convertFromHTML(overView2).entityMap
              )
            ),
            reasonForBenefit: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(reasonForBenefit).contentBlocks,
                convertFromHTML(reasonForBenefit).entityMap
              )
            ),
            reasonForRisk: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(reasonForRisk).contentBlocks,
                convertFromHTML(reasonForRisk).entityMap
              )
            ),
            reasonForDeviation: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(reasonForDeviation).contentBlocks,
                convertFromHTML(reasonForDeviation).entityMap
              )
            ),
          });

          setParent("overView1", data.answer ? data.answer.overView1 : "");
          setParent("overView2", data.answer ? data.answer.overView2 : "");
          setParent(
            "reasonForBenefit",
            data.answer ? data.answer.reasonForBenefit : ""
          );
          setParent(
            "reasonForRisk",
            data.answer ? data.answer.reasonForRisk : ""
          );
          setParent(
            "reasonForDeviation",
            data.answer ? data.answer.reasonForDeviation : ""
          );
          // End Res Answer

          // Check Client Choice
          console.log("data.recommendedProduct", data.recommendedProduct);
          data.recommendedProduct.map((product: any) => {
            if (product["checked"] == "0") {
              product["checked"] = false;
            } else {
              product["checked"] = true;
              calcPremiumClientChoice(product, false);
            }

            var dataName = getPremiumFrequencyName(product.premiumFrequency);
            if (dataName != undefined) {
              dataSubPremium[dataName] = product["premium"];

              if (product["checked"] == true) {
                if (dataResDataTotalPremiumArr[dataName]) {
                  dataResDataTotalPremiumArr[dataName] += product["totPremium"];
                } else {
                  dataResDataTotalPremiumArr[dataName] = product["totPremium"];
                }
              }

              product["riders"].map((rider: any) => {
                var dataNameRider = getPremiumFrequencyName(
                  rider.premiumFrequency
                );
                if (dataNameRider != undefined) {
                  if (rider["checked"] == "0") {
                    rider["checked"] = false;
                  } else {
                    rider["checked"] = true;
                  }

                  //
                  if (dataSubPremium[dataNameRider]) {
                    dataSubPremium[dataNameRider] += rider["premium"];
                  } else {
                    dataSubPremium[dataNameRider] = rider["premium"];
                  }

                  if (dataResDataTotalPremiumArr[dataNameRider]) {
                    dataResDataTotalPremiumArr[dataNameRider] +=
                      rider["premium"];
                  } else {
                    dataResDataTotalPremiumArr[dataNameRider] =
                      rider["premium"];
                  }
                }
              });

              if (product.riders.length > 0) {
                product["subTotal"] = dataSubPremium;
              } else {
                product["subTotal"] = [];
              }
            }
          });

          data.ILPProduct.map((product: any, index: any) => {
            if (product["checked"] == "0") {
              product["checked"] = false;
            } else {
              product["checked"] = true;
            }
          });

          data.CISProduct.map((product: any, index: any) => {
            if (product["checked"] == "0") {
              product["checked"] = false;
            } else {
              product["checked"] = true;
            }
          });

          let checker = 0;

          data.CISILPProducts.map((product: any) => {
            if (product["checked"]) {
              checker++;
            }

            if (
              product["type"] == 1 ||
              (product["type"] == 0 && product["recommedType"] == 1)
            ) {
              calcPremiumForCISClientChoice(product);
            } else if (product["type"] == 0 && product["recommedType"] == 0) {
              calcPremiumClientChoice(product, false);
            }
          });

          calcPremiumMatrix(data);
        });

        // Section 8
        const annualPayorBudget: Array<any> = [[], []];
        const singlePayorBudget: Array<any> = [[], []];
        const payorBudgetMap: Array<any> = [[], []];
        pfrSection(8, pfrId).then((data: any) => {
          setPfr8(data);

          let payorBudgets = data["payorBudgets"];
          payorBudgets.map((budget: any) => {
            if (budget["selection"] != 0) {
              let clientId = budget["clientType"];
              let type = budget["type"];
              annualPayorBudget[clientId][type] = budget["annual"];
              singlePayorBudget[clientId][type] = budget["single"];
              payorBudgetMap[clientId][type] = true;
            }
          });
        });
        setAnnualPayorBudget(annualPayorBudget);
        setSinglePayorBudget(singlePayorBudget);
        setPayorBudgetMap(payorBudgetMap);

        // get whole context
        const resOutcome: Array<any> = [];
        getWholeContext(pfrId).then((dataWhole: any) => {
          console.log("dataWhole", dataWhole);
          dataWhole.outcomes.map((outcome: any) => {
            let clientId = outcome["clientType"] - 1;
            resOutcome[clientId] = outcome["outcome"];
          });
          setOutcome(resOutcome);
        });

        console.log(
          "dataTotalAnnualPremiumChoice",
          dataTotalAnnualPremiumChoice
        );

        getProductRiderBenefitRisk();
        getGroupRow();
      }
    }else {
      console.log("update section 9 scroll position button non edit");
      if(pfrId && Number(pfrId) > 0) {
        if (scrollPositionBottom === "Process8") {

          console.log("check masuk sampai sini ggak");

          setParent("editableStatus", pfrLocal.editableSection9);
          setParent("pfrId", pfrId);
          setParent("status", pfrLocal.section9);
          // getSectionData(router.query.id);
  
          // Section 9
          pfrSection(9, pfrId).then((data: any) => {
            console.log("data section 9", data);
            setPfr9(data);
            setRowsGroup(data.rowGroups);
            var dataType: Array<any> = [];
            for (var i = 0; i < data.clients.length; i++) {
              dataType[i] = i;
            }
            console.log("dataType", dataType);
            setClients(dataType);
  
            // Res Answer
            console.log("data", data);
            var overView1 = "";
            var overView2 = "";
            var reasonForBenefit = "";
            var reasonForRisk = "";
            var reasonForDeviation = "";
  
            if (data.answer) {
              if (data.answer.overView1) {
                overView1 = data.answer.overView1;
              }
  
              if (data.answer.overView2) {
                overView2 = data.answer.overView2;
              }
  
              if (data.answer.reasonForBenefit) {
                reasonForBenefit = data.answer.reasonForBenefit;
              }
  
              if (data.answer.reasonForRisk) {
                reasonForRisk = data.answer.reasonForRisk;
              }
  
              if (data.answer.reasonForDeviation) {
                reasonForDeviation = data.answer.reasonForDeviation;
              }
            }
  
            setEditor({
              ...editorData,
              overView1: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(overView1).contentBlocks,
                  convertFromHTML(overView1).entityMap
                )
              ),
              overView2: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(overView2).contentBlocks,
                  convertFromHTML(overView2).entityMap
                )
              ),
              reasonForBenefit: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(reasonForBenefit).contentBlocks,
                  convertFromHTML(reasonForBenefit).entityMap
                )
              ),
              reasonForRisk: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(reasonForRisk).contentBlocks,
                  convertFromHTML(reasonForRisk).entityMap
                )
              ),
              reasonForDeviation: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(reasonForDeviation).contentBlocks,
                  convertFromHTML(reasonForDeviation).entityMap
                )
              ),
            });
  
            setParent("overView1", data.answer ? data.answer.overView1 : "");
            setParent("overView2", data.answer ? data.answer.overView2 : "");
            setParent(
              "reasonForBenefit",
              data.answer ? data.answer.reasonForBenefit : ""
            );
            setParent(
              "reasonForRisk",
              data.answer ? data.answer.reasonForRisk : ""
            );
            setParent(
              "reasonForDeviation",
              data.answer ? data.answer.reasonForDeviation : ""
            );
            // End Res Answer
  
            // Check Client Choice
            console.log("data.recommendedProduct", data.recommendedProduct);
            data.recommendedProduct.map((product: any) => {
              if (product["checked"] == "0") {
                product["checked"] = false;
              } else {
                product["checked"] = true;
                calcPremiumClientChoice(product, false);
              }
  
              var dataName = getPremiumFrequencyName(product.premiumFrequency);
              if (dataName != undefined) {
                dataSubPremium[dataName] = product["premium"];
  
                if (product["checked"] == true) {
                  if (dataResDataTotalPremiumArr[dataName]) {
                    dataResDataTotalPremiumArr[dataName] += product["totPremium"];
                  } else {
                    dataResDataTotalPremiumArr[dataName] = product["totPremium"];
                  }
                }
  
                product["riders"].map((rider: any) => {
                  var dataNameRider = getPremiumFrequencyName(
                    rider.premiumFrequency
                  );
                  if (dataNameRider != undefined) {
                    if (rider["checked"] == "0") {
                      rider["checked"] = false;
                    } else {
                      rider["checked"] = true;
                    }
  
                    //
                    if (dataSubPremium[dataNameRider]) {
                      dataSubPremium[dataNameRider] += rider["premium"];
                    } else {
                      dataSubPremium[dataNameRider] = rider["premium"];
                    }
  
                    if (dataResDataTotalPremiumArr[dataNameRider]) {
                      dataResDataTotalPremiumArr[dataNameRider] +=
                        rider["premium"];
                    } else {
                      dataResDataTotalPremiumArr[dataNameRider] =
                        rider["premium"];
                    }
                  }
                });
  
                if (product.riders.length > 0) {
                  product["subTotal"] = dataSubPremium;
                } else {
                  product["subTotal"] = [];
                }
              }
            });
  
            data.ILPProduct.map((product: any, index: any) => {
              if (product["checked"] == "0") {
                product["checked"] = false;
              } else {
                product["checked"] = true;
              }
            });
  
            data.CISProduct.map((product: any, index: any) => {
              if (product["checked"] == "0") {
                product["checked"] = false;
              } else {
                product["checked"] = true;
              }
            });
  
            let checker = 0;
  
            data.CISILPProducts.map((product: any) => {
              if (product["checked"]) {
                checker++;
              }
  
              if (
                product["type"] == 1 ||
                (product["type"] == 0 && product["recommedType"] == 1)
              ) {
                calcPremiumForCISClientChoice(product);
              } else if (product["type"] == 0 && product["recommedType"] == 0) {
                calcPremiumClientChoice(product, false);
              }
            });
  
            calcPremiumMatrix(data);
          });
  
          // Section 8
          const annualPayorBudget: Array<any> = [[], []];
          const singlePayorBudget: Array<any> = [[], []];
          const payorBudgetMap: Array<any> = [[], []];
          pfrSection(8, pfrId).then((data: any) => {
            console.log("data section 8 ", data);
            setPfr8(data);
  
            let payorBudgets = data["payorBudgets"];
            payorBudgets.map((budget: any) => {
              if (budget["selection"] != 0) {
                let clientId = budget["clientType"];
                let type = budget["type"];
                annualPayorBudget[clientId][type] = budget["annual"];
                singlePayorBudget[clientId][type] = budget["single"];
                payorBudgetMap[clientId][type] = true;
              }
            });
          });
          setAnnualPayorBudget(annualPayorBudget);
          setSinglePayorBudget(singlePayorBudget);
          setPayorBudgetMap(payorBudgetMap);
  
          // get whole context
          const resOutcome: Array<any> = [];
          getWholeContext(pfrId).then((dataWhole: any) => {
            console.log("dataWhole", dataWhole);
            dataWhole.outcomes.map((outcome: any) => {
              let clientId = outcome["clientType"] - 1;
              resOutcome[clientId] = outcome["outcome"];
            });
            setOutcome(resOutcome);
          });
  
          console.log(
            "dataTotalAnnualPremiumChoice",
            dataTotalAnnualPremiumChoice
          );
  
          getProductRiderBenefitRisk();
          getGroupRow();
        }
      }
    }

    console.log("section9Res", section9);
  }, [section9, router.isReady,scrollPositionBottom]);

  const getPremiumFrequencyName = (premiumFrequency: any) => {
    switch (Number(premiumFrequency)) {
      case 0:
        return "Monthly";
      case 1:
        return "Quarterly";
      case 2:
        return "HalfYearly";
      case 3:
        return "Annually";
      case 4:
        return "SinglePayment";
    }
  };

  const calcPremium = (product: any, isRider = false) => {
    let frequency = product["premiumFrequency"];
    let clientId = product["nameOfOwner"];
    let premiumType = product["premiumPaymentType"];
    let premium = 0;
    let categoryId = product["categoryId"];
    if (categoryId != 8 && categoryId != 5) {
      if (frequency == 4) {
        premium = product["premium"];
        dataTotalSinglePremium[clientId][premiumType] += product["premium"];
        setTotalSinglePremium(dataTotalSinglePremium);

        dataProductSinglePremium[clientId][premiumType] += premium;
        setProductSinglePremium(dataProductSinglePremium);
      } else if (frequency == 3) {
        premium = product["premium"];
        dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 1;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][premiumType] += premium;
        setProductAnnualPremium(dataProductAnnualPremium);
      } else if (frequency == 2) {
        premium = product["premium"] * 2;
        dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 2;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][premiumType] += premium;
        setProductAnnualPremium(dataProductAnnualPremium);
      } else if (frequency == 1) {
        premium = product["premium"] * 4;
        dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 4;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][premiumType] += premium;
        setProductAnnualPremium(dataProductAnnualPremium);
      } else {
        premium = product["premium"] * 12;
        dataTotalAnnualPremium[clientId][premiumType] +=
          product["premium"] * 12;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][premiumType] += premium;
        setProductAnnualPremium(dataProductAnnualPremium);
      }

      if (isRider == false) {
        if (
          dataMaxSinglePremium[clientId][premiumType] <
          dataProductSinglePremium[clientId][premiumType]
        ) {
          dataMaxSinglePremium[clientId][premiumType] =
            dataProductSinglePremium[clientId][premiumType];
        }
        if (
          dataMaxAnnualPremium[clientId][premiumType] <
          dataProductAnnualPremium[clientId][premiumType]
        ) {
          dataMaxAnnualPremium[clientId][premiumType] =
            dataProductAnnualPremium[clientId][premiumType];
        }
      }
    } else {
      let cash =
        product["premium_for_hospitalization"] !== null
          ? product["premium_for_hospitalization"]["cash"]
          : 0;
      let medisave =
        product["premium_for_hospitalization"] !== null
          ? product["premium_for_hospitalization"]["cpfMedisave"]
          : 0;
      let premium = cash + medisave;
      if (frequency == 4) {
        dataTotalSinglePremium[clientId][0] += cash;
        setTotalSinglePremium(dataTotalSinglePremium);
        dataTotalSinglePremium[clientId][3] += medisave;
        setTotalSinglePremium(dataTotalSinglePremium);

        dataProductSinglePremium[clientId][0] += cash;
        setProductSinglePremium(dataProductSinglePremium);
        dataProductSinglePremium[clientId][3] += medisave;
        setProductSinglePremium(dataProductSinglePremium);
      } else if (frequency == 3) {
        dataTotalAnnualPremium[clientId][0] += cash;
        setTotalAnnualPremium(dataTotalAnnualPremium);
        dataTotalAnnualPremium[clientId][3] += medisave;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][0] += cash;
        setProductAnnualPremium(dataProductAnnualPremium);
        dataProductAnnualPremium[clientId][3] += medisave;
        setProductAnnualPremium(dataProductAnnualPremium);
      } else if (frequency == 2) {
        premium = premium * 2;
        dataTotalAnnualPremium[clientId][0] += cash * 2;
        setTotalAnnualPremium(dataTotalAnnualPremium);
        dataTotalAnnualPremium[clientId][3] += medisave * 2;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][0] += cash * 2;
        setProductAnnualPremium(dataProductAnnualPremium);
        dataProductAnnualPremium[clientId][3] += medisave * 2;
        setProductAnnualPremium(dataProductAnnualPremium);
      } else if (frequency == 1) {
        premium = premium * 4;
        dataTotalAnnualPremium[clientId][0] += cash * 4;
        setTotalAnnualPremium(dataTotalAnnualPremium);
        dataTotalAnnualPremium[clientId][3] += medisave * 4;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][0] += cash * 4;
        setProductAnnualPremium(dataProductAnnualPremium);
        dataProductAnnualPremium[clientId][3] += medisave * 4;
        setProductAnnualPremium(dataProductAnnualPremium);
      } else {
        premium = premium * 12;
        dataTotalAnnualPremium[clientId][0] += cash * 12;
        setTotalAnnualPremium(dataTotalAnnualPremium);
        dataTotalAnnualPremium[clientId][3] += medisave * 12;
        setTotalAnnualPremium(dataTotalAnnualPremium);

        dataProductAnnualPremium[clientId][0] += cash * 12;
        setProductAnnualPremium(dataProductAnnualPremium);
        dataProductAnnualPremium[clientId][3] += medisave * 12;
        setProductAnnualPremium(dataProductAnnualPremium);
      }

      if (isRider == false) {
        if (
          dataMaxSinglePremium[clientId][0] <
          dataProductSinglePremium[clientId][0]
        ) {
          dataMaxSinglePremium[clientId][0] =
            dataProductSinglePremium[clientId][0];
          setMaxSinglePremium(dataMaxSinglePremium);
        }
        if (
          dataMaxSinglePremium[clientId][3] <
          dataProductSinglePremium[clientId][3]
        ) {
          dataMaxSinglePremium[clientId][3] =
            dataProductSinglePremium[clientId][3];
          setMaxSinglePremium(dataMaxSinglePremium);
        }
        if (
          dataMaxAnnualPremium[clientId][0] <
          dataProductAnnualPremium[clientId][0]
        ) {
          dataMaxAnnualPremium[clientId][0] =
            dataProductAnnualPremium[clientId][0];
          setMaxAnnualPremium(dataMaxAnnualPremium);
        }
        if (
          dataMaxAnnualPremium[clientId][3] <
          dataProductAnnualPremium[clientId][3]
        ) {
          dataMaxAnnualPremium[clientId][3] =
            dataProductAnnualPremium[clientId][3];
          setMaxAnnualPremium(dataMaxAnnualPremium);
        }
      }
    }
  };

  const calcPremiumForCIS = (product: any) => {
    let frequency = product["premiumFrequency"];
    let clientId = product["nameOfOwner"];
    let premiumType = product["premiumPaymentType"];
    let premium = 0;
    if (frequency == 4) {
      premium = product["premium"];
      dataTotalSinglePremium[clientId][premiumType] += product["premium"];
      setTotalSinglePremium(dataTotalSinglePremium);
      if (dataMaxSinglePremium[clientId][premiumType] < premium) {
        dataMaxSinglePremium[clientId][premiumType] = premium;
        setMaxSinglePremium(dataMaxSinglePremium);
      }
    } else if (frequency == 3) {
      premium = product["premium"];
      dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 1;
      setTotalAnnualPremium(dataTotalAnnualPremium);
      if (dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] = premium;
        setMaxAnnualPremium(dataMaxAnnualPremium);
      }
    } else if (frequency == 2) {
      premium = product["premium"] * 2;
      dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 2;
      setTotalAnnualPremium(dataTotalAnnualPremium);
      if (dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] = premium;
        setMaxAnnualPremium(dataMaxAnnualPremium);
      }
    } else if (frequency == 1) {
      premium = product["premium"] * 4;
      dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 4;
      setTotalAnnualPremium(dataTotalAnnualPremium);
      if (dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] = premium;
        setMaxAnnualPremium(dataMaxAnnualPremium);
      }
    } else {
      premium = product["premium"] * 12;
      dataTotalAnnualPremium[clientId][premiumType] += product["premium"] * 12;
      setTotalAnnualPremium(dataTotalAnnualPremium);
      if (dataMaxAnnualPremium[clientId][premiumType] < premium) {
        dataMaxAnnualPremium[clientId][premiumType] = premium;
        setMaxAnnualPremium(dataMaxAnnualPremium);
      }
    }
  };

  const calcPremiumClientChoice = (product: any, isRider: false) => {
    // console.log('product', product)
    if (product) {
      if (product["checked"]) {
        console.log("product", product);
        let frequency = product["premiumFrequency"];
        let clientId = product["nameOfOwner"];
        let premiumType = product["premiumPaymentType"];
        let premium = 0;
        let categoryId = product["categoryId"];

        let typeData = product["type"];
        let recommendType = product["recommedType"];

        // Recomendation
        // if(categoryId != 8 && categoryId != 5) {

        if (frequency == 4) {
          premium = product["premium"];
          dataTotalSinglePremiumChoice[clientId][premiumType] +=
            product["premium"];
          setTotalSinglePremiumChoice(dataTotalSinglePremiumChoice);
          dataProductSinglePremiumChoice[clientId][premiumType] += premium;
          setProductSinglePremiumChoice(dataProductSinglePremiumChoice);

          // New amount
          dataTotalRecomendationSinglePremiumChoice[clientId][premiumType] +=
            product["premium"];
          setTotalRecomendationSinglePremiumChoice(
            dataTotalRecomendationSinglePremiumChoice
          );
          dataProductRecomendationSinglePremiumChoice[clientId][premiumType] +=
            premium;
          setProductRecomendationSinglePremiumChoice(
            dataProductRecomendationSinglePremiumChoice
          );
        } else if (frequency == 3) {
          premium = product["premium"];
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 1;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataProductAnnualPremiumChoice[clientId][premiumType] += premium;
          setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

          // New amount
          dataTotalRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 1;
          setTotalRecomendationAnnualPremiumChoice(
            dataTotalRecomendationAnnualPremiumChoice
          );
          dataProductRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            premium;
          setProductRecomendationAnnualPremiumChoice(
            dataProductRecomendationAnnualPremiumChoice
          );
        } else if (frequency == 2) {
          premium = product["premium"] * 2;
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 2;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataProductAnnualPremiumChoice[clientId][premiumType] += premium;
          setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

          // New amount
          dataTotalRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 2;
          setTotalRecomendationAnnualPremiumChoice(
            dataTotalRecomendationAnnualPremiumChoice
          );
          dataProductRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            premium;
          setProductRecomendationAnnualPremiumChoice(
            dataProductRecomendationAnnualPremiumChoice
          );
        } else if (frequency == 1) {
          premium = product["premium"] * 4;
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 4;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataProductAnnualPremiumChoice[clientId][premiumType] += premium;
          setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

          // New amount
          dataTotalRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 4;
          setTotalRecomendationAnnualPremiumChoice(
            dataTotalRecomendationAnnualPremiumChoice
          );
          dataProductRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            premium;
          setProductRecomendationAnnualPremiumChoice(
            dataProductRecomendationAnnualPremiumChoice
          );
        } else if (frequency == 0) {
          premium = product["premium"] * 12;
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 12;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataProductAnnualPremiumChoice[clientId][premiumType] += premium;
          setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

          // New amount
          dataTotalRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 12;
          setTotalRecomendationAnnualPremiumChoice(
            dataTotalRecomendationAnnualPremiumChoice
          );
          dataProductRecomendationAnnualPremiumChoice[clientId][premiumType] +=
            premium;
          setProductRecomendationAnnualPremiumChoice(
            dataProductRecomendationAnnualPremiumChoice
          );
        }

        if (isRider == false) {
          if (
            dataMaxSinglePremium[clientId][premiumType] <
            dataProductSinglePremiumChoice[clientId][premiumType]
          ) {
            dataMaxSinglePremium[clientId][premiumType] =
              dataProductSinglePremiumChoice[clientId][premiumType];
            setMaxSinglePremium(dataMaxSinglePremium);
          }
          if (
            dataMaxAnnualPremium[clientId][premiumType] <
            dataProductAnnualPremiumChoice[clientId][premiumType]
          ) {
            dataMaxAnnualPremium[clientId][premiumType] =
              dataProductAnnualPremiumChoice[clientId][premiumType];
            setMaxAnnualPremium(dataMaxAnnualPremium);
          }
        }
        //
        // HOSTPITAL
        // } else {
        if (product["premium_for_hospitalization"]) {
          let cash =
            product["premium_for_hospitalization"] !== null
              ? product["premium_for_hospitalization"]["cash"]
              : 0;
          let medisave =
            product["premium_for_hospitalization"] !== null
              ? product["premium_for_hospitalization"]["cpfMedisave"]
              : 0;
          let premiumHost = cash + medisave;

          if (frequency == 4) {
            dataTotalSinglePremiumChoice[clientId][0] += cash;
            setTotalSinglePremiumChoice(dataTotalSinglePremiumChoice);
            dataTotalSinglePremiumChoice[clientId][3] += medisave;
            setTotalSinglePremiumChoice(dataTotalSinglePremiumChoice);

            dataProductSinglePremiumChoice[clientId][0] += cash;
            setProductSinglePremiumChoice(dataProductSinglePremiumChoice);
            dataProductSinglePremiumChoice[clientId][3] += medisave;
            setProductSinglePremiumChoice(dataProductSinglePremiumChoice);

            // New amount
            dataTotalRecomendationSinglePremiumChoice[clientId][0] += cash;
            setTotalRecomendationSinglePremiumChoice(
              dataTotalRecomendationSinglePremiumChoice
            );
            dataTotalRecomendationSinglePremiumChoice[clientId][3] += medisave;
            setTotalRecomendationSinglePremiumChoice(
              dataTotalRecomendationSinglePremiumChoice
            );

            dataProductRecomendationSinglePremiumChoice[clientId][0] += cash;
            setProductRecomendationSinglePremiumChoice(
              dataProductRecomendationSinglePremiumChoice
            );
            dataProductRecomendationSinglePremiumChoice[clientId][3] +=
              medisave;
            setProductRecomendationSinglePremiumChoice(
              dataProductRecomendationSinglePremiumChoice
            );
          } else if (frequency == 3) {
            dataTotalAnnualPremiumChoice[clientId][0] += cash;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
            dataTotalAnnualPremiumChoice[clientId][3] += medisave;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

            dataProductAnnualPremiumChoice[clientId][0] += cash;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);
            dataProductAnnualPremiumChoice[clientId][3] += medisave;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

            // New amount

            dataTotalRecomendationAnnualPremiumChoice[clientId][0] += cash;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );
            dataTotalRecomendationAnnualPremiumChoice[clientId][3] += medisave;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );

            dataProductRecomendationAnnualPremiumChoice[clientId][0] += cash;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
            dataProductRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
          } else if (frequency == 2) {
            premiumHost = premiumHost * 2;
            dataTotalAnnualPremiumChoice[clientId][0] += cash * 2;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
            dataTotalAnnualPremiumChoice[clientId][3] += medisave * 2;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

            dataProductAnnualPremiumChoice[clientId][0] += cash * 2;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);
            dataProductAnnualPremiumChoice[clientId][3] += medisave * 2;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

            // New amount
            dataTotalRecomendationAnnualPremiumChoice[clientId][0] += cash * 2;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );
            dataTotalRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave * 2;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );

            dataProductRecomendationAnnualPremiumChoice[clientId][0] +=
              cash * 2;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
            dataProductRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave * 2;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
          } else if (frequency == 1) {
            premiumHost = premiumHost * 4;
            dataTotalAnnualPremiumChoice[clientId][0] += cash * 4;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
            dataTotalAnnualPremiumChoice[clientId][3] += medisave * 4;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

            dataProductAnnualPremiumChoice[clientId][0] += cash * 4;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);
            dataProductAnnualPremiumChoice[clientId][3] += medisave * 4;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

            // New amount
            dataTotalRecomendationAnnualPremiumChoice[clientId][0] += cash * 4;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );
            dataTotalRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave * 4;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );

            dataProductRecomendationAnnualPremiumChoice[clientId][0] +=
              cash * 4;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
            dataProductRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave * 4;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
          } else if (frequency == 0) {
            premiumHost = premiumHost * 12;

            dataTotalAnnualPremiumChoice[clientId][0] += cash * 12;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
            dataTotalAnnualPremiumChoice[clientId][3] += medisave * 12;
            setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

            dataProductAnnualPremiumChoice[clientId][0] += cash * 12;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);
            dataProductAnnualPremiumChoice[clientId][3] += medisave * 12;
            setProductAnnualPremiumChoice(dataProductAnnualPremiumChoice);

            // Recomendation
            dataTotalRecomendationAnnualPremiumChoice[clientId][0] += cash * 12;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );
            dataTotalRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave * 12;
            setTotalRecomendationAnnualPremiumChoice(
              dataTotalRecomendationAnnualPremiumChoice
            );

            dataProductRecomendationAnnualPremiumChoice[clientId][0] +=
              cash * 12;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
            dataProductRecomendationAnnualPremiumChoice[clientId][3] +=
              medisave * 12;
            setProductRecomendationAnnualPremiumChoice(
              dataProductRecomendationAnnualPremiumChoice
            );
          }

          if (isRider == false) {
            if (
              dataMaxSinglePremiumChoice[clientId][0] <
              dataProductSinglePremiumChoice[clientId][0]
            ) {
              dataMaxSinglePremiumChoice[clientId][0] =
                dataProductSinglePremiumChoice[clientId][0];
              setMaxSinglePremiumChoice(dataMaxSinglePremiumChoice);
            }
            if (
              dataMaxSinglePremiumChoice[clientId][3] <
              dataProductSinglePremiumChoice[clientId][3]
            ) {
              dataMaxSinglePremiumChoice[clientId][3] =
                dataProductSinglePremiumChoice[clientId][3];
              setMaxSinglePremiumChoice(dataMaxSinglePremiumChoice);
            }
            if (
              dataMaxAnnualPremiumChoice[clientId][0] <
              dataProductAnnualPremiumChoice[clientId][0]
            ) {
              dataMaxAnnualPremiumChoice[clientId][0] =
                dataProductAnnualPremiumChoice[clientId][0];
              setMaxAnnualPremiumChoice(dataMaxAnnualPremiumChoice);
            }
            if (
              dataMaxAnnualPremiumChoice[clientId][3] <
              dataProductAnnualPremiumChoice[clientId][3]
            ) {
              dataMaxAnnualPremiumChoice[clientId][3] =
                dataProductAnnualPremiumChoice[clientId][3];
              setMaxAnnualPremiumChoice(dataMaxAnnualPremiumChoice);
            }
          }
        }

        // // RIDER RECOMMENDED PRODUCT
        if (product.riders.length > 0) {
          for (let iRider = 0; iRider < product.riders.length; iRider++) {
            if (product.riders[iRider].premiumFrequency == 0) {
              dataTotalAnnualPremiumChoice[clientId][0] +=
                product.riders[iRider].premium * 12;
              setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

              // New amount
              dataTotalRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 12;
              setTotalRecomendationAnnualPremiumChoice(
                dataTotalRecomendationAnnualPremiumChoice
              );
              dataProductRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 12;
              setProductRecomendationAnnualPremiumChoice(
                dataProductRecomendationAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 1) {
              dataTotalAnnualPremiumChoice[clientId][0] +=
                product.riders[iRider].premium * 4;
              setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

              // New amount
              dataTotalRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 4;
              setTotalRecomendationAnnualPremiumChoice(
                dataTotalRecomendationAnnualPremiumChoice
              );
              dataProductRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 4;
              setProductRecomendationAnnualPremiumChoice(
                dataProductRecomendationAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 2) {
              dataTotalAnnualPremiumChoice[clientId][0] +=
                product.riders[iRider].premium * 2;
              setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

              // New amount
              dataTotalRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 2;
              setTotalRecomendationAnnualPremiumChoice(
                dataTotalRecomendationAnnualPremiumChoice
              );
              dataProductRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 2;
              setProductRecomendationAnnualPremiumChoice(
                dataProductRecomendationAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 3) {
              dataTotalAnnualPremiumChoice[clientId][0] +=
                product.riders[iRider].premium * 1;
              setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);

              // New amount
              dataTotalRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 1;
              setTotalRecomendationAnnualPremiumChoice(
                dataTotalRecomendationAnnualPremiumChoice
              );
              dataProductRecomendationAnnualPremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium * 1;
              setProductRecomendationAnnualPremiumChoice(
                dataProductRecomendationAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 4) {
              dataTotalSinglePremiumChoice[clientId][0] +=
                product.riders[iRider].premium;
              setTotalSinglePremiumChoice(dataTotalSinglePremiumChoice);

              // New amount
              dataTotalRecomendationSinglePremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium;
              setTotalRecomendationSinglePremiumChoice(
                dataTotalRecomendationSinglePremiumChoice
              );
              dataProductRecomendationSinglePremiumChoice[clientId][
                premiumType
              ] += product.riders[iRider].premium;
              setProductRecomendationSinglePremiumChoice(
                dataProductRecomendationSinglePremiumChoice
              );
            }
          }
        }

        // ILP
        if (typeData == 0 && recommendType == 1) {
          if (product.riders.length > 0) {
            for (let iRider = 0; iRider < product.riders.length; iRider++) {
              if (product.riders[iRider].premiumFrequency == 0) {
                dataTotalCISILPAnnualPremiumChoice[clientId][0] +=
                  product.riders[iRider].premium * 12;
                setTotalCISILPAnnualPremiumChoice(
                  dataTotalCISILPAnnualPremiumChoice
                );
              } else if (product.riders[iRider].premiumFrequency == 1) {
                dataTotalCISILPAnnualPremiumChoice[clientId][0] +=
                  product.riders[iRider].premium * 4;
                setTotalCISILPAnnualPremiumChoice(
                  dataTotalCISILPAnnualPremiumChoice
                );
              } else if (product.riders[iRider].premiumFrequency == 2) {
                dataTotalCISILPAnnualPremiumChoice[clientId][0] +=
                  product.riders[iRider].premium * 2;
                setTotalCISILPAnnualPremiumChoice(
                  dataTotalCISILPAnnualPremiumChoice
                );
              } else if (product.riders[iRider].premiumFrequency == 3) {
                dataTotalCISILPAnnualPremiumChoice[clientId][0] +=
                  product.riders[iRider].premium * 1;
                setTotalCISILPAnnualPremiumChoice(
                  dataTotalCISILPAnnualPremiumChoice
                );
              } else if (product.riders[iRider].premiumFrequency == 4) {
                dataTotalCISILPSinglePremiumChoice[clientId][0] +=
                  product.riders[iRider].premium;
                setTotalCISILPSinglePremiumChoice(
                  dataTotalCISILPSinglePremiumChoice
                );
              }
            }
          }
        }
      }
    }
  };

  const calcPremiumForCISClientChoice = (product: any) => {
    if (product) {
      if (product["checked"]) {
        let frequency = product["premiumFrequency"];
        let clientId = product["nameOfOwner"];
        let premiumType = product["premiumPaymentType"];
        let premium = 0;
        if (frequency == 4) {
          premium = product["premium"];
          dataTotalSinglePremiumChoice[clientId][premiumType] +=
            product["premium"];
          setTotalSinglePremiumChoice(dataTotalSinglePremiumChoice);

          dataTotalCISILPSinglePremiumChoice[clientId][premiumType] +=
            product["premium"];
          setTotalCISILPSinglePremiumChoice(dataTotalCISILPSinglePremiumChoice);

          if (dataMaxSinglePremiumChoice[clientId][premiumType] < premium) {
            dataMaxSinglePremiumChoice[clientId][premiumType] = premium;
            setMaxSinglePremiumChoice(dataMaxSinglePremiumChoice);
          }
        } else if (frequency == 3) {
          premium = product["premium"];
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 1;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 1;
          setTotalCISILPAnnualPremiumChoice(dataTotalCISILPAnnualPremiumChoice);

          if (dataMaxAnnualPremiumChoice[clientId][premiumType] < premium) {
            dataMaxAnnualPremiumChoice[clientId][premiumType] = premium;
            setMaxAnnualPremiumChoice(dataMaxAnnualPremiumChoice);
          }
        } else if (frequency == 2) {
          premium = product["premium"] * 2;
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 2;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 2;
          setTotalCISILPAnnualPremiumChoice(dataTotalCISILPAnnualPremiumChoice);

          if (dataMaxAnnualPremiumChoice[clientId][premiumType] < premium) {
            dataMaxAnnualPremiumChoice[clientId][premiumType] = premium;
            setMaxAnnualPremiumChoice(dataMaxAnnualPremiumChoice);
          }
        } else if (frequency == 1) {
          premium = product["premium"] * 4;
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 4;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 4;
          setTotalCISILPAnnualPremiumChoice(dataTotalCISILPAnnualPremiumChoice);

          if (dataMaxAnnualPremiumChoice[clientId][premiumType] < premium) {
            dataMaxAnnualPremiumChoice[clientId][premiumType] = premium;
            setMaxAnnualPremiumChoice(dataMaxAnnualPremiumChoice);
          }
        } else {
          premium = product["premium"] * 12;
          dataTotalAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 12;
          setTotalAnnualPremiumChoice(dataTotalAnnualPremiumChoice);
          dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
            product["premium"] * 12;
          setTotalCISILPAnnualPremiumChoice(dataTotalCISILPAnnualPremiumChoice);

          if (dataMaxAnnualPremiumChoice[clientId][premiumType] < premium) {
            dataMaxAnnualPremiumChoice[clientId][premiumType] = premium;
            setMaxAnnualPremiumChoice(dataMaxAnnualPremiumChoice);
          }
        }

        // Rider
        if (product.riders.length > 0) {
          for (let iRider = 0; iRider < product.riders.length; iRider++) {
            if (product.riders[iRider].premiumFrequency == 0) {
              // New amount
              dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
                product.riders[iRider].premium * 12;
              setTotalCISILPAnnualPremiumChoice(
                dataTotalCISILPAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 1) {
              // New amount
              dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
                product.riders[iRider].premium * 4;
              setTotalCISILPAnnualPremiumChoice(
                dataTotalCISILPAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 2) {
              // New amount
              dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
                product.riders[iRider].premium * 2;
              setTotalCISILPAnnualPremiumChoice(
                dataTotalCISILPAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 3) {
              // New amount
              dataTotalCISILPAnnualPremiumChoice[clientId][premiumType] +=
                product.riders[iRider].premium * 1;
              setTotalCISILPAnnualPremiumChoice(
                dataTotalCISILPAnnualPremiumChoice
              );
            } else if (product.riders[iRider].premiumFrequency == 4) {
              // New amount
              dataTotalCISILPSinglePremiumChoice[clientId][premiumType] +=
                product.riders[iRider].premium;
              setTotalCISILPSinglePremiumChoice(
                dataTotalCISILPSinglePremiumChoice
              );
            }
          }
        }
      }
    }
  };

  const calcPremiumMatrix = (dataRes: any) => {
    // setSumAnnualPremium([
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    // ])
    // setSumSinglePremium([
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    // ])
    // setTotalAnnualPremium([
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    // ])
    // setTotalSinglePremium([
    //   [0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0],
    // ])

    dataRes.groups.map((group: any) => {
      let groupId = group["id"];
      getTotalPremium(groupId);

      for (let i = 0; i < dataRes.clients.length; i++) {
        // let maxValueOfAnnual = this.getMaxValue(this.maxAnnualPremium[i])
        // let maxValueOfSingle = this.getMaxValue(this.maxSinglePremium[i])
        // for(let j = 0 ; j < 5; j ++ ) {
        //   if(this.maxAnnualPremium[i][j] == maxValueOfAnnual) {
        //     this.sumAnnualPremium[i][j] += maxValueOfAnnual
        //   }
        //   if(this.maxSinglePremium[i][j] == maxValueOfSingle) {
        //     this.sumSinglePremium[i][j] += maxValueOfSingle
        //   }
        // }
        for (let j = 0; j < 5; j++) {
          dataSumAnnualPremium[i][j] += dataMaxAnnualPremium[i][j];
          dataSumSinglePremium[i][j] += dataMaxSinglePremium[i][j];

          dataSumAnnualPremiumChoice[i][j] += dataMaxAnnualPremiumChoice[i][j];
          dataSumSinglePremiumChoice[i][j] += dataMaxSinglePremiumChoice[i][j];
        }
      }
    });
  };

  const getTotalPremium = (groupId: any) => {
    setMaxAnnualPremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    setMaxSinglePremium([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    let products = getProductsByFilteringGroupId(
      groupId,
      getPfr9.recommendedProduct
    );
    let ILPProducts = getProductsByFilteringGroupId(
      groupId,
      getPfr9.ILPProduct
    );
    let CISProducts = getProductsByFilteringGroupId(
      groupId,
      getPfr9.CISProduct
    );
    let customProducts = getProductsByFilteringGroupId(
      groupId,
      getPfr9.CISILPProducts
    );

    products.map((product: any) => {
      setProductAnnualPremium([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      setProductSinglePremium([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      product["riders"].map((rider: any) => {
        rider["categoryId"] = -1;
        calcPremium(rider, true);
      });
      calcPremium(product, false);
    });

    ILPProducts.map((product: any) => {
      setProductAnnualPremium([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      setProductSinglePremium([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      product["riders"].map((rider: any) => {
        rider["categoryId"] = -1;
        calcPremium(rider, true);
      });
      calcPremium(product, false);
    });

    customProducts.map((product: any) => {
      setProductAnnualPremium([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      setProductSinglePremium([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      product["riders"].map((rider: any) => {
        rider["categoryId"] = -1;
        calcPremium(rider, true);
      });
      calcPremium(product, false);
    });

    CISProducts.map((product: any) => {
      calcPremiumForCIS(product);
    });
  };

  const getProductsByFilteringGroupId = (groupId: any, products: any) => {
    const result: Array<any> = [];
    if (products) {
      let result = products.filter((product: any) => {
        if (product["groupId"] == groupId) {
          return true;
        } else {
          return false;
        }
      });
    }
    return result;
  };

  const getNameFromId = (id: any) => {
    if (id < 2) {
      return getPfr9.clients[id]["clientName"];
    } else {
      return getPfr9.dependants[id - 2]["name"];
    }
  };

  const checkNameOfInsure = (before: any, after: any) => {
    if (before === "Other") {
      return after;
    } else {
      return before;
    }
  };

  const getGroupName = (groupId: any) => {
    let name = "";
    getPfr9.groups.map((group: any) => {
      if (group["id"] == groupId) {
        name = group["name"];
      }
    });
    return name;
  };

  const getProductRiderBenefitRisk = () => {
    const productAndRiders: Array<any> = [];
    const benefits: Array<any> = [];
    const risks: Array<any> = [];

    let productNo = 0;

    if (getPfr9.recommendedProduct) {
      getPfr9.recommendedProduct.map((product: any, i: any) => {
        if (product["product"] != undefined) {
          productAndRiders.push({
            no: productNo,
            rowSpan: 1 + product["riders"].length,
            typeProductCustom: "ta",
            name: product["name"],
            feature: product["feature"],
            groupId: product["groupId"],
          });
          product["benefit"].map((b: any, index: any) => {
            let benefit = b;

            if (index == 0) {
              benefit["no"] = productNo;
              let riderBenefitCount = 0;
              product["riders"].map((rider: any) => {
                riderBenefitCount += rider["benefit"].length;
              });
              benefit["rowSpan"] =
                product["benefit"].length + riderBenefitCount;
            }

            benefit["productName"] = product["product"]["name"];
            benefit["groupId"] = product["groupId"];
            benefits.push(benefit);
          });
          product["risk"].map((r: any, index: any) => {
            let risk = r;

            if (index == 0) {
              risk["no"] = productNo;
              let riderRiskCount = 0;
              product["riders"].map((rider: any) => {
                riderRiskCount += rider["risk"].length;
              });
              risk["rowSpan"] = product["risk"].length + riderRiskCount;
            }

            risk["productName"] = product["product"]["name"];
            risk["groupId"] = product["groupId"];
            risks.push(risk);
          });
          product["riders"].map((rider: any) => {
            productAndRiders.push({
              typeProductCustom: "ta",
              name: rider["name"],
              feature: rider["feature"],
              groupId: product["groupId"],
            });
            rider["benefit"].map((bb: any) => {
              let benefit = bb;
              benefit["productName"] = rider["name"];
              benefit["mainProductName"] = product["product"]["name"];
              benefit["groupId"] = product["groupId"];
              benefits.push(benefit);
            });
            rider["risk"].map((rr: any) => {
              let risk = rr;
              risk["productName"] = rider["name"];
              risk["mainProductName"] = product["product"]["name"];
              risk["groupId"] = product["groupId"];
              risks.push(risk);
            });
          });
          productNo++;
        }
      });
    }

    if (getPfr9.CISILPProducts) {
      getPfr9.CISILPProducts.map((product: any, i: any) => {
        if (product["type"] == 0 || product["type"] == 2) {
          productAndRiders.push({
            no: productNo,
            rowSpan: 1 + product["riders"].length,
            typeProductCustom: "tb",
            name: product["name"],
            feature: product["feature"],
            groupId: product["groupId"],
          });
          product["benefit"].map((b: any, index: any) => {
            let benefit = b;

            if (index == 0) {
              benefit["no"] = productNo;
              let riderBenefitCount = 0;
              product["riders"].map((rider: any) => {
                riderBenefitCount += rider["benefit"].length;
              });
              benefit["rowSpan"] =
                product["benefit"].length + riderBenefitCount;
            }

            benefit["productName"] = product["name"];
            benefit["groupId"] = product["groupId"];
            benefits.push(benefit);
          });
          product["risk"].map((r: any, index: any) => {
            let risk = r;
            if (index == 0) {
              risk["no"] = productNo;
              let riderRiskCount = 0;
              product["riders"].map((rider: any) => {
                riderRiskCount += rider["risk"].length;
              });
              risk["rowSpan"] = product["risk"].length + riderRiskCount;
            }

            risk["productName"] = product["name"];
            risk["groupId"] = product["groupId"];
            risks.push(risk);
          });
          product["riders"].map((rider: any) => {
            productAndRiders.push({
              typeProductCustom: "tb",
              name: rider["name"],
              feature: rider["feature"],
              groupId: product["groupId"],
            });
            rider["benefit"].map((bb: any) => {
              let benefit = bb;
              benefit["productName"] = rider["name"];
              benefit["mainProductName"] = product["name"];
              benefit["groupId"] = product["groupId"];
              benefits.push(benefit);
            });
            rider["risk"].map((rr: any) => {
              let risk = rr;
              risk["productName"] = rider["name"];
              risk["mainProductName"] = product["name"];
              risk["groupId"] = product["groupId"];
              risks.push(risk);
            });
          });
          productNo++;
        } else {
          productAndRiders.push({
            no: productNo,
            rowSpan: 1,
            typeProductCustom: "tc",
            name: product["cis"]["name"],
            feature: product["cis"]["feature"],
            groupId: product["groupId"],
          });
          product["cis_benefit"].map((b: any, index: any) => {
            let benefit = b;
            if (index == 0) {
              benefit["no"] = productNo;
              benefit["rowSpan"] = product["cis_benefit"].length;
            }

            benefit["productName"] = product["cis"]["name"];
            benefit["groupId"] = product["groupId"];
            benefits.push(benefit);
          });
          product["cis_risk"].map((r: any, index: any) => {
            let risk = r;
            if (index == 0) {
              risk["no"] = productNo;
              risk["rowSpan"] = product["cis_risk"].length;
            }

            risk["productName"] = product["cis"]["name"];
            risk["groupId"] = product["groupId"];
            risks.push(risk);
          });
          productNo++;
        }
      });
    }

    setProductAndRiders(productAndRiders);
    setBenefits(benefits);
    setRisks(risks);
  };

  const getGroupRow = () => {
    setRowOfGroupCell({
      product: {},
      ilp: {},
      cis: {},
      cisilp: {},
      productAndRiders: {},
      benefit: {},
      risk: {},
    });
    dataRowOfGroupCell["product"]["length"] = 0;
    if (getPfr9.recommendedProduct) {
      getPfr9.recommendedProduct.map((product: any) => {
        if (dataRowOfGroupCell["product"][product["groupId"]] == undefined) {
          dataRowOfGroupCell["product"][product["groupId"]] =
            1 + product["riders"].length;
        } else {
          dataRowOfGroupCell["product"][product["groupId"]] +=
            1 + product["riders"].length;
        }
        if (
          product["product"]["categoryId"] == 8 ||
          product["product"]["categoryId"] == 5
        ) {
          dataRowOfGroupCell["product"][product["groupId"]]++;
        }

        dataRowOfGroupCell["product"]["length"] += 1;
      });
    }

    if (getPfr9.CISILPProducts) {
      getPfr9.CISILPProducts.map((product: any) => {
        if (dataRowOfGroupCell["cisilp"][product["groupId"]] == undefined) {
          dataRowOfGroupCell["cisilp"][product["groupId"]] = 0;
        }
        if (product["type"] == 1) {
          if (product["cis"] == undefined) {
            dataRowOfGroupCell["cisilp"][product["groupId"]] +=
              product["fund"].length == 0 ? 1 : product["fund"].length;
          } else {
            dataRowOfGroupCell["cisilp"][product["groupId"]] +=
              product["fund"].length == 0 ? 1 : product["fund"].length;
          }
        } else {
          dataRowOfGroupCell["cisilp"][product["groupId"]] +=
            product["fund"].length == 0 ? 1 : product["fund"].length;
          dataRowOfGroupCell["cisilp"][product["groupId"]] +=
            product["riders"].length;
        }
      });
    }

    if (dataBenefits) {
      dataBenefits.map((benefit: any) => {
        if (dataRowOfGroupCell["benefit"][benefit["groupId"]] == undefined) {
          dataRowOfGroupCell["benefit"][benefit["groupId"]] = 0;
        }
        dataRowOfGroupCell["benefit"][benefit["groupId"]]++;
      });
    }

    if (dataRisks) {
      dataRisks.map((risk: any) => {
        if (dataRowOfGroupCell["risk"][risk["groupId"]] == undefined) {
          dataRowOfGroupCell["risk"][risk["groupId"]] = 0;
        }
        dataRowOfGroupCell["risk"][risk["groupId"]]++;
      });
    }

    if (dataProductAndRiders) {
      dataProductAndRiders.map((product: any) => {
        let group = product["typeProductCustom"] + product["groupId"];

        if (dataRowOfGroupCell["productAndRiders"][group] == undefined) {
          dataRowOfGroupCell["productAndRiders"][group] = 0;
        }
        dataRowOfGroupCell["productAndRiders"][group]++;
      });
    }

    setRowOfGroupCell(dataRowOfGroupCell);
    // console.log('dataRowOfGroupCell', dataRowOfGroupCell)
  };

  const getModelRiskCategoryName = (portfolio: any) => {
    switch (Number(portfolio)) {
      case 0:
        return "Capital Preservation";
      case 1:
        return "Conservative";
      case 2:
        return "Balanced";
      case 3:
        return "Growth";
      case 4:
        return "Aggressive";
      case 5:
        return "N/A";
    }
  };

  const getHigherThanProfileName = (profile: any) => {
    switch (Number(profile)) {
      case 0:
        return "No";
      case 1:
        return "Yes";
    }
  };

  return (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
      <div
        id="section-header-9"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec9" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec9"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 9. Analysis & Recommendation{" "}
        </HeadingPrimarySection>
      </div>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.1 Client Overview
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            {`1) Client's situation(s), consideration(s), objective(s),
            concern(s), medical condition(s), shortfall amount($), where
            applicable*`}
          </TextThin>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.overView1}
            onEditorStateChange={handleOverView1}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "history",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false },
              },
            }}
          />

          {/* <TextArea defaultValue="text here" rows={5} /> */}
        </RowSingleGrid>

        <RowSingleGrid>
          <TextThin>
            {`2) Client's investment objectives, investment time horizon,
            investment risk profile, where applicable *`}
          </TextThin>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.overView2}
            onEditorStateChange={handleOverView2}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "history",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false },
              },
            }}
          />
          {/* <TextArea defaultValue="text here" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.2 Plans Recommendation
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        {/* Button Add Group */}
        <RowSingleGrid>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-fit items-center justify-center gap-x-1.5 rounded-xl bg-green-deep px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-deep">
                ADD GROUP
                <ArrowDropDownLineIcon />
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
              <Menu.Items className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => showDetail("Protection", 0)}
                        className={classNames(
                          active
                            ? "bg-gray-soft-light text-gray-light"
                            : "text-gray-light",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Protection
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => showDetail("Term", 0)}
                        className={classNames(
                          active
                            ? "bg-gray-soft-light text-gray-light"
                            : "text-gray-light",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Term
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => showDetail("Long-Term Care", 0)}
                        className={classNames(
                          active
                            ? "bg-gray-soft-light text-gray-light"
                            : "text-gray-light",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Long-Term Care
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </RowSingleGrid>
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
                {getClients.map((resData: any, index: any) => (
                  <tr key={"sds" + index}>
                    <td className="px-2 py-5">Client {index + 1}</td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataAnnualPayorBudget[index][0])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataSinglePayorBudget[index][0])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataAnnualPayorBudget[index][1])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataSinglePayorBudget[index][1])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataAnnualPayorBudget[index][2])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataSinglePayorBudget[index][2])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataAnnualPayorBudget[index][3])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataSinglePayorBudget[index][3])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataAnnualPayorBudget[index][4])}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {currencyFormat(dataSinglePayorBudget[index][4])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
        {/* Total By Client Choice */}
        <RowSingleGrid>
          <TextSmall>Total by Client Choice</TextSmall>
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
                {getClients.map((resData: any, index: any) => (
                  <tr key={"sds" + index}>
                    <td className="px-2 py-5">Client {index + 1}</td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalAnnualPremiumChoice[index][0])
                        ? 0
                        : currencyFormat(
                            dataTotalAnnualPremiumChoice[index][0]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalSinglePremiumChoice[index][0])
                        ? 0
                        : currencyFormat(
                            dataTotalSinglePremiumChoice[index][0]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalAnnualPremiumChoice[index][1])
                        ? 0
                        : currencyFormat(
                            dataTotalAnnualPremiumChoice[index][1]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalSinglePremiumChoice[index][1])
                        ? 0
                        : currencyFormat(
                            dataTotalSinglePremiumChoice[index][1]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalAnnualPremiumChoice[index][2])
                        ? 0
                        : currencyFormat(
                            dataTotalAnnualPremiumChoice[index][2]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalSinglePremiumChoice[index][2])
                        ? 0
                        : currencyFormat(
                            dataTotalSinglePremiumChoice[index][2]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalAnnualPremiumChoice[index][3])
                        ? 0
                        : currencyFormat(
                            dataTotalAnnualPremiumChoice[index][3]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalSinglePremiumChoice[index][3])
                        ? 0
                        : currencyFormat(
                            dataTotalSinglePremiumChoice[index][3]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalAnnualPremiumChoice[index][4])
                        ? 0
                        : currencyFormat(
                            dataTotalAnnualPremiumChoice[index][4]
                          )}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(dataTotalSinglePremiumChoice[index][4])
                        ? 0
                        : currencyFormat(
                            dataTotalSinglePremiumChoice[index][4]
                          )}
                    </td>
                  </tr>
                ))}
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
                {getClients.map((resData: any, index: any) => (
                  <tr key={"ssd" + index}>
                    <td className="px-2 py-5">Client{index + 1}</td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataAnnualPayorBudget[index][0] -
                          dataTotalAnnualPremiumChoice[index][0]
                      )
                        ? 0
                        : dataAnnualPayorBudget[index][0] -
                          dataTotalAnnualPremiumChoice[index][0]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataSinglePayorBudget[index][0] -
                          dataTotalSinglePremiumChoice[index][0]
                      )
                        ? 0
                        : dataSinglePayorBudget[index][0] -
                          dataTotalSinglePremiumChoice[index][0]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataAnnualPayorBudget[index][1] -
                          dataTotalAnnualPremiumChoice[index][1]
                      )
                        ? 0
                        : dataAnnualPayorBudget[index][1] -
                          dataTotalAnnualPremiumChoice[index][1]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataSinglePayorBudget[index][1] -
                          dataTotalSinglePremiumChoice[index][1]
                      )
                        ? 0
                        : dataSinglePayorBudget[index][1] -
                          dataTotalSinglePremiumChoice[index][1]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataAnnualPayorBudget[index][2] -
                          dataTotalAnnualPremiumChoice[index][2]
                      )
                        ? 0
                        : dataAnnualPayorBudget[index][2] -
                          dataTotalAnnualPremiumChoice[index][2]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataSinglePayorBudget[index][2] -
                          dataTotalSinglePremiumChoice[index][2]
                      )
                        ? 0
                        : dataSinglePayorBudget[index][2] -
                          dataTotalSinglePremiumChoice[index][2]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataAnnualPayorBudget[index][3] -
                          dataTotalAnnualPremiumChoice[index][3]
                      )
                        ? 0
                        : dataAnnualPayorBudget[index][3] -
                          dataTotalAnnualPremiumChoice[index][3]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataSinglePayorBudget[index][3] -
                          dataTotalSinglePremiumChoice[index][3]
                      )
                        ? 0
                        : dataSinglePayorBudget[index][3] -
                          dataTotalSinglePremiumChoice[index][3]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataAnnualPayorBudget[index][4] -
                          dataTotalAnnualPremiumChoice[index][4]
                      )
                        ? 0
                        : dataAnnualPayorBudget[index][4] -
                          dataTotalAnnualPremiumChoice[index][4]}
                    </td>
                    <td className="px-2 py-5 text-center">
                      {isNaN(
                        dataSinglePayorBudget[index][4] -
                          dataTotalSinglePremiumChoice[index][4]
                      )
                        ? 0
                        : dataSinglePayorBudget[index][4] -
                          dataTotalSinglePremiumChoice[index][4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Group List */}
        <RowSingleGrid>
          <TextSmall>Group List</TextSmall>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Group Name</th>
                  <th className="px-2 py-5">Total Product(s)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getPfr9?.groups
                  ? getPfr9.groups.map((dataGroup: any, index: any) => (
                      <tr key={"sas" + index}>
                        <td className="px-2 py-5">{index + 1}</td>
                        <td className="px-2 py-5">{dataGroup.name}</td>
                        <td className="px-2 py-5">
                          {dataGroup.recommend_products.length}
                        </td>
                        <td className="w-1/12 px-2 py-5">
                          <div className="flex w-full gap-2">
                            <ButtonBox className="text-green-deep">
                              <PencilLineIcon size={14} />
                            </ButtonBox>
                            <ButtonBox className="text-red">
                              <CloseLineIcon size={14} />
                            </ButtonBox>
                          </div>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Recommended Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left border divide-y rounded-md divide-gray-soft-strong border-gray-soft-strong border-slate-500">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    SN
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Name of Plan(s) / Rider(s)
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Policy Term
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Sum Assured
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Premium Type
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Premium ($)
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Premium Frequency
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Name of Owner / Insured
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Client Choice
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Group Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPfr9?.recommendedProduct
                  ? getPfr9.recommendedProduct.map((product: any, index: any) =>
                      product["product"]["categoryId"] != 8 &&
                      product["product"]["categoryId"] != 5 ? (
                        <Fragment key={"sas" + index}>
                          <tr>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={1 + product["riders"].length}
                            >
                              {index + 1}
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              <b>{product["name"]}</b>
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {product["policyTerm"]}
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {product["sumAssured"]}
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {premiumTypes[product["premiumPaymentType"]]}
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {product["premium"]}
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {getPremiumFrequencyName(
                                product["premiumFrequency"]
                              )}
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={1 + product["riders"].length}
                            >
                              {product["nameOfInsure"] == null ||
                              product["nameOfInsure"] == "-1"
                                ? getNameFromId(product["nameOfOwner"])
                                : getNameFromId(product["nameOfOwner"]) +
                                  "/" +
                                  checkNameOfInsure(
                                    product["nameOfInsure"],
                                    product["nameOfInsureOther"]
                                  )}
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={1 + product["riders"].length}
                            >
                              <div
                                className="items-center justify-start gap-2 mb-10"
                                id={`custome-checkbox-${index}`}
                              >
                                <div className="items-start justify-start gap-4">
                                  <input
                                    type="checkbox"
                                    checked={product.checked}
                                    className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                                  />
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            {index == 0 ||
                            product["groupId"] !=
                              getPfr9.recommendedProduct[index - 1][
                                "groupId"
                              ] ? (
                              <td
                                className="px-2 py-5 border border-gray-soft-strong"
                                rowSpan={
                                  dataRowOfGroupCell["product"][
                                    product["groupId"]
                                  ] >= 2
                                    ? dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ] +
                                      dataRowsGroup[product["groupId"]].length
                                    : dataRowOfGroupCell["product"]["length"] ==
                                      1
                                    ? dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ]
                                    : dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ] == 1
                                    ? dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ] + 1
                                    : dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ]
                                }
                              >
                                {getGroupName(product["groupId"])}
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                          {product?.riders
                            ? product.riders.map((rider: any, indexR: any) => (
                                <tr key={"ssa" + indexR}>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    <ul>
                                      <li>{rider["name"]}</li>
                                    </ul>
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {rider["policyTerm"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {rider["sumAssured"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {premiumTypes[rider["premiumPaymentType"]]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {rider["premium"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {getPremiumFrequencyName(
                                      rider["premiumFrequency"]
                                    )}
                                  </td>
                                </tr>
                              ))
                            : ""}
                          {getPfr9?.recommendedProduct ? (
                            getPfr9.recommendedProduct.length != 1 ? (
                              <tr>
                                <td
                                  className="px-2 py-5 border border-gray-soft-strong"
                                  colSpan={4}
                                >
                                  <b>Subtotal Premium ($)</b>
                                </td>
                                <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                <td className="px-2 py-5 border border-gray-soft-strong">
                                  {product["premiumFrequency"] == 4 ? (
                                    <>
                                      <b>{product["totPremium"]}</b>
                                    </>
                                  ) : (
                                    <>
                                      <b>{product["totPremium"]}</b>
                                    </>
                                  )}
                                </td>
                                <td className="px-2 py-5 border border-gray-soft-strong">
                                  {product["premiumFrequency"] == 4 ? (
                                    <>
                                      <b>
                                        {getPremiumFrequencyName(
                                          product["premiumFrequency"]
                                        )}
                                      </b>
                                    </>
                                  ) : (
                                    <>
                                      <b>Annually</b>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </Fragment>
                      ) : (
                        <Fragment key={"sasa" + index}>
                          <tr>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2 + product["riders"].length}
                            >
                              {index + 1}
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2}
                            >
                              <b>{product["name"]}</b>
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2}
                            >
                              {product["policyTerm"]}
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2}
                            >
                              {product["sumAssured"]}
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              CASH
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {product["premium_for_hospitalization"] !==
                              null ? (
                                product["premium_for_hospitalization"]["cash"]
                              ) : (
                                <>0</>
                              )}
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2}
                            >
                              {getPremiumFrequencyName(
                                product["premiumFrequency"]
                              )}
                            </td>

                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2 + product["riders"].length}
                            >
                              {product["nameOfInsure"] == null ||
                              product["nameOfInsure"] == "-1"
                                ? getNameFromId(product["nameOfOwner"])
                                : getNameFromId(product["nameOfOwner"]) +
                                  "/" +
                                  checkNameOfInsure(
                                    product["nameOfInsure"],
                                    product["nameOfInsureOther"]
                                  )}
                            </td>
                            <td
                              className="px-2 py-5 border border-gray-soft-strong"
                              rowSpan={2 + product["riders"].length}
                            >
                              <div
                                className="items-center justify-start gap-2 mb-10"
                                id={`custome-checkbox-${index}`}
                              >
                                <div className="items-start justify-start gap-4">
                                  <input
                                    type="checkbox"
                                    checked={product.checked}
                                    className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                                  />
                                  <span></span>
                                </div>
                              </div>
                            </td>
                            {index == 0 ||
                            product["groupId"] !=
                              getPfr9.recommendedProduct[index - 1][
                                "groupId"
                              ] ? (
                              <td
                                className="px-2 py-5 border border-gray-soft-strong"
                                rowSpan={
                                  dataRowOfGroupCell["product"][
                                    product["groupId"]
                                  ] > 2
                                    ? dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ] +
                                      dataRowsGroup[product["groupId"]].length
                                    : dataRowOfGroupCell["product"]["length"] ==
                                      1
                                    ? dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ]
                                    : dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ] == 1
                                    ? dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ] + 1
                                    : dataRowOfGroupCell["product"][
                                        product["groupId"]
                                      ]
                                }
                              >
                                {getGroupName(product["groupId"])}
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                          <tr>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              CPF MEDISAVE
                            </td>
                            <td className="px-2 py-5 border border-gray-soft-strong">
                              {product["premium_for_hospitalization"] !==
                              null ? (
                                <>
                                  {
                                    product["premium_for_hospitalization"][
                                      "cpfMedisave"
                                    ]
                                  }
                                </>
                              ) : (
                                <>0</>
                              )}
                            </td>
                          </tr>
                          {product?.riders
                            ? product.riders.map((rider: any, indexSa: any) => (
                                <tr key={"sa" + indexSa} aria-rowspan={2}>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    <ul>
                                      <li>{rider["name"]}</li>
                                    </ul>
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {rider["policyTerm"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {rider["sumAssured"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {premiumTypes[rider["premiumPaymentType"]]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {rider["premium"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {getPremiumFrequencyName(
                                      rider["premiumFrequency"]
                                    )}
                                  </td>
                                </tr>
                              ))
                            : ""}
                          {getPfr9?.recommendedProduct ? (
                            getPfr9.recommendedProduct.length != 1 ? (
                              <tr>
                                <td
                                  className="px-2 py-5 border border-gray-soft-strong"
                                  colSpan={4}
                                >
                                  <b>Subtotal Premium ($)</b>
                                </td>
                                <td className="px-2 py-5 border border-gray-soft-strong"></td>
                                <td className="px-2 py-5 border border-gray-soft-strong">
                                  {product["premiumFrequency"] == 4 ? (
                                    <>
                                      <b>{product["totPremium"]}</b>
                                    </>
                                  ) : (
                                    <>
                                      <b>{product["totPremium"]}</b>
                                    </>
                                  )}
                                </td>
                                <td className="px-2 py-5 border border-gray-soft-strong">
                                  {product["premiumFrequency"] == 4 ? (
                                    <>
                                      <b>
                                        {getPremiumFrequencyName(
                                          product["premiumFrequency"]
                                        )}
                                      </b>
                                    </>
                                  ) : (
                                    <>
                                      <b>Annually</b>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </Fragment>
                      )
                    )
                  : ""}
              </tbody>
              <tbody>
                <tr>
                  <td
                    className="px-2 py-5 border border-gray-soft-strong"
                    colSpan={10}
                  >
                    <b>Total By Client Choice ($)</b>
                  </td>
                </tr>
                {getPfr9?.clients
                  ? getPfr9?.clients.map((dataClient: any, i: any) => (
                      <tr key={"sass" + i}>
                        <td
                          className="px-2 py-5 border border-gray-soft-strong"
                          colSpan={4}
                        >
                          <b>Client {i + 1} </b>
                        </td>
                        <td className="px-2 py-5 border border-gray-soft-strong">
                          {dataTotalRecomendationAnnualPremiumChoice[i][0] >
                          0 ? (
                            <>
                              <b>
                                CASH
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][0] >
                          0 ? (
                            <>
                              <b>
                                CASH
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][1] >
                          0 ? (
                            <>
                              <b>
                                CPFOA
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][1] >
                          0 ? (
                            <>
                              <b>
                                CPFOA
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][2] >
                          0 ? (
                            <>
                              <b>
                                CPFSA
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][2] >
                          0 ? (
                            <>
                              <b>
                                CPFSA
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][3] >
                          0 ? (
                            <>
                              <b>
                                CPF MEDISAVE
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][3] >
                          0 ? (
                            <>
                              <b>
                                CPF MEDISAVE
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][4] >
                          0 ? (
                            <>
                              <b>
                                SRS
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}
                          {dataTotalRecomendationSinglePremiumChoice[i][4] >
                          0 ? (
                            <>
                              <b>
                                SRS
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="px-2 py-5 border border-gray-soft-strong">
                          {dataTotalRecomendationAnnualPremiumChoice[i][0] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationAnnualPremiumChoice[
                                    i
                                  ][0]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][0] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationSinglePremiumChoice[
                                    i
                                  ][0]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][1] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationAnnualPremiumChoice[
                                    i
                                  ][1]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][1] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationSinglePremiumChoice[
                                    i
                                  ][1]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][2] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationAnnualPremiumChoice[
                                    i
                                  ][2]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][2] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationSinglePremiumChoice[
                                    i
                                  ][2]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][3] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationAnnualPremiumChoice[
                                    i
                                  ][3]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][3] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationSinglePremiumChoice[
                                    i
                                  ][3]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][4] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationAnnualPremiumChoice[
                                    i
                                  ][4]
                                }
                                <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][4] >
                          0 ? (
                            <>
                              <b>
                                {
                                  dataTotalRecomendationSinglePremiumChoice[
                                    i
                                  ][4]
                                }
                              </b>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="px-2 py-5 border border-gray-soft-strong">
                          {dataTotalRecomendationAnnualPremiumChoice[i][0] >
                          0 ? (
                            <>
                              <b>
                                Annually <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][0] >
                          0 ? (
                            <>
                              <b>
                                Single Payment <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][1] >
                          0 ? (
                            <>
                              <b>
                                Annually <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][1] >
                          0 ? (
                            <>
                              <b>
                                Single Payment <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][2] >
                          0 ? (
                            <>
                              <b>
                                Annually <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][2] >
                          0 ? (
                            <>
                              <b>
                                Single Payment <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][3] >
                          0 ? (
                            <>
                              <b>
                                Annually <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][3] >
                          0 ? (
                            <>
                              <b>
                                Single Payment <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationAnnualPremiumChoice[i][4] >
                          0 ? (
                            <>
                              <b>
                                Annually <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}

                          {dataTotalRecomendationSinglePremiumChoice[i][4] >
                          0 ? (
                            <>
                              <b>
                                Single Payment <br />
                              </b>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="px-2 py-5 border border-gray-soft-strong">
                          {getNameFromId(i)}
                        </td>
                        <td className="px-2 py-5 border border-gray-soft-strong"></td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        {/* Ilp Product */}
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left border divide-y rounded-md divide-gray-soft-strong border-gray-soft-strong border-slate-500">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    SN
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Name of ILP Plan / Rider(s)
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Fund Name
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Fund Amount (%)
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Premium Type
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Premium ($)
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Premium Frequency
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Model Portfolio Risk Category
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">{`Is the recommendation of a higher risk than the client's risk profile?`}</th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Name of Owner/Insured
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Client Choice{" "}
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Deviate
                  </th>
                  <th className="px-2 py-5 border border-gray-soft-strong">
                    Group Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPfr9?.CISILPProducts
                  ? getPfr9.CISILPProducts.map((product: any, i: any) => (
                      <Fragment key={"sasd" + i}>
                        <tr>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1 + product["riders"].length
                                : product["fund"].length +
                                  product["riders"].length
                            }
                          >
                            {getPfr9.recommendedProduct.length + i + 1}
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1
                                : product["fund"].length
                            }
                          >
                            {product.cis ? product.cis.name : product["name"]}
                          </td>
                          {product["fund"].length > 0 ? (
                            <>
                              <td className="px-2 py-5 border border-gray-soft-strong">
                                {product["fund"][0]["name"]}
                              </td>
                              <td className="px-2 py-5 border border-gray-soft-strong">
                                {product["fund"][0]["fund"]}
                              </td>
                              <td
                                className="px-2 py-5 border border-gray-soft-strong"
                                rowSpan={
                                  product["fund"].length == 0
                                    ? 1
                                    : product["fund"].length
                                }
                              >
                                {premiumTypes[product["premiumPaymentType"]]}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-2 py-5 border border-gray-soft-strong"></td>
                              <td className="px-2 py-5 border border-gray-soft-strong"></td>
                            </>
                          )}

                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1
                                : product["fund"].length
                            }
                          >
                            {product["premium"]}
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1
                                : product["fund"].length
                            }
                          >
                            {getPremiumFrequencyName(
                              product["premiumFrequency"]
                            )}
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1
                                : product["fund"].length
                            }
                          >
                            {getModelRiskCategoryName(
                              product["modelPortfolioRiskCategory"]
                            )}
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1
                                : product["fund"].length
                            }
                          >
                            {getHigherThanProfileName(
                              product["higherThanRiskProfile"]
                            )}
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1 + product["riders"].length
                                : product["fund"].length +
                                  product["riders"].length
                            }
                          >
                            {product["nameOfInsure"] == null ||
                            product["nameOfInsure"] == "-1"
                              ? getNameFromId(product["nameOfOwner"])
                              : getNameFromId(product["nameOfOwner"]) +
                                "/" +
                                checkNameOfInsure(
                                  product["nameOfInsure"],
                                  product["nameOfInsureOther"]
                                )}
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1 + product["riders"].length
                                : product["fund"].length +
                                  product["riders"].length
                            }
                          >
                            <div
                              className="items-center justify-start gap-2 mb-10"
                              id={`custome-checkbox2-${i}`}
                            >
                              <div className="items-start justify-start gap-4">
                                <input
                                  type="checkbox"
                                  checked={product.checked}
                                  className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                                />
                                <span></span>
                              </div>
                            </div>
                          </td>
                          <td
                            className="px-2 py-5 border border-gray-soft-strong"
                            rowSpan={
                              product["fund"].length == 0
                                ? 1 + product["riders"].length
                                : product["fund"].length +
                                  product["riders"].length
                            }
                          >
                            {dataOutcome[product["nameOfOwner"]] == 1 ? (
                              <>
                                <div
                                  className="items-center justify-start gap-2 mb-10"
                                  id={`custome-checkbox2-${i}`}
                                >
                                  <div className="items-start justify-start gap-4">
                                    <input
                                      type="checkbox"
                                      checked={product.checked}
                                      className="p-2 text-right rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1"
                                    />
                                    <span></span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          {i == 0 ||
                          product["groupId"] !=
                            getPfr9.CISILPProducts[i - 1]["groupId"] ? (
                            <>
                              <td
                                className="px-2 py-5 border border-gray-soft-strong"
                                rowSpan={
                                  dataRowOfGroupCell["cisilp"][
                                    product["groupId"]
                                  ] > 5
                                    ? dataRowOfGroupCell["cisilp"][
                                        product["groupId"]
                                      ] + 2
                                    : dataRowOfGroupCell["cisilp"][
                                        product["groupId"]
                                      ] + 1
                                }
                              >
                                {getGroupName(product["groupId"])}
                              </td>
                            </>
                          ) : (
                            ""
                          )}
                        </tr>
                        {product.fund.length > 0
                          ? product.fund.map((fund: any, f: any) =>
                              f != 0 ? (
                                <tr key={"sas" + f}>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {fund["name"]}
                                  </td>
                                  <td className="px-2 py-5 border border-gray-soft-strong">
                                    {fund["fund"]}
                                  </td>
                                </tr>
                              ) : (
                                ""
                              )
                            )
                          : ""}
                      </Fragment>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </RowSingleGrid>

        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Product(s)/Rider(s) Name</th>
                  <th className="px-2 py-5">Feature</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Singlife Savvy Invest</td>
                  <td className="w-1/2 px-2 py-5">
                    {`Singlife Savvy Invest is a whole life, regular premium
                    investment-linked plan (ILP) that provides investment
                    opportunities as well as protection against death and
                    terminal illness. This plan offers a welcome bonus to help
                    boost the policyholder’s initial investment value and it
                    also rewards the policyholder with a loyalty bonus along the
                    policy term. At a life stage event, the policyholder can
                    also make a penalty-free withdrawal from the policy up to a
                    limit.`}
                  </td>
                  <td className="px-2 py-5">Protection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.3 Reason For Recommendation
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid className="text-sm font-normal">
          {`1) State how the plan meets client's need(s)`}
          <br />
          {`2) State and explain features and benefits relating to the product(s)`}
          sold
          <br />
          {`3) Affordability, consideration before investing (where applicable),`}
          remaining shortfall (if any)
        </RowSingleGrid>
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Product Name</th>
                  <th className="px-2 py-5">Benefit Name</th>
                  <th className="w-1/5 px-2 py-5">Benefit Content</th>
                  <th className="px-2 py-5">Main Product/Rider</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Singlife Savvy Invest</td>
                  <td className="px-2 py-5">Minimum Investment Period</td>
                  <td className="px-2 py-5">
                    {`There are two variations of minimum investment period
                    available under this plan: (a) Fixed; and (b) Flexible. Both
                    the Fixed and Flexible options offer a range of different
                    durations that the policyholder can choose from, depending
                    on his/her preferred commitment period. Please refer to the
                    policy contract for more information.`}
                  </td>
                  <td className="px-2 py-5">-</td>
                  <td className="px-2 py-5">Group One</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
        <RowSingleGrid>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.reasonForBenefit}
            onEditorStateChange={handleReasonBenefit}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "history",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false },
              },
            }}
          />
          {/* <TextArea label="Reason" defaultValue="Test reason" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.4 Risk / Limitation of Plan
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid className="text-sm">
          {`1) State any possible risks relating to the product(s) sold`}
          <br />
          {`2) State possible disadvantage(s) based on circumstances of client`}
        </RowSingleGrid>
        <RowSingleGrid>
          <div className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong">
            <table className="w-full text-sm text-left divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr>
                  <th className="px-2 py-5">SN</th>
                  <th className="px-2 py-5">Product Name</th>
                  <th className="px-2 py-5">Risk Name</th>
                  <th className="w-1/5 px-2 py-5">Risk Content</th>
                  <th className="px-2 py-5">Main Product/Rider</th>
                  <th className="px-2 py-5">Group Name</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="px-2 py-5">1</td>
                  <td className="px-2 py-5">Singlife Savvy Invest</td>
                  <td className="px-2 py-5">Minimum Investment Period</td>
                  <td className="px-2 py-5">
                    {`There are two variations of minimum investment period
                    available under this plan: (a) Fixed; and (b) Flexible. Both
                    the Fixed and Flexible options offer a range of different
                    durations that the policyholder can choose from, depending
                    on his/her preferred commitment period. Please refer to the
                    policy contract for more information.`}
                  </td>
                  <td className="px-2 py-5">-</td>
                  <td className="px-2 py-5">Group One</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RowSingleGrid>
        <RowSingleGrid>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.reasonForRisk}
            onEditorStateChange={handleReasonRisk}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "history",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false },
              },
            }}
          />
          {/* <TextArea label="Reason" defaultValue="Test reason" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.5 Reason For Deviation
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid className="text-sm font-normal text-gray-light">
          {`1) Reasons for any deviation from client's profile , objectives and/or Representative's recommendations (where applicable)`}
          <br />
          {`- Premiums are more than Client's budget`}
          <br />
          {`- Funds recommended (e.g ILP sub-fund, par, fund) are of a higher risk than client's risk preference`}
          <br />
          {`- Client's choice of product(s)/fund(s) differs from Representative's recommended plan(s)/funds`}
        </RowSingleGrid>
        <RowSingleGrid>
          <Editor
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            editorState={editorData.reasonForDeviation}
            onEditorStateChange={handleReasonDeviation}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "history",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false },
              },
            }}
          />
          {/* <TextArea label="Reason" defaultValue="Test reason" rows={5} /> */}
        </RowSingleGrid>
      </SectionCardSingleGrid>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(10)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default AnalysisRecommendationBackup;
