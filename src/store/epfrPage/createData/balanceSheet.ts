import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { SectionFour } from "@/models/SectionFour";

const initialState: SectionFour = {
  id: 0,
  need: [0, 0],
  reason: [null, null],
  others: {
    asset: [],
    liability: [],
  },
  issues: [],
  status: 1,
  totalCalc: {
    asset: [0, 0],
    liability: [0, 0],
    network: [0, 0],
  },
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
};

const balanceSheet = (set: any, get: any) => ({
  ...initialState,
  addAsset: (data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset.push(data);
      })
    ),
  deleteAsset: (index: number) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset.splice(index, 1);
      })
    ),
  updateAsset: (index: number, data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.asset[index] = data;
      })
    ),
  addLiability: (data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability.push(data);
      })
    ),
  deleteLiability: (index: number) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability.splice(index, 1);
      })
    ),
  updateLiability: (index: number, data: any) =>
    set(
      produce((drafts: any) => {
        drafts.others.liability[index] = data;
      })
    ),
  calcTotal: (api?: any) =>
    set(
      produce((drafts: any) => {
        let newClientAsset: Array<number> = [0, 0];
        drafts.others.asset.forEach((e: any, i: any) => {
          e.otherValue.forEach((e2: any, i2: any) => {
            newClientAsset[i2] += parseInt(e2);
          });
        });
        drafts.totalCalc.asset = newClientAsset;

        let newClientLiability: Array<number> = [0, 0];
        drafts.others.liability.forEach((e: any, i: any) => {
          e.otherValue.forEach((e2: any, i2: any) => {
            newClientLiability[i2] += parseInt(e2);
          });
        });

        drafts.totalCalc.liability = newClientLiability;

        let client1Network =
          drafts.totalCalc.asset[0] + drafts.totalCalc.liability[0];
        let client2Network =
          drafts.totalCalc.asset[1] + drafts.totalCalc.liability[1];
        drafts.totalCalc.network = [client1Network, client2Network];
      })
    ),
  updateNeed: (client: number, value: number, pfrType: number) => {
    set(
      produce((drafts: any) => {
        drafts.need[client] = value;

        let validation = [0, 0];
        for (let index = 0; index < pfrType; index++) {
          if (drafts.need[index] === 1) {
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
          drafts.status = 1;
        } else {
          drafts.status = 0;
        }
      })
    );
  },
  updateReason: (client: number, reason: string, pfrType: number) => {
    set(
      produce((drafts: any) => {
        drafts.reason[client] = reason;
        let validation = [0, 0];
        for (let index = 0; index < pfrType; index++) {
          if (drafts.need[index] === 1) {
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
          drafts.status = 1;
        } else {
          drafts.status = 0;
        }
      })
    );
  },
});

export const useBalanceSheet = create(
  devtools(
    persist<SectionFour & Actions>(balanceSheet, {
      name: "sectionFourv2",
    })
  )
);
