import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  sectionCreateEpfrId: number;
};

type Actions = {
  showDetailData: (params: number) => any;
  closeDetailData: () => void;
};

const navigationSection = create(
  devtools<State & Actions>((set, get) => ({
    sectionCreateEpfrId: 0,
    showDetailData: (params: number) =>
      set(() => ({ sectionCreateEpfrId: params })),
    closeDetailData: () => set(() => ({ sectionCreateEpfrId: 0 })),
  }))
);

export const useNavigationSection = navigationSection;
