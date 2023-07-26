import { SectionSix } from "@/models/SectionSix";
import { create } from "zustand";
import { produce } from "immer";
import { devtools, persist } from "zustand/middleware";

function validate(drafts: any, pfrType: number): number {
  let validateAnswer = [false, false];
  const isFalse = (currentValue: any) => currentValue == false;

  // update status
  for (let index = 0; index < pfrType; index++) {
    if (drafts.need[index]) {
      if (
        drafts.answers[index].education[0].every(isFalse) ||
        drafts.answers[index].education[1].every(isFalse) ||
        drafts.answers[index].investment.every(isFalse) ||
        drafts.answers[index].work.every(isFalse)
      ) {
        validateAnswer[index] = false;
      } else {
        validateAnswer[index] = true;
      }
    }
  }

  if (pfrType == 1) {
    if (!drafts.need[0] && drafts.reason[0] != "") {
      return 1;
    } else {
      if (validateAnswer[0]) {
        return 1;
      }
      return 0;
    }
  } else {
    if (drafts.need.every((e: any) => e == true)) {
      if (validateAnswer.every((e) => e == true)) {
        return 1;
      } else {
        return 0;
      }
    } else if (drafts.need[0]) {
      if (!validateAnswer[0] || drafts.reason[1] == "") {
        return 0;
      } else {
        return 1;
      }
    } else if (drafts.need[1]) {
      if (!validateAnswer[1] || drafts.reason[0] == "") {
        return 0;
      } else {
        return 1;
      }
    } else {
      return validateNeed(drafts, pfrType);
    }
  }
}
function validateNeed(drafts: any, pfrType: number) {
  let validation = [0, 0];
  for (let index = 0; index < pfrType; index++) {
    if (drafts.need[index] === false) {
      if (
        drafts.reason[index] == "" ||
        drafts.reason[index] == undefined ||
        drafts.reason[index] == null
      ) {
        validation[index] = 0;
      } else {
        validation[index] = 1;
      }
    } else {
      validation[index] = 1;
    }
  }
  if (validation.every((e) => e == 1)) {
    return 1;
  } else {
    return 0;
  }
}
const initialState: SectionSix = {
  id: 0,
  need: [true, true],
  reason: [null, null],
  answers: [
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
  updateEducation: (
    user: number,
    education: number,
    question: number,
    pfrType: number
  ) => any;
  updateInvestment: (user: number, question: number, pfrType: number) => any;
  updateWork: (user: number, question: number, pfrType: number) => any;
  updateNeed: (client: number, value: boolean, pfrType: number) => any;
  updateReason: (client: number, reason: string, pfrType: number) => any;
};
const customerKnowledgeAssesment = (set: any, get: any) => ({
  ...initialState,
  updateEducation: (
    user: number,
    education: number,
    question: number,
    pfrType: number
  ) =>
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
        drafts.status = validate(drafts, pfrType);
      })
    ),
  updateInvestment: (user: number, question: number, pfrType: number) =>
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
        drafts.status = validate(drafts, pfrType);
      })
    ),
  updateWork: (user: number, question: number, pfrType: number) =>
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
        drafts.status = validate(drafts, pfrType);
      })
    ),
  updateNeed: (client: number, value: boolean, pfrType: number) => {
    set(
      produce((drafts: any) => {
        drafts.need[client] = !value;
        drafts.status = validate(drafts, pfrType);
      })
    );
  },
  updateReason: (client: number, reason: string, pfrType: number) => {
    set(
      produce((drafts: any) => {
        drafts.reason[client] = reason;
        drafts.status = validate(drafts, pfrType);
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
