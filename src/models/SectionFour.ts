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
  liability: assetInterface[];
}

export interface assetInterface {
  key?: string;
  otherValue?: number[];
}
