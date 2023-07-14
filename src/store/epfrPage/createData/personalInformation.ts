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
      race: "",
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
    {
      clientTitle: "",
      clientName: "",
      otherName: "",
      relationship: "",
      race: "",
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
              if (
                get().clientInfo?.length &&
                get().clientInfo[clientType].hasOwnProperty("clientTitle")
              ) {
                let client = draft.clientInfo[clientType];
                client[name] = value;
              }

              // check validation
              if (
                draft.clientInfo[clientType].clientTitle === "" ||
                draft.clientInfo[clientType].clientName === "" ||
                draft.clientInfo[clientType].gender === "" ||
                draft.clientInfo[clientType].residency === "" ||
                draft.clientInfo[clientType].dateOfBirth === "" ||
                draft.clientInfo[clientType].marital === "" ||
                draft.clientInfo[clientType].smoker === "" ||
                draft.clientInfo[clientType].employmentStatus === "" ||
                draft.clientInfo[clientType].annualIncome === "" ||
                draft.clientInfo[clientType].contactMobile === "" ||
                draft.clientInfo[clientType].email === "" ||
                draft.clientInfo[clientType].residentialAddr === ""
              ) {
                draft.status = 0;
              } else {
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

              // check validation
              let checkDependent = 0;
              draft.dependant.map((value: any, index: any) => {
                if (
                  value.name === "" ||
                  value.relationship === "" ||
                  value.dateOfBirth === "" ||
                  value.gender === ""
                ) {
                  checkDependent++;
                }
              });

              if (checkDependent > 0) {
                draft.status = 0;
              } else {
                draft.status = 1;
              }
            })
          ),
        removeDependent: (params: any) =>
          set(
            produce((draft) => {
              if (get().dependant?.length > 1) {
                const dependentIndex = draft.dependant.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.dependant.splice(dependentIndex, 1);

                // reset index 0 dependent data
              } else {
                let dependentReplace = draft.dependant[0];
                dependentReplace.id = 0;
                dependentReplace.name = "";
                dependentReplace.relationship = "";
                dependentReplace.dateOfBirth = "";
                dependentReplace.age = 0;
                dependentReplace.gender = "0";
                dependentReplace.year = "0";
              }
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
