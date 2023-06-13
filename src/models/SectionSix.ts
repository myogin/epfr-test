export interface SectionSix {
  id: number;
  need: boolean[];
  reason: any[];
  answers: Answer[];
  outcome: boolean[];
  issues: any[];
  outcomeChanged: boolean;
  status: number;
}

export interface Answer {
  education: boolean[];
  investment: boolean[];
  work: boolean[];
}
