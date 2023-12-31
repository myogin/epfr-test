import { SectionThree } from "@/models/SectionThree";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setAnnualIncome: (clientType: number, name: string, value: any) => any;
  setAnswerData: (clientType: number, name: string, value: any) => any;
  setAnnualExpanse: (
    key: string,
    indexData: number,
    indexClient: number,
    value: any
  ) => any;
  setOthers: (annualType: string, index: number, params: any) => any;
  patchOthers: (annualType: string, params: any) => any;
  removeOthers: (annualType: string, params: any) => any;
  setData: (indexData: number, params: any) => any;
  setAnnualSurplus: (indexData: number, params: any) => any;
  setReasonSurplus: (indexData: number, params: any) => any;
  setReason: (indexData: number, params: any) => any;
  setNeed: (indexData: number, params: any) => any;
  resetSectionThree: () => any;
  setGlobal: (name: string, value: any) => any;
  fetchAnnual: (clientType: number, params: any) => any;
  fetchExpense: (indexData: number,value: any) => any;
};

const initialState: SectionThree = {
  id: 0,
  need: [1, 1],
  reason: ["", ""],
  others: {
    annualIncome: [
      {
        id: 0,
        editting: false,
        key: "",
        values: [0, 0, 0, 0],
      },
    ],
    annualExpense: [
      {
        id: 0,
        editting: false,
        key: "",
        values: [0, 0, 0, 0],
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
      reasonForSurplus: "",
      answer: {
        state: 0,
        answer: "",
      },
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
      reasonForSurplus: "",
      answer: {
        state: 0,
        answer: "",
      },
    },
  ],
  annualExpense: [
    {
      key: "household",
      title: "Household",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "transportation",
      title: "Transportation",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "telco",
      title: "Telco",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "dependents",
      title: "Dependents",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "personal",
      title: "Personal",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "luxury",
      title: "Luxury",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "insurancePremiums",
      title: "Insurance Premiums",
      selected: false,
      values: [0, 0, 0, 0],
    },
    {
      key: "loanRepayments",
      title: "Loan Repayments",
      selected: false,
      values: [0, 0, 0, 0],
    },
  ],
  issues: [],
  totalNetSurplus: [230, 345],
  status: 0,
  editableStatus: 0,
};

const cashFlow = create(
  devtools(
    persist<SectionThree & Actions>(
      (set, get) => ({
        ...initialState,
        fetchExpense: (indexData: number,
          data: any) =>
          set(
            produce((draft) => {
              let dataNew = draft.annualExpense[indexData];
              dataNew.values[0] = data.value1 ? data.value1 : 0;
              dataNew.values[1] = data.value2 ? data.value2 : 0;
              dataNew.values[2] = data.value3 ? data.value3 : 0;
              dataNew.values[3] = data.value4 ? data.value4 : 0;
              dataNew.selected = true;
            })
          ),
        fetchAnnual: (clientType: number, params: any) =>
          set(
            produce((draft) => {
              console.log(params);
              let data = draft.data[clientType].annualIncome;
              data.annualGrossIncome = params.annualGrossIncome ? params.annualGrossIncome : 0;
              data.additionalWages = params.additionalWages ? params.additionalWages : 0;
              data.less = params.less ? params.less : 0;
            })
          ),
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
        setAnswerData: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.data[clientType].answer;
              data[name] = value;
            })
          ),
        setAnnualIncome: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let data = draft.data[clientType].annualIncome;
              data[name] = value;

              if (value > 0) {
                draft.status = 1;
              }

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
            })
          ),
        setAnnualExpanse: (
          key: string,
          indexData: number,
          indexClient: number,
          value: any
        ) =>
          set(
            produce((draft) => {
              let dataNew = draft.annualExpense[indexData];
              dataNew.values[indexClient] = value;
              dataNew.selected = true;

              if (value > 0) {
                draft.status = 1;
              }

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
            })
          ),
        setOthers: (annualType: string, indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (annualType === "annualIncome") {
                if (indexData === 0 && get().others?.annualIncome.length) {
                  let othersReplace = draft.others.annualIncome[indexData];
                  othersReplace.id = params.id;
                  othersReplace.editting = true;
                  othersReplace.key = params.key;
                  othersReplace.values[0] = params.values[0]
                    ? params.values[0]
                    : 0;
                  othersReplace.values[1] = params.values[1]
                    ? params.values[1]
                    : 0;
                } else {
                  draft.others.annualIncome.push(params);
                }
              } else {
                if (indexData === 0 && get().others?.annualExpense.length) {
                  let othersReplace = draft.others.annualExpense[indexData];
                  othersReplace.id = params.id;
                  othersReplace.editting = true;
                  othersReplace.key = params.key;
                  othersReplace.values[0] = params.values[0]
                    ? params.values[0]
                    : 0;
                  othersReplace.values[1] = params.values[1]
                    ? params.values[1]
                    : 0;
                } else {
                  draft.others.annualExpense.push(params);
                }
              }

              draft.status = 1;

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
            })
          ),
        patchOthers: (annualType: string, params: any) =>
          set(
            produce((draft) => {
              const other = draft.others[annualType].find(
                (el: any) => el.id === params.id
              );

              other.editting = true;
              other.key = params.key;
              other.values[0] = params.values[0] ? params.values[0] : 0;
              other.values[1] = params.values[1] ? params.values[1] : 0;

              draft.status = 1;

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
            })
          ),
        removeOthers: (annualType: string, params: any) =>
          set(
            produce((draft) => {
              if (annualType === "annualIncome") {
                if (get().others?.annualIncome?.length > 1) {
                  const otherIndex = draft.others?.annualIncome.findIndex(
                    (el: any) => el.id === params
                  );
                  console.log("masuk disini");
                  draft.others.annualIncome.splice(otherIndex, 1);

                  // reset index 0 dependent data
                } else {
                  let otherReplace = draft.others.annualIncome[0];
                  otherReplace.id = 0;
                  otherReplace.editting = false;
                  otherReplace.key = "";
                  otherReplace.values = [0, 0];
                }
              } else {
                if (get().others?.annualExpense?.length > 1) {
                  const otherIndex = draft.others?.annualExpense.findIndex(
                    (el: any) => el.id === params
                  );
                  console.log("masuk disini");
                  draft.others.annualExpense.splice(otherIndex, 1);

                  // reset index 0 dependent data
                } else {
                  let otherReplace = draft.others.annualExpense[0];
                  otherReplace.id = 0;
                  otherReplace.editting = false;
                  otherReplace.key = "";
                  otherReplace.values = [0, 0];
                }
              }

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
            })
          ),
        setAnnualSurplus: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              let data = draft.data[indexData].annualSurplus;
              data.annualSurplus = params;
            })
          ),
        setReasonSurplus: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              let dataReplace = draft.data[indexData];
              dataReplace.reasonForSurplus = params;
            })
          ),
        setReason: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              let reason = draft.reason;
              reason[indexData] = params;
            })
          ),
        setNeed: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              let need = draft.need;
              need[indexData] = params;
            })
          ),
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              draft[name] = value;
            })
          ),
        resetSectionThree: () => {
          set(initialState);
        },
      }),
      {
        name: "section3",
      }
    )
  )
);

export const useCashFlow = cashFlow;
