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
import { SectionSeven } from "@/models/SectionSeven";

interface Props {
  id?: any;
}

const PrioritiesNeedAnalysis = (props: Props) => {
  let fillInformation = [
    { id: 0, name: "Nil" },
    { id: 1, name: "Review" },
  ];

  const [sectionSeven, setSectionSeven] = useState<SectionSeven>({
    pfrId: 0,
    typeClient: 1,
    totalDependant:0,
    answer: {
      pfrId: 0,
      clientData: [
        {
            clientId: 0,
            dependantId: 0,
            incomeProtectionUponDeath: {
                annualAmountNeeded: 0,
                numberOfYearsNeed: 0,
                netRateOfReture: 0,
                capitalSumRequired: 0,
                finalExpense: 0,
                emergencyFund: 0,
                mortgage: 0,
                personalDebts: 0,
                others: 0,
                totalCashFlow: 0,
                total: 0,
                existingInsuranceCoverageOnDeath: 0,
                existingResources: 0,
                netAmountRequired: 0
            },
            fundDisabilityIncomeExpense: {
                annualAmountNeeded: 0,
                numberOfYearsNeed: 0,
                netRateOfReture: 0,
                capitalSumRequired: 0,
                medicalExpense: 0,
                mortgage: 0,
                loans: 0,
                totalCashOutflow: 0,
                total: 0,
                existingInsuranceCoverageOnDisability: 0,
                existingResources: 0,
                netAmountRequired: 0
            },
            fundCriticalIllnessExpense: {
                annualAmountNeeded: 0,
                numberOfYearsNeed: 0,
                netRateOfReture: 0,
                capitalSumRequired: 0,
                medicalExpense: 0,
                mortgage: 0,
                loans: 0,
                totalCashOutflow: 0,
                total: 0,
                existingInsuranceCoverageOnCI: 0,
                existingResources: 0,
                netAmountRequired: 0
            },
            fundMediumToLongTerm: {
                objective: 0,
                goalDescription: 0,
                yearsToReachGoal: 0,
                less: 0,
                netAmountRequired: 0
            },
            fundRetirementLifeStyle: {
                age: 0,
                expectedRetirementAge: 0,
                yearsToRetirement: 0,
                selectedMethod: 0,
                annualIncome: 0,
                rateOfIncomeIncrement: 0,
                incomeAtRetirementAge: 0,
                percentOfIncomeRequiredAtRetirement: 0,
                incomeRequiredAtRetirement: 0,
                retirementExpense: 0,
                inflationRate: 0,
                expenseATRetirement: 0,
                yearsToReceiveRetirementIncome: 0,
                netRateOfReture: 0,
                amountNeededAtRetirementAge: 0,
                less: 0,
                netAmountRequired: 0
            },
            coverForPersonalAccident: {
                amountNeeded: 0,
                less: 0,
                netAmountRequired: 0
            },
            fundLongTermCare: {
                desiredMonthlyCashPayout: 0,
                nameOfExistingLongTermCareInsurance: 0,
                less: 0,
                netAmountRequired: 0
            },
            fundHospitalExpense: {
                disiredChoiceOfHospitalType: '',
                disiredChoiceOfWardClass: '',
                desiredTypeOfCover: '',
                nameOfExistingHospitalizationPlan: 0,
                existingTypeOfHospitalCovered:'',
                existingClassOfWardCovered:'',
                existingTypeOfCover:''
            },
            estatePlaning: {
                willWritten: '',
                lastUpdated: 0,
                anyProvision: '',
                haveLastingPowerOfAttorney: '',
                doneYourCPFNomination: '',
                anyBenefit: ''
            },
            otherInsures: {
                frequencyOfTravel: 0,
                typeOfTravelInsuranceCovered: '',
                companyName: 0,
                renewalDate: 0,
                mortgageInsurance: '',
                groupInsurance: ''
            },
            maternity: {
                amountNeeded: 0,
                less: 0,
                netAmountRequired: 0
            }
        }
      ],
      dependantData: [
        {
            clientId: 0,
            dependantId: 0,
            incomeProtectionUponDeath: {
                annualAmountNeeded: 0,
                numberOfYearsNeed: 0,
                netRateOfReture: 0,
                capitalSumRequired: 0,
                finalExpense: 0,
                emergencyFund: 0,
                mortgage: 0,
                personalDebts: 0,
                others: 0,
                totalCashFlow: 0,
                total: 0,
                existingInsuranceCoverageOnDeath: 0,
                existingResources: 0,
                netAmountRequired: 0
            },
            fundDisabilityIncomeExpense: {
                annualAmountNeeded: 0,
                numberOfYearsNeed: 0,
                netRateOfReture: 0,
                capitalSumRequired: 0,
                medicalExpense: 0,
                mortgage: 0,
                loans: 0,
                totalCashOutflow: 0,
                total: 0,
                existingInsuranceCoverageOnDisability: 0,
                existingResources: 0,
                netAmountRequired: 0
            },
            fundCriticalIllnessExpense: {
                annualAmountNeeded: 0,
                numberOfYearsNeed: 0,
                netRateOfReture: 0,
                capitalSumRequired: 0,
                medicalExpense: 0,
                mortgage: 0,
                loans: 0,
                totalCashOutflow: 0,
                total: 0,
                existingInsuranceCoverageOnCI: 0,
                existingResources: 0,
                netAmountRequired: 0
            },
            fundMediumToLongTerm: {
                objective: 0,
                goalDescription: 0,
                yearsToReachGoal: 0,
                less: 0,
                netAmountRequired: 0
            },
            fundRetirementLifeStyle: {
                age: 0,
                expectedRetirementAge: 0,
                yearsToRetirement: 0,
                selectedMethod: 0,
                annualIncome: 0,
                rateOfIncomeIncrement: 0,
                incomeAtRetirementAge: 0,
                percentOfIncomeRequiredAtRetirement: 0,
                incomeRequiredAtRetirement: 0,
                retirementExpense: 0,
                inflationRate: 0,
                expenseATRetirement: 0,
                yearsToReceiveRetirementIncome: 0,
                netRateOfReture: 0,
                amountNeededAtRetirementAge: 0,
                less: 0,
                netAmountRequired: 0
            },
            coverForPersonalAccident: {
                amountNeeded: 0,
                less: 0,
                netAmountRequired: 0
            },
            fundLongTermCare: {
                desiredMonthlyCashPayout: 0,
                nameOfExistingLongTermCareInsurance: 0,
                less: 0,
                netAmountRequired: 0
            },
            fundHospitalExpense: {
                disiredChoiceOfHospitalType: '',
                disiredChoiceOfWardClass: '',
                desiredTypeOfCover: '',
                nameOfExistingHospitalizationPlan: 0,
                existingTypeOfHospitalCovered:'',
                existingClassOfWardCovered:'',
                existingTypeOfCover:''
            },
            estatePlaning: {
                willWritten: '',
                lastUpdated: 0,
                anyProvision: '',
                haveLastingPowerOfAttorney: '',
                doneYourCPFNomination: '',
                anyBenefit: ''
            },
            otherInsures: {
                frequencyOfTravel: 0,
                typeOfTravelInsuranceCovered: '',
                companyName: 0,
                renewalDate: 0,
                mortgageInsurance: '',
                groupInsurance: ''
            },
            maternity: {
                amountNeeded: 0,
                less: 0,
                netAmountRequired: 0
            }
        }
      ],
      need: {
        client: [],
        dependant: []
      }
    },
    status: 0,
  });


  {/* No Data */}
  const resTotal = sectionSeven.typeClient + sectionSeven.totalDependant;
  sectionSeven.answer.clientData =  new Array(sectionSeven.typeClient).fill(
    {
      clientId: 0,
      dependantId: 0,
      incomeProtectionUponDeath: {
          annualAmountNeeded: 0,
          numberOfYearsNeed: 0,
          netRateOfReture: 0,
          capitalSumRequired: 0,
          finalExpense: 0,
          emergencyFund: 0,
          mortgage: 0,
          personalDebts: 0,
          others: 0,
          totalCashFlow: 0,
          total: 0,
          existingInsuranceCoverageOnDeath: 0,
          existingResources: 0,
          netAmountRequired: 0
      },
      fundDisabilityIncomeExpense: {
          annualAmountNeeded: 0,
          numberOfYearsNeed: 0,
          netRateOfReture: 0,
          capitalSumRequired: 0,
          medicalExpense: 0,
          mortgage: 0,
          loans: 0,
          totalCashOutflow: 0,
          total: 0,
          existingInsuranceCoverageOnDisability: 0,
          existingResources: 0,
          netAmountRequired: 0
      },
      fundCriticalIllnessExpense: {
          annualAmountNeeded: 0,
          numberOfYearsNeed: 0,
          netRateOfReture: 0,
          capitalSumRequired: 0,
          medicalExpense: 0,
          mortgage: 0,
          loans: 0,
          totalCashOutflow: 0,
          total: 0,
          existingInsuranceCoverageOnCI: 0,
          existingResources: 0,
          netAmountRequired: 0
      },
      fundMediumToLongTerm: {
          objective: 0,
          goalDescription: 0,
          yearsToReachGoal: 0,
          less: 0,
          netAmountRequired: 0
      },
      fundRetirementLifeStyle: {
          age: 0,
          expectedRetirementAge: 0,
          yearsToRetirement: 0,
          selectedMethod: 0,
          annualIncome: 0,
          rateOfIncomeIncrement: 0,
          incomeAtRetirementAge: 0,
          percentOfIncomeRequiredAtRetirement: 0,
          incomeRequiredAtRetirement: 0,
          retirementExpense: 0,
          inflationRate: 0,
          expenseATRetirement: 0,
          yearsToReceiveRetirementIncome: 0,
          netRateOfReture: 0,
          amountNeededAtRetirementAge: 0,
          less: 0,
          netAmountRequired: 0
      },
      coverForPersonalAccident: {
          amountNeeded: 0,
          less: 0,
          netAmountRequired: 0
      },
      fundLongTermCare: {
          desiredMonthlyCashPayout: 0,
          nameOfExistingLongTermCareInsurance: 0,
          less: 0,
          netAmountRequired: 0
      },
      fundHospitalExpense: {
          disiredChoiceOfHospitalType: 0,
          disiredChoiceOfWardClass: 0,
          desiredTypeOfCover: 0,
          nameOfExistingHospitalizationPlan: 0,
          existingTypeOfHospitalCovered:0,
          existingClassOfWardCovered:0,
          existingTypeOfCover:0
      },
      estatePlaning: {
          willWritten: 0,
          lastUpdated: 0,
          anyProvision: 0,
          haveLastingPowerOfAttorney: 0,
          doneYourCPFNomination: 0,
          anyBenefit: 0
      },
      otherInsures: {
          frequencyOfTravel: 0,
          typeOfTravelInsuranceCovered: 0,
          companyName: 0,
          renewalDate: 0,
          mortgageInsurance: 0,
          groupInsurance: 0
      },
      maternity: {
          amountNeeded: 0,
          less: 0,
          netAmountRequired: 0
      }
  });
  sectionSeven.answer.dependantData =  new Array(sectionSeven.totalDependant).fill(
    {
      clientId: 0,
      dependantId: 0,
      incomeProtectionUponDeath: {
          annualAmountNeeded: 0,
          numberOfYearsNeed: 0,
          netRateOfReture: 0,
          capitalSumRequired: 0,
          finalExpense: 0,
          emergencyFund: 0,
          mortgage: 0,
          personalDebts: 0,
          others: 0,
          totalCashFlow: 0,
          total: 0,
          existingInsuranceCoverageOnDeath: 0,
          existingResources: 0,
          netAmountRequired: 0
      },
      fundDisabilityIncomeExpense: {
          annualAmountNeeded: 0,
          numberOfYearsNeed: 0,
          netRateOfReture: 0,
          capitalSumRequired: 0,
          medicalExpense: 0,
          mortgage: 0,
          loans: 0,
          totalCashOutflow: 0,
          total: 0,
          existingInsuranceCoverageOnDisability: 0,
          existingResources: 0,
          netAmountRequired: 0
      },
      fundCriticalIllnessExpense: {
          annualAmountNeeded: 0,
          numberOfYearsNeed: 0,
          netRateOfReture: 0,
          capitalSumRequired: 0,
          medicalExpense: 0,
          mortgage: 0,
          loans: 0,
          totalCashOutflow: 0,
          total: 0,
          existingInsuranceCoverageOnCI: 0,
          existingResources: 0,
          netAmountRequired: 0
      },
      fundMediumToLongTerm: {
          objective: 0,
          goalDescription: 0,
          yearsToReachGoal: 0,
          less: 0,
          netAmountRequired: 0
      },
      fundRetirementLifeStyle: {
          age: 0,
          expectedRetirementAge: 0,
          yearsToRetirement: 0,
          selectedMethod: 0,
          annualIncome: 0,
          rateOfIncomeIncrement: 0,
          incomeAtRetirementAge: 0,
          percentOfIncomeRequiredAtRetirement: 0,
          incomeRequiredAtRetirement: 0,
          retirementExpense: 0,
          inflationRate: 0,
          expenseATRetirement: 0,
          yearsToReceiveRetirementIncome: 0,
          netRateOfReture: 0,
          amountNeededAtRetirementAge: 0,
          less: 0,
          netAmountRequired: 0
      },
      coverForPersonalAccident: {
          amountNeeded: 0,
          less: 0,
          netAmountRequired: 0
      },
      fundLongTermCare: {
          desiredMonthlyCashPayout: 0,
          nameOfExistingLongTermCareInsurance: 0,
          less: 0,
          netAmountRequired: 0
      },
      fundHospitalExpense: {
          disiredChoiceOfHospitalType: 0,
          disiredChoiceOfWardClass: 0,
          desiredTypeOfCover: 0,
          nameOfExistingHospitalizationPlan: 0,
          existingTypeOfHospitalCovered:0,
          existingClassOfWardCovered:0,
          existingTypeOfCover:0
      },
      estatePlaning: {
          willWritten: 0,
          lastUpdated: 0,
          anyProvision: 0,
          haveLastingPowerOfAttorney: 0,
          doneYourCPFNomination: 0,
          anyBenefit: 0
      },
      otherInsures: {
          frequencyOfTravel: 0,
          typeOfTravelInsuranceCovered: 0,
          companyName: 0,
          renewalDate: 0,
          mortgageInsurance: 0,
          groupInsurance: 0
      },
      maternity: {
          amountNeeded: 0,
          less: 0,
          netAmountRequired: 0
      }
  });
  sectionSeven.answer.need.client = new Array(sectionSeven.typeClient).fill(false).map(() => {return new Array(14).fill(false);})
  sectionSeven.answer.need.dependant =  new Array(sectionSeven.totalDependant).fill(false).map(() => {return new Array(14).fill(false);})

  const [newIncomeProtectionNeedClient, setIncomeProtectionNeedClient] = useState(sectionSeven.answer.need.client); //

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

  const setIncomeProtection = (data: any, i: any) => {
    if(resTotal == 1){
      const updatedClient = newIncomeProtectionNeedClient.map((item: any, index: any) => {
        if(index === i){
          if(item[0] === true){
            item[0] = false;
          }else{
            item[0] = true;
          }
        } 
        return item;
      });
      setIncomeProtectionNeedClient(updatedClient);
    }else{
      showIncomeProtection(!incomeProtection);      
    }
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
  let toggleInProtect = false;
  if(resTotal == 1){
    toggleInProtect = newIncomeProtectionNeedClient[0][0];
    incomeProtection = toggleInProtect;
  }else{
    toggleInProtect = incomeProtection;
  }
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
            isChecked={toggleInProtect}
            toggleName={toggleInProtect ? "Review" : "Not Review"}
            onChange={() => setIncomeProtection(!toggleInProtect, 0)} />
            {/* <Toggle /> */}
        </HeadingSecondarySectionDoubleGrid>

        {incomeProtection ? <IncomeProtection datas={sectionSeven}/> : []}

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
