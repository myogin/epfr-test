import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySectionDoubleGrid from "@/components/Attributes/Sections/HeadingSecondarySectionDoubleGrid";

import Toggle from "@/components/Forms/Toggle";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState, useEffect } from "react";
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
import {
  getAllPfrData,
  getPfrStep,
  postPfrSections,
} from "@/services/pfrService";
import { is } from "immutable";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import { useRouter } from "next/router";
import { usePfrData } from "@/store/epfrPage/createData/pfrData";
import LoaderPage from "./components/LoaderPage";
interface Props {
  id?: any;
  pfrType: number;
}

const PrioritiesNeedAnalysis = (props: Props) => {
  const router = useRouter();

  let fillInformation = [
    { id: 0, name: "Nil" },
    { id: 1, name: "Review" },
  ];

  {
    /* No Data */
  }

  // actions
  let {
    section7,
    setClient,
    setDependant,
    setNeed,
    setNeedDependant,
    setAnswerDefaultCheck,
    setAdditional,
    setChildFund,
    setGlobal,
    fetchDefaultCheck,
    fetchMaternityOther,
    fetchClientData,
    fetchDependantData,
    resetDependantData,
    fetchNeed,
  } = usePrioritiesNeedAnalysis();

  const resTotal = section7.typeClient + section7.totalDependant;
  let { showDetailData } = useNavigationSection();

  const uncheckAll = (data: boolean, indexSub: number) => {
    if (!data && props.pfrType === 2) {
      setNeed(1, indexSub, data);
    }

    if (!data && section7.dependants.length > 0) {
      section7.dependants.map((dependant, index) => {
        setNeedDependant(index, indexSub, data);
      });
    }
  };

  const setIncomeProtection = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundDisability = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundCritical = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundChildren = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundMediumToLong = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundRetirement = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setCoverForPersonal = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundLongTermCare = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setFundHospitalExpense = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setMaternityPlan = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setEstatePlanning = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  const setOtherInsurance = (
    data: boolean,
    indexClient: number,
    indexSub: number
  ) => {
    setNeed(indexClient, indexSub, data);
    uncheckAll(data, indexSub);
  };

  // Get status and editable status for checking active and non active the save function
  let status = usePrioritiesNeedAnalysis((state) => state.section7.status);
  let editableStatus = usePrioritiesNeedAnalysis(
    (state) => state.section7.editableStatus
  );

  const scrollPosition = useScrollPosition(7);
  const scrollPositionNext = useScrollPosition(8);
  const scrollPositionBottomPrev = useScrollPositionBottom(6);

  const getPV = (fv: any, rate: any, n: any) => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += fv / Math.pow(1 + rate, i);
    }
    return sum.toFixed(2);
  };

  // Rumus Income Protection
  const capitalSumRequired = (res: any) => {
    let result = getPV(
      res.annualAmountNeeded,
      res.netRateOfReture / 100,
      res.numberOfYearsNeed
    );

    return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
  };

  const totalCashOutflow = (res: any) => {
    let result =
      parseFloat(res.finalExpense) +
      parseFloat(res.emergencyFund) +
      parseFloat(res.mortgage) +
      parseFloat(res.personalDebts) +
      parseFloat(res.others);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const totalAB = (res: any) => {
    let result =
      parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashFlow);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const totalNetAmmount = (res: any) => {
    let result =
      res.total - res.existingResources - res.existingInsuranceCoverageOnDeath;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };
  // End Rumus Income Protection

  // Rumus Fund Disabilities
  const FundDisabCapitalSumRequired = (res: any) => {
    let result = getPV(
      res.annualAmountNeeded,
      res.netRateOfReture / 100,
      res.numberOfYearsNeed
    );

    return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
  };

  const FundDisabTotalCashOutflow = (res: any) => {
    let result =
      parseFloat(res.medicalExpense) +
      parseFloat(res.mortgage) +
      parseFloat(res.loans);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundDisabTotalAB = (res: any) => {
    let result =
      parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashOutflow);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundDisabTotalNetAmmount = (res: any) => {
    let result =
      res.total -
      res.existingResources -
      res.existingInsuranceCoverageOnDisability;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };
  // End Rumus Fund Disabilities

  // Rumus Fund Critical Illness
  const FundCritCapitalSumRequired = (res: any) => {
    let result = getPV(
      res.annualAmountNeeded,
      res.netRateOfReture / 100,
      res.numberOfYearsNeed
    );

    return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
  };

  const FundCritTotalCashOutflow = (res: any) => {
    let result =
      parseFloat(res.medicalExpense) +
      parseFloat(res.mortgage) +
      parseFloat(res.loans);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundCritTotalAB = (res: any) => {
    let result =
      parseFloat(res.capitalSumRequired) + parseFloat(res.totalCashOutflow);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundCritTotalNetAmmount = (res: any) => {
    let result =
      res.total - res.existingResources - res.existingInsuranceCoverageOnCI;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  // End Rumus Fund Critical Illness

  // Rumus Fund Children Education
  const FundChildFutureValueOfAnnualTuitionFee = (res: any) => {
    let result =
      res.annaulTuitionFees *
      Math.pow(
        1 + res.educationInflationRate / 100,
        res.yearsToTertiaryEducation
      );
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundChildTotalTuitionFee = (res: any) => {
    let result = res.futureValueOfAnnualTuitionFee * res.noOfYearsOfStudy;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundChildFutureValueOfAnnualLivingCosts = (res: any) => {
    let result =
      res.annualLivingCosts *
      Math.pow(1 + res.inflationRate / 100, res.yearsToTertiaryEducation);
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundChildTotalLivinCost = (res: any) => {
    let result = res.futureValueOfAnnualLivingCosts * res.noOfYearsOfStudy;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundChildTotalEducationFunding = (res: any) => {
    let result = res.totalTuitionFee + res.totalLivingCost;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };

  const FundChildNetAmountRequired = (res: any) => {
    let result =
      res.totalEducationFunding - res.futureValueOfExistingResourceForEducation;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };
  // End Rumus Fund Children Education

  // Rumus Fund Fund Medium Data
  const FundMediumNetAmountRequired = (res: any) => {
    const result = res.objective - res.less;
    return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
  };
  // End Rumus Fund Medium Data

  // Rumus Fund Retirement

  // End Rumus Fund Retirement

  const isChecked = (index: number) => {
    let res = false;
    if (section7.dependants.length > 0) {
      section7.answer.need.dependant.map((data, i) => {
        res = res || section7.answer.need.dependant[i][index];
      });
    }

    if (section7.answer.need.client.length === 2) {
      res =
        res ||
        section7.answer.need.client[0][index] ||
        section7.answer.need.client[1][index];
    } else {
      res = res || section7.answer.need.client[0][index];
    }
    return res;
  };

  useEffect(() => {
    // Rumus Client Data

    if (section7.answer.clientData.length > 0) {
      section7.answer.clientData.map(function (v: any, k: any) {
        // IncomeProtect
        if (
          !section7.answer.defaultCheck.income_protection_upon_death_mortgage
        ) {
          setClient(0, k, "mortgage", "incomeProtectionUponDeath");
        }

        if (!section7.answer.defaultCheck.income_protection_upon_death_debt) {
          setClient(0, k, "personalDebts", "incomeProtectionUponDeath");
        }

        if (!section7.answer.defaultCheck.income_protection_upon_death_other) {
          setClient(0, k, "others", "incomeProtectionUponDeath");
        }

        if (!section7.answer.defaultCheck.income_protection_upon_death_death) {
          setClient(
            0,
            k,
            "existingInsuranceCoverageOnDeath",
            "incomeProtectionUponDeath"
          );
        }

        const IncomeProtect = v.incomeProtectionUponDeath;
        const resCapitalSum = capitalSumRequired(IncomeProtect);
        setClient(
          resCapitalSum,
          k,
          "capitalSumRequired",
          "incomeProtectionUponDeath"
        );

        const resTotalCashOutflow = totalCashOutflow(IncomeProtect);
        setClient(
          resTotalCashOutflow,
          k,
          "totalCashFlow",
          "incomeProtectionUponDeath"
        );

        const resTotal = totalAB(IncomeProtect);
        setClient(resTotal, k, "total", "incomeProtectionUponDeath");

        const totalNetAmount = totalNetAmmount(IncomeProtect);
        setClient(
          totalNetAmount,
          k,
          "netAmountRequired",
          "incomeProtectionUponDeath"
        );
        // End IncomeProtect

        // Rumus Fund Disabilities
        if (
          !section7.answer.defaultCheck.fund_disability_income_expense_mortgage
        ) {
          setClient(0, k, "mortgage", "fundDisabilityIncomeExpense");
        }

        if (
          !section7.answer.defaultCheck
            .fund_disability_income_expense_disability
        ) {
          setClient(
            0,
            k,
            "existingInsuranceCoverageOnDisability",
            "fundDisabilityIncomeExpense"
          );
        }

        const FunDisability = v.fundDisabilityIncomeExpense;
        const FundDisabResCapitalSum =
          FundDisabCapitalSumRequired(FunDisability);
        setClient(
          FundDisabResCapitalSum,
          k,
          "capitalSumRequired",
          "fundDisabilityIncomeExpense"
        );

        const FundDisabResTotalCashOutflow =
          FundDisabTotalCashOutflow(FunDisability);
        setClient(
          FundDisabResTotalCashOutflow,
          k,
          "totalCashOutflow",
          "fundDisabilityIncomeExpense"
        );

        const FundDisabResTotal = FundDisabTotalAB(FunDisability);
        setClient(
          FundDisabResTotal,
          k,
          "totalAB",
          "fundDisabilityIncomeExpense"
        );

        const FundDisabTotalNetAmount = FundDisabTotalNetAmmount(FunDisability);
        setClient(
          FundDisabTotalNetAmount,
          k,
          "totalNetAmmount",
          "fundDisabilityIncomeExpense"
        );
        // End Rumus Fund Disabilities

        // Rumus Fund Critical Illness
        if (
          !section7.answer.defaultCheck.fund_critical_illness_expense_mortgage
        ) {
          setClient(0, k, "mortgage", "fundCriticalIllnessExpense");
        }

        if (!section7.answer.defaultCheck.fund_critical_illness_expense_ci) {
          setClient(
            0,
            k,
            "existingInsuranceCoverageOnCI",
            "fundCriticalIllnessExpense"
          );
        }

        const FunCriticalIllness = v.fundCriticalIllnessExpense;
        const FunCritResCapitalSum =
          FundCritCapitalSumRequired(FunCriticalIllness);
        setClient(
          FunCritResCapitalSum,
          k,
          "capitalSumRequired",
          "fundCriticalIllnessExpense"
        );

        const FunCritResTotalCashOutflow =
          FundCritTotalCashOutflow(FunCriticalIllness);
        setClient(
          FunCritResTotalCashOutflow,
          k,
          "totalCashOutflow",
          "fundCriticalIllnessExpense"
        );

        const FunCritResTotal = FundCritTotalAB(FunCriticalIllness);
        setClient(FunCritResTotal, k, "total", "fundCriticalIllnessExpense");

        const FunCritTotalNetAmount =
          FundCritTotalNetAmmount(FunCriticalIllness);
        setClient(
          FunCritTotalNetAmount,
          k,
          "netAmountRequired",
          "fundCriticalIllnessExpense"
        );
        // End Rumus Fund Critical Illness

        // Fund Fund Medium Data
        const FunMedium = v.fundMediumToLongTerm;
        const ResFundMediumNetAmountRequired =
          FundMediumNetAmountRequired(FunMedium);
        setClient(
          ResFundMediumNetAmountRequired,
          k,
          "netAmountRequired",
          "fundMediumToLongTerm"
        );

        // End Fund Fund Medium Data

        // Fund Fund Retirement Data
        const FundRetirement = v.fundRetirementLifeStyle;

        const yearsToRetirement =
          FundRetirement.expectedRetirementAge - FundRetirement.age < 0
            ? 0
            : FundRetirement.expectedRetirementAge - FundRetirement.age;
        const resultYearsToRetirement = isNaN(yearsToRetirement)
          ? 0
          : parseFloat(yearsToRetirement.toFixed(2));
        setClient(
          resultYearsToRetirement,
          k,
          "yearsToRetirement",
          "fundRetirementLifeStyle"
        );

        const incomeAtRetirementAge =
          FundRetirement.annualIncome *
          Math.pow(
            1 + FundRetirement.rateOfIncomeIncrement / 100,
            resultYearsToRetirement
          );
        const resultIncomeAtRetirementAge = isNaN(incomeAtRetirementAge)
          ? 0
          : parseFloat(incomeAtRetirementAge.toFixed(2));
        setClient(
          resultIncomeAtRetirementAge,
          k,
          "incomeAtRetirementAge",
          "fundRetirementLifeStyle"
        );

        let incomeRequiredAtRetirement =
          (resultIncomeAtRetirementAge *
            FundRetirement.percentOfIncomeRequiredAtRetirement) /
          100;
        const resultIncomeRequiredAtRetirement = isNaN(
          incomeRequiredAtRetirement
        )
          ? 0
          : parseFloat(incomeRequiredAtRetirement.toFixed(2));
        setClient(
          resultIncomeRequiredAtRetirement,
          k,
          "incomeRequiredAtRetirement",
          "fundRetirementLifeStyle"
        );

        const expenseATRetirement =
          FundRetirement.retirementExpense *
          Math.pow(
            1 + FundRetirement.inflationRate / 100,
            resultYearsToRetirement
          );
        const resultExpenseATRetirement = isNaN(expenseATRetirement)
          ? 0
          : parseFloat(expenseATRetirement.toFixed(2));
        setClient(
          resultExpenseATRetirement,
          k,
          "expenseATRetirement",
          "fundRetirementLifeStyle"
        );

        let aliasAmountNeededAtRetirementAge = "";

        if (FundRetirement.selectedMethod == 0) {
          aliasAmountNeededAtRetirementAge = getPV(
            resultIncomeRequiredAtRetirement,
            FundRetirement.netRateOfReture / 100,
            FundRetirement.yearsToReceiveRetirementIncome
          );
        } else {
          aliasAmountNeededAtRetirementAge = getPV(
            resultExpenseATRetirement,
            FundRetirement.netRateOfReture / 100,
            FundRetirement.yearsToReceiveRetirementIncome
          );
        }

        const resultAmountNeededAtRetirementAge = isNaN(
          parseFloat(aliasAmountNeededAtRetirementAge)
        )
          ? 0
          : parseFloat(aliasAmountNeededAtRetirementAge);
        setClient(
          resultAmountNeededAtRetirementAge,
          k,
          "amountNeededAtRetirementAge",
          "fundRetirementLifeStyle"
        );

        const netAmountRequired =
          resultAmountNeededAtRetirementAge - FundRetirement.less;
        const resultNetAmountRequired = isNaN(netAmountRequired)
          ? 0
          : parseFloat(netAmountRequired.toFixed(2));
        setClient(
          resultNetAmountRequired,
          k,
          "netAmountRequired",
          "fundRetirementLifeStyle"
        );
        // End Fund Fund Retirement Data

        // Cover Personal Accident
        if (!section7.answer.defaultCheck.cover_for_personal_accident_benefit) {
          setClient(0, k, "less", "coverForPersonalAccident");
        }

        const resCoverPersonalAccident = v.coverForPersonalAccident;
        const coverNetAmountRequired =
          resCoverPersonalAccident.amountNeeded - resCoverPersonalAccident.less;
        setClient(
          coverNetAmountRequired,
          k,
          "netAmountRequired",
          "coverForPersonalAccident"
        );
        // End Cover Personal Accident

        // Cover Fund Long Term
        const resFundLongTermCare = v.fundLongTermCare;
        const FundNetAmountRequired =
          resFundLongTermCare.desiredMonthlyCashPayout -
          resFundLongTermCare.less;
        setClient(
          FundNetAmountRequired,
          k,
          "netAmountRequired",
          "fundLongTermCare"
        );
        // End Fund Long Term

        // Maternity Others
        if (!section7.answer.defaultCheck.maternity_other) {
          setClient(0, k, "less", "maternity");
        }

        let otherSum = 0;

        if (section7.answer.addtionalMaternityPlan.length > 0) {
          section7.answer.addtionalMaternityPlan.map(function (v: any, k: any) {
            v.clients.map(function (val: any, ind: any) {
              otherSum += Number(val);
            });
          });
        }

        const resMaternity = v.maternity;
        const MaterNetAmountRequired =
          resMaternity.amountNeeded - resMaternity.less - otherSum;
        setClient(MaterNetAmountRequired, k, "netAmountRequired", "maternity");
        // End Maternity Others
      });
    }

    // Rumus Dependant Data
    if (section7.answer.dependantData.length > 0) {
      section7.answer.dependantData.map(function (v: any, k: any) {
        // IncomeProtect

        if (
          !section7.answer.defaultCheck.income_protection_upon_death_mortgage
        ) {
          setDependant(0, k, "mortgage", "incomeProtectionUponDeath");
        }

        if (!section7.answer.defaultCheck.income_protection_upon_death_debt) {
          setDependant(0, k, "personalDebts", "incomeProtectionUponDeath");
        }

        if (!section7.answer.defaultCheck.income_protection_upon_death_other) {
          setDependant(0, k, "others", "incomeProtectionUponDeath");
        }
        const IncomeProtect = v.incomeProtectionUponDeath;
        const resCapitalSum = capitalSumRequired(IncomeProtect);
        setDependant(
          resCapitalSum,
          k,
          "capitalSumRequired",
          "incomeProtectionUponDeath"
        );

        const resTotalCashOutflow = totalCashOutflow(IncomeProtect);
        setDependant(
          resTotalCashOutflow,
          k,
          "totalCashFlow",
          "incomeProtectionUponDeath"
        );

        const resTotal = totalAB(IncomeProtect);
        setDependant(resTotal, k, "total", "incomeProtectionUponDeath");

        const totalNetAmount = totalNetAmmount(IncomeProtect);
        setDependant(
          totalNetAmount,
          k,
          "netAmountRequired",
          "incomeProtectionUponDeath"
        );
        // End IncomeProtect

        // Rumus Fund Disabilities
        if (
          !section7.answer.defaultCheck.fund_disability_income_expense_mortgage
        ) {
          setDependant(0, k, "mortgage", "fundDisabilityIncomeExpense");
        }

        if (
          !section7.answer.defaultCheck
            .fund_disability_income_expense_disability
        ) {
          setDependant(
            0,
            k,
            "existingInsuranceCoverageOnDisability",
            "fundDisabilityIncomeExpense"
          );
        }

        const FunDisability = v.fundDisabilityIncomeExpense;
        const FundDisabResCapitalSum =
          FundDisabCapitalSumRequired(FunDisability);
        setDependant(
          FundDisabResCapitalSum,
          k,
          "capitalSumRequired",
          "fundDisabilityIncomeExpense"
        );

        const FundDisabResTotalCashOutflow =
          FundDisabTotalCashOutflow(FunDisability);
        setDependant(
          FundDisabResTotalCashOutflow,
          k,
          "totalCashOutflow",
          "fundDisabilityIncomeExpense"
        );

        const FundDisabResTotal = FundDisabTotalAB(FunDisability);
        setDependant(
          FundDisabResTotal,
          k,
          "totalAB",
          "fundDisabilityIncomeExpense"
        );

        const FundDisabTotalNetAmount = FundDisabTotalNetAmmount(FunDisability);
        setDependant(
          FundDisabTotalNetAmount,
          k,
          "totalNetAmmount",
          "fundDisabilityIncomeExpense"
        );
        // End Rumus Fund Disabilities

        // Rumus Fund Critical Illness
        if (
          !section7.answer.defaultCheck.fund_critical_illness_expense_mortgage
        ) {
          setDependant(0, k, "mortgage", "fundCriticalIllnessExpense");
        }

        if (!section7.answer.defaultCheck.fund_critical_illness_expense_ci) {
          setDependant(
            0,
            k,
            "existingInsuranceCoverageOnCI",
            "fundCriticalIllnessExpense"
          );
        }

        const FunCriticalIllness = v.fundCriticalIllnessExpense;
        const FunCritResCapitalSum =
          FundCritCapitalSumRequired(FunCriticalIllness);
        setDependant(
          FunCritResCapitalSum,
          k,
          "capitalSumRequired",
          "fundCriticalIllnessExpense"
        );

        const FunCritResTotalCashOutflow =
          FundCritTotalCashOutflow(FunCriticalIllness);
        setDependant(
          FunCritResTotalCashOutflow,
          k,
          "totalCashOutflow",
          "fundCriticalIllnessExpense"
        );

        const FunCritResTotal = FundCritTotalAB(FunCriticalIllness);
        setDependant(FunCritResTotal, k, "total", "fundCriticalIllnessExpense");

        const FunCritTotalNetAmount =
          FundCritTotalNetAmmount(FunCriticalIllness);
        setDependant(
          FunCritTotalNetAmount,
          k,
          "netAmountRequired",
          "fundCriticalIllnessExpense"
        );
        // End Rumus Fund Critical Illness

        // Fund Fund Medium Data
        const FunMedium = v.fundMediumToLongTerm;
        const ResFundMediumNetAmountRequired =
          FundMediumNetAmountRequired(FunMedium);
        setDependant(
          ResFundMediumNetAmountRequired,
          k,
          "netAmountRequired",
          "fundMediumToLongTerm"
        );

        // End Fund Fund Medium Data

        // Fund Fund Retirement Data
        const FundRetirement = v.fundRetirementLifeStyle;

        const yearsToRetirement =
          FundRetirement.expectedRetirementAge - FundRetirement.age < 0
            ? 0
            : FundRetirement.expectedRetirementAge - FundRetirement.age;
        const resultYearsToRetirement = isNaN(yearsToRetirement)
          ? 0
          : parseFloat(yearsToRetirement.toFixed(2));
        setDependant(
          resultYearsToRetirement,
          k,
          "yearsToRetirement",
          "fundRetirementLifeStyle"
        );

        const incomeAtRetirementAge =
          FundRetirement.annualIncome *
          Math.pow(
            1 + FundRetirement.rateOfIncomeIncrement / 100,
            resultYearsToRetirement
          );
        const resultIncomeAtRetirementAge = isNaN(incomeAtRetirementAge)
          ? 0
          : parseFloat(incomeAtRetirementAge.toFixed(2));
        setDependant(
          resultIncomeAtRetirementAge,
          k,
          "incomeAtRetirementAge",
          "fundRetirementLifeStyle"
        );

        let incomeRequiredAtRetirement =
          (resultIncomeAtRetirementAge *
            FundRetirement.percentOfIncomeRequiredAtRetirement) /
          100;
        const resultIncomeRequiredAtRetirement = isNaN(
          incomeRequiredAtRetirement
        )
          ? 0
          : parseFloat(incomeRequiredAtRetirement.toFixed(2));
        setDependant(
          resultIncomeRequiredAtRetirement,
          k,
          "incomeRequiredAtRetirement",
          "fundRetirementLifeStyle"
        );

        const expenseATRetirement =
          FundRetirement.retirementExpense *
          Math.pow(
            1 + FundRetirement.inflationRate / 100,
            resultYearsToRetirement
          );
        const resultExpenseATRetirement = isNaN(expenseATRetirement)
          ? 0
          : parseFloat(expenseATRetirement.toFixed(2));
        setDependant(
          resultExpenseATRetirement,
          k,
          "expenseATRetirement",
          "fundRetirementLifeStyle"
        );

        let aliasAmountNeededAtRetirementAge = "";
        if (FundRetirement.selectedMethod == 0) {
          aliasAmountNeededAtRetirementAge = getPV(
            resultIncomeRequiredAtRetirement,
            FundRetirement.netRateOfReture / 100,
            FundRetirement.yearsToReceiveRetirementIncome
          );
        } else {
          aliasAmountNeededAtRetirementAge = getPV(
            resultExpenseATRetirement,
            FundRetirement.netRateOfReture / 100,
            FundRetirement.yearsToReceiveRetirementIncome
          );
        }

        const resultAmountNeededAtRetirementAge = isNaN(
          parseFloat(aliasAmountNeededAtRetirementAge)
        )
          ? 0
          : parseFloat(aliasAmountNeededAtRetirementAge);
        setDependant(
          resultAmountNeededAtRetirementAge,
          k,
          "amountNeededAtRetirementAge",
          "fundRetirementLifeStyle"
        );

        const netAmountRequired =
          resultAmountNeededAtRetirementAge - FundRetirement.less;
        const resultNetAmountRequired = isNaN(netAmountRequired)
          ? 0
          : parseFloat(netAmountRequired.toFixed(2));
        setDependant(
          resultNetAmountRequired,
          k,
          "netAmountRequired",
          "fundRetirementLifeStyle"
        );
        // End Fund Fund Retirement Dataaa

        // Cover Personal Accident
        if (!section7.answer.defaultCheck.cover_for_personal_accident_benefit) {
          setDependant(0, k, "less", "coverForPersonalAccident");
        }

        const resCoverPersonalAccident = v.coverForPersonalAccident;
        const coverNetAmountRequired =
          resCoverPersonalAccident.amountNeeded - resCoverPersonalAccident.less;
        setDependant(
          coverNetAmountRequired,
          k,
          "netAmountRequired",
          "coverForPersonalAccident"
        );
        // End Cover Personal Accident

        // Cover Fund Long Term
        const resFundLongTermCare = v.fundLongTermCare;
        const FundNetAmountRequired =
          resFundLongTermCare.desiredMonthlyCashPayout -
          resFundLongTermCare.less;
        setDependant(
          FundNetAmountRequired,
          k,
          "netAmountRequired",
          "fundLongTermCare"
        );
        // End Fund Long Term

        // Maternity Others
        if (!section7.answer.defaultCheck.maternity_other) {
          setDependant(0, k, "less", "maternity");
        }

        let otherSum = 0;

        if (section7.answer.addtionalMaternityPlan.length > 0) {
          section7.answer.addtionalMaternityPlan.map(function (v: any, k: any) {
            v.dependants.map(function (val: any, ind: any) {
              otherSum += Number(val);
            });
          });
        }

        const resMaternity = v.maternity;
        const MaterNetAmountRequired =
          resMaternity.amountNeeded - resMaternity.less - otherSum;

        setDependant(
          MaterNetAmountRequired,
          k,
          "netAmountRequired",
          "maternity"
        );
        // End Maternity Others
      });
    }

    // Rumus Child Fund Data
    if (section7.answer.childFund.length > 0) {
      section7.answer.childFund.map(function (v: any, k: any) {
        const resFutureValueOfAnnualTuitionFee =
          FundChildFutureValueOfAnnualTuitionFee(v);
        setChildFund(
          resFutureValueOfAnnualTuitionFee,
          k,
          "futureValueOfAnnualTuitionFee"
        );

        const resTotalTuitionFee = FundChildTotalTuitionFee(v);
        setChildFund(resTotalTuitionFee, k, "totalTuitionFee");

        const resFutureValueOfAnnualLivingCosts =
          FundChildFutureValueOfAnnualLivingCosts(v);
        setChildFund(
          resFutureValueOfAnnualLivingCosts,
          k,
          "futureValueOfAnnualLivingCosts"
        );

        const resTotalLivinCost = FundChildTotalLivinCost(v);
        setChildFund(resTotalLivinCost, k, "totalLivingCost");

        const resTotalEducationFunding = FundChildTotalEducationFunding(v);
        setChildFund(resTotalEducationFunding, k, "totalEducationFunding");

        const resNetAmountRequired = FundChildNetAmountRequired(v);
        setChildFund(resNetAmountRequired, k, "netAmountRequired");
      });
    }

    let tempStatus = Boolean(status);

    section7.answer.need.client.map((data, i) => {
      data.map((subData, subI) => {
        tempStatus = tempStatus || subData;
      });
    });

    section7.answer.need.dependant.map((data, i) => {
      data.map((subData, subI) => {
        tempStatus = tempStatus || subData;
      });
    });

    setGlobal("status", tempStatus? 1: 0);

    // localStorage.setItem("section7", JSON.stringify(section7));
  }, [section7.answer, section7.additionalNote]);

  const [saveLoading, setSaveLoading] = useState(false);

  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section7")
        ? localStorage.getItem("section7")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state.section7;
      }

      console.log("Data: ", dataFix);

      await postPfrSections(7, JSON.stringify(dataFix));

      setGlobal("editableStatus", 1);

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  useEffect(() => {
    setGlobal("typeClient", props.pfrType);
  }, []);

  const [loading, setLoading] = useState(false);

  const getSectionData = async (pfrId: number) => {
    try {
      setLoading(true); // Set loading before sending API request
      const res: any = await getAllPfrData(pfrId);
      const data: any = await getPfrStep(7, pfrId);

      setGlobal("typeClient", Number(res["pfr"]["type"]));
      setGlobal("status", Number(res["pfr"]["status"]));
      setGlobal("totalDependant", Number(res["dependants"]));
      let clientData = res["clients"];
      let dependantData = res["dependantsData"];
      setGlobal("dependants", dependantData);

      let clientDatas = data["clientData"];
      let dependantDatas = data["dependantData"];
      let childFunds = data["childFund"];
      let needs = data["needs"];
      let notes = data["note"];
      let loans = data["loan"];
      let personalLoans = data["personalLoans"];
      let insurances = data["stdData"];
      let mortgages = data["mortgage"];
      let maternityOthers = data["maternityOthers"];
      let liabilityOthers = data["liabilityOther"];
      let defaultCheck = data["defaultCheck"];

      if (defaultCheck != undefined) {
        fetchDefaultCheck(defaultCheck);
      }

      maternityOthers.forEach((other: any) => {
        let key = other["key"];
        let clientData = JSON.parse(other["clientData"]);
        let dependantData = JSON.parse(other["dependantData"]);

        let _clientData = Array(clientDatas.length).fill(0);
        let _dependantData = Array(dependantDatas.length).fill(0);

        clientData.forEach((data: any, i: number) => {
          _clientData[i] = data;
        });
        dependantData.forEach((data: any, i: number) => {
          _dependantData[i] = data;
        });

        let maternityOther = {
          clients: _clientData,
          key: key,
          dependants: _dependantData,
        };

        fetchMaternityOther(maternityOther);
      });

      clientDatas.forEach((client: any, i: number) => {
        fetchClientData(client, i);
      });
      if (dependantDatas.length > 0) {
        resetDependantData();
      }
      dependantDatas.forEach((dependant: any, i: number) => {
        if (dependant["section7_data"] != null) {
          fetchDependantData(dependant["section7_data"], i);
        }
        // this.pfrData.dependantData[i].dependantId = dependant['id']
      });

      if (needs != null) {
        let obj = JSON.parse(needs["needs"]);
        if (obj["client"] != undefined) {
          obj["client"].forEach((need: any, i: number) => {
            fetchNeed(need, i, "client");
          });
        }
        if (obj["dependant"] != undefined) {
          obj["dependant"].forEach((need: any, i: number) => {
            fetchNeed(need, i, "dependant");
          });
        }
      }
      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };

  let pfrLocal = usePfrData((state) => state.pfr);

  useEffect(() => {
    if (!router.isReady) return;
    // setInit(props.pfrType);
    // If edit check the ID
    if (router.query.id !== null && router.query.id !== undefined) {
      if (scrollPositionBottomPrev === "Process6") {
        setGlobal("editableStatus", pfrLocal.editableSection7 ?? 0);
        setGlobal("pfrId", router.query.id);
        setGlobal("status", pfrLocal.section7);
        getSectionData(Number(router.query.id));
        console.log("Get data Section 7");
      }
    } else {
      if (scrollPositionBottomPrev === "Process6") {
        const section1 = JSON.parse(localStorage.getItem("section1") ?? "{}");
        setGlobal("editableStatus", pfrLocal.editableSection7 ?? 0);
        setGlobal("status", pfrLocal.section7);
        setGlobal("pfrId", section1?.state?.id);
        getSectionData(section1?.state?.id);
        console.log("Get data Section 7");
      }
    }
  }, [scrollPositionBottomPrev]);

  useEffect(() => {
    if (scrollPositionNext === "okSec8") {
      if (
        ((editableStatus === 0 || editableStatus === null) && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now 7");
        // setSaveLoading(true);
        storeData();
      } else {
        console.log("Your cannot save data 7");
      }
    }
  }, [scrollPositionNext, editableStatus, status]);

  return loading ? (
    <LoaderPage />
  ) : (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
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
            isChecked={isChecked(0)}
            onChange={(event) =>
              setIncomeProtection(!section7.answer.need.client[0][0], 0, 0)
            }
          />
          {/* <Toggle /> */}
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(0) ? <IncomeProtection pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.2 Protection (Fund Disability Income / Expense)
          </h2>
          <Toggle
            isChecked={isChecked(1)}
            onChange={() =>
              setFundDisability(!section7.answer.need.client[0][1], 0, 1)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(1) ? <FundDisability pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.3 Protection (Fund Critical Illness Expense)
          </h2>
          <Toggle
            isChecked={isChecked(2)}
            onChange={() =>
              setFundCritical(!section7.answer.need.client[0][2], 0, 2)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(2) ? <FundCritical pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            {`7.4 Saving & Investment (Fund Child(ren)'s Education)`}
          </h2>
          <Toggle
            isChecked={section7.answer.need.client[0][3]}
            onChange={(event) =>
              setFundChildren(!section7.answer.need.client[0][3], 0, 3)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {section7.answer.need.client[0][3] ? (
          <FundChildrens pfrType={props.pfrType} />
        ) : (
          ""
        )}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.5 Saving & Investment (Fund Medium to Long Term Savings /
            Investment Needs / Other Goals)
          </h2>
          <Toggle
            isChecked={isChecked(4)}
            onChange={(event) =>
              setFundMediumToLong(!section7.answer.need.client[0][4], 0, 4)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(4) ? <FundMediumToLong pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.6 Saving & Investment (Fund Retirement Lifestyle)
          </h2>
          <Toggle
            isChecked={isChecked(5)}
            onChange={(event) =>
              setFundRetirement(!section7.answer.need.client[0][5], 0, 5)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(5) ? <FundRetirement pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.7 Accident & Health (Cover for Personal Accident)
          </h2>
          <Toggle
            isChecked={isChecked(6)}
            onChange={(event) =>
              setCoverForPersonal(!section7.answer.need.client[0][6], 0, 6)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(6) ? <CoverForPersonal pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.8 Accident & Health (Fund Long Term Care)
          </h2>
          <Toggle
            isChecked={isChecked(7)}
            onChange={(event) =>
              setFundLongTermCare(!section7.answer.need.client[0][7], 0, 7)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(7) ? <FundLongTermCare pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">
            7.9 Accident & Health (Fund Hospital Expenses)
          </h2>
          <Toggle
            isChecked={isChecked(8)}
            onChange={(event) =>
              setFundHospitalExpense(!section7.answer.need.client[0][8], 0, 8)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(8) ? <FundHospitalExpenses pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.10 Maternity Plan</h2>
          <Toggle
            isChecked={isChecked(9)}
            onChange={(event) =>
              setMaternityPlan(!section7.answer.need.client[0][9], 0, 9)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(9) ? <MaternityPlan pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.11 Estate Planning</h2>
          <Toggle
            isChecked={isChecked(10)}
            onChange={(event) =>
              setEstatePlanning(!section7.answer.need.client[0][10], 0, 10)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(10) ? <EstatePlanning pfrType={props.pfrType} /> : ""}

        <HeadingSecondarySectionDoubleGrid className="mx-8 2xl:mx-60">
          <h2 className="text-xl font-bold">7.12 Other Insurance(s)</h2>
          <Toggle
            isChecked={isChecked(11)}
            onChange={(event) =>
              setOtherInsurance(!section7.answer.need.client[0][11], 0, 11)
            }
          />
        </HeadingSecondarySectionDoubleGrid>

        {isChecked(11) ? <OtherInsurance pfrType={props.pfrType} /> : ""}
      </>

      {editableStatus === 2 && status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 7" />
      ) : (
        ""
      )}
    </div>
  );
};

export default PrioritiesNeedAnalysis;
