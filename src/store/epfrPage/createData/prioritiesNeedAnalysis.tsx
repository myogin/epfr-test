import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  incomeProtection: boolean;
  fundDisability: boolean;
  fundCritical: boolean;
  fundChildren: boolean;
  fundMediumToLong: boolean;
  fundRetirement: boolean;
  coverForPersonal: boolean;
  fundLongTermCare: boolean;
  fundHospitalExpense: boolean;
  maternityPlan: boolean;
  estatePlanning: boolean;
  otherInsurance: boolean;
};

type Actions = {
  showIncomeProtection: (params: boolean) => any;
  showFundDisability: (params: boolean) => any;
  showFundCritical: (params: boolean) => any;
  showFundChildren: (params: boolean) => any;
  showFundMediumToLong: (params: boolean) => any;
  showFundRetirement: (params: boolean) => any;
  showCoverForPersonal: (params: boolean) => any;
  showFundLongTermCare: (params: boolean) => any;
  showFundHospitalExpense: (params: boolean) => any;
  showMaternityPlan: (params: boolean) => any;
  showEstatePlanning: (params: boolean) => any;
  showOtherInsurance: (params: boolean) => any;
};

const prioritiesNeedAnalysis = create(
  devtools<State & Actions>((set, get) => ({
    incomeProtection: false,
    fundDisability: false,
    fundCritical: false,
    fundChildren: false,
    fundMediumToLong: false,
    fundRetirement: false,
    coverForPersonal: false,
    fundLongTermCare: false,
    fundHospitalExpense: false,
    maternityPlan: false,
    estatePlanning: false,
    otherInsurance: false,
    showIncomeProtection: (params: boolean) =>
      set(() => ({ incomeProtection: params })),
    showFundDisability: (params: boolean) =>
      set(() => ({ fundDisability: params })),
    showFundCritical: (params: boolean) =>
      set(() => ({ fundCritical: params })),
    showFundChildren: (params: boolean) =>
      set(() => ({ fundChildren: params })),
    showFundMediumToLong: (params: boolean) =>
      set(() => ({ fundMediumToLong: params })),
    showFundRetirement: (params: boolean) =>
      set(() => ({ fundRetirement: params })),
    showCoverForPersonal: (params: boolean) =>
      set(() => ({ coverForPersonal: params })),
    showFundLongTermCare: (params: boolean) =>
      set(() => ({ fundLongTermCare: params })),
    showFundHospitalExpense: (params: boolean) =>
      set(() => ({ fundHospitalExpense: params })),
    showMaternityPlan: (params: boolean) =>
      set(() => ({ maternityPlan: params })),
    showEstatePlanning: (params: boolean) =>
      set(() => ({ estatePlanning: params })),
    showOtherInsurance: (params: boolean) =>
      set(() => ({ otherInsurance: params })),
  }))
);

export const usePrioritiesNeedAnalysis = prioritiesNeedAnalysis;
