interface SummaryOfProperty {
  editting: boolean;
  client: string;
  category: number;
  typeOfProperty: string;
  yearPurchased: number;
  purchasePrice: number;
  loanAmount: number;
  currentOutstanding: number;
  monthlyLoanRepaymentCash: number;
  monthlyLoanRepaymentCPF: number;
  currentMarketValue: number;
}

interface SummaryOfInvestment {
  editting: boolean;
  client: string;
  typeOfInvestment: string;
  typeOfInvestmentOther: string;
  company: string;
  yearInvested: number;
  investmentAmount: number;
  currentvalue: string;
  sourceOfInvestment: string;
}

interface SummaryOfSavings {
  editting: boolean;
  client: string;
  typeOfDeposit: number;
  bank: string;
  yearDeposit: number;
  savingAmount: number;
}

interface SummaryOfInsurance {
  editting: boolean;
  client: string;
  insured: string;
  status: string;
  insurer: string;
  policyType: string;
  policyTypeOther: string;
  policyTerm: string;
  death: number;
  tpd: number;
  ci: number;
  earlyCI: number;
  acc: number;
  purchaseYear: number;
  premiumFrequency: string;
  premium: number;
  cash: number;
  medisave: number;
  sourceOfFund: number;
}

interface SummaryOfInsurance2 {
  editting: boolean;
  client: string;
  insured: string;
  insurer: string;
  policyType: string;
  policyTerm: string;
  existingHosPlan: string;
  typeOfHosCovered: string;
  classOfWardCovered: string;
  purchaseYear: number;
  premium: number;
  medisave: number;
  frequency: string;
  sourceOfFund: number;
}

interface SummaryOfLoans {
  editting: boolean;
  client: string;
  typeOfLoan: string;
  loanTerm: string;
  yearOfLoanTaken: number;
  amountBorrowed: number;
  loanStatus: string;
  typeOfVehicle: string;
  currentOutstandingLoan: number;
  lender: string;
  interestRate: number;
  monthlyLoanRepayment: number;
}

interface SummaryOfCPF {
  editting: boolean;
  client: string;
  ordinaryAccount: number;
  specialAccount: number;
  medisaveAccount: number;
  retirementAccount: number;
}

interface SummaryOfSRS {
  editting: boolean;
  client: string;
  amount: number;
}

export interface SectionTwo {
  id: number;
  need: boolean;
  declineToReview: Array<any>;
  reason: string;
  summaryOfProperty: SummaryOfProperty[];
  summaryOfInvestment: SummaryOfInvestment[];
  summaryOfSavings: SummaryOfSavings[];
  summaryOfInsurance: SummaryOfInsurance[];
  summaryOfInsurance2: SummaryOfInsurance2[];
  summaryOfLoans: SummaryOfLoans[];
  summaryOfCPF: SummaryOfCPF[];
  summaryOfSRS: SummaryOfSRS[];
  issues: [];
  totalNetWorth: Array<any>;
  networthReason: Array<any>;
  status: number;
}
