import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionEight } from "@/models/SectionEight";

const initialState: SectionEight = {
  section8: {
    typeClient: 2,
    totalDependant: 0,
    pfrId: 0,
    need: [],
    payorBudget: [],
    payorDetail: [],
    assetOrSurplus: [
      {
        answer: "0",
        reason: null,
      },
    ],
    sourceOfWealth: [
      {
        employment: false,
        investment: false,
        inheritance: false,
        other: false,
        otherExplain: null,
      },
    ],
    issues: [],
    fromExistingResources: [],
    reasonForResources: [],
    fromExistingResourcesForSingle: [],
    reasonForResourcesForSingle: [],
    medisaveResource: {
      fromExistingResources: [],
      reasonForResources: [],
      fromExistingResourcesForSingle: [],
      reasonForResourcesForSingle: [],
    },
    status: 0,
    editableStatus: 0
  },
};

initialState.section8.payorDetail = new Array(
  initialState.section8.typeClient
).fill({
  isSelf: "0",
  relationShip: null,
  payorName: null,
  passportNo: null,
  occupation: null,
  payorIncome: 0,
});

initialState.section8.payorBudget = new Array(initialState.section8.typeClient)
  .fill(false)
  .map(() => {
    return new Array(5).fill({
      selection: false,
      annual: 0,
      single: 0,
      sourceOfFund: "",
    });
  });

initialState.section8.sourceOfWealth = new Array(
  initialState.section8.typeClient
).fill({
  employment: false,
  investment: false,
  inheritance: false,
  other: false,
  otherExplain: null,
});

initialState.section8.assetOrSurplus = new Array(
  initialState.section8.typeClient
).fill({
  answer: false,
  reason: false,
});

