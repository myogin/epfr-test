import { SectionEightTemp } from "@/models/SectionEightTemp";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  resetSectionEightTemp: () => any;
  setGlobal: (object: string, indexData: number,  value: any) => any;
};

const initialState: SectionEightTemp = {
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
};

const affordabilityTemp = create(
  devtools(
    persist<SectionEightTemp & Actions>(
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
        name: "section8Temp",
      }
    )
  )
);

export const useAffordabilityTemp = affordabilityTemp;