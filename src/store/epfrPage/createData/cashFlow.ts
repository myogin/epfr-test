import { SectionThree } from "@/models/SectionThree";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setAnnualIncome: (clientType: number, name: string, value: any) => any;
  setAnnualExpanse: (clientType: number, name: string, value: any) => any;
  setData: (indexData: number, params: any) => any;
  setAnnualSurplus: (indexData: number, params: any) => any;
  setAnswer: (indexData: number, params: any) => any;
  setNeed: (indexData: number, params: any) => any;
};

const initialState: SectionThree = {
  id: 0,
  need: [1, 1],
  reason: ["", ""],
  others: {
    annualIncome: [
      {
        id: 1,
        editting: false,
        key: "Test Other A",
        values: [10,20],
      },
      {
        id: 2,
        editting: false,
        key: "Test Other C",
        values: [10,20],
      },
    ],
    annualExpense: [
      {
        id: 0,
        editting: false,
        key: "",
        values: [],
      },
    ],
  },
  data: [
    {
      id: 0,
      annualIncome: {
        annualGrossIncome: 0,
        additionalWages: 0,
        less: 0,
        others: 0,
      },
      annualSurplus: {
        annualSurplus: 0,
      },
      answer: {
        state: "",
        answer: "",
      },
      reasonForSurplus: "",
    },
    {
      id: 1,
      annualIncome: {
        annualGrossIncome: 0,
        additionalWages: 0,
        less: 0,
        others: 0,
      },
      annualSurplus: {
        annualSurplus: 0,
      },
      answer: {
        state: "",
        answer: "",
      },
      reasonForSurplus: "",
    },
  ],
  annualExpense: [
    {
      key: "household",
      title: "household",
      selected: false,
      values: [1200, 0, 0, 0],
    },
    {
      key: "transportation",
      title: "transportation",
      selected: false,
      values: [2400, 0, 0, 0],
    },
    {
      key: "telco",
      title: "telco",
      selected: false,
      values: [3600, 0, 0, 0],
    },
    {
      key: "dependents",
      title: "dependents",
      selected: false,
      values: [4800, 0, 0, 0],
    },
    {
      key: "personal",
      title: "personal",
      selected: false,
      values: [6000, 0, 0, 0],
    },
    {
      key: "luxury",
      title: "luxury",
      selected: false,
      values: [7200, 0, 0, 0],
    },
    {
      key: "insurancePremiums",
      title: "Insurance Premiums",
      selected: false,
      values: [1200, 0, 0, 0],
    },
    {
      key: "loanRepayments",
      title: "Loan Repayments",
      selected: false,
      values: [12000, 0, 0, 0],
    },
  ],
  issues: [],
  totalNetSurplus: [230, 345],
  status: 0,
};

const cashFlow = create(
  devtools(
    persist<SectionThree & Actions>(
      (set, get) => ({
        ...initialState,
        setData: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().data?.length) {
                let dataReplace = draft.data[indexData];
                dataReplace.annualIncome.annualGrossIncome =
                  params.annualIncome.annualGrossIncome;
                dataReplace.annualIncome.additionalWages =
                  params.annualIncome.additionalWages;
                dataReplace.annualIncome.less = params.annualIncome.less;
              } else {
                draft.data.push(params);
              }
            })
          ),
        setAnnualIncome: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.data[clientType].annualIncome;
              data[name] = value;
            })
          ),
        setAnnualExpanse: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.annualExpense[clientType].key;
              data[name] = value;
            })
          ),
        setAnnualSurplus: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().data?.length) {
                let dataReplace = draft.data[indexData];
                dataReplace.annualSurplus.annualSurplus = params.annualSurplus;
              } else {
                draft.data.push(params);
              }
            })
          ),
        setAnswer: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().data?.length) {
                let dataReplace = draft.data[indexData];
                dataReplace.answer.answer = params.answer;
                dataReplace.answer.state = params.state;
              } else {
                draft.data.push(params);
              }
            })
          ),
        setNeed: (indexData: number, params: any) =>
          set(
            produce((draft) => {

              console.log("Masuk sini nggak")

              let need = draft.need;
              need[indexData] = params;
            })
          ),
      }),
      {
        name: "section3",
      }
    )
  )
);

export const useCashFlow = cashFlow;
