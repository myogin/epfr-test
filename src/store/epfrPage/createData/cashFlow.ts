import { SectionThree } from "@/models/SectionThree";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setAnnualIncome: (clientType: number, name: string, value: any) => any;
  setAnnualExpanse: (
    key: string,
    index: number,
    value: any
  ) => any;
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
        values: [10, 20],
      },
      {
        id: 2,
        editting: false,
        key: "Test Other C",
        values: [10, 20],
      },
    ],
    annualExpense: [
      {
        id: 1,
        editting: false,
        key: "Test Other expense A",
        values: [10, 30],
      },
      {
        id: 2,
        editting: false,
        key: "Test Other expense B",
        values: [10, 20],
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
      title: "Household",
      selected: false,
      values: [0, 0],
    },
    {
      key: "transportation",
      title: "Transportation",
      selected: false,
      values: [0, 0],
    },
    {
      key: "telco",
      title: "Telco",
      selected: false,
      values: [0, 0],
    },
    {
      key: "dependents",
      title: "Dependents",
      selected: false,
      values: [0, 0],
    },
    {
      key: "personal",
      title: "Personal",
      selected: false,
      values: [0, 0],
    },
    {
      key: "luxury",
      title: "Luxury",
      selected: false,
      values: [0, 0],
    },
    {
      key: "insurancePremiums",
      title: "Insurance Premiums",
      selected: false,
      values: [0, 0],
    },
    {
      key: "loanRepayments",
      title: "Loan Repayments",
      selected: false,
      values: [0, 0],
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
        setAnnualExpanse: (
          key: string,
          index: number,
          value: any
        ) =>
          set(
            produce((draft) => {
              switch (key) {
                case "household":
                  let household = draft.annualExpense[0];
                  household.values[index] = value;
                  household.selected = true;
                  break;
                case "transportation":
                  let transportation = draft.annualExpense[1];
                  transportation.values[index] = value;
                  transportation.selected = true;
                  break;
                case "telco":
                  let telco = draft.annualExpense[2];
                  telco.values[index] = value;
                  telco.selected = true;
                  break;
                case "dependents":
                  let dependents = draft.annualExpense[3];
                  dependents.values[index] = value;
                  dependents.selected = true;
                  break;
                case "personal":
                  let personal = draft.annualExpense[4];
                  personal.values[index] = value;
                  personal.selected = true;
                  break;
                case "luxury":
                  let luxury = draft.annualExpense[5];
                  luxury.values[index] = value;
                  luxury.selected = true;
                  break;
                case "insurancePremiums":
                  let insurancePremiums = draft.annualExpense[6];
                  insurancePremiums.values[index] = value;
                  insurancePremiums.selected = true;
                  break;
                case "loanRepayments":
                  let loanRepayments = draft.annualExpense[7];
                  loanRepayments.values[index] = value;
                  loanRepayments.selected = true;
                  break;
                default:
                  break;
              }
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
              console.log("Masuk sini nggak");

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
