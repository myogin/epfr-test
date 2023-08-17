import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { SectionFour } from "@/models/SectionFour";

function validate(drafts: any, pfrType: number): number {
  if (pfrType == 1) {
    if (
      drafts.need[0] == 0 &&
      (drafts.reason[0] == "" ||
        drafts.reason[0] == undefined ||
        drafts.reason[0] == null)
    ) {
      return 0;
    } else {
      return 1;
    }
  } else {
    return validateNeed(drafts, pfrType);
  }
}
function validateNeed(drafts: any, pfrType: number) {
  let validation = [0, 0];
  for (let index = 0; index < pfrType; index++) {
    if (drafts.need[index] === 0) {
      if (
        drafts.reason[index] == "" ||
        drafts.reason[index] == undefined ||
        drafts.reason[index] == null
      ) {
        validation[index] = 0;
      } else {
        validation[index] = 1;
      }
    } else {
      validation[index] = 1;
    }
  }
  if (validation.every((e) => e == 1)) {
    return 1;
  } else {
    return 0;
  }
}

class assets {
  property = {
    residence: 0,
    investment: 0,
  };
  investments = {
    bonds: 0,
    unitTrusts: 0,
    stockShares: 0,
    others: 0,
  };
  savings = {
    bankSavingAccount: 0,
    fixedDeposits: 0,
  };
  cpf = {
    ordinaryAccount: 0,
    specialAccount: 0,
    medisave: 0,
    retirementAccount: 0,
  };
  insurance = {
    cachValue: 0,
  };
  srs = {
    accountBalance: 0,
  };
}

class liabilities {
  housing = 0;
  vehicle = 0;
  renovation = 0;
  education = 0;
  creditCard = 0;
  personalLoan = 0;
  overdraft = 0;
}

const initialState: SectionFour = {
  id: 0,
  need: [1, 1],
  reason: [null, null],
  others: {
    asset: [],
    liability: [],
  },
  issues: [],
  status: 1,
  initData: {
    assets: [new assets(), new assets()],
    liabilities: [new liabilities(), new liabilities()],
  },
  totalCalc: {
    asset: [0, 0],
    liability: [0, 0],
    network: [0, 0],
  },
  editableStatus: 0,
};

type Actions = {
  addAsset: (data: any) => any;
  deleteAsset: (index: number) => any;
  updateAsset: (index: number, data: any) => any;
  addLiability: (data: any) => any;
  deleteLiability: (index: number) => any;
  updateLiability: (index: number, data: any) => any;
  calcTotal: (api?: any) => any;
  updateNeed: (client: number, value: number, pfrType: number) => any;
  updateReason: (client: number, reason: string, pfrType: number) => any;
  updateID: (id: any) => any;
  setGlobal: (name: string, value: any) => any;
  fetchAsset: (fetchData: any) => any;
  fetchLiability: (fetchData: any) => any;
  resetSectionFour: () => any;
  fetchInitData: (fetchData: any) => any;
};

