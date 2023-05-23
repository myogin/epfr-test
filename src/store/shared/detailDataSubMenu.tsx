import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  dataId: number;
};

type Actions = {
  showDetailData: (params: number) => any;
  closeDetailData: () => void;
};

const detailDataSubMenu = create(
  devtools<State & Actions>((set, get) => ({
    dataId: 0,
    showDetailData: (params: number) => set(() => ({ dataId: params })),
    closeDetailData: () => set(() => ({ dataId: 0 })),
  }))
);

export const useDetailDataSubMenu = detailDataSubMenu;
