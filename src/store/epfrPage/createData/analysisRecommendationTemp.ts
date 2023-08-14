import { SectionNineTemp } from "@/models/SectionNineTemp";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  resetSectionEightTemp: () => any;
  setGlobal: (object: string, indexData: number,  value: any) => any;
};

const initialState: SectionNineTemp = {
  id: 0,
  annualIncome: [
    { client: 1, ammount: 0 },
    { client: 2, ammount: 0 },
  ],
  annualExpense: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  asset: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  loan: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  summaryOfSRS: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  summaryOfCpfOa: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  summaryOfCpfSa: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  summaryOfCpfMedisave: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ],
  summaryOfSaving: [
    {
      client: 1,
      ammount: 0,
    },
    {
      client: 2,
      ammount: 0,
    },
  ]
};

const analysisRecommendationTemp = create(
  devtools(
    persist<SectionNineTemp & Actions>(
      (set, get) => ({
        ...initialState,
        setGlobal: (object: string, indexData: number, value: any) =>
          set(
            produce((draft) => {
              draft[object][indexData].ammount = value;
            })
          ),
        resetSectionEightTemp: () => {
          set(initialState);
        },
      }),
      {
        name: "section9Temp",
      }
    )
  )
);

export const useAnalysisRecommendationTemp = analysisRecommendationTemp;
