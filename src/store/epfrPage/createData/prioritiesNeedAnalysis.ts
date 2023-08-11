import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { SectionSeven } from "@/models/SectionSeven";

const initialState: SectionSeven = {
  section7: {
    pfrId: 0,
    typeClient: 2,
    totalDependant: 0,
    status: 0,
    editableStatus: 0,
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
            netAmountRequired: 0,
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
            netAmountRequired: 0,
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
            netAmountRequired: 0,
          },
          fundMediumToLongTerm: {
            objective: 0,
            goalDescription: 0,
            yearsToReachGoal: 0,
            less: 0,
            netAmountRequired: 0,
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
            netAmountRequired: 0,
          },
          coverForPersonalAccident: {
            amountNeeded: 0,
            less: 0,
            netAmountRequired: 0,
          },
          fundLongTermCare: {
            desiredMonthlyCashPayout: 0,
            nameOfExistingLongTermCareInsurance: 0,
            less: 0,
            netAmountRequired: 0,
          },
          fundHospitalExpense: {
            disiredChoiceOfHospitalType: "",
            disiredChoiceOfWardClass: "",
            desiredTypeOfCover: "",
            nameOfExistingHospitalizationPlan: 0,
            existingTypeOfHospitalCovered: "",
            existingClassOfWardCovered: "",
            existingTypeOfCover: "",
          },
          estatePlaning: {
            willWritten: "",
            lastUpdated: 0,
            anyProvision: "",
            haveLastingPowerOfAttorney: "",
            doneYourCPFNomination: "",
            anyBenefit: "",
          },
          otherInsures: {
            frequencyOfTravel: 0,
            typeOfTravelInsuranceCovered: "",
            companyName: 0,
            renewalDate: 0,
            mortgageInsurance: "",
            groupInsurance: "",
          },
          maternity: {
            amountNeeded: 0,
            less: 0,
            netAmountRequired: 0,
          },
        },
      ],
      childFund: [
        {
          nameOfChild: "",
          yearsToTertiaryEducation: 0,
          noOfYearsOfStudy: 0,
          annaulTuitionFees: 0,
          educationInflationRate: 0,
          futureValueOfAnnualTuitionFee: 0,
          totalTuitionFee: 0,
          annualLivingCosts: 0,
          inflationRate: 0,
          futureValueOfAnnualLivingCosts: 0,
          totalLivingCost: 0,
          totalEducationFunding: 0,
          futureValueOfExistingResourceForEducation: 0,
          netAmountRequired: 0,
        },
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
            netAmountRequired: 0,
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
            netAmountRequired: 0,
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
            netAmountRequired: 0,
          },
          fundMediumToLongTerm: {
            objective: 0,
            goalDescription: 0,
            yearsToReachGoal: 0,
            less: 0,
            netAmountRequired: 0,
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
            netAmountRequired: 0,
          },
          coverForPersonalAccident: {
            amountNeeded: 0,
            less: 0,
            netAmountRequired: 0,
          },
          fundLongTermCare: {
            desiredMonthlyCashPayout: 0,
            nameOfExistingLongTermCareInsurance: 0,
            less: 0,
            netAmountRequired: 0,
          },
          fundHospitalExpense: {
            disiredChoiceOfHospitalType: "",
            disiredChoiceOfWardClass: "",
            desiredTypeOfCover: "",
            nameOfExistingHospitalizationPlan: 0,
            existingTypeOfHospitalCovered: "",
            existingClassOfWardCovered: "",
            existingTypeOfCover: "",
          },
          estatePlaning: {
            willWritten: "",
            lastUpdated: "",
            anyProvision: "",
            haveLastingPowerOfAttorney: "",
            doneYourCPFNomination: "",
            anyBenefit: "",
          },
          otherInsures: {
            frequencyOfTravel: 0,
            typeOfTravelInsuranceCovered: "",
            companyName: 0,
            renewalDate: 0,
            mortgageInsurance: "",
            groupInsurance: "",
          },
          maternity: {
            amountNeeded: 0,
            less: 0,
            netAmountRequired: 0,
          },
        },
      ],
      need: {
        client: [],
        dependant: [],
      },
      defaultCheck: {
        income_protection_upon_death_mortgage: false,
        income_protection_upon_death_debt: false,
        income_protection_upon_death_other: false,
        income_protection_upon_death_death: false,
        fund_disability_income_expense_mortgage: false,
        fund_disability_income_expense_disability: false,
        fund_critical_illness_expense_mortgage: false,
        fund_critical_illness_expense_ci: false,
        cover_for_personal_accident_benefit: false,
        maternity_other: false,
      },
      addtionalMaternityPlan: [],
      issues: [],
      noneed: [],
    },
    additionalNote: [],
  },
};

