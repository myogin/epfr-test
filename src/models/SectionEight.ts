interface AssetOrSurplus {
  answer: string;
  reason: null | string;
}

interface MedisaveResource {
  fromExistingResources: boolean[];
  reasonForResources: null[];
  fromExistingResourcesForSingle: boolean[];
  reasonForResourcesForSingle: null[];
}

interface PayorBudget {
  selection: boolean;
  annual: number;
  single: number;
  sourceOfFund: null | string;
}

interface PayorDetail {
  isSelf: string;
  relationShip: null;
  payorName: null;
  passportNo: null;
  occupation: null;
  payorIncome: number;
}

interface SourceOfWealth {
  employment: boolean;
  investment: boolean;
  inheritance: boolean;
  other: boolean;
  otherExplain: null;
}

interface Section8 {
  typeClient: number;
  totalDependant: number;
  pfrId: number;
  need: string[];
  payorBudget: Array<PayorBudget[]>;
  payorDetail: PayorDetail[];
  assetOrSurplus: AssetOrSurplus[];
  sourceOfWealth: SourceOfWealth[];
  issues: any[];
  fromExistingResources: boolean[];
  reasonForResources: null[];
  fromExistingResourcesForSingle: boolean[];
  reasonForResourcesForSingle: null[];
  medisaveResource: MedisaveResource;
  status: number;
  editableStatus: number;
}

export interface SectionEight {
  section8: Section8;
}
