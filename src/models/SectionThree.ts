interface AnnualGeneral {
  editting: boolean;
  key: string;
  values: Array<any>;
}

interface AnnualIncome {
  annualGrossIncome: number;
  additionalWages: number;
  less: number;
  others: number;
}

interface AnnualExpanse {
  key: string;
  title: string;
  selected: boolean;
  values: Array<any>;
}

interface AnnualSurplus {
  annualSurplus: number;
}

interface Answers {
  state: string;
  answer: string;
}

interface Others {
  annualIncome: AnnualGeneral[];
  annualExpense: AnnualGeneral[];
}

interface Datas {
  annualIncome: AnnualIncome;
  annualSurplus: AnnualSurplus;
  answer: Answers;
  reasonForSurplus: any;
}

export interface SectionThree {
  id: number;
  need: Array<any>;
  reason: Array<any>;
  others: Others;
  data: Datas[];
  annualExpense: AnnualExpanse[];
  issues: Array<any>;
  totalNetSurplus: Array<any>;
  status: number;
}
