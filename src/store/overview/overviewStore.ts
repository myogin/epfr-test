import { create } from "zustand";
import { produce } from "immer";

interface Overview {
  pfrList: object;
  filter?: {
    method?: string;
  };
}
const initialState: Overview = {
  pfrList: {},
  filter: {
    method: "",
  },
};

type Actions = {
  updatePfr: (data: object) => any;
  updateFilter: (filter: object) => any;
};

const overviewData = (set: any) => ({
  ...initialState,
  updatePfr: (data: object) =>
    set(
      produce((drafts: any) => {
        drafts.pfrList = data;
      })
    ),
  updateFilter: (filter: object) =>
    set(
      produce((drafts: any) => {
        drafts.filter.method = filter;
      })
    ),
});

export const useUserData = create(overviewData);
