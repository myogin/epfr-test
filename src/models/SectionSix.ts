export interface SectionSix {
  id: number;
  need: number[];
  reason: any[];
  answers: Array<Answer>;
  outcome: boolean[];
  issues: any[];
  outcomeChanged: boolean;
  status: number;
}

export interface Answer {
  education: Array<boolean[]>;
  investment: boolean[];
  work: boolean[];
}
