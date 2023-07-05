import { SectionSix } from "@/models/SectionSix";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actions = {};

const initialState: SectionSix = {
  id: 0,
  need: [],
  reason: [],
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
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ],
      investment: [],
      work: [],
    },
  ],
  outcome: [],
  outcomeChanged: true,
  issues: [],
  status: 0,
};

const customerKnowledgeAssesment = create(
  devtools<State & Actions>((set, get) => ({
    ...initialState,
  }))
);

export const useCustomerKnowledgeAssesment = customerKnowledgeAssesment;
