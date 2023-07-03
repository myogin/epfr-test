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
import { Result } from "postcss";
import { parse } from "path";
interface Props {
  id?: any;
  pfrType?: number;
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
    setChildFund
  } = usePrioritiesNeedAnalysis();

  const resTotal = section7.typeClient + section7.totalDependant;
  let { showDetailData } = useNavigationSection();

  const setIncomeProtection = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundDisability = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundCritical = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundChildren = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundMediumToLong = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundRetirement = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setCoverForPersonal = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundLongTermCare = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setFundHospitalExpense = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setMaternityPlan = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setEstatePlanning = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
  };

  const setOtherInsurance = (data: any, indexClient: any, i: any) => {
    setNeed(data, indexClient, i);
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
  
  // Rumus Fund Critical Illness
    const FundCritCapitalSumRequired = (res: any) => {
      var result = getPV(
        res.annualAmountNeeded,
        res.netRateOfReture / 100,
        res.numberOfYearsNeed
      );

      return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
    }

    const FundCritTotalCashOutflow = (res:any) => {
      var result = parseFloat(res.medicalExpense) + parseFloat(res.mortgage) + parseFloat(res.loans);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundCritTotalAB = (res: any) => {
      var result = parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashOutflow);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundCritTotalNetAmmount = (res: any) => {
      var result = res.total - res.existingResources - res.existingInsuranceCoverageOnCI;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

  // End Rumus Fund Critical Illness

  // Rumus Fund Children Education 
    const FundChildFutureValueOfAnnualTuitionFee = (res:any) => {
      var result = res.annaulTuitionFees * Math.pow(1 + res.educationInflationRate / 100, res.yearsToTertiaryEducation);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundChildTotalTuitionFee = (res:any) => {
      var result = res.futureValueOfAnnualTuitionFee * res.noOfYearsOfStudy;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundChildFutureValueOfAnnualLivingCosts = (res:any) => {
      var result = res.annualLivingCosts * Math.pow(1 + res.inflationRate / 100, res.yearsToTertiaryEducation);
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundChildTotalLivinCost = (res:any) => {
      var result = res.futureValueOfAnnualLivingCosts * res.noOfYearsOfStudy;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundChildTotalEducationFunding = (res:any) => {
      var result = res.totalTuitionFee + res.totalLivingCost;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }

    const FundChildNetAmountRequired = (res:any) => {
      var result = res.totalEducationFunding - res.futureValueOfExistingResourceForEducation;
      return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }
  // End Rumus Fund Children Education

  // Rumus Fund Fund Medium Data
  const FundMediumNetAmountRequired = (res:any) => {
    const result = res.objective - res.less;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  }
  // End Rumus Fund Medium Data

  // Rumus Fund Retirement 

  // End Rumus Fund Retirement 



  useEffect(() => {    
    // Rumus Client Data

      if(section7.answer.clientData.length > 0){
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

          // Rumus Fund Critical Illness
            const FunCriticalIllness = v.fundCriticalIllnessExpense;
            const FunCritResCapitalSum = FundCritCapitalSumRequired(FunCriticalIllness);
            setClient(FunCritResCapitalSum, k, 'capitalSumRequired', 'fundCriticalIllnessExpense')

            const FunCritResTotalCashOutflow = FundCritTotalCashOutflow(FunCriticalIllness);
            setClient(FunCritResTotalCashOutflow, k, 'totalCashOutflow', 'fundCriticalIllnessExpense')

            const FunCritResTotal = FundCritTotalAB(FunCriticalIllness);
            setClient(FunCritResTotal, k, 'total', 'fundCriticalIllnessExpense')

            const FunCritTotalNetAmount = FundCritTotalNetAmmount(FunCriticalIllness);
            setClient(FunCritTotalNetAmount, k, 'netAmountRequired', 'fundCriticalIllnessExpense')
        // End Rumus Fund Critical Illness
        
        // Fund Fund Medium Data
            const FunMedium = v.fundMediumToLongTerm;
            const ResFundMediumNetAmountRequired = FundMediumNetAmountRequired(FunMedium);
            setClient(ResFundMediumNetAmountRequired, k, 'netAmountRequired', 'fundMediumToLongTerm')

        // End Fund Fund Medium Data
        
        // Fund Fund Retirement Data
          const  FundRetirement = v.fundRetirementLifeStyle;
          
          const yearsToRetirement = FundRetirement.expectedRetirementAge - FundRetirement.age < 0 ? 0 : FundRetirement.expectedRetirementAge - FundRetirement.age;
          const resultYearsToRetirement = isNaN(yearsToRetirement) ? 0 : parseFloat(yearsToRetirement.toFixed(2));
          setClient(resultYearsToRetirement, k, 'yearsToRetirement', 'fundRetirementLifeStyle')

          const incomeAtRetirementAge = FundRetirement.annualIncome * Math.pow(1 + FundRetirement.rateOfIncomeIncrement / 100, resultYearsToRetirement);
          const resultIncomeAtRetirementAge = isNaN(incomeAtRetirementAge) ? 0 : parseFloat(incomeAtRetirementAge.toFixed(2));
          setClient(resultIncomeAtRetirementAge, k, 'incomeAtRetirementAge', 'fundRetirementLifeStyle')
          
          var incomeRequiredAtRetirement = (resultIncomeAtRetirementAge * FundRetirement.percentOfIncomeRequiredAtRetirement) / 100;
          const resultIncomeRequiredAtRetirement = isNaN(incomeRequiredAtRetirement) ? 0 : parseFloat(incomeRequiredAtRetirement.toFixed(2));
          setClient(resultIncomeRequiredAtRetirement, k, 'incomeRequiredAtRetirement', 'fundRetirementLifeStyle')

          const expenseATRetirement = FundRetirement.retirementExpense * Math.pow(1 + FundRetirement.inflationRate / 100, resultYearsToRetirement);
          const resultExpenseATRetirement = isNaN(expenseATRetirement) ? 0 : parseFloat(expenseATRetirement.toFixed(2));
          setClient(resultExpenseATRetirement, k, 'expenseATRetirement', 'fundRetirementLifeStyle')
          
          if (FundRetirement.selectedMethod == 0) {
            var aliasAmountNeededAtRetirementAge = getPV(
              resultIncomeRequiredAtRetirement,
              FundRetirement.netRateOfReture / 100,
              FundRetirement.yearsToReceiveRetirementIncome
            );
          } else {
            var aliasAmountNeededAtRetirementAge = getPV(
              resultExpenseATRetirement,
              FundRetirement.netRateOfReture / 100,
              FundRetirement.yearsToReceiveRetirementIncome
            );
          }
          
          const resultAmountNeededAtRetirementAge = isNaN(parseFloat(aliasAmountNeededAtRetirementAge)) ? 0 : parseFloat(aliasAmountNeededAtRetirementAge);
          setClient(resultAmountNeededAtRetirementAge, k, 'amountNeededAtRetirementAge', 'fundRetirementLifeStyle')

          const netAmountRequired = resultAmountNeededAtRetirementAge - FundRetirement.less;
          const resultNetAmountRequired = isNaN(netAmountRequired) ? 0 : parseFloat(netAmountRequired.toFixed(2));
          setClient(resultNetAmountRequired, k, 'netAmountRequired', 'fundRetirementLifeStyle')
        // End Fund Fund Retirement Data

        // Cover Personal Accident
          const resCoverPersonalAccident = v.coverForPersonalAccident;
          const coverNetAmountRequired = resCoverPersonalAccident.amountNeeded - resCoverPersonalAccident.less;
          setClient(coverNetAmountRequired, k, 'netAmountRequired', 'coverForPersonalAccident');
        // End Cover Personal Accident

        // Cover Fund Long Term
          const resFundLongTermCare = v.fundLongTermCare;
          const FundNetAmountRequired = resFundLongTermCare.desiredMonthlyCashPayout - resFundLongTermCare.less;
          setClient(FundNetAmountRequired, k, 'netAmountRequired', 'fundLongTermCare');
        // End Fund Long Term

        // Maternity Others
          const resMaternity = v.maternity;
          const MaterNetAmountRequired = resMaternity.amountNeeded - resMaternity.less;
          setClient(MaterNetAmountRequired, k, 'netAmountRequired', 'maternity');
        // End Maternity Others
        });
      }

    // Rumus Dependant Data
      if(section7.answer.dependantData.length > 0){
        section7.answer.dependantData.map(function(v: any, k: any){
          // IncomeProtect  
            const IncomeProtect = v.incomeProtectionUponDeath;
            const resCapitalSum = capitalSumRequired(IncomeProtect);  
            setDependant(resCapitalSum, k, 'capitalSumRequired', 'incomeProtectionUponDeath');

            const resTotalCashOutflow = totalCashOutflow(IncomeProtect);
            setDependant(resTotalCashOutflow, k, 'totalCashFlow', 'incomeProtectionUponDeath');

            const resTotal = totalAB(IncomeProtect);
            setDependant(resTotal, k, 'total', 'incomeProtectionUponDeath');

            const totalNetAmount = totalNetAmmount(IncomeProtect);
            setDependant(totalNetAmount, k, 'netAmountRequired', 'incomeProtectionUponDeath');
          // End IncomeProtect

          // Rumus Fund Disabilities
              const FunDisability = v.fundDisabilityIncomeExpense;
              const FundDisabResCapitalSum = FundDisabCapitalSumRequired(FunDisability);
              setDependant(FundDisabResCapitalSum, k, 'capitalSumRequired', 'fundDisabilityIncomeExpense')

              const FundDisabResTotalCashOutflow = FundDisabTotalCashOutflow(FunDisability);
              setDependant(FundDisabResTotalCashOutflow, k, 'totalCashOutflow', 'fundDisabilityIncomeExpense')

              const FundDisabResTotal = FundDisabTotalAB(FunDisability);
              setDependant(FundDisabResTotal, k, 'totalAB', 'fundDisabilityIncomeExpense')

              const FundDisabTotalNetAmount = FundDisabTotalNetAmmount(FunDisability);
              setDependant(FundDisabTotalNetAmount, k, 'totalNetAmmount', 'fundDisabilityIncomeExpense')
          // End Rumus Fund Disabilities

          // Rumus Fund Critical Illness
            const FunCriticalIllness = v.fundCriticalIllnessExpense;
            const FunCritResCapitalSum = FundCritCapitalSumRequired(FunCriticalIllness);
            setDependant(FunCritResCapitalSum, k, 'capitalSumRequired', 'fundCriticalIllnessExpense')

            const FunCritResTotalCashOutflow = FundCritTotalCashOutflow(FunCriticalIllness);
            setDependant(FunCritResTotalCashOutflow, k, 'totalCashOutflow', 'fundCriticalIllnessExpense')

            const FunCritResTotal = FundCritTotalAB(FunCriticalIllness);
            setDependant(FunCritResTotal, k, 'total', 'fundCriticalIllnessExpense')

            const FunCritTotalNetAmount = FundCritTotalNetAmmount(FunCriticalIllness);
            setDependant(FunCritTotalNetAmount, k, 'netAmountRequired', 'fundCriticalIllnessExpense')
        // End Rumus Fund Critical Illness
        
        // Fund Fund Medium Data
            const FunMedium = v.fundMediumToLongTerm;
            const ResFundMediumNetAmountRequired = FundMediumNetAmountRequired(FunMedium);
            setDependant(ResFundMediumNetAmountRequired, k, 'netAmountRequired', 'fundMediumToLongTerm')

        // End Fund Fund Medium Data

        // Fund Fund Retirement Data
          const  FundRetirement = v.fundRetirementLifeStyle;
            
          const yearsToRetirement = FundRetirement.expectedRetirementAge - FundRetirement.age < 0 ? 0 : FundRetirement.expectedRetirementAge - FundRetirement.age;
          const resultYearsToRetirement = isNaN(yearsToRetirement) ? 0 : parseFloat(yearsToRetirement.toFixed(2));
          setDependant(resultYearsToRetirement, k, 'yearsToRetirement', 'fundRetirementLifeStyle')

          const incomeAtRetirementAge = FundRetirement.annualIncome * Math.pow(1 + FundRetirement.rateOfIncomeIncrement / 100, resultYearsToRetirement);
          const resultIncomeAtRetirementAge = isNaN(incomeAtRetirementAge) ? 0 : parseFloat(incomeAtRetirementAge.toFixed(2));
          setDependant(resultIncomeAtRetirementAge, k, 'incomeAtRetirementAge', 'fundRetirementLifeStyle')
          
          var incomeRequiredAtRetirement = (resultIncomeAtRetirementAge * FundRetirement.percentOfIncomeRequiredAtRetirement) / 100;
          const resultIncomeRequiredAtRetirement = isNaN(incomeRequiredAtRetirement) ? 0 : parseFloat(incomeRequiredAtRetirement.toFixed(2));
          setDependant(resultIncomeRequiredAtRetirement, k, 'incomeRequiredAtRetirement', 'fundRetirementLifeStyle')

          const expenseATRetirement = FundRetirement.retirementExpense * Math.pow(1 + FundRetirement.inflationRate / 100, resultYearsToRetirement);
          const resultExpenseATRetirement = isNaN(expenseATRetirement) ? 0 : parseFloat(expenseATRetirement.toFixed(2));
          setDependant(resultExpenseATRetirement, k, 'expenseATRetirement', 'fundRetirementLifeStyle')
          
          if (FundRetirement.selectedMethod == 0) {
            var aliasAmountNeededAtRetirementAge = getPV(
              resultIncomeRequiredAtRetirement,
              FundRetirement.netRateOfReture / 100,
              FundRetirement.yearsToReceiveRetirementIncome
            );
          } else {
            var aliasAmountNeededAtRetirementAge = getPV(
              resultExpenseATRetirement,
              FundRetirement.netRateOfReture / 100,
              FundRetirement.yearsToReceiveRetirementIncome
            );
          }
          
          const resultAmountNeededAtRetirementAge = isNaN(parseFloat(aliasAmountNeededAtRetirementAge)) ? 0 : parseFloat(aliasAmountNeededAtRetirementAge);
          setDependant(resultAmountNeededAtRetirementAge, k, 'amountNeededAtRetirementAge', 'fundRetirementLifeStyle')

          const netAmountRequired = resultAmountNeededAtRetirementAge - FundRetirement.less;
          const resultNetAmountRequired = isNaN(netAmountRequired) ? 0 : parseFloat(netAmountRequired.toFixed(2));
          setDependant(resultNetAmountRequired, k, 'netAmountRequired', 'fundRetirementLifeStyle')
        // End Fund Fund Retirement Dataaa

        // Cover Personal Accident
          const resCoverPersonalAccident = v.coverForPersonalAccident;
          const coverNetAmountRequired = resCoverPersonalAccident.amountNeeded - resCoverPersonalAccident.less;
          setClient(coverNetAmountRequired, k, 'netAmountRequired', 'coverForPersonalAccident');
        // End Cover Personal Accident

        // Cover Fund Long Term
          const resFundLongTermCare = v.fundLongTermCare;
          const FundNetAmountRequired = resFundLongTermCare.desiredMonthlyCashPayout - resFundLongTermCare.less;
          setClient(FundNetAmountRequired, k, 'netAmountRequired', 'fundLongTermCare');
        // End Fund Long Term

        // Maternity Others
          const resMaternity = v.maternity;
          const MaterNetAmountRequired = resMaternity.amountNeeded - resMaternity.less;
          setClient(MaterNetAmountRequired, k, 'netAmountRequired', 'maternity');
        // End Maternity Others
        });
      }

    // Rumus Child Fund Data
      if(section7.answer.childFund.length > 0){
        section7.answer.childFund.map(function(v: any, k:any){
          const resFutureValueOfAnnualTuitionFee = FundChildFutureValueOfAnnualTuitionFee(v);
          setChildFund(resFutureValueOfAnnualTuitionFee, k, 'futureValueOfAnnualTuitionFee');
          
          const resTotalTuitionFee = FundChildTotalTuitionFee(v);
          setChildFund(resTotalTuitionFee, k, 'totalTuitionFee');
          
          const resFutureValueOfAnnualLivingCosts = FundChildFutureValueOfAnnualLivingCosts(v);
          setChildFund(resFutureValueOfAnnualLivingCosts, k, 'futureValueOfAnnualLivingCosts');
          
          const resTotalLivinCost = FundChildTotalLivinCost(v);
          setChildFund(resTotalLivinCost, k, 'totalLivingCost');
          
          const resTotalEducationFunding = FundChildTotalEducationFunding(v);
          setChildFund(resTotalEducationFunding, k, 'totalEducationFunding');
          
          const resNetAmountRequired = FundChildNetAmountRequired(v);
          setChildFund(resNetAmountRequired, k, 'netAmountRequired');
        });

      }  

      localStorage.setItem("section7", JSON.stringify(section7));
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

        {section7.answer.need.client[0][1] ? <FundDisability  section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.3 Protection (Fund Critical Illness Expense)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][2]}
            toggleName={section7.answer.need.client[0][2] ? "Review" : "Not Review"}
            onChange={() => setFundCritical(!section7.answer.need.client[0][2], 0, 2)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][2] ? <FundCritical section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.4 Saving & Investment (Fund Child(ren)'s Education)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][3]}
            toggleName={section7.answer.need.client[0][3] ? "Review" : "Not Review"}
            onChange={(event) => setFundChildren(!section7.answer.need.client[0][3], 0, 3)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][3] ? <FundChildrens section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.5 Saving & Investment (Fund Medium to Long Term Savings /
            Investment Needs / Other Goals)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][4]}
            toggleName={section7.answer.need.client[0][4] ? "Review" : "Not Review"}
            onChange={(event) => setFundMediumToLong(!section7.answer.need.client[0][4], 0, 4)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][4] ? <FundMediumToLong section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.6 Saving & Investment (Fund Retirement Lifestyle)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][5]}
            toggleName={section7.answer.need.client[0][5] ? "Review" : "Not Review"}
            onChange={(event) => setFundRetirement(!section7.answer.need.client[0][5], 0, 5)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][5] ? <FundRetirement section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.7 Accident & Health (Cover for Personal Accident)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][6]}
            toggleName={section7.answer.need.client[0][6] ? "Review" : "Not Review"}
            onChange={(event) => setCoverForPersonal(!section7.answer.need.client[0][6], 0, 6)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][6] ? <CoverForPersonal section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.8 Accident & Health (Fund Long Term Care)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][7]}
            toggleName={section7.answer.need.client[0][7] ? "Review" : "Not Review"}
            onChange={(event) => setFundLongTermCare(!section7.answer.need.client[0][7], 0, 7)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][7] ? <FundLongTermCare section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.9 Accident & Health (Fund Hospital Expenses)
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][8]}
            toggleName={section7.answer.need.client[0][8] ? "Review" : "Not Review"}
            onChange={(event) => setFundHospitalExpense(!section7.answer.need.client[0][8], 0, 8)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][8] ? <FundHospitalExpenses section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.10 Maternity Plan</h2>
          <Toggle
            isChecked={section7.answer.need.client[0][9]}
            toggleName={section7.answer.need.client[0][9] ? "Review" : "Not Review"}
            onChange={(event) => setMaternityPlan(!section7.answer.need.client[0][9], 0, 9)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][9] ? <MaternityPlan section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.11 Estate Planning</h2>
          <Toggle
            isChecked={section7.answer.need.client[0][10]}
            toggleName={section7.answer.need.client[0][10] ? "Review" : "Not Review"}
            onChange={(event) => setEstatePlanning(!section7.answer.need.client[0][10], 0, 10)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][10] ? <EstatePlanning section7={section7}/> : []}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.12 Other Insurance(s)</h2>
          <Toggle
            isChecked={section7.answer.need.client[0][11]}
            toggleName={section7.answer.need.client[0][11] ? "Review" : "Not Review"}
            onChange={(event) => setOtherInsurance(!section7.answer.need.client[0][11], 0, 11)}
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][11] ? <OtherInsurance section7={section7}/> : []}
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
