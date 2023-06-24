import { SectionOne } from "@/models/SectionOne";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

type Actions = {
  setClient: (clientType: number, name: string, value: any) => any;
  setDependent: (indexData: number, params: any) => any;
  removeDependent: (params: any) => any;
  patchDependent: (params: any) => any;
  setAccompaniment: (clientType: number, name: string, value: any) => any;
  setTrustedIndividuals: (name: string, value: any) => any;
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
      id: 0,
      name: "",
      relationship: "",
      dateOfBirth: "",
      age: 0,
      gender: "0",
      year: "0",
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
    declaration: false,
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

              // check validation
              if (
                get().clientInfo[clientType].clientTitle === "" ||
                get().clientInfo[clientType].clientName === "" ||
                get().clientInfo[clientType].gender === "" ||
                get().clientInfo[clientType].residency === "" ||
                get().clientInfo[clientType].dateOfBirth === "" ||
                get().clientInfo[clientType].marital === "" ||
                get().clientInfo[clientType].smoker === "" ||
                get().clientInfo[clientType].employmentStatus === "" ||
                get().clientInfo[clientType].annualIncome === "" ||
                get().clientInfo[clientType].contactMobile === "" ||
                get().clientInfo[clientType].email === "" ||
                get().clientInfo[clientType].residentialAddr === ""
              ) {
                draft.status = 0;
              }else {
                draft.status = 1;
              }
            })
          ),
        setDependent: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().dependant?.length) {
                let dependentReplace = draft.dependant[indexData];
                dependentReplace.id = params.id;
                dependentReplace.name = params.name;
                dependentReplace.relationship = params.relationship;
                dependentReplace.dateOfBirth = params.dateOfBirth;
                dependentReplace.age = params.age;
                dependentReplace.gender = params.gender;
                dependentReplace.year = params.year;
              } else {
                draft.dependant.push(params);
              }
            })
          ),
        removeDependent: (params: any) =>
          set(
            produce((draft) => {
              const dependentIndex = draft.dependant.findIndex(
                (el: any) => el.id === params
              );
              console.log("masuk disini");
              draft.dependant.splice(dependentIndex, 1);
            })
          ),
        patchDependent: (params: any) =>
          set(
            produce((draft) => {
              const dependant = draft.dependant.find(
                (el: any) => el.id === params.id
              );

              dependant.name = params.name;
              dependant.relationship = params.relationship;
              dependant.dateOfBirth = params.dateOfBirth;
              dependant.age = params.age;
              dependant.gender = params.gender;
              dependant.year = params.year;
            })
          ),
        setAccompaniment: (clientType: number, name: string, value: any) =>
          set(
            produce((draft) => {
              let accompaniment = draft.accompaniment[clientType];
              accompaniment[name] = value;
            })
          ),
        setTrustedIndividuals: (name: string, value: any) =>
          set(
            produce((draft) => {
              let trustedIndividual = draft.trustedIndividuals;
              trustedIndividual[name] = value;
            })
          ),
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
