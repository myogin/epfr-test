export const qa: Array<any> = [
  {
    id: 1,
    question: "1. What is your investment time horizon?",
    answers: [
      { score: 0, answer: "Less than 1 year", u1: false, u2: false },
      { score: 1, answer: "1 to 3 years", u1: false, u2: false },
      { score: 2, answer: "4 to 6 years", u1: false, u2: false },
      { score: 3, answer: "7 to 9 years", u1: false, u2: false },
      { score: 4, answer: "More than 10 years", u1: false, u2: false },
    ],
  },
  {
    id: 2,
    question: "2. What is your age group?",
    answers: [
      { score: 0, answer: "65 and above", u1: false, u2: false },
      { score: 1, answer: "55 to 54 years", u1: false, u2: false },
      { score: 2, answer: "36 to 54 years", u1: false, u2: false },
      { score: 3, answer: "35 and below", u1: false, u2: false },
    ],
  },
  {
    id: 3,
    question:
      "3. If you were to contemplate an investment today, what percentage would that amount be in relation to your total savings and investments? (Total savings and investments include all assets you have in cash, bonds, unit trusts, stocks)",
    answers: [
      { score: 3, answer: "Less than 25%", u1: false, u2: false },
      { score: 2, answer: "25% to 50%", u1: false, u2: false },
      { score: 1, answer: "51% to 75%", u1: false, u2: false },
      { score: 0, answer: "More than 75%", u1: false, u2: false },
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
        u1: false,
        u2: false,
      },
      {
        score: 1,
        answer:
          "I have a moderate level of investment knowledge / experience about investments and financial markets",
        u1: false,
        u2: false,
      },
      {
        score: 2,
        answer:
          "I have extensive investment knowledge / experience about investments and financial markets",
        u1: false,
        u2: false,
      },
    ],
  },
  {
    id: 5,
    question:
      "5. Is there a coming financial need which may require you to liquidate the investment being contemplated?. If so, what timeframe?",
    answers: [
      { score: 4, answer: "No", u1: false, u2: false },
      { score: 3, answer: "Yes, more than 8 years", u1: false, u2: false },
      { score: 2, answer: "Yes, between 5 to 8 years", u1: false, u2: false },
      { score: 1, answer: "Yes, within 2 to 4 years", u1: false, u2: false },
      { score: 0, answer: "Yes, within 12 months", u1: false, u2: false },
    ],
  },
  {
    id: 6,
    question:
      "6. The value of investment may fluctuate over time. What percentage of decline in your investment portfolio are you able to accept in a 12-month period?",
    answers: [
      {
        score: -5,
        answer: "I will not be able to accept any losses.",
        u1: false,
        u2: false,
      },
      { score: -3, answer: "3% to 5%", u1: false, u2: false },
      { score: 0, answer: "6% to 9%", u1: false, u2: false },
      { score: 3, answer: "10% to 20%", u1: false, u2: false },
      { score: 5, answer: "More than 20%", u1: false, u2: false },
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
        u1: false,
        u2: false,
      },
      {
        score: 1,
        answer:
          "Sell a portion of the investments to protect some capital and hold on to the rest",
        u1: false,
        u2: false,
      },
      {
        score: 2,
        answer:
          "Hold on to the investments in the hope that the markets will recover",
        u1: false,
        u2: false,
      },
      {
        score: 3,
        answer: "Buy more of the investments now that prices are lower",
        u1: false,
        u2: false,
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
        u1: false,
        u2: false,
      },
      {
        score: 1,
        answer:
          "I want the investment to yield a steady stream of income to supplement my earning capacity. Growth is of a lesser priority than generating the income stream",
        u1: false,
        u2: false,
      },
      {
        score: 2,
        answer:
          "I want ther investment to generate a steady stream of income as well as capital growth. Both income and growth are equally important to me.",
        u1: false,
        u2: false,
      },
      {
        score: 3,
        answer:
          "I want to focus on growth of my investments. Generating an income stream is not an important consideration of the investments.",
        u1: false,
        u2: false,
      },
      {
        score: 4,
        answer:
          "I want to generate significant long-term growth for my investments. I understand that it will necessitate a higher proportion of the investment in equities.",
        u1: false,
        u2: false,
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
        u1: false,
        u2: false,
      },
      { score: 1, answer: "Bonds", u1: false, u2: false },
      {
        score: 2,
        answer:
          "Portfolio of Bonds + Equities OR Portfolio of Bond + Equity Mutual Funds",
        u1: false,
        u2: false,
      },
      { score: 3, answer: "Equities", u1: false, u2: false },
      { score: 4, answer: "Options, futures, warrants", u1: false, u2: false },
    ],
  },
];

