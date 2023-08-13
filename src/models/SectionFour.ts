export interface SectionFour {
  id: number;
  need: Array<number>;
  reason: Array<string | undefined | null>;
  others: Others;
  issues: any[];
  status: number;
  totalCalc?: totalCalc;
  initData?: any;
  editableStatus?: number;
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
