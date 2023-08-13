import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionNine } from "@/models/SectionNine";

const initialState: SectionNine = {
    section9: {
        checkedData: [
            {
                id: 0,
                checked: 0
            }
        ],
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
        editableStatus: 0
    }
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
    setParent: (name: string, value: any) => set(
        produce((draft) => {
            draft.section9[name] = value;
        })
    ),
  }))

);

export const useAnalysisRecommendation = AnalysisRecommendation;
