import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import RowSixGrid from "@/components/Attributes/Rows/Grids/RowSixGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useEffect, useState } from "react";
import { useAffordability } from "@/store/epfrPage/createData/affordability";
import { getLength } from "@/libs/helper";
import { useRouter } from "next/router";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import { getPfrStep, postPfrSections } from "@/services/pfrService";
import { useAnalysisRecommendation } from "@/store/epfrPage/createData/analysisRecommendation";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";

interface Props {
  id?: any;
  pfrType?: number;
}

const Affordability = (props: Props) => {
  const router = useRouter();
  let id = usePersonalInformation((state) => state.id);

  let section8 = useAffordability((state) => state.section8);
  let setPayorDetail = useAffordability((state) => state.setPayorDetail);
  let setPayorBudget = useAffordability((state) => state.setPayorBudget);
  let setSourceOfWealth = useAffordability((state) => state.setSourceOfWealth);
  let setAssetOrSurplus = useAffordability((state) => state.setAssetOrSurplus);
  let setGlobal = useAffordability((state) => state.setGlobal);
  let setInit = useAffordability((state) => state.setInit);
  
  let editableStatus = useAffordability(
    (state) => state.section8.editableStatus
  );
  let status = useAffordability((state) => state.section8.status);

  let idSectionNine = useAnalysisRecommendation(
    (state) => state.section9.pfrId
  );
  let setGlobalSectionNine = useAnalysisRecommendation(
    (state) => state.setParent
  );

  const scrollPositionBottom = useScrollPositionBottom(7);
  const scrollPositionNext = useScrollPosition(9);
  const scrollPosition = useScrollPosition(8);

  let pfrLocal = usePfrData((state) => state.pfr);

  // let getPfrLength = getLength(props.pfrType);

  let fillInformation: Array<any> = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  let payorForClient: Array<any> = [
    { id: 0, name: "Self" },
    { id: 1, name: "Pay for other" },
  ];

  let payorDetails: Array<any> = [
    { id: 0, name: "Cash", annual: 0, single: 0 },
    { id: 1, name: "CPF OA", annual: 0, single: 0 },
    { id: 2, name: "CPF SA", annual: 0, single: 0 },
    { id: 3, name: "CPF Medisave", annual: 0, single: 0 },
    { id: 4, name: "SRS", annual: 0, single: 0 },
  ];

  let { showDetailData } = useNavigationSection();

  const dataPayorDetail = (data: any) => {
    let resData = ["Cash", "CPF OA", "CPF SA", "CPF Medisave", "SRS"];

    return resData[data];
  };

  const handlePayorDetail = (event: any, key: any) => {
    const { groupdata } = event.target.dataset;
    const { name, value } = event.target;
    setPayorDetail(key, name, groupdata, value);
  };

  const checkboxPayorBudget = (event: any, key: any, index: any) => {
    const { name, value } = event.target;
    console.log("value", value);
    setPayorBudget(key, index, name, value);
  };

  const handleSourceOfWealth = (event: any, key: any) => {
    const { name, value } = event.target;
    setSourceOfWealth(key, name, value);
  };

  const handleAssetOrSurplus = (event: any, key: any) => {
    const { name, value } = event.target;
    setAssetOrSurplus(key, name, value);
  };

  const [loading, setLoading] = useState(false);

  const getSectionData = async (params: any) => {
    try {
      setLoading(true); // Set loading before sending API request
      let getSection8 = await getPfrStep(8, params);

      console.log(getSection8);

      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  const [saveLoading, setSaveLoading] = useState(false);

  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section8")
        ? localStorage.getItem("section8")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state;
      }

      let storeDataSection = await postPfrSections(8, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        if (
          idSectionNine === 0 ||
          idSectionNine === null ||
          idSectionNine === undefined
        ) {
          setGlobalSectionNine("pfrId", storeDataSection.data.pfrId);
        } else {
          setGlobalSectionNine("pfrId", id);
        }
        setGlobal("editableStatus", 1);
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  // Get data when scroll from section 1
  useEffect(() => {
    if (!router.isReady) return;
    // If edit check the ID
    setInit(props.pfrType);

    if (router.query.id !== null && router.query.id !== undefined) {
      if (scrollPositionBottom === "Process7") {
        setGlobal("editableStatus", pfrLocal.editableSection8);
        setGlobal("id", router.query.id);
        setGlobal("status", pfrLocal.section8);
        // getSectionData(router.query.id);
      }
    }
  }, [scrollPositionBottom, router.isReady, router.query.id]);

  useEffect(() => {
    if (scrollPositionNext === "okSec9") {
      if (
        (editableStatus === 0 && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("section8", section8);
        // storeData();
      } else {
        console.log("Your data not complete Section 2");
      }
    }
  }, [scrollPositionNext, editableStatus, status]);

  return (
    <div id={props.id}>
      <div
        id="section-header-8"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec8" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec8"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 8. Affordability
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid>
          {section8.payorDetail.map((data, key) => (
            <div
              className="text-left space-y-11"
              key={"payor-detail-top-" + key}
            >
              <Select
                className="my-4"
                name="isSelf"
                dataType="payorDetail"
                datas={payorForClient}
                value={data.isSelf}
                handleChange={(event) => handlePayorDetail(event, key)}
                label={`Payor For Client ${key + 1}`}
              />
            </div>
          ))}
        </RowDoubleGrid>

        <RowDoubleGrid>
          {section8.payorDetail.map((data, key) => {
            return data.isSelf == 1 ? (
              <div className="text-left space-y-11" key={"payor-detail-" + key}>
                <Input
                  className="mb-10"
                  type="text"
                  placeholder=""
                  name="relationShip"
                  dataType="payorDetail"
                  label={`PAYOR RELATIONSHIP TO CLIENT : ${key + 1}`}
                  handleChange={(event) => handlePayorDetail(event, key)}
                  needValidation={true}
                  logic={
                    data.relationShip == "" || data.relationShip == null
                      ? false
                      : true
                  }
                  value={data.relationShip}
                />
                <Input
                  className="mb-10"
                  type="text"
                  placeholder=""
                  name="payorName"
                  dataType="payorDetail"
                  label={`PAYOR NAME :`}
                  handleChange={(event) => handlePayorDetail(event, key)}
                  needValidation={true}
                  logic={
                    data.payorName == "" || data.payorName == null
                      ? false
                      : true
                  }
                  value={data.payorName}
                />
                <Input
                  className="mb-10"
                  type="text"
                  placeholder=""
                  name="passportNo"
                  dataType="payorDetail"
                  label={`PAYOR NRIC / PASSPORT NUMBER :`}
                  handleChange={(event) => handlePayorDetail(event, key)}
                  needValidation={true}
                  logic={
                    data.passportNo == "" || data.passportNo == null
                      ? false
                      : true
                  }
                  value={data.passportNo}
                />
                <Input
                  className="mb-10"
                  type="text"
                  placeholder=""
                  name="occupation"
                  dataType="payorDetail"
                  label={`PAYOR OCCUPATION :`}
                  handleChange={(event) => handlePayorDetail(event, key)}
                  needValidation={true}
                  logic={
                    data.occupation == "" || data.occupation == null
                      ? false
                      : true
                  }
                  value={data.occupation}
                />
                <Input
                  className="mb-10"
                  type="text"
                  placeholder=""
                  name="payorIncome"
                  dataType="payorDetail"
                  label={`PAYOR ANNUAL INCOME RANGE (S$) :`}
                  handleChange={(event) => handlePayorDetail(event, key)}
                  needValidation={true}
                  logic={
                    data.payorIncome == 0 || data.payorIncome == null
                      ? false
                      : true
                  }
                  value={data.payorIncome}
                />
              </div>
            ) : (
              ""
            );
          })}
        </RowDoubleGrid>
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60" key={"part-2"}>
        <RowSingleGrid key={"row-1"}>
          <HeadingSecondarySection key={"heading-1"}>
            Payor Budget
          </HeadingSecondarySection>
        </RowSingleGrid>
        <RowSixGrid key={"row-six"}>
          <div></div>
          {payorDetails?.length &&
            payorDetails.map((val, index) => (
              <div
                key={"payor-budget-top" + val.id}
                className="flex items-center justify-center text-sm font-normal"
              >
                {val.name}
              </div>
            ))}
        </RowSixGrid>
        {section8.payorBudget.map((data, key) => (
          <RowSixGrid key={"payor-budget-top-data" + key}>
            <label className="text-sm font-bold" key={"client" + key}>
              Client {key + 1}
            </label>
            {data?.length &&
              data.map((val, index) => (
                <div
                  key={"payor-budget-checkbox" + index}
                  className="flex items-center justify-center"
                >
                  <Checkbox
                    name="selection"
                    onChange={(event) => checkboxPayorBudget(event, key, index)}
                  />
                </div>
              ))}
          </RowSixGrid>
        ))}
      </SectionCardSingleGrid>

      {section8.payorBudget.map((data, key) => {
        return (
          <SectionCardSingleGrid
            className="mx-8 border-b 2xl:mx-60 border-gray-soft-strong"
            key={"payor-" + key}
          >
            <RowSingleGrid key={"reference" + key}>
              <h4 className="text-sm font-bold mb-9">
                References From Previous Sections Client {key + 1}
              </h4>
            </RowSingleGrid>
            <RowTripleGrid className="mb-16" key={"total-annual" + key}>
              <div className="space-y-8 text-center">
                <div className="p-5 text-sm font-bold bg-gray-soft-white-soft">
                  Total Annual Income ($)
                </div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="space-y-8 text-center">
                <div className="p-5 text-sm font-bold bg-gray-soft-white-soft">
                  Total Annual Expense ($)
                </div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="space-y-8 text-center">
                <div className="p-5 text-sm font-bold bg-gray-soft-white-soft">
                  Annual Surplus / Shortfall ($)
                </div>
                <div className="text-sm font-normal">0</div>
              </div>
            </RowTripleGrid>
            <RowTripleGrid key={"total-asset" + key}>
              <div className="space-y-8 text-center">
                <div className="p-5 text-sm font-bold bg-gray-soft-white-soft">
                  Total Asset($)
                </div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="space-y-8 text-center">
                <div className="p-5 text-sm font-bold bg-gray-soft-white-soft">
                  Total Liabilities($)
                </div>
                <div className="text-sm font-normal">0</div>
              </div>
              <div className="space-y-8 text-center">
                <div className="p-5 text-sm font-bold bg-gray-soft-white-soft">
                  Net Worth ($)
                </div>
                <div className="text-sm font-normal">0</div>
              </div>
            </RowTripleGrid>

            {/* Payor Details */}
            {data.length > 0 ? (
              <>
                <RowSingleGrid>
                  <RowSingleGrid>
                    <HeadingSecondarySection>
                      Payor Details
                    </HeadingSecondarySection>
                  </RowSingleGrid>
                </RowSingleGrid>
                <RowFourthGrid>
                  <div></div>
                  <div className="text-sm font-bold text-right">Annual ($)</div>
                  <div className="text-sm font-bold text-right">Single ($)</div>
                  <div className="text-sm font-bold text-right">
                    Source of Fund
                  </div>
                </RowFourthGrid>
              </>
            ) : null}

            {data?.length &&
              data.map((val, index) =>
                val.selection === true ? (
                  <RowFourthGrid
                    key={"payor-detail-" + key + "-" + index}
                    className="items-center"
                  >
                    <div key={`dataPayorDetail` + index}>
                      <TextSmall className="text-gray-light">
                        {dataPayorDetail(index)}
                      </TextSmall>
                    </div>
                    <div>
                      <Input
                        className="my-4"
                        type="text"
                        formStyle="text-right"
                        name="annual"
                        value={val.annual}
                        handleChange={(event) =>
                          checkboxPayorBudget(event, key, index)
                        }
                      />
                    </div>
                    <div>
                      <Input
                        className="my-4"
                        type="text"
                        formStyle="text-right"
                        name="single"
                        value={val.single}
                        handleChange={(event) =>
                          checkboxPayorBudget(event, key, index)
                        }
                      />
                    </div>
                    <div>
                      <div className="mb-2">
                        <Checkbox
                          lableStyle="text-sm font-normal"
                          label="Past / Current Employment"
                          name="sourceOfFund"
                          onChange={(event) =>
                            checkboxPayorBudget(event, key, index)
                          }
                          isChecked={
                            val.sourceOfFund == "Past / Current Employment"
                          }
                          value="Past / Current Employment"
                        />
                      </div>
                      <div className="mb-2">
                        <Checkbox
                          lableStyle="text-sm font-normal"
                          label="Investment"
                          name="sourceOfFund"
                          onChange={(event) =>
                            checkboxPayorBudget(event, key, index)
                          }
                          isChecked={val.sourceOfFund == "Investment"}
                          value="Investment"
                        />
                      </div>
                      <div className="mb-2">
                        <Checkbox
                          lableStyle="text-sm font-normal"
                          label="Inheritance"
                          name="sourceOfFund"
                          onChange={(event) =>
                            checkboxPayorBudget(event, key, index)
                          }
                          isChecked={val.sourceOfFund == "Inheritance"}
                          value="Inheritance"
                        />
                      </div>
                    </div>
                  </RowFourthGrid>
                ) : (
                  ""
                )
              )}
          </SectionCardSingleGrid>
        );
      })}

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        Source of Wealth
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div
          className={
            section8.sourceOfWealth.length > 1
              ? `grid grid-cols-1 gap-8 mb-5 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2`
              : `grid grid-cols-1 gap-8 mb-5`
          }
        >
          {section8.sourceOfWealth.map((data, key) => {
            return (
              <div key={`sourceOfWealth` + key}>
                <TextSmall>Client {key + 1}</TextSmall>
                <br></br>
                <div className="flex items-center justify-start gap-4 text-sm font-normal text-gray-light">
                  <div
                    className="flex items-center justify-start gap-2"
                    key={`employment` + key}
                  >
                    <Checkbox
                      label="Past / Current Employment"
                      name="employment"
                      onChange={(e) => handleSourceOfWealth(e, key)}
                      isChecked={data.employment}
                      value={data.employment}
                    />
                  </div>
                  <div
                    className="flex items-center justify-start gap-2"
                    key={`investment` + key}
                  >
                    <Checkbox
                      label="Investment"
                      name="investment"
                      onChange={(e) => handleSourceOfWealth(e, key)}
                      isChecked={data.investment}
                      value={data.investment}
                    />
                  </div>
                  <div
                    className="flex items-center justify-start gap-2"
                    key={`inheritance` + key}
                  >
                    <Checkbox
                      label="Inheritance"
                      name="inheritance"
                      onChange={(e) => handleSourceOfWealth(e, key)}
                      isChecked={data.inheritance}
                      value={data.inheritance}
                    />
                  </div>
                  <div
                    className="flex items-center justify-start gap-2"
                    key={`other` + key}
                  >
                    <Checkbox
                      label="Saving"
                      name="other"
                      onChange={(e) => handleSourceOfWealth(e, key)}
                      isChecked={data.other}
                      value={data.other}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <TextSmall>If other please specify</TextSmall>
                  <TextArea
                    className="my-4"
                    name="otherExplain"
                    defaultValue={data.otherExplain}
                    handleChange={(e) => handleSourceOfWealth(e, key)}
                  />
                  <small>
                    To indicate source of wealth if transaction(s) is/are ≤
                    $150,000
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div
          key={`sourceOfWealthIndex`}
          className={
            section8.sourceOfWealth.length > 1
              ? "grid grid-cols-1 gap-8 mb-5 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2"
              : "grid grid-cols-1 gap-8 mb-5"
          }
        >
          {section8.assetOrSurplus.map((data, key) => {
            return (
              <div className="" key={`SOW-1-` + key}>
                <TextThin>
                  Is the budget set aside a substantial portion of The Payor’s
                  assets or surplus?
                </TextThin>
                <Select
                  className="my-4"
                  datas={fillInformation}
                  dataType="assetOrSurplus"
                  value={data.answer}
                  name="answer"
                  handleChange={(event) => handleAssetOrSurplus(event, key)}
                />

                {data.answer == 1 ? (
                  <TextArea
                    label="Reason"
                    placeholder="Please provide reason for setting aside a substantial budget"
                    defaultValue={data.reason}
                  />
                ) : null}

                <small className="text-sm italic font-normal">
                  {`If the answer is "Yes", a potential risk of not being able to
                continue paying premiums in the future may occur. Budget is
                considered substantial if it is more than 50% of assets or surplus`}
                </small>
              </div>
            );
          })}
        </div>
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default Affordability;
