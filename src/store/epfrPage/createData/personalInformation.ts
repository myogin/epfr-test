import { DependantInformation, SectionOne } from "@/models/SectionOne";
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
  fetchClient: (clientType: number, params: any) => any;
  fetchDependent: (datas: DependantInformation[]) => any;
  fetchAccompainment: (clientType: number, params: any) => any;
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
      birthCountryId: 0,
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
      clientPfr: "",
    },
    {
      clientTitle: "",
      clientName: "",
      otherName: "",
      relationship: "",
      race: "",
      gender: "",
      birthCountryId: 0,
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
      clientPfr: "",
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
      certNumber: "",
      nric: "",
      sponsored: "",
      clientPfr: "",
      client: 0,
    },
  ],
  accompaniment: [
    {
      clientType: 0,
      age: 0,
      english_spoken: "",
      english_written: "",
      education_level: "",
      clientPfr: "",
    },
    {
      clientType: 0,
      age: 0,
      english_spoken: "",
      english_written: "",
      education_level: "",
      clientPfr: "",
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
  editableStatus: 0,
};

const personalInformation = create(
  devtools(
    persist<SectionOne & Actions>(
      (set, get) => ({
        ...initialState,
        fetchClient: (clientType: number, params: any) =>
          set(
            produce((draft) => {
              draft.clientInfo[clientType].clientTitle = params.clientTitle ? params.clientTitle : "";
              draft.clientInfo[clientType].clientName = params.clientName ? params.clientName : "";
              draft.clientInfo[clientType].otherName = params.otherName ? params.otherName : "";
              draft.clientInfo[clientType].relationship = params.relationship ? params.relationship : "";
              draft.clientInfo[clientType].race = params.race ? params.race : "";
              draft.clientInfo[clientType].gender = params.gender ? params.gender : "";
              draft.clientInfo[clientType].birthCountryId = params.birthCountryId ? params.birthCountryId : 0;
              draft.clientInfo[clientType].passportNo = params.passportNo ? params.passportNo : "";
              draft.clientInfo[clientType].nationality = params.nationality ? params.nationality : "";
              draft.clientInfo[clientType].residency = params.residency ? params.residency : "";
              draft.clientInfo[clientType].residencyTwo = params.residencyTwo ? params.residencyTwo : "";
              draft.clientInfo[clientType].residencyOther = params.residencyOther ? params.residencyOther : "";
              draft.clientInfo[clientType].dateOfBirth = params.dateOfBirth ? params.dateOfBirth : "";
              draft.clientInfo[clientType].marital = params.marital ? params.marital : "";
              draft.clientInfo[clientType].smoker = params.smoker ?  params.smoker : "";
              draft.clientInfo[clientType].employmentStatus = params.employmentStatus ? params.employmentStatus : "";
              draft.clientInfo[clientType].occupation = params.occupation ? params.occupation : "";
              draft.clientInfo[clientType].companyName = params.companyName ? params.companyName : "";
              draft.clientInfo[clientType].businessNature = params.businessNature ? params.businessNature : "";
              draft.clientInfo[clientType].annualIncome = params.annualIncome ? params.annualIncome : "";
              draft.clientInfo[clientType].contactHome = params.contactHome ? params.contactHome : "";
              draft.clientInfo[clientType].contactMobile = params.contactMobile ? params.contactMobile : "";
              draft.clientInfo[clientType].contactOffice = params.contactOffice ? params.contactOffice : "";
              draft.clientInfo[clientType].contactFax = params.contactFax ? params.contactFax : "";
              draft.clientInfo[clientType].email = params.email ? params.email : "";
              draft.clientInfo[clientType].residentialAddr = params.residentialAddr ? params.residentialAddr : "";
              draft.clientInfo[clientType].mailingAddr = params.mailingAddr ? params.mailingAddr: "";
              draft.clientInfo[clientType].clientPfr = params.clientPfr ? params.clientPfr : "";
            })
          ),
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

              console.log("masuk editable status nggak " + get().editableStatus + " statsu " + get().status);

              if(get().editableStatus === 1 && get().status === 1) {
                console.log("masuk nggak");
                draft.editableStatus = 2;
              }else {
                console.log("masuk sini nggak");
              }

              if (
                get().clientInfo?.length &&
                get().clientInfo[clientType].hasOwnProperty("clientTitle")
              ) {

                // check validation
                if (
                  draft.clientInfo[clientType].clientTitle === "" ||
                  draft.clientInfo[clientType].clientTitle === "-" ||
                  draft.clientInfo[clientType].gender === "" ||
                  draft.clientInfo[clientType].gender === "-" ||
                  draft.clientInfo[clientType].dateOfBirth === "" ||
                  draft.clientInfo[clientType].residency === "" ||
                  draft.clientInfo[clientType].residency === "-" ||
                  draft.clientInfo[clientType].employmentStatus === "" ||
                  draft.clientInfo[clientType].annualIncome === "" ||
                  draft.clientInfo[clientType].annualIncome === "-" ||
                  draft.clientInfo[clientType].contactMobile === "" ||
                  draft.clientInfo[clientType].clientName === "" ||
                  draft.clientInfo[clientType].email === "" ||
                  draft.clientInfo[clientType].race === "" ||
                  draft.clientInfo[clientType].residencyTwo === "" ||
                  draft.clientInfo[clientType].residencyTwo === "-" ||
                  draft.clientInfo[clientType].marital === "" ||
                  draft.clientInfo[clientType].marital === "-" ||
                  draft.clientInfo[clientType].residentialAddr === "" ||
                  draft.clientInfo[clientType].smoker === "" ||
                  draft.clientInfo[clientType].smoker === "-" ||
                  draft.reviewDate === ""
                ) {
                  draft.status = 0;
                } else {
                  draft.status = 1;
                }
              }
            })
          ),
        fetchDependent: (datas: DependantInformation[]) =>
          set(
            produce((draft) => {
              let checkLengthDependent = get().dependant?.length;

              if (datas.length > 0) {
                datas.map((param, index) => {
                  if (index === 0 && checkLengthDependent === 1) {
                    let dependentReplace = draft.dependant[index];
                    dependentReplace.id = 1;
                    dependentReplace.name = param.name;
                    dependentReplace.relationship = param.relationship;
                    dependentReplace.dateOfBirth = param.dateOfBirth;
                    dependentReplace.age = param.age;
                    dependentReplace.gender = param.gender;
                    dependentReplace.year = param.year;
                    dependentReplace.certNumber = param.certNumber;
                    dependentReplace.sponsored = param.sponsored;
                    dependentReplace.nric = param.nric;
                    dependentReplace.clientPfr = param.clientPfr;
                    dependentReplace.client = param.client;
                  } else {
                    param["id"] = ++checkLengthDependent;
                    draft.dependant.push(param);
                  }
                });

                // check validation
                // let checkDependent = 0;
                // draft.dependant.map((value: any, index: any) => {
                //   if (
                //     value.name === "" ||
                //     value.relationship === "" ||
                //     value.dateOfBirth === "" ||
                //     value.gender === ""
                //   ) {
                //     checkDependent++;
                //   }
                // });

                // if (checkDependent > 0) {
                //   draft.status = 0;
                // } else {
                //   draft.status = 1;
                // }
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
                dependentReplace.certNumber = params.certNumber;
                dependentReplace.sponsored = params.sponsored;
                dependentReplace.nric = params.nric;
                dependentReplace.clientPfr = params.clientPfr ? params.clientPfr : "Manual";
                dependentReplace.client = params.client ? params.client : 0;
              } else {
                params['clientPfr'] = "Manual";
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
                dependentReplace.certNumber = "";
                dependentReplace.sponsored = "";
                dependentReplace.nric = "";
                dependentReplace.clientPfr = "";
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
              dependant.certNumber = params.certNumber;
              dependant.sponsored = params.sponsored;
              dependant.nric = params.nric;
            })
          ),
        fetchAccompainment: (clientType: number, params: any) =>
          set(
            produce((draft) => {
              draft.accompaniment[clientType].clientType = params.clientType;
              draft.accompaniment[clientType].age = params.age;
              draft.accompaniment[clientType].english_spoken =
                params.english_spoken;
              draft.accompaniment[clientType].english_written =
                params.english_written;
              draft.accompaniment[clientType].education_level =
                params.education_level;
              draft.accompaniment[clientType].clientPfr = params.clientPfr;
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

              if (
                draft.trustedIndividuals.trustedEmail === "" ||
                draft.trustedIndividuals.nameOfTrustedIndividual === "" ||
                draft.trustedIndividuals.passportNo === "" ||
                draft.trustedIndividuals.relationship === "" ||
                draft.trustedIndividuals.languageUsed === "" ||
                draft.trustedIndividuals.languageUsed === "-" ||
                draft.trustedIndividuals.contactNumber === ""
              ) {
                draft.status = 0;
              } else {
                draft.status = 1;
              }
            })
          ),
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              console.log("masuk sini nggak global");
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
