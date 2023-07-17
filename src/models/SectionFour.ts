export interface SectionFour {
  id: number;
  need: Array<number>;
  reason: Array<string | null>;
  others: Others;
  issues: any[];
  status: number;
  totalCalc?: totalCalc;
}

export interface Others {
  asset: assetInterface[];
  liability: assetInterface[];
}

export interface assetInterface {
  key: string;
  otherValue: number[];
}

export interface totalCalc {
  asset: Array<number>;
  liability: Array<number>;
  network: Array<number>;
}
