import { SectionOne } from "@/models/SectionOne";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

type Actions = {
  setClient: (clientType: number, name: string, value: any) => any;
  setDependent: (clientType: number, name: string, value: any) => any;
  setAccompaniment: (clientType: number, name: string, value: any) => any;
  setTrustedIndividuals: (clientType: number, name: string, value: any) => any;
  setGlobal: (name: string, value: any) => any;
};

const initialState: SectionOne = {
  ownerId: 0,
  type: 0,
  id: 0,
  clientInfo: [
    {
      clientTitle: "",
      clientName: "",
      otherName: "",
      relationship: "",
      gender: "",
      passportNo: "",
      nationality: "",
      residency: "",
      residencyTwo: "",
      residencyOther: "",
      dateOfBirth: "",
      marital: "",
      smoker: "",
      employmentStatus: "",
      occupation: "",
      companyName: "",
      businessNature: "",
      annualIncome: "",
      contactHome: "",
      contactMobile: "",
      contactOffice: "",
      contactFax: "",
      email: "",
      residentialAddr: "",
      mailingAddr: "",
    },
  ],
  dependant: [
    {
      name: "test",
      relationship: "SON",
      dateOfBirth: "10 June 2010",
      age: 13,
      gender: "1",
      year: "2",
    },
  ],
  accompaniment: [
    {
      age: 0,
      english_spoken: "",
      english_written: "",
      education_level: "",
    },
  ],
  trustedIndividuals: {
    condition1: false,
    condition2: false,
    trustedEmail: "",
    nameOfTrustedIndividual: "",
    passportNo: "",
    relationship: "",
    languageUsed: "",
    contactNumber: "",
    englishLevel1: 0,
    englishLevel2: 0,
    educationLevel: 0,
    ageLevel: 0,
    declaration: 0,
  },
  issues: [],
  reviewDate: "",
  status: 0,
};

const personalInformation = create(
  devtools(
    persist<SectionOne & Actions>(
      (set, get) => ({
        ...initialState,
        setClient: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let client = draft.clientInfo[clientType];
              client[name] = value;
            })
          ),
        setDependent: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let dependant = draft.dependant[clientType];
              dependant[name] = value;
            })
          ),
        setAccompaniment: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let dependant = draft.dependant[clientType];
              dependant[name] = value;
            })
          ),
        setTrustedIndividuals: (clientType: number, name: string, value: any) =>
          set(produce((draft) => {})),
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              draft[name] = value;
            })
          ),
      }),
      {
        name: "section1",
      }
    )
  )
);

export const usePersonalInformation = personalInformation;
