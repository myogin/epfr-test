import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  sectionCreateEpfrId: number;
  clientType: any;
};

type Actions = {
  showDetailData: (params: number, clientTypeParam: any) => any;
  closeDetailData: () => void;
};

const navigationSection = create(
  devtools<State & Actions>((set, get) => ({
    sectionCreateEpfrId: 0,
    clientType: null,
    showDetailData: (params: number, clientTypeParam: any) =>
      set(() => ({ sectionCreateEpfrId: params, clientType: clientTypeParam })),
    closeDetailData: () => set(() => ({ sectionCreateEpfrId: 0 })),
  }))
);

export const useNavigationSection = navigationSection;
