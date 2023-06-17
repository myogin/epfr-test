export const qa: Array<any> = [
  {
    id: 1,
    question: "1. What is your investment time horizon?",
    answers: [
      { score: 0, answer: "Less than 1 year" },
      { score: 1, answer: "1 to 3 years" },
      { score: 2, answer: "4 to 6 years" },
      { score: 3, answer: "7 to 9 years" },
      { score: 4, answer: "More than 10 years" },
    ],
  },
  {
    id: 2,
    question: "2. What is your age group?",
    answers: [
      { score: 0, answer: "65 and above" },
      { score: 1, answer: "55 to 54 years" },
      { score: 2, answer: "36 to 54 years" },
      { score: 3, answer: "35 and below" },
    ],
  },
  {
    id: 3,
    question:
      "3. If you were to contemplate an investment today, what percentage would that amount be in relation to your total savings and investments? (Total savings and investments include all assets you have in cash, bonds, unit trusts, stocks)",
    answers: [
      { score: 3, answer: "Less than 25%" },
      { score: 2, answer: "25% to 50%" },
      { score: 1, answer: "51% to 75%" },
      { score: 0, answer: "More than 75%" },
    ],
  },
  {
    id: 4,
    question:
      "4. Which statement best describes your investment knowledge / experience?",
    answers: [
      {
        score: 0,
        answer:
          "I have very little investment knowledge / experience about investments and financial markets",
      },
      {
        score: 1,
        answer:
          "I have a moderate level of investment knowledge / experience about investments and financial markets",
      },
      {
        score: 2,
        answer:
          "I have extensive investment knowledge / experience about investments and financial markets",
      },
    ],
  },
  {
    id: 5,
    question:
      "5. Is there a coming financial need which may require you to liquidate the investment being contemplated?. If so, what timeframe?",
    answers: [
      { score: 4, answer: "No" },
      { score: 3, answer: "Yes, more than 8 years" },
      { score: 2, answer: "Yes, between 5 to 8 years" },
      { score: 1, answer: "Yes, within 2 to 4 years" },
      { score: 0, answer: "Yes, within 12 months" },
    ],
  },
  {
    id: 6,
    question:
      "6. The value of investment may fluctuate over time. What percentage of decline in your investment portfolio are you able to accept in a 12-month period?",
    answers: [
      { score: -5, answer: "I will not be able to accept any losses." },
      { score: -3, answer: "3% to 5%" },
      { score: 0, answer: "6% to 9%" },
      { score: 3, answer: "10% to 20%" },
      { score: 5, answer: "More than 20%" },
    ],
  },
  {
    id: 7,
    question:
      "7. If the markets you are invested in face a sudden decline in value, what would be your most likely response?",
    answers: [
      {
        score: 0,
        answer: "Sell all the remaining investments avoid further losses.",
      },
      {
        score: 1,
        answer:
          "Sell a portion of the investments to protect some capital and hold on to the rest",
      },
      {
        score: 2,
        answer:
          "Hold on to the investments in the hope that the markets will recover",
      },
      {
        score: 3,
        answer: "Buy more of the investments now that prices are lower",
      },
    ],
  },
  {
    id: 8,
    question:
      "8. If you were to consider making an investment, what would your objective be?",
    answers: [
      {
        score: 0,
        answer:
          "Keep me hard earned money safe from potential downside risk and liquid so that I can draw upon it for shortterm needs.",
      },
      {
        score: 1,
        answer:
          "I want the investment to yield a steady stream of income to supplement my earning capacity. Growth is of a lesser priority than generating the income stream",
      },
      {
        score: 2,
        answer:
          "I want ther investment to generate a steady stream of income as well as capital growth. Both income and growth are equally important to me.",
      },
      {
        score: 3,
        answer:
          "I want to focus on growth of my investments. Generating an income stream is not an important consideration of the investments.",
      },
      {
        score: 4,
        answer:
          "I want to generate significant long-term growth for my investments. I understand that it will necessitate a higher proportion of the investment in equities.",
      },
    ],
  },
  {
    id: 9,
    question:
      "9. Different asset classes have different risk/return relationships. Which asset classes would you be most comfortable with?",
    answers: [
      {
        score: 0,
        answer: "Saving accounts, fixed deposits, money market instruments.",
      },
      { score: 1, answer: "Bonds" },
      {
        score: 2,
        answer:
          "Portfolio of Bonds + Equities OR Portfolio of Bond + Equity Mutual Funds",
      },
      { score: 3, answer: "Equities" },
      { score: 4, answer: "Options, futures, warrants" },
    ],
  },
];
