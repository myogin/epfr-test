import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  property: boolean;
  vehicles: boolean;
  investment: boolean;
  saving: boolean;
  cpf: boolean;
  insurance: boolean;
  srs: boolean;
  loan: boolean;
  dataActive: boolean
};

type Actions = {
  showDetailProperty: (params: boolean) => any;
  showDetailVehicle: (params: boolean) => any;
  showDetailInvestment: (params: boolean) => any;
  showDetailSaving: (params: boolean) => any;
  showDetailCpf: (params: boolean) => any;
  showDetailInsurance: (params: boolean) => any;
  showDetailSrs: (params: boolean) => any;
  showDetailLoan: (params: boolean) => any;
  showDataActive: (params: boolean) => any;
};

const existingPortofolio = create(
  devtools<State & Actions>((set, get) => ({
    property: false,
    vehicles: false,
    investment: false,
    saving: false,
    cpf: false,
    insurance: false,
    srs: false,
    loan: false,
    dataActive: false,
    showDetailProperty: (params: boolean) => set(() => ({ property: params })),
    showDetailVehicle: (params: boolean) => set(() => ({ vehicles: params })),
    showDetailInvestment: (params: boolean) => set(() => ({ investment: params })),
    showDetailSaving: (params: boolean) => set(() => ({ saving: params })),
    showDetailCpf: (params: boolean) => set(() => ({ cpf: params })),
    showDetailInsurance: (params: boolean) => set(() => ({ insurance: params })),
    showDetailSrs: (params: boolean) => set(() => ({ srs: params })),
    showDetailLoan: (params: boolean) => set(() => ({ loan: params })),
    showDataActive: (params: boolean) => set(() => ({ dataActive: params })),
  }))
);

export const useExistingPortofolio = existingPortofolio;