const balanceSheet = (set: any, get: any) => ({
  ...initialState,
  addAsset: (data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset.push(data);
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    ),
  deleteAsset: (index: number) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset.splice(index, 1);
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    ),
  updateAsset: (index: number, data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset[index] = data;
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    ),
  addLiability: (data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability.push(data);
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    ),
  deleteLiability: (index: number) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability.splice(index, 1);
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    ),
  updateLiability: (index: number, data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability[index] = data;
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    ),
  calcTotal: (api?: any) =>
    set(
      produce((drafts: any) => {
        // calc fetchData assets
        let assetsData: Array<number> = [0, 0];
        drafts.initData.assets.forEach((e: any, i: any) => {
          assetsData[i] =
            e.property.residence +
            e.property.investment +
            e.investments.bonds +
            e.investments.unitTrusts +
            e.investments.stockShares +
            e.investments.others +
            e.savings.bankSavingAccount +
            e.savings.fixedDeposits +
            e.cpf.ordinaryAccount +
            e.cpf.specialAccount +
            e.cpf.medisave +
            e.cpf.retirementAccount +
            e.srs.accountBalance;
        });

        // calc fetchData assets
        let liabilitiesData: Array<number> = [0, 0];
        drafts.initData.liabilities.forEach((e: any, i: any) => {
          liabilitiesData[i] =
            e.housing +
            e.vehicle +
            e.renovation +
            e.education +
            e.creditCard +
            e.personalLoan +
            e.overdraft;
        });

        // calc newAssets(Other(s))
        let newClientAsset: Array<number> = [0, 0];
        drafts.others.asset.forEach((e: any, i: any) => {
          e.otherValue.forEach((e2: any, i2: any) => {
            newClientAsset[i2] += parseInt(e2);
          });
        });
        // merge fetch asset and newAssets(Other(s))
        let newTotalAsset: Array<number> = [0, 0];
        newTotalAsset.forEach((e: any, i: any) => {
          newTotalAsset[i] = assetsData[i] + newClientAsset[i];
        });
        drafts.totalCalc.asset = newTotalAsset;

        // calc newLiabilites(Other(s))
        let newClientLiability: Array<number> = [0, 0];
        drafts.others.liability.forEach((e: any, i: any) => {
          e.otherValue.forEach((e2: any, i2: any) => {
            newClientLiability[i2] += parseInt(e2);
          });
        });

        // merge fetch liabilities and newLiabilites(Other(s))
        let newTotalLiability: Array<number> = [0, 0];
        newTotalLiability.forEach((e: any, i: any) => {
          newTotalLiability[i] = liabilitiesData[i] + newClientLiability[i];
        });
        drafts.totalCalc.liability = newTotalLiability;

        let client1Network =
          drafts.totalCalc.asset[0] - drafts.totalCalc.liability[0];
        let client2Network =
          drafts.totalCalc.asset[1] - drafts.totalCalc.liability[1];
        drafts.totalCalc.network = [client1Network, client2Network];
      })
    ),
  updateNeed: (client: number, value: number, pfrType: number) => {
    set(
      produce((drafts: any) => {
        drafts.need[client] = value;
        drafts.status = validate(drafts, pfrType);
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    );
  },
  updateReason: (client: number, reason: string, pfrType: number) => {
    set(
      produce((drafts: any) => {
        drafts.reason[client] = reason;
        drafts.status = validate(drafts, pfrType);
        if (get().editableStatus === 1 && get().status === 1) {
          drafts.editableStatus = 2;
        }
      })
    );
  },
  updateID: (id: any) => {
    set(
      produce((drafts: any) => {
        drafts.id = parseInt(id);
      })
    );
  },
  setGlobal: (name: string, value: any) =>
    set(
      produce((draft: any) => {
        draft[name] = value;
      })
    ),
  fetchAsset: (fetchData: any) =>
    set(
      produce((drafts: any) => {
        let getAsset: any = [];
        fetchData.map((el: any) => {
          getAsset.push({
            key: el.key,
            otherValue: [el.value1, el.value2],
          });
        });
        drafts.others.asset = getAsset;
      })
    ),
  fetchLiability: (fetchData: any) =>
    set(
      produce((drafts: any) => {
        let getLiability: any = [];
        fetchData.map((el: any) => {
          getLiability.push({
            key: el.key,
            otherValue: [el.value1, el.value2],
          });
        });
        drafts.others.liability = getLiability;
      })
    ),
  fetchInitData: (fetchData: any) =>
    set(
      produce((drafts: any) => {
        // fetch assets property
        let properties = fetchData.summaryOfProperty;
        properties.forEach((property: any) => {
          let clientId = Number(property.client);
          let propertyId = property.typeOfProperty;

          if (propertyId == 0) {
            drafts.initData.assets[clientId].property.residence = Number(
              property.sum
            );
          } else {
            drafts.initData.assets[clientId].property.investment = Number(
              property.sum
            );
          }
        });

        // fetch assets investment
        let investments = fetchData.summaryOfInvestment;

        investments.forEach((investment: any) => {
          let clientId = Number(investment.client);
          let propertyId = Number(investment.type);

          if (propertyId == 0) {
            drafts.initData.assets[clientId].investments.bonds = Number(
              investment.sum
            );
          }
          if (propertyId == 1) {
            drafts.initData.assets[clientId].investments.unitTrusts = Number(
              investment.sum
            );
          }
          if (propertyId == 2) {
            drafts.initData.assets[clientId].investments.stockShares = Number(
              investment.sum
            );
          }
          if (propertyId == 3) {
            drafts.initData.assets[clientId].investments.others = Number(
              investment.sum
            );
          }
        });

        // fetch assets Savings
        let savings = fetchData.summaryOfSaving;
        savings.forEach((saving: any) => {
          let clientId = Number(saving.client);
          let property = Number(saving.type);
          switch (property) {
            case 0:
              drafts.initData.assets[clientId].savings.bankSavingAccount =
                Number(saving.sum);
              break;
            case 1:
              drafts.initData.assets[clientId].savings.fixedDeposits = Number(
                saving.sum
              );
              break;
          }
        });

        // fetch assets CPF
        let cpfs = fetchData.summaryOfCPF;
        cpfs.forEach((cpf: any) => {
          let clientId = Number(cpf.client);
          drafts.initData.assets[clientId].cpf.ordinaryAccount = Number(
            cpf.ordinary
          );
          drafts.initData.assets[clientId].cpf.specialAccount = Number(
            cpf.special
          );
          drafts.initData.assets[clientId].cpf.medisave = Number(cpf.medisave);
          drafts.initData.assets[clientId].cpf.retirementAccount = Number(
            cpf.retirement
          );
        });

        // fetch assets SRS
        let srss = fetchData.summaryOfSRS;
        srss.forEach((srs: any) => {
          let clientId = Number(srs.client);
          drafts.initData.assets[clientId].srs.accountBalance = Number(srs.sum);
        });

        // fetch liabilities Loans
        let loans = fetchData.summaryOfLoans;
        loans.forEach((loan: any) => {
          let clientId = Number(loan.client);
          let type = Number(loan.typeOfLoan);
          switch (type) {
            //case 0 : drafts.initData.liabilities[clientId].housing = Number(loan.sum); break;
            case 1:
              drafts.initData.liabilities[clientId].vehicle = Number(loan.sum);
              break;
            case 2:
              drafts.initData.liabilities[clientId].renovation = Number(
                loan.sum
              );
              break;
            case 3:
              drafts.initData.liabilities[clientId].education = Number(
                loan.sum
              );
              break;
            case 4:
              drafts.initData.liabilities[clientId].creditCard = Number(
                loan.sum
              );
              break;
            case 5:
              drafts.initData.liabilities[clientId].personalLoan = Number(
                loan.sum
              );
              break;
            case 6:
              drafts.initData.liabilities[clientId].overdraft = Number(
                loan.sum
              );
              break;
          }
        });

        // fetch liabilities loans hoasing
        let outstanding = fetchData.summaryOfOutstanding;

        outstanding.forEach((property: any) => {
          let clientId = Number(property.client);
          drafts.initData.liabilities[clientId].housing = Number(
            property["sum"]
          );
        });
      })
    ),
  resetSectionFour: () => {
    set(initialState);
  },
});

export const useBalanceSheet = create(
  devtools(
    persist<SectionFour & Actions>(balanceSheet, {
      name: "section4",
    })
  )
);
