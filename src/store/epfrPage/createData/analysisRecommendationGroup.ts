import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { SectionNineRecommendationGroup } from "@/models/SectionNineRecommendationGroup";
import { group } from "console";
import {productFindOne} from "@/services/productService";
import React, { useState, useEffect } from "react";


const initialState: SectionNineRecommendationGroup = {
    section9RecommendGroup: {
        name: "",
        pfrId: 0,
    }
};

type Actions = {
    setParent: (value: string, name: string, groupData: any) => any;
};

const AnalysisRecommendationGroup = create(
  devtools<SectionNineRecommendationGroup & Actions>((set, get) => ({
    ...initialState,
    setParent: (value: string, name: string, groupData: any) => set(
        produce((draft) => {
            draft.section9RecommendGroup[name] = value;
        })
    )
  }))

);

export const useAnalysisRecommendationGroup = AnalysisRecommendationGroup;
