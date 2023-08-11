import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionNine } from "@/models/SectionNine";



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

type Actions = {
    setParent: (name: string, value: any) => any;
};

const AnalysisRecommendation = create(
  devtools<SectionNine & Actions>((set, get) => ({
    ...initialState,
    setParent: (name: string, value: any) => set(
        produce((draft) => {
            draft.section9[name] = value;
        })
    ),
  }))

);

export const useAnalysisRecommendation = AnalysisRecommendation;
