import { SectionTwo } from "@/models/SectionTwo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


type Actions = {
  showDetailProperty: (params: boolean) => any;
  showDetailVehicle: (params: boolean) => any;
  showDetailInvestment: (params: boolean) => any;
  showDetailSaving: (params: boolean) => any;
  showDetailCpf: (params: boolean) => any;
  showDetailInsurance: (params: boolean) => any;
  showDetailSrs: (params: boolean) => any;
  showDetailLoan: (params: boolean) => any;
  showDataActive: (params: boolean) => any;
};

const initialState: SectionTwo = {
  id: 0,
    need: false,
    declineToReview: [],
    reason: "",
    summaryOfProperty: [
      {
        editting: false,
        client: "",
        category: 0,
        typeOfProperty: "",
        yearPurchased: 0,
        purchasePrice: 0,
        loanAmount: 0,
        currentOutstanding: 0,
        monthlyLoanRepaymentCash: 0,
        monthlyLoanRepaymentCPF: 0,
        currentMarketValue: 0,
      },
    ],
    summaryOfInvestment: [
      {
        editting: false,
        client: "",
        typeOfInvestment: "",
        typeOfInvestmentOther: "",
        company: "",
        yearInvested: 0,
        investmentAmount: 0,
        currentvalue: 0,
        sourceOfInvestment: "",
      },
    ],
    summaryOfSavings: [
      {
        editting: false,
        client: "",
        typeOfDeposit: 0,
        bank: "",
        yearDeposit: 0,
        savingAmount: 0,
      },
    ],
    summaryOfInsurance: [
      {
        editting: false,
        client: "",
        insured: "",
        status: "",
        insurer: "",
        policyType: "",
        policyTypeOther: "",
        policyTerm: "",
        death: 0,
        tpd: 0,
        ci: 0,
        earlyCI: 0,
        acc: 0,
        purchaseYear: 0,
        premiumFrequency: "",
        premium: 0,
        cash: 0,
        medisave: 0,
        sourceOfFund: 0,
      },
    ],
    summaryOfInsurance2: [
      {
        editting: false,
        client: "",
        insured: "",
        insurer: "",
        policyType: "",
        policyTerm: "",
        existingHosPlan: "",
        typeOfHosCovered: "",
        classOfWardCovered: "",
        purchaseYear: 0,
        premium: 0,
        medisave: 0,
        frequency: "",
        sourceOfFund: 0,
      },
    ],
    summaryOfLoans: [
      {
        editting: false,
        client: "",
        typeOfLoan: "",
        loanTerm: "",
        yearOfLoanTaken: 0,
        amountBorrowed: 0,
        loanStatus: "",
        typeOfVehicle: "",
        currentOutstandingLoan: 0,
        lender: "",
        interestRate: 0,
        monthlyLoanRepayment: 0,
      },
    ],
    summaryOfCPF: [
      {
        editting: false,
        client: "",
        ordinaryAccount: 0,
        specialAccount: 0,
        medisaveAccount: 0,
        retirementAccount: 0,
      },
    ],
    summaryOfSRS: [
      {
        editting: false,
        client: "",
        amount: 0,
      },
    ],
    issues: [],
    totalNetWorth: [],
    networthReason: [],
    status: 0,
};

const existingPortofolio = create(
  devtools<State & Actions>((set, get) => ({
    ...initialState,
    showDetailProperty: (params: boolean) => set(() => ({ property: params })),
    showDetailVehicle: (params: boolean) => set(() => ({ vehicles: params })),
    showDetailInvestment: (params: boolean) => set(() => ({ investment: params })),
    showDetailSaving: (params: boolean) => set(() => ({ saving: params })),
    showDetailCpf: (params: boolean) => set(() => ({ cpf: params })),
    showDetailInsurance: (params: boolean) => set(() => ({ insurance: params })),
    showDetailSrs: (params: boolean) => set(() => ({ srs: params })),
    showDetailLoan: (params: boolean) => set(() => ({ loan: params })),
    showDataActive: (params: boolean) => set(() => ({ dataActive: params })),
  }))
);

export const useExistingPortofolio = existingPortofolio;
