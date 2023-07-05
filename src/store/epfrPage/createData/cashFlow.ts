import { SectionThree } from "@/models/SectionThree";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
    setAnnualIncome: (indexData: number, params: any) => any
};

const initialState: SectionThree = {
  id: 0,
  need: [1,1],
  reason: ["",""],
  others: {
    annualExpense: [
      {
        editting: false,
        key: "",
        values: [],
      },
    ],
    annualIncome: [
      {
        editting: false,
        key: "",
        values: [],
      },
    ],
  },
  data: [
    {
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
          setAnnualIncome: (indexData: number, value: any) =>
            set(
              produce((draft) => {
                if (indexData === 0 && get().data[0]?.length) {
                    let dataReplace = draft.summaryOfInvestment[indexData];
                    dataReplace.id = params.id;
                    dataReplace.client = params.client;
                    dataReplace.typeOfInvestment = params.typeOfInvestment;
                    dataReplace.typeOfInvestmentOther =
                      params.typeOfInvestmentOther;
                    dataReplace.company = params.company;
                    dataReplace.yearInvested = params.yearInvested;
                    dataReplace.investmentAmount = params.investmentAmount;
                    dataReplace.currentvalue = params.currentvalue;
                    dataReplace.sourceOfInvestment = params.sourceOfInvestment;
                  } else {
                    draft.summaryOfInvestment.push(params);
                  }
                })
              })
            ),
        }),
        {
          name: "section1",
        }
      )
    )
  );

export const useCashFlow = cashFlow;
