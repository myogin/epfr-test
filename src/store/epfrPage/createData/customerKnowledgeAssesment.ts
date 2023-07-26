import { SectionSix } from "@/models/SectionSix";
import { create } from "zustand";
import { produce } from "immer";
import { devtools, persist } from "zustand/middleware";

const initialState: SectionSix = {
  id: 0,
  need: [0, 0],
  reason: [undefined, undefined],
  answers: [
    {
      education: [
        [
          true,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ],
      investment: [false, false, false],
      work: [false, false, false, false, false, false, false],
    },
    {
      education: [
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ],
      investment: [false, false, false],
      work: [false, false, false, false, false, false, false],
    },
  ],
  outcome: [],
  outcomeChanged: true,
  issues: [],
  status: 0,
};

type Actions = {
  updateEducation: (user: number, education: number, question: number) => any;
  updateInvestment: (user: number, question: number) => any;
  updateWork: (user: number, question: number) => any;
  updateNeed: (client: number, value: number) => any;
  updateReason: (client: number, reason: string) => any;
};
const customerKnowledgeAssesment = (set: any, get: any) => ({
  ...initialState,
  updateEducation: (user: number, education: number, question: number) =>
    set(
      produce((drafts: any) => {
        if (
          (education === 0 && question === 11) ||
          (education === 1 && question === 10)
        ) {
          if (drafts.answers[user].education[education][question] === false) {
            drafts.answers[user].education[education] = drafts.answers[
              user
            ].education[education].map(() => {
              return false;
            });
          }
        }
        if (education === 0 && question !== 11) {
          if (drafts.answers[user].education[education][question] != true) {
            drafts.answers[user].education[education][11] = false;
          }
        }
        if (education === 1 && question !== 10) {
          if (drafts.answers[user].education[education][question] != true) {
            drafts.answers[user].education[education][10] = false;
          }
        }

        drafts.answers[user].education[education][question] =
          !drafts.answers[user].education[education][question];
      })
    ),
  updateInvestment: (user: number, question: number) =>
    set(
      produce((drafts: any) => {
        if (question === 2) {
          if (drafts.answers[user].investment[question] === false) {
            drafts.answers[user].investment = drafts.answers[
              user
            ].investment.map(() => {
              return false;
            });
          }
        }
        if (question !== 2) {
          if (drafts.answers[user].investment[question] != true) {
            drafts.answers[user].investment[2] = false;
          }
        }
        drafts.answers[user].investment[question] =
          !drafts.answers[user].investment[question];
      })
    ),
  updateWork: (user: number, question: number) =>
    set(
      produce((drafts: any) => {
        if (question === 6) {
          if (drafts.answers[user].work[question] === false) {
            drafts.answers[user].work = drafts.answers[user].work.map(() => {
              return false;
            });
          }
        }
        if (question !== 6) {
          if (drafts.answers[user].work[question] != true) {
            drafts.answers[user].work[6] = false;
          }
        }
        drafts.answers[user].work[question] =
          !drafts.answers[user].work[question];
      })
    ),
  updateNeed: (client: number, value: number) => {
    set(
      produce((drafts: any) => {
        drafts.need[client] = value;
      })
    );
  },
  updateReason: (client: number, reason: string) => {
    set(
      produce((drafts: any) => {
        drafts.reason[client] = reason;
      })
    );
  },
});
export const useCustomerKnowledgeAssesment = create(
  devtools(
    persist<SectionSix & Actions>(customerKnowledgeAssesment, {
      name: "section6New",
    })
  )
);
