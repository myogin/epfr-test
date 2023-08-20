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
          if (draft.section9.overView1!=='' && draft.section9.overView2!=='' && draft.section9.reasonForBenefit!=='' && draft.section9.reasonForRisk!=='' && draft.section9.reasonForDeviation!=='') {
            res = true;
          }

          draft.section9.checkedData.map((data: any) => {
            res = res || Boolean(data['checked']);
          });

          draft.status = res? 1: 0;

          console.log('set parent name: ', name);

          if (name !== 'editableStatus') {
            if (get().section9.editableStatus === 1 && get().section9.status === 1) {
              draft.section9.editableStatus = 2;
            }
          }
        })
      ),
  }))
);

export const useAnalysisRecommendation = AnalysisRecommendation;