// initialState.section8.answer.clientData =  new Array(initialState.section8.typeClient).fill(
//     {
//       clientId: 0,
//       dependantId: 0,
//       incomeProtectionUponDeath: {
//           annualAmountNeeded: 0,
//           numberOfYearsNeed: 0,
//           netRateOfReture: 0,
//           capitalSumRequired: 0,
//           finalExpense: 0,
//           emergencyFund: 0,
//           mortgage: 0,
//           personalDebts: 0,
//           others: 0,
//           totalCashFlow: 0,
//           total: 0,
//           existingInsuranceCoverageOnDeath: 0,
//           existingResources: 0,
//           netAmountRequired: 0
//       },
//       fundDisabilityIncomeExpense: {
//           annualAmountNeeded: 0,
//           numberOfYearsNeed: 0,
//           netRateOfReture: 0,
//           capitalSumRequired: 0,
//           medicalExpense: 0,
//           mortgage: 0,
//           loans: 0,
//           totalCashOutflow: 0,
//           total: 0,
//           existingInsuranceCoverageOnDisability: 0,
//           existingResources: 0,
//           netAmountRequired: 0
//       },
//       fundCriticalIllnessExpense: {
//           annualAmountNeeded: 0,
//           numberOfYearsNeed: 0,
//           netRateOfReture: 0,
//           capitalSumRequired: 0,
//           medicalExpense: 0,
//           mortgage: 0,
//           loans: 0,
//           totalCashOutflow: 0,
//           total: 0,
//           existingInsuranceCoverageOnCI: 0,
//           existingResources: 0,
//           netAmountRequired: 0
//       },
//       fundMediumToLongTerm: {
//           objective: 0,
//           goalDescription: 0,
//           yearsToReachGoal: 0,
//           less: 0,
//           netAmountRequired: 0
//       },
//       fundRetirementLifeStyle: {
//           age: 0,
//           expectedRetirementAge: 0,
//           yearsToRetirement: 0,
//           selectedMethod: 0,
//           annualIncome: 0,
//           rateOfIncomeIncrement: 0,
//           incomeAtRetirementAge: 0,
//           percentOfIncomeRequiredAtRetirement: 0,
//           incomeRequiredAtRetirement: 0,
//           retirementExpense: 0,
//           inflationRate: 0,
//           expenseATRetirement: 0,
//           yearsToReceiveRetirementIncome: 0,
//           netRateOfReture: 0,
//           amountNeededAtRetirementAge: 0,
//           less: 0,
//           netAmountRequired: 0
//       },
//       coverForPersonalAccident: {
//           amountNeeded: 0,
//           less: 0,
//           netAmountRequired: 0
//       },
//       fundLongTermCare: {
//           desiredMonthlyCashPayout: 0,
//           nameOfExistingLongTermCareInsurance: 0,
//           less: 0,
//           netAmountRequired: 0
//       },
//       fundHospitalExpense: {
//           disiredChoiceOfHospitalType: 0,
//           disiredChoiceOfWardClass: 0,
//           desiredTypeOfCover: 0,
//           nameOfExistingHospitalizationPlan: 0,
//           existingTypeOfHospitalCovered:0,
//           existingClassOfWardCovered:0,
//           existingTypeOfCover:0
//       },
//       estatePlaning: {
//           willWritten: 0,
//           lastUpdated: 0,
//           anyProvision: 0,
//           haveLastingPowerOfAttorney: 0,
//           doneYourCPFNomination: 0,
//           anyBenefit: 0
//       },
//       otherInsures: {
//           frequencyOfTravel: 0,
//           typeOfTravelInsuranceCovered: 0,
//           companyName: 0,
//           renewalDate: 0,
//           mortgageInsurance: 0,
//           groupInsurance: 0
//       },
//       maternity: {
//           amountNeeded: 0,
//           less: 0,
//           netAmountRequired: 0
//       }
// });
// initialState.section8.answer.dependantData =  new Array(initialState.section8.totalDependant).fill(
// {
//     clientId: 0,
//     dependantId: 0,
//     incomeProtectionUponDeath: {
//         annualAmountNeeded: 0,
//         numberOfYearsNeed: 0,
//         netRateOfReture: 0,
//         capitalSumRequired: 0,
//         finalExpense: 0,
//         emergencyFund: 0,
//         mortgage: 0,
//         personalDebts: 0,
//         others: 0,
//         totalCashFlow: 0,
//         total: 0,
//         existingInsuranceCoverageOnDeath: 0,
//         existingResources: 0,
//         netAmountRequired: 0
//     },
//     fundDisabilityIncomeExpense: {
//         annualAmountNeeded: 0,
//         numberOfYearsNeed: 0,
//         netRateOfReture: 0,
//         capitalSumRequired: 0,
//         medicalExpense: 0,
//         mortgage: 0,
//         loans: 0,
//         totalCashOutflow: 0,
//         total: 0,
//         existingInsuranceCoverageOnDisability: 0,
//         existingResources: 0,
//         netAmountRequired: 0
//     },
//     fundCriticalIllnessExpense: {
//         annualAmountNeeded: 0,
//         numberOfYearsNeed: 0,
//         netRateOfReture: 0,
//         capitalSumRequired: 0,
//         medicalExpense: 0,
//         mortgage: 0,
//         loans: 0,
//         totalCashOutflow: 0,
//         total: 0,
//         existingInsuranceCoverageOnCI: 0,
//         existingResources: 0,
//         netAmountRequired: 0
//     },
//     fundMediumToLongTerm: {
//         objective: 0,
//         goalDescription: 0,
//         yearsToReachGoal: 0,
//         less: 0,
//         netAmountRequired: 0
//     },
//     fundRetirementLifeStyle: {
//         age: 0,
//         expectedRetirementAge: 0,
//         yearsToRetirement: 0,
//         selectedMethod: 0,
//         annualIncome: 0,
//         rateOfIncomeIncrement: 0,
//         incomeAtRetirementAge: 0,
//         percentOfIncomeRequiredAtRetirement: 0,
//         incomeRequiredAtRetirement: 0,
//         retirementExpense: 0,
//         inflationRate: 0,
//         expenseATRetirement: 0,
//         yearsToReceiveRetirementIncome: 0,
//         netRateOfReture: 0,
//         amountNeededAtRetirementAge: 0,
//         less: 0,
//         netAmountRequired: 0
//     },
//     coverForPersonalAccident: {
//         amountNeeded: 0,
//         less: 0,
//         netAmountRequired: 0
//     },
//     fundLongTermCare: {
//         desiredMonthlyCashPayout: 0,
//         nameOfExistingLongTermCareInsurance: 0,
//         less: 0,
//         netAmountRequired: 0
//     },
//     fundHospitalExpense: {
//         disiredChoiceOfHospitalType: 0,
//         disiredChoiceOfWardClass: 0,
//         desiredTypeOfCover: 0,
//         nameOfExistingHospitalizationPlan: 0,
//         existingTypeOfHospitalCovered:0,
//         existingClassOfWardCovered:0,
//         existingTypeOfCover:0
//     },
//     estatePlaning: {
//         willWritten: 0,
//         lastUpdated: 0,
//         anyProvision: 0,
//         haveLastingPowerOfAttorney: 0,
//         doneYourCPFNomination: 0,
//         anyBenefit: 0
//     },
//     otherInsures: {
//         frequencyOfTravel: 0,
//         typeOfTravelInsuranceCovered: 0,
//         companyName: 0,
//         renewalDate: 0,
//         mortgageInsurance: 0,
//         groupInsurance: 0
//     },
//     maternity: {
//         amountNeeded: 0,
//         less: 0,
//         netAmountRequired: 0
//     }
// });
// initialState.section8.additionalNote = new Array(14).fill({
// note: ""
// });
// initialState.section8.answer.need.client = new Array(initialState.section8.typeClient).fill(false).map(() => {return new Array(14).fill(false);})
// initialState.section8.answer.need.dependant =  new Array(initialState.section8.totalDependant).fill(false).map(() => {return new Array(14).fill(false);})

