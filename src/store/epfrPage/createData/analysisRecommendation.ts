import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionNine } from "@/models/SectionNine";

const initialState: SectionNine = {
  section9: {
    checkedData: [],
    pfrId: 0,
    overView1: "",
    overView2: "",
    reasonForBenefit: "",
    reasonForRisk: "",
    reasonForDeviation: "",
    issues: [],
    deviates: [],
    deviationChanged: false,
    status: 0,
    editableStatus: 0,
  },
};

// Action
type Actions = {
  setParent: (name: string, value: any) => any;
  resetSectionNine: () => any;
  setClientChoice: (indexData: any, params: any) => any;
};

const AnalysisRecommendation = create(
  devtools<SectionNine & Actions>((set, get) => ({
    ...initialState,
    resetSectionNine: () => {
      set(initialState);
    },
    setParent: (name: string, value: any) =>
      set(
        produce((draft) => {
          draft.section9[name] = value;

          let res = false;
          if (draft.section9.overView1!=='' && draft.section9.overView2!=='' && draft.section9.reasonForBenefit!=='' && draft.section9.reasonForRisk!=='') {
            res = true;
          }

          get().section9.checkedData.map((data: any) => {
            res = res || Boolean(data['checked']);
          });

          draft.status = res? 1: 0;

          console.log('set parent name: ', res);
          console.log('set parent name: ', name);

          if (name !== 'editableStatus') {
            if (get().section9.editableStatus === 1 && get().section9.status === 1) {
              draft.section9.editableStatus = 2;
            }
          }
        })
      ),
      setClientChoice: (indexData: any, params: any) =>
      set(
        produce((draft) => {
          if (
            (indexData === 0 && get().section9.checkedData?.length) ||
            (get().section9.checkedData[indexData] !== undefined &&
              get().section9.checkedData[indexData].id === params.id)
          ) {
            let dataReplace = draft.section9.checkedData[indexData];
            dataReplace.id = params.id;
            dataReplace.checked = params.checked;
          } else {
            draft.section9.checkedData.push(params);
          }

          let res = false;
          get().section9.checkedData.map((data: any) => {
            res = res || Boolean(data['checked']);
          });
          draft.status = res? 1: 0;

          if (
            get().section9.editableStatus === 1 &&
            get().section9.status === 1
          ) {
            draft.editableStatus = 2;
          }
        })
      ),
  }))
);

export const useAnalysisRecommendation = AnalysisRecommendation;
