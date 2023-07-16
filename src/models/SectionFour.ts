export interface SectionFour {
  id: number;
  need: boolean[];
  reason: string[];
  others: Others;
  issues: any[];
  status: number;
}

export interface Others {
  asset: assetInterface[];
  liability: assetInterface2[];
}

export interface assetInterface {
  key?: string;
  otherValue?: number[];
}

export interface assetInterface2 {
  key?: string;
  otherValue?: [number, number];
}
