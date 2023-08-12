import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionNine } from "@/models/SectionNine";

import {getPfr, getRecommendationGroup, pfrSection, getWholeContext} from "@/services/pfrService";


const initialState: SectionNine = {
    section9: {
        pfrId: 0,
        overView1: "",
        overView2: "",
        reasonForBenefit: "",
        reasonForRisk: "",
        reasonForDeviation: "",
        checkedData: [
            {
                id: 0,
                checked: 0
            }
        ],
        issues: [],
        deviates: [],
        deviationChanged: false,
        status: 1
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
