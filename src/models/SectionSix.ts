export interface SectionSix {
  id: number;
  need: boolean[];
  reason: Array<string | undefined | null>;
  answer: Array<Answer>;
  outcome: boolean[];
  issues: any[];
  outcomeChanged: boolean;
  status: number;
  editableStatus?: number;
}

export interface Answer {
  education: Array<boolean[]>;
  investment: boolean[];
  work: boolean[];
}
