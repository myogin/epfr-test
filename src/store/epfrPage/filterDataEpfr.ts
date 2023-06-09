import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  subMenuActive: number;
};

type Actions = {
  setSubmenu: (params: number) => any;
};

const filterDataEpfr = create(
  devtools<State & Actions>((set, get) => ({
    subMenuActive: 0,

    setSubmenu: (params: any) =>
      set(() => ({
        subMenuActive: params,
      })),
  }))
);

export const useFilterDataEpfr = filterDataEpfr;
