import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { SectionFour } from "@/models/SectionFour";

const initialState: SectionFour = {
  id: 0,
  need: [false, false],
  reason: [],
  others: {
    asset: [],
    liability: [],
  },
  issues: [],
  status: 0,
};

type Actions = {
  addAsset: (data: any) => any;
  deleteAsset: (index: number) => any;
  updateAsset: (index: number, data: any) => any;
  addLiability: (data: any) => any;
  deleteLiability: (index: number) => any;
  updateLiability: (index: number, data: any) => any;
};

const balanceSheet = (set: any) => ({
  ...initialState,
  addAsset: (data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset.push(data);
      })
    ),
  deleteAsset: (index: number) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset.splice(index, 1);
      })
    ),
  updateAsset: (index: number, data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset[index] = data;
      })
    ),
  addLiability: (data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability.push(data);
      })
    ),
  deleteLiability: (index: number) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability.splice(index, 1);
      })
    ),
  updateLiability: (index: number, data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability[index] = data;
      })
    ),
});

export const useBalanceSheet = create(
  devtools(
    persist<SectionFour & Actions>(balanceSheet, {
      name: "sectionFourv2",
    })
  )
);
