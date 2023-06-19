import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";

import Toggle from "@/components/Forms/Toggle";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, {useState, useEffect} from 'react'
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
import { SectionSeven } from "@/models/SectionSeven";
interface Props {
  id?: any;
}

const PrioritiesNeedAnalysis = (props: Props) => {
  let fillInformation = [
    { id: 0, name: "Nil" },
    { id: 1, name: "Review" },
  ];

  {/* No Data */}

  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setAnswerDefaultCheck,
    setAdditional,
  } = usePrioritiesNeedAnalysis();

  const resTotal = section7.typeClient + section7.totalDependant;
  let { showDetailData } = useNavigationSection();

  const setIncomeProtection = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundDisability = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundCritical = (data: any, i: any) => {
      // const updatedClient = newIncomeProtectionNeedClient.map((item: any, index: any) => {
      //   if(item[i] === true){
      //     item[i] = false;
      //   }else{
      //     item[i] = true;
      //   }
      //   return item;
      // });
      // console.log('updatedClient', updatedClient)
      // setIncomeProtectionNeedClient(updatedClient);
    
  };

  const setFundChildren = () => {
    console.log('setFundChildren')
  };

  const setFundMediumToLong = () => {
    console.log('setFundMediumToLong')
  };

  const setFundRetirement = () => {
    console.log('setFundRetirement')
  };

  const setCoverForPersonal = () => {
    console.log('setCoverForPersonal')
  };

  const setFundLongTermCare = () => {
    console.log('setFundLongTermCare')
  };

  const setFundHospitalExpense = () => {
    console.log('setFundHospitalExpense')
  };

  const setMaternityPlan = () => {
    console.log('setMaternityPlan')
  };

  const setEstatePlanning = () => {
    console.log('setEstatePlanning')
  };

  const setOtherInsurance = () => {
    console.log('setOtherInsurance')
  };

  const scrollPosition = useScrollPosition(7);
  
  const getPV = (fv:any, rate:any, n: any) =>{
    var sum = 0;
    for (var i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
    }
    return sum.toFixed(2);
  }

  // Rumus Income Protection
    const capitalSumRequired = (res: any) => {
      var result = getPV(
        res.annualAmountNeeded,
        res.netRateOfReture / 100,
        res.numberOfYearsNeed
      );

      return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
    }

    const totalCashOutflow = (res:any) => {
      var result = parseFloat(res.finalExpense) + parseFloat(res.emergencyFund) + parseFloat(res.mortgage) + parseFloat(res.personalDebts) + parseFloat(res.others);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const totalAB = (res: any) => {
      var result = parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashFlow);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const totalNetAmmount = (res: any) => {
      var result = res.total - res.existingResources - res.existingInsuranceCoverageOnDeath;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }
  // End Rumus Income Protection

  // Rumus Fund Disabilities
    const FundDisabCapitalSumRequired = (res: any) => {
      var result = getPV(
        res.annualAmountNeeded,
        res.netRateOfReture / 100,
        res.numberOfYearsNeed
      );

      return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
    }

    const FundDisabTotalCashOutflow = (res:any) => {
      var result = parseFloat(res.medicalExpense) + parseFloat(res.mortgage) + parseFloat(res.loans);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundDisabTotalAB = (res: any) => {
      var result = parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashOutflow);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundDisabTotalNetAmmount = (res: any) => {
      var result = res.total - res.existingResources - res.existingInsuranceCoverageOnDisability;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }
  // End Rumus Fund Disabilities



  useEffect(() => {    
    section7.answer.clientData.map(function(v: any, k: any){
      // IncomeProtect  
        const IncomeProtect = v.incomeProtectionUponDeath;
        const resCapitalSum = capitalSumRequired(IncomeProtect);  
        setClient(resCapitalSum, k, 'capitalSumRequired', 'incomeProtectionUponDeath');

        const resTotalCashOutflow = totalCashOutflow(IncomeProtect);
        setClient(resTotalCashOutflow, k, 'totalCashFlow', 'incomeProtectionUponDeath');

        const resTotal = totalAB(IncomeProtect);
        setClient(resTotal, k, 'total', 'incomeProtectionUponDeath');

        const totalNetAmount = totalNetAmmount(IncomeProtect);
        setClient(totalNetAmount, k, 'netAmountRequired', 'incomeProtectionUponDeath');
      // End IncomeProtect

      // Rumus Fund Disabilities
          const FunDisability = v.fundDisabilityIncomeExpense;
          const FundDisabResCapitalSum = FundDisabCapitalSumRequired(FunDisability);
          setClient(FundDisabResCapitalSum, k, 'capitalSumRequired', 'fundDisabilityIncomeExpense')

          const FundDisabResTotalCashOutflow = FundDisabTotalCashOutflow(FunDisability);
          setClient(FundDisabResTotalCashOutflow, k, 'totalCashOutflow', 'fundDisabilityIncomeExpense')

          const FundDisabResTotal = FundDisabTotalAB(FunDisability);
          setClient(FundDisabResTotal, k, 'totalAB', 'fundDisabilityIncomeExpense')

          const FundDisabTotalNetAmount = FundDisabTotalNetAmmount(FunDisability);
          setClient(FundDisabTotalNetAmount, k, 'totalNetAmmount', 'fundDisabilityIncomeExpense')
      // End Rumus Fund Disabilities
      

    });
    console.log('section7', section7)
  }, [section7]);

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
            isChecked={section7.answer.need.client[0][0]}
            toggleName={section7.answer.need.client[0][0] ? "Review" : "Not Review"}
            onChange={(event) => setIncomeProtection(!section7.answer.need.client[0][0], 0, 0)} />
            {/* <Toggle /> */}
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][0] ? <IncomeProtection section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.2 Protection (Fund Disability Income / Expense)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][1]}
            toggleName={section7.answer.need.client[0][1] ? "Review" : "Not Review"}
            onChange={() => setFundDisability(!section7.answer.need.client[0][1], 0, 1)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][1] ? <FundDisability  datas={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.3 Protection (Fund Critical Illness Expense)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][2]}
            toggleName={section7.answer.need.client[0][2] ? "Review" : "Not Review"}
            onChange={() => setFundCritical(!section7.answer.need.client[0][2], 2)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][2] ? <FundCritical datas={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.4 Saving & Investment (Fund Child(ren)'s Education)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][3]}
            toggleName={section7.answer.need.client[0][3] ? "Review" : "Not Review"}
            onChange={setFundChildren}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][3] ? <FundChildrens /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.5 Saving & Investment (Fund Medium to Long Term Savings /
            Investment Needs / Other Goals)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][4]}
            toggleName={section7.answer.need.client[0][4] ? "Review" : "Not Review"}
            onChange={setFundMediumToLong}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][4] ? <FundMediumToLong /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.6 Saving & Investment (Fund Retirement Lifestyle)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][5]}
            toggleName={section7.answer.need.client[0][5] ? "Review" : "Not Review"}
            onChange={setFundRetirement}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][5] ? <FundRetirement /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.7 Accident & Health (Cover for Personal Accident)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][6]}
            toggleName={section7.answer.need.client[0][6] ? "Review" : "Not Review"}
            onChange={setCoverForPersonal}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][6] ? <CoverForPersonal /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.8 Accident & Health (Fund Long Term Care)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][7]}
            toggleName={section7.answer.need.client[0][7] ? "Review" : "Not Review"}
            onChange={setFundLongTermCare}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][7] ? <FundLongTermCare /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.9 Accident & Health (Fund Hospital Expenses)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][8]}
            toggleName={section7.answer.need.client[0][8] ? "Review" : "Not Review"}
            onChange={setFundHospitalExpense}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][8] ? <FundHospitalExpenses /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.10 Maternity Plan</h2>
          <Toggle
            isChecked={section7.answer.need.client[0][9]}
            toggleName={section7.answer.need.client[0][9] ? "Review" : "Not Review"}
            onChange={setMaternityPlan}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][9] ? <MaternityPlan /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.11 Estate Planning</h2>
          <Toggle
            isChecked={section7.answer.need.client[0][10]}
            toggleName={section7.answer.need.client[0][10] ? "Review" : "Not Review"}
            onChange={setEstatePlanning}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][10] ? <EstatePlanning /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.12 Other Insurance(s)</h2>
          <Toggle
            isChecked={section7.answer.need.client[0][11]}
            toggleName={section7.answer.need.client[0][11] ? "Review" : "Not Review"}
            onChange={setOtherInsurance}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][11] ? <OtherInsurance /> : ""}
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
