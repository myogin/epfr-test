import { SectionTwo, SummaryOfLoans } from "@/models/SectionTwo";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setProperty: (indexData: number, params: any) => any;
  patchProperty: (params: any) => any;
  removeProperty: (params: any) => any;
  setInvestment: (indexData: number, params: any) => any;
  patchInvestment: (params: any) => any;
  removeInvestment: (params: any) => any;
  setSaving: (indexData: number, params: any) => any;
  patchSaving: (params: any) => any;
  removeSaving: (params: any) => any;
  setCpf: (indexData: number, params: any) => any;
  patchCpf: (params: any) => any;
  removeCpf: (params: any) => any;
  setInsurance: (indexData: number, params: any) => any;
  patchInsurance: (params: any) => any;
  removeInsurance: (params: any) => any;
  setInsurance2: (indexData: number, params: any) => any;
  patchInsurance2: (params: any) => any;
  removeInsurance2: (params: any) => any;
  setSrs: (indexData: number, params: any) => any;
  patchSrs: (params: any) => any;
  removeSrs: (params: any) => any;
  setLoan: (indexData: number, params: any) => any;
  fetchLoan: (params: any) => any;
  patchLoan: (params: any) => any;
  removeLoan: (params: any) => any;
  setGlobal: (name: string, value: any) => any;
  removeData: (attribut: string, params: any) => any;
  resetSectionTwo: () => any;

  setToggle: (
    object: string,
    clientType: number,
    name: string,
    value: boolean
  ) => any;
};

const initialState: SectionTwo = {
  id: 0,
  need: true,
  declineToReview: [],
  reason: "",
  summaryOfProperty: [
    {
      id: 0,
      editting: false,
      client: "",
      typeOfProperty: "",
      yearPurchased: 0,
      purchasePrice: 0,
      loanAmount: 0,
      currentOutstanding: 0,
      monthlyLoanRepaymentCash: 0,
      monthlyLoanRepaymentCPF: 0,
      currentMarketValue: 0,
      clientPfr: "",
    },
  ],
  summaryOfInvestment: [
    {
      id: 0,
      editting: false,
      client: "",
      typeOfInvestment: "",
      typeOfInvestmentOther: "",
      company: "",
      yearInvested: 0,
      investmentAmount: 0,
      currentvalue: 0,
      sourceOfInvestment: "",
    },
  ],
  summaryOfSavings: [
    {
      id: 0,
      editting: false,
      client: "",
      typeOfDeposit: 0,
      bank: "",
      yearDeposit: 0,
      savingAmount: 0,
    },
  ],
  summaryOfInsurance: [
    {
      id: 0,
      editting: false,
      client: "",
      insured: "",
      status: "",
      insurer: "",
      policyType: "",
      policyTypeOther: "",
      policyTerm: "",
      death: 0,
      tpd: 0,
      ci: 0,
      earlyCI: 0,
      acc: 0,
      purchaseYear: 0,
      premiumFrequency: "",
      premium: 0,
      cash: 0,
      medisave: 0,
      sourceOfFund: 0,
    },
  ],
  summaryOfInsurance2: [
    {
      id: 0,
      editting: false,
      client: "",
      insured: "",
      insurer: "",
      policyType: "",
      policyTerm: "",
      existingHosPlan: "",
      typeOfHosCovered: "",
      classOfWardCovered: "",
      purchaseYear: 0,
      premium: 0,
      medisave: 0,
      frequency: "",
      sourceOfFund: 0,
    },
  ],
  summaryOfLoans: [
    {
      id: 0,
      editting: false,
      client: "",
      typeOfLoan: "",
      loanTerm: "",
      yearOfLoanTaken: 0,
      amountBorrowed: 0,
      loanStatus: "",
      typeOfVehicle: "",
      currentOutstandingLoan: 0,
      lender: "",
      interestRate: 0,
      monthlyLoanRepayment: 0,
      clientPfr: "",
    },
  ],
  summaryOfCPF: [
    {
      id: 0,
      editting: false,
      client: "",
      ordinaryAccount: 0,
      specialAccount: 0,
      medisaveAccount: 0,
      retirementAccount: 0,
      clientPfr: "",
    },
  ],
  summaryOfSRS: [
    {
      id: 0,
      editting: false,
      client: "",
      amount: 0,
    },
  ],
  issues: [],
  totalNetWorth: [],
  networthReason: [],
  status: 0,
  editableStatus: 0,
};

