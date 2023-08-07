export interface SummaryOfProperty {
  editting?: boolean;
  id?: number;
  client: string;
  typeOfProperty: string;
  yearPurchased: number;
  purchasePrice: number;
  loanAmount: number;
  currentOutstanding: number;
  monthlyLoanRepaymentCash: number;
  monthlyLoanRepaymentCPF: number;
  currentMarketValue: number;
  clientPfr: string
}

export interface SummaryOfInvestment {
  editting?: boolean;
  id?: number;
  client: string;
  typeOfInvestment: string;
  typeOfInvestmentOther: string;
  company: string;
  yearInvested: number;
  investmentAmount: number;
  currentvalue: number;
  sourceOfInvestment: string;
}

export interface SummaryOfSavings {
  editting?: boolean;
  id?: number;
  client: string;
  typeOfDeposit: number;
  bank: string;
  yearDeposit: number;
  savingAmount: number;
}

export interface SummaryOfInsurance {
  editting?: boolean;
  id?: number;
  client: string; //same
  insured: string; //same
  insurer: string; //same
  policyType: string; // same
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
  status: string;
}

export interface SummaryOfInsurance2 {
  editting?: boolean;
  id?: number;
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

export interface SummaryOfLoans {
  editting?: boolean;
  id?: number;
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
  clientPfr: string
}

export interface SummaryOfCPF {
  editting?: boolean;
  id?: number;
  client: string;
  ordinaryAccount: number;
  specialAccount: number;
  medisaveAccount: number;
  retirementAccount: number;
  clientPfr: string
}

export interface SummaryOfSRS {
  editting?: boolean;
  id?: number;
  client: string;
  amount: number;
}

export interface SectionTwo {
  id?: number;
  need?: boolean;
  declineToReview?: Array<any>;
  reason?: string;
  summaryOfProperty: SummaryOfProperty[];
  summaryOfInvestment: SummaryOfInvestment[];
  summaryOfSavings: SummaryOfSavings[];
  summaryOfInsurance: SummaryOfInsurance[];
  summaryOfInsurance2: SummaryOfInsurance2[];
  summaryOfLoans: SummaryOfLoans[];
  summaryOfCPF: SummaryOfCPF[];
  summaryOfSRS: SummaryOfSRS[];
  issues?: [];
  totalNetWorth?: Array<any>;
  networthReason?: Array<any>;
  status?: number;
  editableStatus?: number;
}
