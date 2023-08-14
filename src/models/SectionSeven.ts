interface AdditionalNote {
  note: string;
}

interface Answer {
  pfrId: number;
  clientData: ClientData[];
  dependantData: ClientData[];
  noneed: boolean[];
  need: Need;
  childFund: ChildFund[];
  issues: any[];
  addtionalMaternityPlan: any[];
  defaultCheck: DefaultCheck;
}

interface DefaultCheck {
  income_protection_upon_death_mortgage: boolean;
  income_protection_upon_death_debt: boolean;
  income_protection_upon_death_other: boolean;
  income_protection_upon_death_death: boolean;
  fund_disability_income_expense_mortgage: boolean;
  fund_disability_income_expense_disability: boolean;
  fund_critical_illness_expense_mortgage: boolean;
  fund_critical_illness_expense_ci: boolean;
  cover_for_personal_accident_benefit: boolean;
  maternity_other: boolean;
}

interface ChildFund {
  nameOfChild: string;
  yearsToTertiaryEducation: number;
  noOfYearsOfStudy: number;
  annaulTuitionFees: number;
  educationInflationRate: number;
  futureValueOfAnnualTuitionFee: number;
  totalTuitionFee: number;
  annualLivingCosts: number;
  inflationRate: number;
  futureValueOfAnnualLivingCosts: number;
  totalLivingCost: number;
  totalEducationFunding: number;
  futureValueOfExistingResourceForEducation: number;
  netAmountRequired: number;
}

interface Need {
  client: boolean[][];
  dependant: boolean[][];
}

interface ClientData {
  clientId: number;
  dependantId: number;
  incomeProtectionUponDeath: IncomeProtectionUponDeath;
  fundDisabilityIncomeExpense: FundDisabilityIncomeExpense;
  fundCriticalIllnessExpense: FundCriticalIllnessExpense;
  fundMediumToLongTerm: FundMediumToLongTerm;
  fundRetirementLifeStyle: FundRetirementLifeStyle;
  coverForPersonalAccident: CoverForPersonalAccident;
  fundLongTermCare: FundLongTermCare;
  fundHospitalExpense: FundHospitalExpense;
  estatePlaning: EstatePlaning;
  otherInsures: OtherInsures;
  maternity: CoverForPersonalAccident;
}

interface OtherInsures {
  frequencyOfTravel?: any;
  typeOfTravelInsuranceCovered: string;
  companyName?: any;
  renewalDate?: any;
  mortgageInsurance: string;
  groupInsurance: string;
}

interface EstatePlaning {
  willWritten: string;
  lastUpdated?: any;
  anyProvision: string;
  haveLastingPowerOfAttorney: string;
  doneYourCPFNomination: string;
  anyBenefit: string;
}

interface FundHospitalExpense {
  disiredChoiceOfHospitalType: string;
  disiredChoiceOfWardClass: string;
  desiredTypeOfCover: string;
  nameOfExistingHospitalizationPlan?: any;
  existingTypeOfHospitalCovered: string;
  existingClassOfWardCovered: string;
  existingTypeOfCover: string;
}

interface FundLongTermCare {
  desiredMonthlyCashPayout: number;
  nameOfExistingLongTermCareInsurance?: any;
  less: number;
  netAmountRequired: number;
}

interface CoverForPersonalAccident {
  amountNeeded: number;
  less: number;
  netAmountRequired: number;
}

interface FundRetirementLifeStyle {
  age: number;
  expectedRetirementAge: number;
  yearsToRetirement: number;
  selectedMethod: number;
  annualIncome: number;
  rateOfIncomeIncrement: number;
  incomeAtRetirementAge: number;
  percentOfIncomeRequiredAtRetirement: number;
  incomeRequiredAtRetirement: number;
  retirementExpense: number;
  inflationRate: number;
  expenseATRetirement: number;
  yearsToReceiveRetirementIncome: number;
  netRateOfReture: number;
  amountNeededAtRetirementAge: number;
  less: number;
  netAmountRequired: number;
}

interface FundMediumToLongTerm {
  objective: number;
  goalDescription?: any;
  yearsToReachGoal: number;
  less: number;
  netAmountRequired: number;
}

interface FundCriticalIllnessExpense {
  annualAmountNeeded: number;
  numberOfYearsNeed: number;
  netRateOfReture: number;
  capitalSumRequired: number;
  medicalExpense: number;
  mortgage: number;
  loans: number;
  totalCashOutflow: number;
  total: number;
  existingInsuranceCoverageOnCI: number;
  existingResources: number;
  netAmountRequired: number;
}

interface FundDisabilityIncomeExpense {
  annualAmountNeeded: number;
  numberOfYearsNeed: number;
  netRateOfReture: number;
  capitalSumRequired: number;
  medicalExpense: number;
  mortgage: number;
  loans: number;
  totalCashOutflow: number;
  total: number;
  existingInsuranceCoverageOnDisability: number;
  existingResources: number;
  netAmountRequired: number;
}

interface IncomeProtectionUponDeath {
  annualAmountNeeded: number;
  numberOfYearsNeed: number;
  netRateOfReture: number;
  capitalSumRequired: number;
  finalExpense: number;
  emergencyFund: number;
  mortgage: number;
  personalDebts: number;
  others: number;
  totalCashFlow: number;
  total: number;
  existingInsuranceCoverageOnDeath: number;
  existingResources: number;
  netAmountRequired: number;
}

export interface SectionSeven {
  section7: {
    answer: Answer;
    pfrId: number;
    typeClient: number;
    totalDependant: number;
    additionalNote: AdditionalNote[];
    dependants: [],
    status: number;
    editableStatus: number;
  };
}