const existingPortofolio = create(
  devtools(
    persist<SectionTwo & Actions>(
      (set, get) => ({
        ...initialState,
        setProperty: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfProperty?.length) {
                let dataReplace = draft.summaryOfProperty[indexData];
                dataReplace.id = params.id;
                dataReplace.client = params.client;
                dataReplace.typeOfProperty = params.typeOfProperty;
                dataReplace.editting = params.editting;
                dataReplace.yearPurchased = params.yearPurchased;
                dataReplace.purchasePrice = params.purchasePrice;
                dataReplace.loanAmount = params.loanAmount;
                dataReplace.currentOutstanding = params.currentOutstanding;
                dataReplace.monthlyLoanRepaymentCash =
                  params.monthlyLoanRepaymentCash;
                dataReplace.monthlyLoanRepaymentCPF =
                  params.monthlyLoanRepaymentCPF;
                dataReplace.currentMarketValue = params.currentMarketValue;
                dataReplace.clientPfr = params.clientPfr;
              } else {
                draft.summaryOfProperty.push(params);
              }
            })
          ),
        patchProperty: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfProperty.find(
                (el: any) => el.id === params.id
              );

              dataPatch.client = params.client;
              dataPatch.typeOfProperty = params.typeOfProperty;
              dataPatch.yearPurchased = params.yearPurchased;
              dataPatch.purchasePrice = params.purchasePrice;
              dataPatch.loanAmount = params.loanAmount;
              dataPatch.currentOutstanding = params.currentOutstanding;
              dataPatch.monthlyLoanRepaymentCash =
                params.monthlyLoanRepaymentCash;
              dataPatch.monthlyLoanRepaymentCPF =
                params.monthlyLoanRepaymentCPF;
              dataPatch.currentMarketValue = params.currentMarketValue;
            })
          ),
        removeProperty: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfProperty?.length > 1) {
                const dataIndex = draft.summaryOfProperty.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfProperty.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfProperty[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.typeOfProperty = "";
                dataReplace.yearPurchased = 0;
                dataReplace.purchasePrice = 0;
                dataReplace.loanAmount = 0;
                dataReplace.currentOutstanding = 0;
                dataReplace.monthlyLoanRepaymentCash = 0;
                dataReplace.monthlyLoanRepaymentCPF = 0;
                dataReplace.currentMarketValue = 0;
              }
            })
          ),
        setInvestment: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfInvestment?.length) {
                let dataReplace = draft.summaryOfInvestment[indexData];
                dataReplace.id = params.id;
                dataReplace.client = params.client;
                dataReplace.typeOfInvestment = params.typeOfInvestment;
                dataReplace.typeOfInvestmentOther =
                  params.typeOfInvestmentOther;
                dataReplace.company = params.company;
                dataReplace.yearInvested = params.yearInvested;
                dataReplace.investmentAmount = params.investmentAmount;
                dataReplace.currentvalue = params.currentvalue;
                dataReplace.sourceOfInvestment = params.sourceOfInvestment;
              } else {
                draft.summaryOfInvestment.push(params);
              }
            })
          ),
        patchInvestment: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfInvestment.find(
                (el: any) => el.id === params.id
              );

              dataPatch.client = params.client;
              dataPatch.typeOfInvestment = params.typeOfInvestment;
              dataPatch.typeOfInvestmentOther = params.typeOfInvestmentOther;
              dataPatch.company = params.company;
              dataPatch.yearInvested = params.yearInvested;
              dataPatch.investmentAmount = params.investmentAmount;
              dataPatch.currentvalue = params.currentvalue;
              dataPatch.sourceOfInvestment = params.sourceOfInvestment;
            })
          ),
        removeInvestment: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfInvestment?.length > 1) {
                const dataIndex = draft.summaryOfInvestment.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfInvestment.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfInvestment[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.typeOfInvestment = "";
                dataReplace.typeOfInvestmentOther = "";
                dataReplace.company = "";
                dataReplace.yearInvested = 0;
                dataReplace.investmentAmount = 0;
                dataReplace.currentvalue = 0;
                dataReplace.sourceOfInvestment = 0;
              }
            })
          ),
        setSaving: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfSavings?.length) {
                let dataReplace = draft.summaryOfSavings[indexData];
                dataReplace.id = params.id;
                dataReplace.client = params.client;
                dataReplace.typeOfDeposit = params.typeOfDeposit;
                dataReplace.bank = params.bank;
                dataReplace.yearDeposit = params.yearDeposit;
                dataReplace.savingAmount = params.savingAmount;
              } else {
                draft.summaryOfSavings.push(params);
              }
            })
          ),
        patchSaving: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfSavings.find(
                (el: any) => el.id === params.id
              );

              dataPatch.client = params.client;
              dataPatch.typeOfDeposit = params.typeOfDeposit;
              dataPatch.bank = params.bank;
              dataPatch.yearDeposit = params.yearDeposit;
              dataPatch.savingAmount = params.savingAmount;
            })
          ),
        removeSaving: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfSavings?.length > 1) {
                const dataIndex = draft.summaryOfSavings.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfSavings.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfSavings[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.typeOfDeposit = 0;
                dataReplace.bank = "";
                dataReplace.yearDeposit = 0;
                dataReplace.savingAmount = 0;
              }
            })
          ),
        setCpf: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfCPF?.length) {
                let dataReplace = draft.summaryOfCPF[indexData];
                dataReplace.id = params.id;
                dataReplace.editting = params.editting;
                dataReplace.client = params.client;
                dataReplace.ordinaryAccount = params.ordinaryAccount;
                dataReplace.specialAccount = params.specialAccount;
                dataReplace.medisaveAccount = params.medisaveAccount;
                dataReplace.retirementAccount = params.retirementAccount;
                dataReplace.clientPfr = params.clientPfr;
              } else {
                draft.summaryOfCPF.push(params);
              }
            })
          ),
        patchCpf: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfCPF.find(
                (el: any) => el.id === params.id
              );

              dataPatch.client = params.client;
              dataPatch.ordinaryAccount = params.ordinaryAccount;
              dataPatch.specialAccount = params.specialAccount;
              dataPatch.medisaveAccount = params.medisaveAccount;
              dataPatch.retirementAccount = params.retirementAccount;
            })
          ),
        removeCpf: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfCPF?.length > 1) {
                const dataIndex = draft.summaryOfCPF.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfCPF.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfCPF[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.ordinaryAccount = 0;
                dataReplace.specialAccount = 0;
                dataReplace.medisaveAccount = 0;
                dataReplace.retirementAccount = 0;
              }
            })
          ),
        setInsurance: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfInsurance?.length) {
                let dataReplace = draft.summaryOfInsurance[indexData];
                dataReplace.id = params.id;
                dataReplace.client = params.client;
                dataReplace.insured = params.insured;
                dataReplace.status = params.status;
                dataReplace.insurer = params.insurer;
                dataReplace.policyType = params.policyType;
                dataReplace.policyTypeOther = params.policyTypeOther;
                dataReplace.policyTerm = params.policyTerm;
                dataReplace.death = params.death;
                dataReplace.tpd = params.tpd;
                dataReplace.ci = params.ci;
                dataReplace.earlyCI = params.earlyCI;
                dataReplace.acc = params.acc;
                dataReplace.purchaseYear = params.purchaseYear;
                dataReplace.premiumFrequency = params.premiumFrequency;
                dataReplace.premium = params.premium;
                dataReplace.cash = params.cash;
                dataReplace.medisave = params.medisave;
                dataReplace.sourceOfFund = params.sourceOfFund;
              } else {
                draft.summaryOfInsurance.push(params);
              }
            })
          ),
        patchInsurance: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfInsurance.find(
                (el: any) => el.id === params.id
              );

              dataPatch.client = params.client;
              dataPatch.insured = params.insured;
              dataPatch.status = params.status;
              dataPatch.insurer = params.insurer;
              dataPatch.policyType = params.policyType;
              dataPatch.policyTypeOther = params.policyTypeOther;
              dataPatch.policyTerm = params.policyTerm;
              dataPatch.death = params.death;
              dataPatch.tpd = params.tpd;
              dataPatch.ci = params.ci;
              dataPatch.earlyCI = params.earlyCI;
              dataPatch.acc = params.acc;
              dataPatch.purchaseYear = params.purchaseYear;
              dataPatch.premiumFrequency = params.premiumFrequency;
              dataPatch.premium = params.premium;
              dataPatch.cash = params.cash;
              dataPatch.medisave = params.medisave;
              dataPatch.sourceOfFund = params.sourceOfFund;
            })
          ),
        removeInsurance: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfInsurance?.length > 1) {
                const dataIndex = draft.summaryOfInsurance.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfInsurance.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfInsurance[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.insured = "";
                dataReplace.status = "";
                dataReplace.insurer = "";
                dataReplace.policyType = "";
                dataReplace.policyTypeOther = "";
                dataReplace.policyTerm = "";
                dataReplace.death = 0;
                dataReplace.tpd = 0;
                dataReplace.ci = 0;
                dataReplace.earlyCI = 0;
                dataReplace.acc = 0;
                dataReplace.purchaseYear = 0;
                dataReplace.premiumFrequency = "";
                dataReplace.premium = 0;
                dataReplace.cash = 0;
                dataReplace.medisave = 0;
                dataReplace.sourceOfFund = 0;
              }
            })
          ),
        setInsurance2: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfInsurance2?.length) {
                let dataReplace = draft.summaryOfInsurance2[indexData];
                dataReplace.id = params.id;
                dataReplace.client = params.client;
                dataReplace.insured = params.insured;
                dataReplace.insurer = params.insurer;
                dataReplace.policyType = params.policyType;
                dataReplace.policyTerm = params.policyTerm;
                dataReplace.existingHosPlan = params.existingHosPlan;
                dataReplace.typeOfHosCovered = params.typeOfHosCovered;
                dataReplace.classOfWardCovered = params.classOfWardCovered;
                dataReplace.purchaseYear = params.purchaseYear;
                dataReplace.premium = params.premium;
                dataReplace.medisave = params.medisave;
                dataReplace.frequency = params.frequency;
                dataReplace.sourceOfFund = params.sourceOfFund;
              } else {
                draft.summaryOfInsurance2.push(params);
              }
            })
          ),
        patchInsurance2: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfInsurance2.find(
                (el: any) => el.id === params.id
              );
              dataPatch.client = params.client;
              dataPatch.insured = params.insured;
              dataPatch.insurer = params.insurer;
              dataPatch.policyType = params.policyType;
              dataPatch.policyTerm = params.policyTerm;
              dataPatch.existingHosPlan = params.existingHosPlan;
              dataPatch.typeOfHosCovered = params.typeOfHosCovered;
              dataPatch.classOfWardCovered = params.classOfWardCovered;
              dataPatch.purchaseYear = params.purchaseYear;
              dataPatch.premium = params.premium;
              dataPatch.medisave = params.medisave;
              dataPatch.frequency = params.frequency;
              dataPatch.sourceOfFund = params.sourceOfFund;
            })
          ),
        removeInsurance2: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfInsurance2?.length > 1) {
                const dataIndex = draft.summaryOfInsurance2.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfInsurance2.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfInsurance2[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.insured = "";
                dataReplace.insurer = "";
                dataReplace.policyType = "";
                dataReplace.policyTerm = "";
                dataReplace.existingHosPlan = "";
                dataReplace.typeOfHosCovered = "";
                dataReplace.classOfWardCovered = "";
                dataReplace.purchaseYear = 0;
                dataReplace.premium = 0;
                dataReplace.medisave = 0;
                dataReplace.frequency = "";
                dataReplace.sourceOfFund = 0;
              }
            })
          ),
        setSrs: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfSRS?.length) {
                let dataReplace = draft.summaryOfSRS[indexData];
                dataReplace.id = params.id;
                dataReplace.client = params.client;
                dataReplace.amount = params.amount;
              } else {
                draft.summaryOfSRS.push(params);
              }
            })
          ),
        patchSrs: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfSRS.find(
                (el: any) => el.id === params.id
              );

              dataPatch.client = params.client;
              dataPatch.amount = params.amount;
            })
          ),
        removeSrs: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfSRS?.length > 1) {
                const dataIndex = draft.summaryOfSRS.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfSRS.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfSRS[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.amount = 0;
              }
            })
          ),
        fetchLoan: (datas: SummaryOfLoans[]) =>
          set(
            produce((draft) => {
              let checkLengthLoan = get().summaryOfLoans?.length;

              if (datas.length > 0) {
                datas.map((param, index) => {
                  if (index === 0 && checkLengthLoan === 1) {
                    let dataReplace = draft.summaryOfLoans[index];
                    dataReplace.id = param.id;
                    dataReplace.editting = param.editting;
                    dataReplace.client = param.client;
                    dataReplace.typeOfLoan = param.typeOfLoan;
                    dataReplace.loanTerm = param.loanTerm;
                    dataReplace.yearOfLoanTaken = param.yearOfLoanTaken;
                    dataReplace.amountBorrowed = param.amountBorrowed;
                    dataReplace.loanStatus = param.loanStatus;
                    dataReplace.typeOfVehicle = param.typeOfVehicle;
                    dataReplace.currentOutstandingLoan =
                      param.currentOutstandingLoan;
                    dataReplace.lender = param.lender;
                    dataReplace.interestRate = param.interestRate;
                    dataReplace.monthlyLoanRepayment =
                      param.monthlyLoanRepayment;
                    dataReplace.clientPfr = param.clientPfr;
                  } else {
                    param["id"] = ++checkLengthLoan;
                    draft.summaryOfLoans.push(param);
                  }
                });
              }
            })
          ),
        setLoan: (indexData: number, params: any) =>
          set(
            produce((draft) => {
              if (indexData === 0 && get().summaryOfLoans?.length) {
                let dataReplace = draft.summaryOfLoans[indexData];
                dataReplace.id = params.id;
                dataReplace.editting = params.editting;
                dataReplace.client = params.client;
                dataReplace.typeOfLoan = params.typeOfLoan;
                dataReplace.loanTerm = params.loanTerm;
                dataReplace.yearOfLoanTaken = params.yearOfLoanTaken;
                dataReplace.amountBorrowed = params.amountBorrowed;
                dataReplace.loanStatus = params.loanStatus;
                dataReplace.typeOfVehicle = params.typeOfVehicle;
                dataReplace.currentOutstandingLoan =
                  params.currentOutstandingLoan;
                dataReplace.lender = params.lender;
                dataReplace.interestRate = params.interestRate;
                dataReplace.monthlyLoanRepayment = params.monthlyLoanRepayment;
                dataReplace.clientPfr = params.clientPfr;
              } else {
                draft.summaryOfLoans.push(params);
              }
            })
          ),
        patchLoan: (params: any) =>
          set(
            produce((draft) => {
              const dataPatch = draft.summaryOfSRS.find(
                (el: any) => el.id === params.id
              );
              dataPatch.client = params.client;
              dataPatch.typeOfLoan = params.typeOfLoan;
              dataPatch.loanTerm = params.loanTerm;
              dataPatch.yearOfLoanTaken = params.yearOfLoanTaken;
              dataPatch.amountBorrowed = params.amountBorrowed;
              dataPatch.loanStatus = params.loanStatus;
              dataPatch.typeOfVehicle = params.typeOfVehicle;
              dataPatch.currentOutstandingLoan = params.currentOutstandingLoan;
              dataPatch.lender = params.lender;
              dataPatch.interestRate = params.interestRate;
              dataPatch.monthlyLoanRepayment = params.monthlyLoanRepayment;
            })
          ),
        removeLoan: (params: any) =>
          set(
            produce((draft) => {
              if (get().summaryOfSRS?.length > 1) {
                const dataIndex = draft.summaryOfSRS.findIndex(
                  (el: any) => el.id === params
                );
                console.log("masuk disini");
                draft.summaryOfSRS.splice(dataIndex, 1);

                // reset index 0 dependent data
              } else {
                let dataReplace = draft.summaryOfSRS[0];
                dataReplace.id = 0;
                dataReplace.client = "";
                dataReplace.typeOfLoan = "";
                dataReplace.loanTerm = "";
                dataReplace.yearOfLoanTaken = 0;
                dataReplace.amountBorrowed = 0;
                dataReplace.loanStatus = "";
                dataReplace.typeOfVehicle = "";
                dataReplace.currentOutstandingLoan = 0;
                dataReplace.lender = "";
                dataReplace.interestRate = 0;
                dataReplace.monthlyLoanRepayment = 0;
              }
            })
          ),
        setGlobal: (name: string, value: any) =>
          set(
            produce((draft) => {
              draft[name] = value;
            })
          ),
        setToggle: (
          object: string,
          clientType: number,
          name: string,
          value: boolean
        ) =>
          set(
            produce((draft) => {
              let getObject = draft[object][clientType];
              getObject[name] = value;
            })
          ),
        removeData: (attribut: string, params: any) =>
          set(
            produce((draft) => {
              let data = draft[attribut];
              const dataIndex = data.findIndex((el: any) => el.id === params);
              data.splice(dataIndex, 1);
            })
          ),
        resetSectionTwo: () => {
          set(initialState);
        },
      }),
      {
        name: "section2",
      }
    )
  )
);

export const useExistingPortofolio = existingPortofolio;
