import { SectionTwo } from "@/models/SectionTwo";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setProperty: (indexData: number, params: any) => any;
  setInvestment: (indexData: number, params: any) => any;
  patchInvestment: (params: any) => any;
  setSaving: (clientType: number, name: string, value: any) => any;
  setCpf: (clientType: number, name: string, value: any) => any;
  setInsurance: (clientType: number, name: string, value: any) => any;
  setInsurance2: (clientType: number, name: string, value: any) => any;
  setSrs: (clientType: number, name: string, value: any) => any;
  setLoan: (clientType: number, name: string, value: any) => any;
  setGlobal: (name: string, value: any) => any;
  removeData: (attribut: string, params: any) => any;
  patchProperty: (params: any) => any;
  setToggle: (
    object: string,
    clientType: number,
    name: string,
    value: boolean
  ) => any;
};

const initialState: SectionTwo = {
  id: 0,
  need: false,
  declineToReview: [],
  reason: "",
  summaryOfProperty: [
    {
      id: 0,
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
      id: 0,
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
      id: 0,
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
  devtools(
    persist<SectionTwo & Actions>(
      (set, get) => ({
        ...initialState,
        setProperty: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfProperty?.length) {
                let propertyReplace = draft.summaryOfProperty[indexData];
                propertyReplace.id = params.id;
                propertyReplace.client = params.client;
                propertyReplace.category = params.category;
                propertyReplace.typeOfProperty = params.typeOfProperty;
                propertyReplace.yearPurchased = params.yearPurchased;
                propertyReplace.purchasePrice = params.purchasePrice;
                propertyReplace.loanAmount = params.loanAmount;
                propertyReplace.currentOutstanding = params.currentOutstanding;
                propertyReplace.monthlyLoanRepaymentCash =
                  params.monthlyLoanRepaymentCash;
                propertyReplace.monthlyLoanRepaymentCPF =
                  params.monthlyLoanRepaymentCPF;
                propertyReplace.currentMarketValue = params.currentMarketValue;
              } else {
                draft.summaryOfProperty.push(params);
              }
            })
          ),
        patchProperty: (params: any) =>
          set(
            produce((draft) => {
              const property = draft.summaryOfProperty.find(
                (el: any) => el.id === params.id
              );

              property.client = params.client;
              property.category = params.category;
              property.typeOfProperty = params.typeOfProperty;
              property.yearPurchased = params.yearPurchased;
              property.purchasePrice = params.purchasePrice;
              property.loanAmount = params.loanAmount;
              property.currentOutstanding = params.currentOutstanding;
              property.monthlyLoanRepaymentCash =
                params.monthlyLoanRepaymentCash;
              property.monthlyLoanRepaymentCPF = params.monthlyLoanRepaymentCPF;
              property.currentMarketValue = params.currentMarketValue;
            })
          ),
        setInvestment: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfProperty?.length) {
                let propertyReplace = draft.summaryOfProperty[indexData];
                propertyReplace.id = params.id;
                propertyReplace.client = params.client;
                propertyReplace.category = params.category;
                propertyReplace.typeOfProperty = params.typeOfProperty;
                propertyReplace.yearPurchased = params.yearPurchased;
                propertyReplace.purchasePrice = params.purchasePrice;
                propertyReplace.loanAmount = params.loanAmount;
                propertyReplace.currentOutstanding = params.currentOutstanding;
                propertyReplace.monthlyLoanRepaymentCash =
                  params.monthlyLoanRepaymentCash;
                propertyReplace.monthlyLoanRepaymentCPF =
                  params.monthlyLoanRepaymentCPF;
                propertyReplace.currentMarketValue = params.currentMarketValue;
              } else {
                draft.summaryOfProperty.push(params);
              }
            })
          ),
        patchInvestment: (params: any) =>
          set(
            produce((draft) => {
              const property = draft.summaryOfProperty.find(
                (el: any) => el.id === params.id
              );

              property.client = params.client;
              property.category = params.category;
              property.typeOfProperty = params.typeOfProperty;
              property.yearPurchased = params.yearPurchased;
              property.purchasePrice = params.purchasePrice;
              property.loanAmount = params.loanAmount;
              property.currentOutstanding = params.currentOutstanding;
              property.monthlyLoanRepaymentCash =
                params.monthlyLoanRepaymentCash;
              property.monthlyLoanRepaymentCPF = params.monthlyLoanRepaymentCPF;
              property.currentMarketValue = params.currentMarketValue;
            })
          ),
        setSaving: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.summaryOfSavings[clientType];
              data[name] = value;
            })
          ),
        setCpf: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.summaryOfCPF[clientType];
              data[name] = value;
            })
          ),
        setInsurance: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.summaryOfInsurance[clientType];
              data[name] = value;
            })
          ),
        setInsurance2: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.summaryOfInsurance2[clientType];
              data[name] = value;
            })
          ),
        setSrs: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.summaryOfSRS[clientType];
              data[name] = value;
            })
          ),
        setLoan: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.summaryOfLoans[clientType];
              data[name] = value;
            })
          ),

        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              draft[name] = value;
            })
          ),
        setToggle: (
          object: string,
          clientType: number,
          name: string,
          value: boolean
        ) =>
          set(
            produce((draft) => {
              let getObject = draft[object][clientType];
              getObject[name] = value;
            })
          ),
        removeData: (attribut: string, params: any) =>
          set(
            produce((draft) => {
              let data = draft[attribut];
              const dataIndex = data.findIndex((el: any) => el.id === params);
              data.splice(dataIndex, 1);
            })
          ),
      }),
      {
        name: "section2",
      }
    )
  )
);

export const useExistingPortofolio = existingPortofolio;