type Actions = {
  setPayorDetail: (
    key: number,
    name: string,
    dataType: string,
    value: any
  ) => any;
  setPayorBudget: (key: number, index: any, name: string, value: number) => any;
  setSourceOfWealth: (key: number, name: string, value: any) => any;
  setAssetOrSurplus: (key: number, name: string, value: any) => any;
  resetSectionEight: () => any;
};

const Affordability = create(
  devtools<SectionEight & Actions>((set, get) => ({
    ...initialState,
    resetSectionEight: () => {
      set(initialState);
    },
    setPayorDetail: (key: number, name: string, dataType: string, value: any) =>
      set(
        produce((draft) => {
          draft.section8[dataType][key][name] = value;
        })
      ),
    setPayorBudget: (key: number, index: any, name: string, value: number) =>
      set(
        produce((draft) => {
          var dataResSelection = draft.section8.payorBudget[key][index][name];
          if (name == "selection") {
            if (dataResSelection == true) {
              dataResSelection = false;
            } else {
              dataResSelection = true;
            }
          } else {
            dataResSelection = value;
          }
          draft.section8.payorBudget[key][index][name] = dataResSelection;
        })
      ),
    setSourceOfWealth: (key: number, name: string, value: any) =>
      set(
        produce((draft) => {
          if (name != "otherExplain") {
            if (value == "true") {
              var resVal = false;
            } else {
              var resVal = true;
            }
            draft.section8.sourceOfWealth[key][name] = resVal;
          } else {
            draft.section8.sourceOfWealth[key][name] = value;
          }
        })
      ),
    setAssetOrSurplus: (key: number, name: string, value: any) =>
      set(
        produce((draft) => {
          draft.section8.assetOrSurplus[key][name] = value;
        })
      ),
  }))
);

export const useAffordability = Affordability;