export const calcRiskCapacity = (data: Array<Array<number>>) => {
  let totalRiskCapacity = [0, 0, 0, 0];

  totalRiskCapacity = totalRiskCapacity.map((e, i) => {
    if (i === 0) {
      let total1 = 0;
      for (let i = 0; i < 5; i++) {
        if (data[0][i] !== undefined && data[0][i] !== -100) {
          total1 += data[0][i];
        }
      }
      return total1;
    } else if (i === 1) {
      let total2 = 0;
      for (let i = 0; i < 5; i++) {
        if (data[1][i] !== undefined && data[1][i] !== -100) {
          total2 += data[1][i];
        }
      }
      return total2;
    }
    return e;
  });

  return totalRiskCapacity;
};

export const calcRiskAttitude = (data: Array<Array<number>>) => {
  let totalRiskAttitude = [0, 0, 0, 0];

  totalRiskAttitude = totalRiskAttitude.map((e, i) => {
    if (i === 0) {
      let total1 = 0;
      for (let i = 5; i < 9; i++) {
        if (data[0][i] !== undefined && data[0][i] !== -100) {
          total1 += data[0][i];
        }
        data[0][i];
      }
      return total1;
    } else if (i === 1) {
      let total2 = 0;
      for (let i = 5; i < 9; i++) {
        if (data[1][i] !== undefined && data[1][i] !== -100) {
          total2 += data[1][i];
        }
      }
      return total2;
    }
    return e;
  });

  return totalRiskAttitude;
};

export const getStatusRiskCapacity = (riskCapacity: Array<number>) => {
  let statusRiskCapacity = ["Capital Preservation", "Capital Preservation"];
  statusRiskCapacity = statusRiskCapacity.map((e, i) => {
    if (riskCapacity[i] <= 3) {
      return "Capital Preservation";
    } else if (riskCapacity[i] >= 4 && riskCapacity[i] <= 7) {
      return "Conservative";
    } else if (riskCapacity[i] >= 8 && riskCapacity[i] <= 10) {
      return "Balanced";
    } else if (riskCapacity[i] >= 11 && riskCapacity[i] <= 14) {
      return "Growth";
    } else {
      return "Aggresive";
    }
  });
  return statusRiskCapacity;
};
export const getStatusRiskAttitude = (riskAttitude: Array<number>) => {
  let statusRiskAttitude = ["Capital Preservation", "Capital Preservation"];
  statusRiskAttitude = statusRiskAttitude.map((e, i) => {
    if (riskAttitude[i] <= 0) {
      return "Capital Preservation";
    } else if (riskAttitude[i] >= 1 && riskAttitude[i] <= 5) {
      return "Conservative";
    } else if (riskAttitude[i] >= 6 && riskAttitude[i] <= 10) {
      return "Balanced";
    } else if (riskAttitude[i] >= 11 && riskAttitude[i] <= 14) {
      return "Growth";
    } else {
      return "Aggresive";
    }
  });
  return statusRiskAttitude;
};

export const getResultStatus = (
  riskCapacity: Array<number>,
  riskAttitude: Array<number>
) => {
  let resultStatus = ["Capital Preservation", "Capital Preservation"];
  resultStatus = resultStatus.map((e, i) => {
    return (e = calcResult(
      capacityLevel(riskCapacity[i]),
      attitudeLevel(riskAttitude[i])
    ));
  });

  return resultStatus;
};

const capacityLevel = (capacity: number) => {
  if (capacity <= 3) {
    return 0;
  } else if (capacity >= 4 && capacity <= 7) {
    return 1;
  } else if (capacity >= 8 && capacity <= 10) {
    return 2;
  } else if (capacity >= 11 && capacity <= 14) {
    return 3;
  } else {
    return 4;
  }
};

const attitudeLevel = (attitude: number) => {
  if (attitude <= 0) {
    return 0;
  } else if (attitude >= 1 && attitude <= 5) {
    return 1;
  } else if (attitude >= 6 && attitude <= 10) {
    return 2;
  } else if (attitude >= 11 && attitude <= 14) {
    return 3;
  } else {
    return 4;
  }
};

const calcResult = (riskCapacity: number, riskAttitude: number) => {
  let min = Math.min(riskCapacity, riskAttitude);
  if (min === 0) {
    return "Capital Preservation";
  } else if (min === 1) {
    return "Conservative";
  } else if (min === 2) {
    return "Balanced";
  } else if (min === 3) {
    return "Growth";
  } else {
    return "Aggresive";
  }
};
