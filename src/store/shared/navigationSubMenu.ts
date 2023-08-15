import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  subMenuId: string;
};

type Actions = {
  showDetailData: (params: string) => any;
  closeDetailData: () => void;
};

const navigationSubMenu = create(
  devtools<State & Actions>((set, get) => ({
    subMenuId: "",
    showDetailData: (params: string) => set(() => ({ subMenuId: params })),
    closeDetailData: () => set(() => ({ subMenuId: "" })),
  }))
);

export const useNavigationSubMenu = navigationSubMenu;
