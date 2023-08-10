export interface AnnualGeneral {
  id?: number;
  editting: boolean;
  key: string;
  values: Array<any>;
}

export interface AnnualIncome {
  annualGrossIncome: number;
  additionalWages: number;
  less: number;
  others: number;
}

export interface AnnualExpanse {
  key: string;
  title: string;
  selected: boolean;
  values: Array<any>;
}

export interface AnnualSurplus {
  annualSurplus: number;
}

export interface Answers {
  state: number;
  answer: string;
}

export interface Others {
  annualIncome: AnnualGeneral[];
  annualExpense: AnnualGeneral[];
}

export interface Datas {
  id?: number;
  annualIncome: AnnualIncome;
  annualSurplus: AnnualSurplus;
  answer: Answers;
  reasonForSurplus?: any;
}

export interface SectionThree {
  id?: number;
  need?: Array<any>;
  reason?: Array<any>;
  others: Others;
  data: Datas[];
  annualExpense: AnnualExpanse[];
  issues?: Array<any>;
  totalNetSurplus?: Array<any>;
  status?: number;
  editableStatus?: number;
}