initialState.section7.answer.need.client = new Array(
  initialState.section7.typeClient
)
  .fill(false)
  .map(() => {
    return new Array(14).fill(false);
  });
initialState.section7.answer.clientData = new Array(
  initialState.section7.typeClient
).fill({
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
    netAmountRequired: 0,
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
    netAmountRequired: 0,
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
    netAmountRequired: 0,
  },
  fundMediumToLongTerm: {
    objective: 0,
    goalDescription: 0,
    yearsToReachGoal: 0,
    less: 0,
    netAmountRequired: 0,
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
    netAmountRequired: 0,
  },
  coverForPersonalAccident: {
    amountNeeded: 0,
    less: 0,
    netAmountRequired: 0,
  },
  fundLongTermCare: {
    desiredMonthlyCashPayout: 0,
    nameOfExistingLongTermCareInsurance: 0,
    less: 0,
    netAmountRequired: 0,
  },
  fundHospitalExpense: {
    disiredChoiceOfHospitalType: 0,
    disiredChoiceOfWardClass: 0,
    desiredTypeOfCover: 0,
    nameOfExistingHospitalizationPlan: 0,
    existingTypeOfHospitalCovered: 0,
    existingClassOfWardCovered: 0,
    existingTypeOfCover: 0,
  },
  estatePlaning: {
    willWritten: 0,
    lastUpdated: 0,
    anyProvision: 0,
    haveLastingPowerOfAttorney: 0,
    doneYourCPFNomination: 0,
    anyBenefit: 0,
  },
  otherInsures: {
    frequencyOfTravel: 0,
    typeOfTravelInsuranceCovered: 0,
    companyName: 0,
    renewalDate: 0,
    mortgageInsurance: 0,
    groupInsurance: 0,
  },
  maternity: {
    amountNeeded: 0,
    less: 0,
    netAmountRequired: 0,
  },
});
initialState.section7.answer.dependantData = new Array(
  initialState.section7.totalDependant
).fill({
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
    netAmountRequired: 0,
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
    netAmountRequired: 0,
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
    netAmountRequired: 0,
  },
  fundMediumToLongTerm: {
    objective: 0,
    goalDescription: 0,
    yearsToReachGoal: 0,
    less: 0,
    netAmountRequired: 0,
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
    netAmountRequired: 0,
  },
  coverForPersonalAccident: {
    amountNeeded: 0,
    less: 0,
    netAmountRequired: 0,
  },
  fundLongTermCare: {
    desiredMonthlyCashPayout: 0,
    nameOfExistingLongTermCareInsurance: 0,
    less: 0,
    netAmountRequired: 0,
  },
  fundHospitalExpense: {
    disiredChoiceOfHospitalType: 0,
    disiredChoiceOfWardClass: 0,
    desiredTypeOfCover: 0,
    nameOfExistingHospitalizationPlan: 0,
    existingTypeOfHospitalCovered: 0,
    existingClassOfWardCovered: 0,
    existingTypeOfCover: 0,
  },
  estatePlaning: {
    willWritten: 0,
    lastUpdated: 0,
    anyProvision: 0,
    haveLastingPowerOfAttorney: 0,
    doneYourCPFNomination: 0,
    anyBenefit: 0,
  },
  otherInsures: {
    frequencyOfTravel: 0,
    typeOfTravelInsuranceCovered: 0,
    companyName: 0,
    renewalDate: 0,
    mortgageInsurance: 0,
    groupInsurance: 0,
  },
  maternity: {
    amountNeeded: 0,
    less: 0,
    netAmountRequired: 0,
  },
});
initialState.section7.additionalNote = new Array(14).fill({
  note: "",
});
initialState.section7.answer.need.client = new Array(
  initialState.section7.typeClient
)
  .fill(false)
  .map(() => {
    return new Array(14).fill(false);
  });
initialState.section7.answer.need.dependant = new Array(
  initialState.section7.totalDependant
)
  .fill(false)
  .map(() => {
    return new Array(14).fill(false);
  });

