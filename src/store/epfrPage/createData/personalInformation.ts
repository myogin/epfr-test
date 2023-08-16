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
  fetchClientSingpass: (clientType: number, params: any) => any;
  fetchDependent: (datas: DependantInformation[]) => any;
  fetchAccompainment: (clientType: number, params: any) => any;
  fetchTrustedIndividuals: (params: any) => any;
  resetSectionOne: () => any;
  resetDependent: () => any;
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
      clientPfr: "Manual",
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
      clientPfr: "Manual",
    },
  ],
  clientInfoSingpass: [
    {
      clientName: false,
      race: false,
      gender: false,
      birthCountryId: false,
      passportNo: false,
      nationality: false,
      residency: false,
      residencyTwo: false,
      residencyOther: false,
      dateOfBirth: false,
      marital: false,
      employmentStatus: false,
      occupation: false,
      companyName: false,
      businessNature: false,
      contactMobile: false,
      email: false,
      residentialAddr: false,
      cpfEmployer: false,
      clientPfr: "Manual",
    },
    {
      clientName: false,
      race: false,
      gender: false,
      birthCountryId: false,
      passportNo: false,
      nationality: false,
      residency: false,
      residencyTwo: false,
      residencyOther: false,
      dateOfBirth: false,
      marital: false,
      employmentStatus: false,
      occupation: false,
      companyName: false,
      businessNature: false,
      contactMobile: false,
      email: false,
      residentialAddr: false,
      cpfEmployer: false,
      clientPfr: "Manual",
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
      clientPfr: "Manual",
      client: 0,
      depId: 0,
    },
  ],
  accompaniment: [
    {
      clientType: 0,
      age: 0,
      english_spoken: "",
      english_written: "",
      education_level: "",
      clientPfr: "Manual",
    },
    {
      clientType: 0,
      age: 0,
      english_spoken: "",
      english_written: "",
      education_level: "",
      clientPfr: "Manual",
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
  trustedActive: false,
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
        fetchClientSingpass: (clientType: number, params: any) =>
          set(
            produce((draft) => {
              // Check if this is maybe the same person

              draft.clientInfoSingpass[clientType].clientName =
                params.clientPfr === "Singpass" &&
                params.clientName &&
                params.clientName !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].race =
                params.clientPfr === "Singpass" &&
                params.race &&
                params.race !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].gender =
                params.clientPfr === "Singpass" && Number(params.gender) >= 0
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].birthCountryId =
                params.clientPfr === "Singpass" && params.birthCountryId
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].passportNo =
                params.clientPfr === "Singpass" &&
                params.passportNo &&
                params.passportNo !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].nationality =
                params.clientPfr === "Singpass" &&
                params.nationality &&
                params.nationality !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].residency =
                params.clientPfr === "Singpass" &&
                params.residency &&
                params.residency !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].residencyTwo =
                params.clientPfr === "Singpass" &&
                Number(params.residencyTwo) >= 0
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].residencyOther =
                params.clientPfr === "Singpass" &&
                params.residencyOther &&
                params.residencyOther !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].dateOfBirth =
                params.clientPfr === "Singpass" &&
                params.dateOfBirth &&
                params.dateOfBirth !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].marital = false;

              draft.clientInfoSingpass[clientType].employmentStatus = false;
              draft.clientInfoSingpass[clientType].occupation =
                params.clientPfr === "Singpass" &&
                params.occupation &&
                params.occupation !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].companyName =
                params.clientPfr === "Singpass" &&
                params.companyName &&
                params.companyName !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].businessNature =
                params.businessNature && params.businessNature !== ""
                  ? true
                  : false;

              draft.clientInfoSingpass[clientType].contactMobile = false;

              draft.clientInfoSingpass[clientType].cpfEmployer =
                params.clientPfr === "Singpass" &&
                params.cpfEmployer &&
                params.cpfEmployer !== ""
                  ? true
                  : false;
              draft.clientInfoSingpass[clientType].email = false;

              draft.clientInfoSingpass[clientType].residentialAddr =
                params.clientPfr === "Singpass" &&
                params.residentialAddr &&
                params.residentialAddr !== ""
                  ? true
                  : false;

              draft.clientInfoSingpass[clientType].clientPfr = params.clientPfr
                ? params.clientPfr
                : "";
            })
          ),
        fetchClient: (clientType: number, params: any) =>
          set(
            produce((draft) => {
              // Check if this is maybe the same person

              console.log("gender ni");
              console.log(params.gender);
              if (
                params.passportNo === get().clientInfo[clientType].passportNo
              ) {
                draft.clientInfo[clientType].clientTitle =
                  params.clientTitle >= 0
                    ? params.clientTitle
                    : get().clientInfo[clientType].clientTitle;
                draft.clientInfo[clientType].clientName = params.clientName
                  ? params.clientName
                  : get().clientInfo[clientType].clientName;
                draft.clientInfo[clientType].otherName = params.otherName
                  ? params.otherName
                  : get().clientInfo[clientType].otherName;
                draft.clientInfo[clientType].relationship =
                  params.relationship >= 0
                    ? params.relationship
                    : get().clientInfo[clientType].relationship;
                draft.clientInfo[clientType].race = params.race
                  ? params.race
                  : get().clientInfo[clientType].race;
                draft.clientInfo[clientType].gender =
                  params.gender >= 0
                    ? params.gender
                    : get().clientInfo[clientType].gender;
                draft.clientInfo[clientType].birthCountryId =
                  params.birthCountryId
                    ? params.birthCountryId
                    : get().clientInfo[clientType].birthCountryId;
                draft.clientInfo[clientType].passportNo = params.passportNo
                  ? params.passportNo
                  : get().clientInfo[clientType].passportNo;
                draft.clientInfo[clientType].nationality = params.nationality
                  ? params.nationality
                  : get().clientInfo[clientType].nationality;
                draft.clientInfo[clientType].residency = params.residency
                  ? params.residency
                  : get().clientInfo[clientType].residency;
                draft.clientInfo[clientType].residencyTwo =
                  params.residencyTwo >= 0
                    ? params.residencyTwo
                    : get().clientInfo[clientType].residencyTwo;
                draft.clientInfo[clientType].residencyOther =
                  params.residencyOther
                    ? params.residencyOther
                    : get().clientInfo[clientType].residencyOther;
                draft.clientInfo[clientType].dateOfBirth = params.dateOfBirth
                  ? params.dateOfBirth
                  : get().clientInfo[clientType].dateOfBirth;
                draft.clientInfo[clientType].marital =
                  params.marital >= 0
                    ? params.marital
                    : get().clientInfo[clientType].marital;
                draft.clientInfo[clientType].smoker =
                  params.smoker >= 0
                    ? params.smoker
                    : get().clientInfo[clientType].smoker;
                draft.clientInfo[clientType].employmentStatus =
                  params.employmentStatus >= 0
                    ? params.employmentStatus
                    : get().clientInfo[clientType].employmentStatus;
                draft.clientInfo[clientType].occupation = params.occupation
                  ? params.occupation
                  : get().clientInfo[clientType].occupation;
                draft.clientInfo[clientType].companyName = params.companyName
                  ? params.companyName
                  : get().clientInfo[clientType].companyName;
                draft.clientInfo[clientType].businessNature =
                  params.businessNature
                    ? params.businessNature
                    : get().clientInfo[clientType].businessNature;
                draft.clientInfo[clientType].annualIncome =
                  params.annualIncome >= 0
                    ? params.annualIncome
                    : get().clientInfo[clientType].annualIncome;
                draft.clientInfo[clientType].contactHome = params.contactHome
                  ? params.contactHome
                  : get().clientInfo[clientType].contactHome;
                draft.clientInfo[clientType].contactMobile =
                  params.contactMobile
                    ? params.contactMobile
                    : get().clientInfo[clientType].contactMobile;
                draft.clientInfo[clientType].contactOffice =
                  params.contactOffice
                    ? params.contactOffice
                    : get().clientInfo[clientType].contactOffice;
                draft.clientInfo[clientType].contactFax = params.contactFax
                  ? params.contactFax
                  : get().clientInfo[clientType].contactFax;
                draft.clientInfo[clientType].email = params.email
                  ? params.email
                  : get().clientInfo[clientType].email;
                draft.clientInfo[clientType].residentialAddr =
                  params.residentialAddr
                    ? params.residentialAddr
                    : get().clientInfo[clientType].residentialAddr;
                draft.clientInfo[clientType].mailingAddr = params.mailingAddr
                  ? params.mailingAddr
                  : get().clientInfo[clientType].mailingAddr;
                draft.clientInfo[clientType].clientPfr = params.clientPfr
                  ? params.clientPfr
                  : get().clientInfo[clientType].clientPfr;
                // If different persone so go here
              } else {
                draft.clientInfo[clientType].clientTitle =
                  params.clientTitle >= 0 ? params.clientTitle : "";
                draft.clientInfo[clientType].clientName = params.clientName
                  ? params.clientName
                  : "";
                draft.clientInfo[clientType].otherName = params.otherName
                  ? params.otherName
                  : "";
                draft.clientInfo[clientType].relationship =
                  params.relationship >= 0 ? params.relationship : "";
                draft.clientInfo[clientType].race = params.race
                  ? params.race
                  : "";
                draft.clientInfo[clientType].gender =
                  params.gender >= 0 ? params.gender : "";
                draft.clientInfo[clientType].birthCountryId =
                  params.birthCountryId ? params.birthCountryId : 0;
                draft.clientInfo[clientType].passportNo = params.passportNo
                  ? params.passportNo
                  : "";
                draft.clientInfo[clientType].nationality = params.nationality
                  ? params.nationality
                  : "";
                draft.clientInfo[clientType].residency = params.residency
                  ? params.residency
                  : "";
                draft.clientInfo[clientType].residencyTwo =
                  params.residencyTwo >= 0 ? params.residencyTwo : "";
                draft.clientInfo[clientType].residencyOther =
                  params.residencyOther ? params.residencyOther : "";
                draft.clientInfo[clientType].dateOfBirth = params.dateOfBirth
                  ? params.dateOfBirth
                  : "";
                draft.clientInfo[clientType].marital =
                  params.marital >= 0 ? params.marital : "";
                draft.clientInfo[clientType].smoker =
                  params.smoker >= 0 ? params.smoker : "";
                draft.clientInfo[clientType].employmentStatus =
                  params.employmentStatus >= 0 ? params.employmentStatus : "";
                draft.clientInfo[clientType].occupation = params.occupation
                  ? params.occupation
                  : "";
                draft.clientInfo[clientType].companyName = params.companyName
                  ? params.companyName
                  : "";
                draft.clientInfo[clientType].businessNature =
                  params.businessNature ? params.businessNature : "";
                draft.clientInfo[clientType].annualIncome =
                  params.annualIncome >= 0 ? params.annualIncome : "";
                draft.clientInfo[clientType].contactHome = params.contactHome
                  ? params.contactHome
                  : "";
                draft.clientInfo[clientType].contactMobile =
                  params.contactMobile ? params.contactMobile : "";
                draft.clientInfo[clientType].contactOffice =
                  params.contactOffice ? params.contactOffice : "";
                draft.clientInfo[clientType].contactFax = params.contactFax
                  ? params.contactFax
                  : "";
                draft.clientInfo[clientType].email = params.email
                  ? params.email
                  : "";
                draft.clientInfo[clientType].residentialAddr =
                  params.residentialAddr ? params.residentialAddr : "";
                draft.clientInfo[clientType].mailingAddr = params.mailingAddr
                  ? params.mailingAddr
                  : "";
                draft.clientInfo[clientType].clientPfr = params.clientPfr
                  ? params.clientPfr
                  : "";
              }
            })
          ),
        resetDependent: () =>
          set(
            produce((draft) => {
              draft.dependant = new Array(1).fill({
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
                clientPfr: "Manual",
                client: 0,
                depId: 0,
              });
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

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }

              if (
                get().clientInfo?.length &&
                get().clientInfo[clientType].hasOwnProperty("clientTitle")
              ) {
                let type = get().type ? Number(get().type) : 0;

                let checkStatus = true;

                for (let z = 0; z < type; z++) {
                  if (
                    draft.clientInfo[z].clientTitle === "" ||
                    draft.clientInfo[z].clientTitle === "-" ||
                    draft.clientInfo[z].gender === "" ||
                    draft.clientInfo[z].gender === "-" ||
                    draft.clientInfo[z].dateOfBirth === "" ||
                    draft.clientInfo[z].residency === "" ||
                    draft.clientInfo[z].residency === "-" ||
                    draft.clientInfo[z].employmentStatus === "" ||
                    draft.clientInfo[z].annualIncome === "" ||
                    draft.clientInfo[z].annualIncome === "-" ||
                    draft.clientInfo[z].contactMobile === "" ||
                    draft.clientInfo[z].clientName === "" ||
                    draft.clientInfo[z].email === "" ||
                    draft.clientInfo[z].race === "" ||
                    draft.clientInfo[z].residencyTwo === "" ||
                    draft.clientInfo[z].residencyTwo === "-" ||
                    draft.clientInfo[z].marital === "" ||
                    draft.clientInfo[z].marital === "-" ||
                    draft.clientInfo[z].residentialAddr === "" ||
                    draft.clientInfo[z].smoker === "" ||
                    draft.clientInfo[z].smoker === "-" ||
                    draft.reviewDate === ""
                  ) {
                    checkStatus = false;
                  }
                }

                console.log("Test aja ini apa " + checkStatus);
                // check validation
                if (checkStatus) {
                  draft.status = 1;
                } else {
                  draft.status = 0;
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
                  let depIdFromDb = param.id && param.id > 0 ? param.id : 0;
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
                    dependentReplace.depId = param.depId
                      ? param.depId
                      : depIdFromDb;
                  } else {
                    param["id"] = ++checkLengthDependent;
                    param["depId"] = depIdFromDb;
                    draft.dependant.push(param);
                  }
                });
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
                dependentReplace.clientPfr = params.clientPfr
                  ? params.clientPfr
                  : "Manual";
                dependentReplace.client = params.client ? params.client : 0;
                dependentReplace.depId = params.depId ? params.depId : 0;
              } else {
                params["clientPfr"] = "Manual";
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

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
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
                dependentReplace.depId = 0;
                dependentReplace.client = 0;
              }

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
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
              dependant.clientPfr = params.clientPfr
                ? params.clientPfr
                : "Manual";
              dependant.client = params.client ? params.client : 0;
              dependant.depId = params.depId ? params.depId : 0;

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
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

              let type = get().type ? Number(get().type) : 0;

              let checkStatus = true;

              for (let z = 0; z < type; z++) {
                if (
                  draft.accompaniment[z].age === "" ||
                  draft.accompaniment[z].age === null ||
                  draft.accompaniment[z].english_spoken === "" ||
                  draft.accompaniment[z].english_spoken === "-" ||
                  draft.accompaniment[z].english_written === "" ||
                  draft.accompaniment[z].english_written === "-" ||
                  draft.accompaniment[z].education_level === "-" ||
                  draft.accompaniment[z].education_level === ""
                ) {
                  checkStatus = false;
                }
              }

              console.log("Test aja ini apa " + checkStatus);
              // check validation
              if (checkStatus) {
                draft.status = 1;
              } else {
                draft.status = 0;
              }

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }

              // Check accompaintment for trusted individual
              if (draft.accompaniment[0].english_spoken !== "-") {
                draft.trustedIndividuals.englishLevel1 =
                  draft.accompaniment[0].english_spoken;
              }

              if (draft.accompaniment[0].english_written !== "-") {
                draft.trustedIndividuals.englishLevel2 =
                  draft.accompaniment[0].english_written;
              }

              if (draft.accompaniment[0].education_level !== "-") {
                draft.trustedIndividuals.educationLevel =
                  draft.accompaniment[0].education_level;
              }

              // set conditions
              // If age == 1 && eng1 == 2 || eng2 == 2
              // If age == 1 && education <= 2
              // If eng1 == 2 || eng2 == 2 && education <=2
              if (
                (Number(draft.trustedIndividuals.ageLevel) === 1 &&
                  (Number(draft.trustedIndividuals.englishLevel1) === 2 ||
                    Number(draft.trustedIndividuals.englishLevel2) === 2)) ||
                (Number(draft.trustedIndividuals.ageLevel) === 1 &&
                  Number(draft.trustedIndividuals.educationLevel <= 2)) ||
                ((Number(draft.trustedIndividuals.englishLevel1) === 2 ||
                  Number(draft.trustedIndividuals.englishLevel2) === 2) &&
                  Number(draft.trustedIndividuals.educationLevel <= 2))
              ) {
                draft.trustedActive = true;
                draft.trustedIndividuals.condition1 = true;
              } else {
                draft.trustedActive = false;
              }

              if (
                Number(draft.trustedIndividuals.englishLevel1) === 2 ||
                Number(draft.trustedIndividuals.englishLevel2) === 2
              ) {
                draft.trustedActive = true;
                draft.trustedIndividuals.condition2 = true;
              } else {
                draft.trustedActive = false;
              }
            })
          ),
        setTrustedIndividuals: (name: string, value: any) =>
          set(
            produce((draft) => {
              let trustedIndividual = draft.trustedIndividuals;
              trustedIndividual[name] = value;

              console.log("ini isinya apa " + get().trustedActive);
              if (
                get().trustedActive &&
                (draft.trustedIndividuals.trustedEmail === "" ||
                  draft.trustedIndividuals.nameOfTrustedIndividual === "" ||
                  draft.trustedIndividuals.passportNo === "" ||
                  draft.trustedIndividuals.relationship === "" ||
                  draft.trustedIndividuals.languageUsed === "" ||
                  draft.trustedIndividuals.languageUsed === "-" ||
                  draft.trustedIndividuals.contactNumber === "" ||
                  draft.trustedIndividuals.declaration === false)
              ) {
                draft.status = 0;
              } else {
                draft.status = 1;
              }

              if (get().editableStatus === 1 && get().status === 1) {
                draft.editableStatus = 2;
              }
            })
          ),
        fetchTrustedIndividuals: (params: any) =>
          set(
            produce((draft) => {
              draft.trustedIndividuals.condition1 =
                params.condition1 > 0 ? true : false;
              draft.trustedIndividuals.condition2 =
                params.condition2 > 0 ? true : false;
              draft.trustedIndividuals.trustedEmail = params.trustedEmail;
              draft.trustedIndividuals.nameOfTrustedIndividual =
                params.nameOfTrustedIndividual;
              draft.trustedIndividuals.passportNo = params.passportNo;
              draft.trustedIndividuals.relationship = params.relationship;
              draft.trustedIndividuals.languageUsed = params.languageUsed;
              draft.trustedIndividuals.contactNumber = params.contactNumber;
              draft.trustedIndividuals.englishLevel1 = params.englishLevel1;
              draft.trustedIndividuals.englishLevel2 = params.englishLevel2;
              draft.trustedIndividuals.educationLevel = params.educationLevel;
              draft.trustedIndividuals.ageLevel = params.ageLevel;
              draft.trustedIndividuals.declaration =
                params.declaration > 0 ? true : false;
            })
          ),
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              draft[name] = value;
            })
          ),
        resetSectionOne: () => {
          set(initialState);
        },
      }),
      {
        name: "section1",
      }
    )
  )
);

export const usePersonalInformation = personalInformation;
