import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { SectionEight } from "@/models/SectionEight";

const initialState: SectionEight = {
  section8: {
    typeClient: 0,
    totalDependant: 0,
    pfrId: 0,
    need: [],
    payorBudget: [],
    payorDetail: [],
    assetOrSurplus: [
      {
        answer: 0,
        reason: "",
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
    editableStatus: 0,
  },
};

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
  setGlobal: (name: string, value: any) => any;
  resetSectionEight: () => any;
  setInit: (params: any) => any;
};

const Affordability = create(
  devtools(
    persist<SectionEight & Actions>(
      (set, get) => ({
        ...initialState,
        setInit: (params: any) =>
          set(
            produce((draft) => {
              if (get().section8.typeClient === 0) {
                draft.section8.payorDetail = new Array(params).fill({
                  isSelf: 0,
                  relationShip: null,
                  payorName: null,
                  passportNo: null,
                  occupation: null,
                  payorIncome: 0,
                });

                draft.section8.payorBudget = new Array(params)
                  .fill(false)
                  .map(() => {
                    return new Array(5).fill({
                      selection: false,
                      annual: 0,
                      single: 0,
                      sourceOfFund: "",
                    });
                  });

                draft.section8.sourceOfWealth = new Array(params).fill({
                  employment: false,
                  investment: false,
                  inheritance: false,
                  other: false,
                  otherExplain: null,
                });

                draft.section8.assetOrSurplus = new Array(params).fill({
                  answer: 0,
                  reason: "",
                });
              }
              draft.section8.typeClient = params;
            })
          ),
        resetSectionEight: () => {
          console.log("masuk sini nggak ni reset section 8");
          set(initialState);
        },
        setPayorDetail: (
          key: number,
          name: string,
          dataType: string,
          value: any
        ) =>
          set(
            produce((draft) => {
              draft.section8[dataType][key][name] = value;
            })
          ),
        setPayorBudget: (
          key: number,
          index: any,
          name: string,
          value: number
        ) =>
          set(
            produce((draft) => {
              let dataResSelection =
                draft.section8.payorBudget[key][index][name];
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
                let resVal = false;
                if (value == "true") {
                  resVal = false;
                } else {
                  resVal = true;
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
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              console.log("global section 8 " + value + " " + name);
              draft.section8[name] = value;
            })
          ),
      }),
      {
        name: "section8",
      }
    )
  )
);

export const useAffordability = Affordability;