type Actions = {
  setClient: (
    value: number,
    indexClient: number,
    name: string,
    groupData: any
  ) => any;
  addChildFund: () => any;
  removeChildFund: (index: number) => any;
  setChildFund: (value: number, indexClient: number, name: string) => any;
  addMaternity: () => any;
  removeMaternity: (index: number) => any;
  setMaternity: (
    value: number,
    indexClient: number,
    name: string,
    groupData: any,
    indexSub: any
  ) => any;
  setDependant: (
    value: number,
    indexClient: number,
    name: string,
    groupData: any
  ) => any;
  setNeed: (indexClient: number, indexSub: number, value: boolean) => any;
  setNeedDependant: (value: number, indexClient: number, name: string) => any;
  setAnswerDefaultCheck: (
    value: number,
    indexClient: number,
    name: string
  ) => any;
  setAdditional: (value: number, indexClient: number, name: string) => any;
  resetSectionSeven: () => any;
};

const prioritiesNeedAnalysis = create(
  devtools(
    persist<SectionSeven & Actions>(
      (set, get) => ({
        ...initialState,
        setClient: (
          value: number,
          indexClient: number,
          name: any,
          groupData: any
        ) =>
          set(
            produce((draft) => {
              draft.section7.answer.clientData[indexClient][groupData][name] =
                value;
            })
          ),
        addChildFund: () =>
          set(
            produce((draft) => {
              draft.section7.answer.childFund.push({
                nameOfChild: "",
                yearsToTertiaryEducation: 0,
                noOfYearsOfStudy: 0,
                annaulTuitionFees: 0,
                educationInflationRate: 0,
                futureValueOfAnnualTuitionFee: 0,
                totalTuitionFee: 0,
                annualLivingCosts: 0,
                inflationRate: 0,
                futureValueOfAnnualLivingCosts: 0,
                totalLivingCost: 0,
                totalEducationFunding: 0,
                futureValueOfExistingResourceForEducation: 0,
                netAmountRequired: 0,
              });
            })
          ),
        removeChildFund: (index: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.childFund.splice(index, 1);
            })
          ),
        setChildFund: (value: number, indexClient: number, name: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.childFund[indexClient][name] = value;
            })
          ),
        addMaternity: () =>
          set(
            produce((draft) => {
              var client = [];
              var dependant = [];
              for (var i = 0; i < initialState.section7.typeClient; i++) {
                client.push(0);
              }

              for (var i = 0; i < initialState.section7.totalDependant; i++) {
                dependant.push(0);
              }
              draft.section7.answer.addtionalMaternityPlan.push({
                client: client,
                dependants: dependant,
                key: "",
              });
            })
          ),
        removeMaternity: (index: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.addtionalMaternityPlan.splice(index, 1);
            })
          ),
        setMaternity: (
          value: number,
          indexClient: number,
          name: any,
          groupData: any,
          indexSub: any
        ) =>
          set(
            produce((draft) => {
              console.log("name", name);
              console.log("indexSub", indexSub);
              if (indexSub == null) {
                draft.section7.answer.addtionalMaternityPlan[indexClient][
                  name
                ] = value;
              } else {
                draft.section7.answer.addtionalMaternityPlan[indexClient][
                  groupData
                ][name] = value;
              }
            })
          ),
        setDependant: (
          value: number,
          indexClient: number,
          name: any,
          groupData: any
        ) =>
          set(
            produce((draft) => {
              draft.section7.answer.dependantData[indexClient][groupData][
                name
              ] = value;
            })
          ),
        setNeed: (indexClient: number, indexSub: number, value: boolean) =>
          set(
            produce((draft) => {
              draft.section7.answer.need.client[indexClient][indexSub] = value;
            })
          ),
        setNeedDependant: (value: number, indexClient: number, name: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.need.dependant[indexClient][name] = value;
            })
          ),
        setAnswerDefaultCheck: (
          value: number,
          indexClient: number,
          name: any
        ) =>
          set(
            produce((draft) => {
              draft.section7.answer.defaultCheck[name] = value;
            })
          ),
        setAdditional: (value: number, indexClient: number, name: any) =>
          set(
            produce((draft) => {
              draft.section7.additionalNote[indexClient][name] = value;
            })
          ),
        resetSectionSeven: () => {
          set(initialState);
        },
      }),
      {
        name: "section7",
      }
    )
  )

  //   console.log("sectionSeven", SectionSeven/)
);

export const usePrioritiesNeedAnalysis = prioritiesNeedAnalysis;
