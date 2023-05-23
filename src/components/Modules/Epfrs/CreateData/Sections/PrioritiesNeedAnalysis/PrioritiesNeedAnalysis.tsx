import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";

import Toggle from "@/components/Forms/Toggle";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState } from "react";
import IncomeProtection from "./IncomeProtection/IncomeProtection";
import FundDisability from "./FundDisability/FundDisability";
import FundCritical from "./FundCritical/FundCritical";
import FundChildrens from "./FundChildrens/FundChildrens";
import FundMediumToLong from "./FundMediumToLong/FundMediumToLong";
import FundRetirement from "./FundRetirement/FundRetirement";
import CoverForPersonal from "./CoverForPersonal/CoverForPersonal";
import FundLongTermCare from "./FundLongTermCare/FundLongTermCare";
import FundHospitalExpenses from "./FundHospitalExpenses/FundHospitalExpenses";
import MaternityPlan from "./MaternityPlan/MaternityPlan";
import EstatePlanning from "./EstatePlanning/EstatePlanning";
import OtherInsurance from "./OtherInsurance/OtherInsurance";
import { usePrioritiesNeedAnalysis } from "@/store/epfrPage/createData/prioritiesNeedAnalysis";

interface Props {
  id?: any;
}

const PrioritiesNeedAnalysis = (props: Props) => {
  let fillInformation = [
    { id: 0, name: "Nil" },
    { id: 1, name: "Review" },
  ];

  let {
    showIncomeProtection,
    showFundDisability,
    showFundCritical,
    showFundChildren,
    showFundMediumToLong,
    showFundRetirement,
    showCoverForPersonal,
    showFundLongTermCare,
    showFundHospitalExpense,
    showMaternityPlan,
    showEstatePlanning,
    showOtherInsurance,
    incomeProtection,
    fundDisability,
    fundCritical,
    fundChildren,
    fundMediumToLong,
    fundRetirement,
    coverForPersonal,
    fundLongTermCare,
    fundHospitalExpense,
    maternityPlan,
    estatePlanning,
    otherInsurance,
  } = usePrioritiesNeedAnalysis();

  let { showDetailData } = useNavigationSection();

  const setIncomeProtection = () => {
    showIncomeProtection(!incomeProtection);
  };

  const setFundDisability = () => {
    showFundDisability(!fundDisability);
  };

  const setFundCritical = () => {
    showFundCritical(!fundCritical);
  };

  const setFundChildren = () => {
    showFundChildren(!fundChildren);
  };

  const setFundMediumToLong = () => {
    showFundMediumToLong(!fundMediumToLong);
  };

  const setFundRetirement = () => {
    showFundRetirement(!fundRetirement);
  };

  const setCoverForPersonal = () => {
    showCoverForPersonal(!coverForPersonal);
  };

  const setFundLongTermCare = () => {
    showFundLongTermCare(!fundLongTermCare);
  };

  const setFundHospitalExpense = () => {
    showFundHospitalExpense(!fundHospitalExpense);
  };

  const setMaternityPlan = () => {
    showMaternityPlan(!maternityPlan);
  };

  const setEstatePlanning = () => {
    showEstatePlanning(!estatePlanning);
  };

  const setOtherInsurance = () => {
    showOtherInsurance(!otherInsurance);
  };

  const scrollPosition = useScrollPosition(7);

  return (
    <div id={props.id}>
      <div
        id="section-header-7"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec7" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec7"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 7. Priorities & Need Analysis
        </HeadingPrimarySection>
      </div>
      <>
        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.1 Protection (Income Protection Upon Death)
          </h2>
          <Toggle
            isChecked={incomeProtection}
            toggleName={incomeProtection ? "Review" : "Not Review"}
            onChange={setIncomeProtection}
          />
          {/* <Toggle /> */}
        </HeadingSecondarySectionDoubleGrid>

        {incomeProtection ? <IncomeProtection /> : null}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.2 Protection (Fund Disability Income / Expense)
          </h2>
          <Toggle
            isChecked={fundDisability}
            toggleName={fundDisability ? "Review" : "Not Review"}
            onChange={setFundDisability}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundDisability ? <FundDisability /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.3 Protection (Fund Critical Illness Expense)
          </h2>
          <Toggle
            isChecked={fundCritical}
            toggleName={fundCritical ? "Review" : "Not Review"}
            onChange={setFundCritical}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundCritical ? <FundCritical /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.4 Saving & Investment (Fund Child(ren)'s Education)
          </h2>
          <Toggle
            isChecked={fundChildren}
            toggleName={fundChildren ? "Review" : "Not Review"}
            onChange={setFundChildren}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundChildren ? <FundChildrens /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.5 Saving & Investment (Fund Medium to Long Term Savings /
            Investment Needs / Other Goals)
          </h2>
          <Toggle
            isChecked={fundMediumToLong}
            toggleName={fundMediumToLong ? "Review" : "Not Review"}
            onChange={setFundMediumToLong}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundMediumToLong ? <FundMediumToLong /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.6 Saving & Investment (Fund Retirement Lifestyle)
          </h2>
          <Toggle
            isChecked={fundRetirement}
            toggleName={fundRetirement ? "Review" : "Not Review"}
            onChange={setFundRetirement}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundRetirement ? <FundRetirement /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.7 Accident & Health (Cover for Personal Accident)
          </h2>
          <Toggle
            isChecked={coverForPersonal}
            toggleName={coverForPersonal ? "Review" : "Not Review"}
            onChange={setCoverForPersonal}
          />
        </HeadingSecondarySectionDoubleGrid>

        {coverForPersonal ? <CoverForPersonal /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.8 Accident & Health (Fund Long Term Care)
          </h2>
          <Toggle
            isChecked={fundLongTermCare}
            toggleName={fundLongTermCare ? "Review" : "Not Review"}
            onChange={setFundLongTermCare}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundLongTermCare ? <FundLongTermCare /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.9 Accident & Health (Fund Hospital Expenses)
          </h2>
          <Toggle
            isChecked={fundHospitalExpense}
            toggleName={fundHospitalExpense ? "Review" : "Not Review"}
            onChange={setFundHospitalExpense}
          />
        </HeadingSecondarySectionDoubleGrid>

        {fundHospitalExpense ? <FundHospitalExpenses /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.10 Maternity Plan</h2>
          <Toggle
            isChecked={maternityPlan}
            toggleName={maternityPlan ? "Review" : "Not Review"}
            onChange={setMaternityPlan}
          />
        </HeadingSecondarySectionDoubleGrid>

        {maternityPlan ? <MaternityPlan /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.11 Estate Planning</h2>
          <Toggle
            isChecked={estatePlanning}
            toggleName={estatePlanning ? "Review" : "Not Review"}
            onChange={setEstatePlanning}
          />
        </HeadingSecondarySectionDoubleGrid>

        {estatePlanning ? <EstatePlanning /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.12 Other Insurance(s)</h2>
          <Toggle
            isChecked={otherInsurance}
            toggleName={otherInsurance ? "Review" : "Not Review"}
            onChange={setOtherInsurance}
          />
        </HeadingSecondarySectionDoubleGrid>

        {otherInsurance ? <OtherInsurance /> : ""}
      </>

      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(3)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default PrioritiesNeedAnalysis;
