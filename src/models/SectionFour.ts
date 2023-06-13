export interface SectionFour {
  id: number;
  need: boolean[];
  reason: string[];
  others: Others;
  issues: any[];
  status: number;
}

export interface Others {
  asset: any[];
  liability: any[];
}
