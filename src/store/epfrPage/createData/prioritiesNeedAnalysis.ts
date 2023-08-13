import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { SectionSeven } from "@/models/SectionSeven";

function checkCondition(draft: SectionSeven) {

  let result = false
  if(draft.section7.answer.need == undefined) {
    return false
  }
  for(let i = 0 ; i < 14 ; i ++ ) {
    for(let j = 0 ; j < draft.section7.typeClient ; j ++ ) {
      console.log("need Client: ", draft.section7.answer.need.client[j][i]);
      result = result || draft.section7.answer.need.client[j][i]
    }
    for(let k = 0 ; k < draft.section7.totalDependant; k ++ ) {
      result = result || draft.section7.answer.need.dependant[k][i]
    }
    result = result || ( draft.section7.answer.childFund.length > 0 )
  }
  return result
};

const getStatus = (draft: SectionSeven) => {
  draft.section7.answer.issues = [];

  let condition = checkCondition(draft);
  if(!condition) {
    draft.section7.answer.issues.push({
      subsectionId : 0,
      content : "Need to complete form at least 1",
      clientId : 0
    })
  }

  if(draft.section7.answer.issues.length == 0) {
    return 1;
  } else {
    return 0;
  }
}

const initialState: SectionSeven = {
  section7: {
    pfrId: 0,
    dependants: [],
    typeClient: 1,
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
        // {
        //   nameOfChild: "",
        //   yearsToTertiaryEducation: 0,
        //   noOfYearsOfStudy: 0,
        //   annaulTuitionFees: 0,
        //   educationInflationRate: 0,
        //   futureValueOfAnnualTuitionFee: 0,
        //   totalTuitionFee: 0,
        //   annualLivingCosts: 0,
        //   inflationRate: 0,
        //   futureValueOfAnnualLivingCosts: 0,
        //   totalLivingCost: 0,
        //   totalEducationFunding: 0,
        //   futureValueOfExistingResourceForEducation: 0,
        //   netAmountRequired: 0,
        // },
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

type Actions = {
  setInit: (pfrType: number) => any;
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
  addIssue: (value: any) => any;
  resetIssue: () => any;
  setGlobal: (name: string, value: any) => any;
  fetchDefaultCheck: (data: any) => any;
  fetchMaternityOther: (data: any) => any;
  fetchClientData: (data: any, i: number) => any;
  fetchDependantData: (data: any, i: number) => any;
  fetchNeed: (data: any, i: number, type: string) => any;
};

const prioritiesNeedAnalysis = create(
  devtools(
    persist<SectionSeven & Actions>(
      (set, get) => ({
        ...initialState,
        setInit: (pfrType) => 
          set(
            produce((draft) => {
              draft.section7.additionalNote = new Array(14).fill({
                note: "",
              });
              draft.section7.answer.need.client = new Array(
                pfrType
              )
                .fill(false)
                .map(() => {
                  return new Array(14).fill(false);
                });
              draft.section7.answer.need.dependant = new Array(
                draft.section7.totalDependant
              )
                .fill(false)
                .map(() => {
                  return new Array(14).fill(false);
                });
            })
          ),
        setClient: (
          value: number,
          indexClient: number,
          name: any,
          groupData: any
        ) =>
          set(
            produce((draft) => {
              draft.section7.answer.clientData[indexClient][groupData][name] = value;

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        fetchNeed: (data: any, i: number, type: string) => 
          set(
            produce((draft) => {
              if (type === 'client') {
                draft.section7.answer.need.client[i] = data;
              } else {
                draft.section7.answer.need.dependant[i] = data;
              }
            })
          ),
        fetchClientData: (data: any, i: number) =>
          set(
            produce((draft) => {
              console.log("default client fetch: ", data);

              draft.section7.answer.clientData[i] = {
                clientId: data['id'],
                dependantId: data['dependantId'],
                incomeProtectionUponDeath: JSON.parse(data['incomeProtectionUponDeath']),
                fundDisabilityIncomeExpense: JSON.parse(data['fundDisabilityIncomeExpense']),
                fundCriticalIllnessExpense: JSON.parse(data['fundCriticalIllnessExpense']),
                fundMediumToLongTerm: JSON.parse(data['fundMediumToLongTerm']),
                fundRetirementLifeStyle: JSON.parse(data['fundRetirementLifeStyle']),
                coverForPersonalAccident: JSON.parse(data['coverForPersonalAccident']),
                fundLongTermCare: JSON.parse(data['fundLongTermCare']),
                fundHospitalExpense: JSON.parse(data['fundHospitalExpense']),
                estatePlaning: JSON.parse(data['estatePlaning']),
                otherInsures: JSON.parse(data['otherInsures']),
                maternity: JSON.parse(data['maternityPlan']),
              }
            })
          ),
        fetchDependantData: (data: any, i: number) =>
          set(
            produce((draft) => {
              console.log("default dependant fetch: ", data);

              draft.section7.answer.dependantData[i] = {
                clientId: data['id'],
                dependantId: data['dependantId'],
                incomeProtectionUponDeath: JSON.parse(data['incomeProtectionUponDeath']),
                fundDisabilityIncomeExpense: JSON.parse(data['fundDisabilityIncomeExpense']),
                fundCriticalIllnessExpense: JSON.parse(data['fundCriticalIllnessExpense']),
                fundMediumToLongTerm: JSON.parse(data['fundMediumToLongTerm']),
                fundRetirementLifeStyle: JSON.parse(data['fundRetirementLifeStyle']),
                coverForPersonalAccident: JSON.parse(data['coverForPersonalAccident']),
                fundLongTermCare: JSON.parse(data['fundLongTermCare']),
                fundHospitalExpense: JSON.parse(data['fundHospitalExpense']),
                estatePlaning: JSON.parse(data['estatePlaning']),
                otherInsures: JSON.parse(data['otherInsues']),
                maternity: JSON.parse(data['maternity']),
              }
            })
          ),
        fetchMaternityOther: (data: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.addtionalMaternityPlan = [];
              draft.section7.answer.addtionalMaternityPlan.push(data);
            })
          ),
        fetchDefaultCheck: (data: any) => 
          set(
            produce((draft) => {
              console.log("default Check fetch: ", data);
              draft.section7.answer.defaultCheck = {
                income_protection_upon_death_mortgage: data['income_protection_upon_death_mortgage'],
                income_protection_upon_death_debt: data['income_protection_upon_death_debt'],
                income_protection_upon_death_other: data['income_protection_upon_death_other'],
                income_protection_upon_death_death: data['income_protection_upon_death_death'],
                fund_disability_income_expense_mortgage: data['fund_disability_income_expense_mortgage'],
                fund_disability_income_expense_disability: data['fund_disability_income_expense_disability'],
                fund_critical_illness_expense_mortgage: data['fund_critical_illness_expense_mortgage'],
                fund_critical_illness_expense_ci: data['fund_critical_illness_expense_ci'],
                cover_for_personal_accident_benefit: data['cover_for_personal_accident_benefit'],
                maternity_other: data['maternity_other'],
              }
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

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        removeChildFund: (index: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.childFund.splice(index, 1);

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        setChildFund: (value: number, indexClient: number, name: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.childFund[indexClient][name] = value;

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        addMaternity: () =>
          set(
            produce((draft) => {
              var clients = [];
              var dependant = [];
              for (var i = 0; i < initialState.section7.typeClient; i++) {
                clients.push(0);
              }

              for (var i = 0; i < initialState.section7.totalDependant; i++) {
                dependant.push(0);
              }
              draft.section7.answer.addtionalMaternityPlan.push({
                clients: clients,
                dependants: dependant,
                key: "",
              });

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        removeMaternity: (index: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.addtionalMaternityPlan.splice(index, 1);

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
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

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
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

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        setNeed: (indexClient: number, indexSub: number, value: boolean) =>
          set(
            produce((draft) => {
              draft.section7.answer.need.client[indexClient][indexSub] = value;

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }

              draft.section7.status = getStatus(draft);
            })
          ),
        setNeedDependant: (value: number, indexClient: number, name: any) =>
          set(
            produce((draft) => {
              draft.section7.answer.need.dependant[indexClient][name] = value;

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
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

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        setAdditional: (value: number, indexClient: number, name: any) =>
          set(
            produce((draft) => {
              draft.section7.additionalNote[indexClient][name] = value;

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          ),
        resetSectionSeven: () => {
          set(initialState);
        },
        addIssue: (value: any) => {
          set(
            produce((draft) => {
              draft.section7.answer.issues.push(value);

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          )
        },
        resetIssue: () => {
          set(
            produce((draft) => {
              draft.section7.answer.issues = [];

              if (get().section7.editableStatus === 1 && get().section7.status === 1) {
                draft.section7.editableStatus = 2;
              }
            })
          )
        },
        setGlobal: (name: string, value: any) => {
          set(
            produce((draft) => {
              draft.section7[name] = value;
            })
          )
        }
      }),
      {
        name: "section7",
      }
    )
  )

  //   console.log("sectionSeven", SectionSeven/)
);

export const usePrioritiesNeedAnalysis = prioritiesNeedAnalysis;
