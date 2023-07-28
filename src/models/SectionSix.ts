export interface SectionSix {
  id: number;
  need: boolean[];
  reason: Array<string | undefined | null>;
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
