import { SectionOne } from "@/models/SectionOne";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";

type Actions = {
  setClient: (clientType: number, name: string, value: any) => any;
  setDependent: (name: string, value: any) => any;
  setAccompaniment: (name: string, value: any) => any;
  setTrustedIndividuals: (name: string, value: any) => any;
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
  devtools<SectionOne & Actions>((set, get) => ({
    ...initialState,
    setClient: (clientType: number, name: string, value: any) =>
      set(
        produce((draft) => {
          console.log('dfrat',draft)
          let client = draft.clientInfo[clientType];
          console.log('client', client)
          client[name] = value
        })
      ),
    setDependent: () => set(produce((draft) => {})),
    setAccompaniment: () => set(produce((draft) => {})),
    setTrustedIndividuals: () => set(produce((draft) => {})),
  }))
);

export const usePersonalInformation = personalInformation;
