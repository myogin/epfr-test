import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  epfrSubMenu: number;
  submissionSubMenu: number;
  userSubMenu: number;
  clientSubMenu: number;
  providerSubMenu: number;
  residencyStatus: number;
  currency: number;
  nationality: number;
  language: number;
  title: number;
  sex: number;
  race: number;
  maritalStatus: number;
  relationshipStatus: number;
  educationLevel: number;
  employmentStatus: number;
  cisFund: number;
  cisProfile: number;
  ilpFund: number;
  ilpProfile: number;
};

type Actions = {
  setSubmenu: (key: any, params: number) => any;
};

const filterDataSubMenu = create(
  devtools<State & Actions>((set, get) => ({
    epfrSubMenu: 0,
    submissionSubMenu: 0,
    userSubMenu: 0,
    clientSubMenu: 0,
    providerSubMenu: 0,
    residencyStatus: 0,
    currency: 0,
    nationality: 0,
    language: 0,
    title: 0,
    sex: 0,
    race: 0,
    maritalStatus: 0,
    relationshipStatus: 0,
    educationLevel: 0,
    employmentStatus: 0,
    cisFund: 0,
    cisProfile: 0,
    ilpFund: 0,
    ilpProfile: 0,

    setSubmenu: (key: any, params: any) =>
      set(() => ({
        [key]: params,
      })),
  }))
);

export const useFilterDataSubMenu = filterDataSubMenu;
