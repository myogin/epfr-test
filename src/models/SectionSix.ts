export interface SectionSix {
  id: number;
  need: boolean[];
  reason: any[];
  answers: Answer;
  outcome: boolean[];
  issues: any[];
  outcomeChanged: boolean;
  status: boolean;
}

export interface Answer {
  education: Array<boolean[]>;
  investment: boolean[];
  work: boolean[];
}
