import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import TitleSmall from "@/components/Attributes/Typography/TitleSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SectionFive } from "@/models/SectionFive";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import { log } from "console";
import React, { useState, useRef, useEffect, Fragment } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import {
  qa,
  calcRiskCapacity,
  calcRiskAttitude,
  getStatusRiskCapacity,
  getStatusRiskAttitude,
  getResultStatus,
} from "./data/questions";
import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import { getLength } from "@/libs/helper";
import HeadingSecondaryDynamicGrid from "@/components/Attributes/Sections/HeadingSecondaryDynamicGrid";
import RowSingleORDouble from "@/components/Attributes/Rows/Grids/RowSingleORDouble";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import { getPfrStep, postPfrSections } from "@/services/pfrService";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import { useRouter } from "next/router";
import LoadingPage from "@/components/Attributes/Loader/LoadingPage";
interface Props {
  id?: any;
  pfrType: number;
}
function checkValidate(data: any, user: any) {
  let required = true;

  if (user == 0) {
    data.map((el: any) => {
      if (el.u1 == true) {
        required = false;
      }
    });
  } else if (user == 1) {
    data.map((el: any) => {
      if (el.u2 == true) {
        required = false;
      }
    });
  }

  return required;
}
const RiskProfile = (props: Props) => {
  const [notReviewAll, setNotReviewAll] = useState(false);

  const router = useRouter();
  const scrollPosition = useScrollPosition(5);

  const [sectionFive, setSectionFive] = useState<SectionFive>({
    id: 0,
    need: [1, 1],
    reason: [null, null],
    answers: [
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
      [-100, -100, -100, -100, -100, -100, -100, -100, -100],
    ],
    riskCapacity: [0, 0, 0, 0],
    riskAttitude: [0, 0, 0, 0],
    issues: [],
    status: 0,
    editableStatus: 0,
  });
  // update status
  useEffect(() => {
    let newStatus = 0;
    let user1 = false;
    let user2 = false;
    if (sectionFive.need[0] == 1) {
      const isBelowThreshold = (currentValue: any) => currentValue > -100;

      user1 = sectionFive.answers[0].every(isBelowThreshold);
    } else if (
      (sectionFive.need[0] == 0 && sectionFive.reason[0] != "") ||
      sectionFive.reason[0] != null ||
      sectionFive.reason[0] != undefined
    ) {
      user1 = true;
    } else {
      user1 = false;
    }

    if (sectionFive.need[1] == 1) {
      const isBelowThreshold = (currentValue: any) => currentValue > -100;

      user2 = sectionFive.answers[1].every(isBelowThreshold);
    } else if (
      sectionFive.need[1] == 0 &&
      sectionFive.reason[1] != "" &&
      sectionFive.reason[1] != null &&
      sectionFive.reason[1] != undefined
    ) {
      user2 = true;
    } else {
      user2 = false;
    }
    // check if single or join

    if (props.pfrType > 1) {
      if (user1 && user2) {
        newStatus = 1;
      } else {
        newStatus = 0;
      }
    } else {
      if (user1) {
        newStatus = 1;
      } else {
        newStatus = 0;
      }
    }
    setSectionFive((el) => {
      return { ...el, status: newStatus };
    });
  }, [
    sectionFive.answers,
    sectionFive.need,
    sectionFive.reason,
    props.pfrType,
  ]);
  if (typeof window !== "undefined") {
    localStorage.setItem("section5", JSON.stringify(sectionFive));
  }
  let getPfrLength = getLength(props.pfrType);
  // handle input change / state change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setSectionFive((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const updateNeed = (value: number, user: number) => {
    let prevNeed = sectionFive.need;
    let newValue = 0;
    value == 1 ? (newValue = 0) : (newValue = 1);
    prevNeed[user] = newValue;
    setSectionFive((prevState) => {
      return { ...prevState, ["need"]: prevNeed };
    });
  };

  const updateReason = (value: any, user: number) => {
    let prevReason = sectionFive.reason;

    prevReason[user] = value;
    setSectionFive((prevState) => {
      return { ...prevState, ["reason"]: prevReason };
    });
  };

  function finalAnswer(
    statusQ: boolean,
    score: number,
    user: number,
    question: number
  ) {
    const tempAnswer = sectionFive.answers[user];
    statusQ ? (tempAnswer[question] = score) : (tempAnswer[question] = -100);
    let newAnswer;
    if (user === 0) {
      newAnswer = [tempAnswer, ...sectionFive.answers.slice(1)];
    } else {
      newAnswer = [
        ...sectionFive.answers.slice(0, 1),
        tempAnswer,
        ...sectionFive.answers.slice(2),
      ];
    }

    return newAnswer;
  }

  const updateAnswersState = (
    statusQ: boolean,
    score: number,
    user: number,
    question: number
  ) => {
    setSectionFive((pre) => {
      return {
        ...pre,
        answers: finalAnswer(statusQ, score, user, question),
      };
    });
  };

  const [riskCapacity, setRiskCapacity] = useState<number[]>([0, 0, 0, 0]);
  const [riskAttitude, setRiskAttitude] = useState<number[]>([0, 0, 0, 0]);

  const [statusRiskCapacity, setStatusRiskCapacity] = useState<string[]>([
    "Capital Preservation",
    "Capital Preservation",
  ]);

  const [statusRiskAttitude, setStatusRiskAttitude] = useState<string[]>([
    "Capital Preservation",
    "Capital Preservation",
  ]);

  const [resultAttitude, setResultAttitude] = useState<string[]>([
    "Capital Preservation",
    "Capital Preservation",
  ]);

  useEffect(() => {
    // run something every time sectionFive.answers changes
    setRiskCapacity(calcRiskCapacity(sectionFive.answers));
    setRiskAttitude(calcRiskAttitude(sectionFive.answers));
  }, [sectionFive.answers]);

  useEffect(() => {
    setSectionFive((pre: any) => {
      return {
        ...pre,
        riskCapacity: riskCapacity,
      };
    });
    setSectionFive((pre: any) => {
      return {
        ...pre,
        riskAttitude: riskAttitude,
      };
    });
    setStatusRiskCapacity(getStatusRiskCapacity(riskCapacity));
    setStatusRiskAttitude(getStatusRiskAttitude(riskAttitude));

    setResultAttitude(getResultStatus(riskCapacity, riskAttitude));
  }, [riskCapacity, riskAttitude]);

  // end handle q1-9state

  const [q0State, setQ0State] = useState(qa[0].answers);

  const handleQ0Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q0State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q0State[index].u1 };
          } else {
            return { ...item, u2: !q0State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ0State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 0);
  };

  const [q1State, setQ1State] = useState(qa[1].answers);

  const handleQ1Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q1State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q1State[index].u1 };
          } else {
            return { ...item, u2: !q1State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ1State(updatedCheckedState);
    checkValidate(q1State, 0);

    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 1);
  };

  const [q2State, setQ2State] = useState(qa[2].answers);

  const handleQ2Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q2State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q2State[index].u1 };
          } else {
            return { ...item, u2: !q2State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ2State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 2);
  };

  const [q3State, setQ3State] = useState(qa[3].answers);

  const handleQ3Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q3State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q3State[index].u1 };
          } else {
            return { ...item, u2: !q3State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ3State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 3);
  };

  const [q4State, setQ4State] = useState(qa[4].answers);

  const handleQ4Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q4State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q4State[index].u1 };
          } else {
            return { ...item, u2: !q4State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ4State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 4);
  };

  const [q5State, setQ5State] = useState(qa[5].answers);

  const handleQ5Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q5State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q5State[index].u1 };
          } else {
            return { ...item, u2: !q5State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ5State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 5);
  };

  const [q6State, setQ6State] = useState(qa[6].answers);

  const handleQ6Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q6State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q6State[index].u1 };
          } else {
            return { ...item, u2: !q6State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ6State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 6);
  };

  const [q7State, setQ7State] = useState(qa[7].answers);

  const handleQ7Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q7State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q7State[index].u1 };
          } else {
            return { ...item, u2: !q7State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ7State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 7);
  };

  const [q8State, setQ8State] = useState(qa[8].answers);

  const handleQ8Change = (event: any, position: any, user: number) => {
    const resetCheckedState = q8State.map((e: any) => {
      if (user == 0) {
        return { ...e, u1: false };
      } else {
        return { ...e, u2: false };
      }
    });
    const updatedCheckedState = resetCheckedState.map(
      (item: Object, index: number) => {
        if (index === position) {
          if (user == 0) {
            return { ...item, u1: !q8State[index].u1 };
          } else {
            return { ...item, u2: !q8State[index].u2 };
          }
        } else {
          return { ...item };
        }
      }
    );
    setQ8State(updatedCheckedState);
    let statusQ = event.target.checked;
    let score = parseInt(event.target.value);
    updateAnswersState(statusQ, score, user, 8);
  };
  // end handle q1-9state

  // get id from group 1 and paste to grou 2
  let { id } = usePersonalInformation();
  useEffect(() => {
    setSectionFive((el: any) => {
      return { ...el, id: id };
    });
  }, [id]);
  const [saveLoading, setSaveLoading] = useState(false);
  const scrollPositionBottom = useScrollPositionBottom(5);

  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section5")
        ? localStorage.getItem("section5")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data;
      }

      let storeDataSection = await postPfrSections(5, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        setSectionFive((el) => {
          return { ...el, editableStatus: 1 };
        });
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  useEffect(() => {
    if (scrollPositionBottom === "Process5") {
      if (
        (sectionFive.editableStatus === 0 && sectionFive.status === 1) ||
        (sectionFive.editableStatus === 2 && sectionFive.status === 1)
      ) {
        console.log("can save now section5");
        storeData();
      } else {
        console.log("Your data not complete Section 5");
      }
    }
  }, [scrollPositionBottom, sectionFive.editableStatus, sectionFive.status]);
  // check if user update some value then can triger save again
  useEffect(() => {
    if (sectionFive.status == 1 && sectionFive.editableStatus == 1) {
      setSectionFive((el) => {
        return { ...el, editableStatus: 2 };
      });
    }
  }, [sectionFive.answers, sectionFive.need, sectionFive.reason]);

  const [showSection, setShowSection] = useState(false);
  useEffect(() => {
    if (props.pfrType == 1) {
      setShowSection(sectionFive.need[0] == 1 ? true : false);
    } else {
      if (sectionFive.need[0] || sectionFive.need[1]) {
        setShowSection(true);
      } else {
        setShowSection(false);
      }
    }
  }, [sectionFive.need]);

  // fetching data for section 5 when position at 4
  const scrollPositionNext = useScrollPosition(4);

  useEffect(() => {
    if (scrollPositionNext === "okSec4") {
      if (router.query.id !== null && router.query.id !== undefined) {
        getSectionData(router.query.id);
        // getGeneralData(router.query.id);
      }
    }
  }, [scrollPositionNext]);

  const [loading, setLoading] = useState(false);
  const getSectionData = async (params: any) => {
    try {
      setLoading(true); // Set loading before sending API request
      let getSection5 = await getPfrStep(5, params);

      // fetching need
      setSectionFive((prev) => {
        return {
          ...prev,
          need: [getSection5.need[0].need, getSection5.need[1].need],
        };
      });
      // fetching reason
      setSectionFive((prev) => {
        return {
          ...prev,
          reason: [
            getSection5.reasons[0].reason,
            getSection5.reasons[1].reason,
          ],
        };
      });

      // fetching answers, risk attitude, capacity
      let getAnswers: any = [];
      let getRiskAttitude: any = [];
      let getCapacity: any = [];
      getSection5.answers.forEach((el: any, i: number) => {
        getAnswers.push([
          el.answer1,
          el.answer2,
          el.answer3,
          el.answer4,
          el.answer5,
          el.answer6,
          el.answer7,
          el.answer8,
          el.answer9,
        ]);
        getRiskAttitude.push(el.riskAttitude);
        getCapacity.push(el.riskCapacity);
      });

      setSectionFive((prev) => {
        return {
          ...prev,
          answers: getAnswers,
          riskAttitude: getRiskAttitude,
          riskCapacity: getCapacity,
        };
      });

      // fetching checkbox answer 0 for user 1 & 2
      let newQ0State = q0State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer1) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ0State = newQ0State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer1) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ0State(newQ0State);

      // fetching checkbox answer 1 for user 1 & 2
      let newQ1State = q1State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer2) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ1State = newQ1State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer2) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ1State(newQ1State);

      // fetching checkbox answer 2 for user 1 & 2
      let newQ2State = q2State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer3) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ2State = newQ2State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer3) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ2State(newQ2State);

      // fetching checkbox answer 3 for user 1 & 2
      let newQ3State = q3State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer4) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ3State = newQ3State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer4) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ3State(newQ3State);

      // fetching checkbox answer 4 for user 1 & 2
      let newQ4State = q4State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer5) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ4State = newQ4State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer5) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ4State(newQ4State);

      // fetching checkbox answer 5 for user 1 & 2
      let newQ5State = q5State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer6) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ5State = newQ5State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer6) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ5State(newQ5State);

      // fetching checkbox answer 6 for user 1 & 2
      let newQ6State = q6State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer7) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ6State = newQ6State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer7) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ6State(newQ6State);

      // fetching checkbox answer 7 for user 1 & 2
      let newQ7State = q7State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer8) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ7State = newQ7State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer8) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ7State(newQ7State);

      // fetching checkbox answer 8 for user 1 & 2
      let newQ8State = q8State.map((el: any) => {
        if (el.score == getSection5.answers[0].answer9) {
          return {
            ...el,
            u1: true,
          };
        } else {
          return el;
        }
      });
      newQ8State = newQ8State.map((el: any) => {
        if (el.score == getSection5.answers[1].answer9) {
          return {
            ...el,
            u2: true,
          };
        } else {
          return el;
        }
      });
      setQ8State(newQ8State);
      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  return loading ? (
    <LoadingPage />
  ) : (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
      <div
        id="section-header-5"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec5" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec5"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 5. Risk Profile
          {saveLoading ? (
            <span className="text-xs font-extralight text-gray-light">
              Saving...
            </span>
          ) : (
            ""
          )}
        </HeadingPrimarySection>
      </div>
      {showSection ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            5.1 Risk Profile Questionarie
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            {/* Question 1 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[0].question}
              </TitleSmall>
            </RowSingle>
            {props.pfrType > 1 && (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            )}
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q0State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {qa[0].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"asa" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ0Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q0State[index].u1 : q0State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 2 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[1].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q1State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[1].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"asa" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ1Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q1State[index].u1 : q1State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 3 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[2].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q2State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[2].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"as" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ2Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q2State[index].u1 : q2State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 4 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[3].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q3State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[3].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"sasa" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ3Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q3State[index].u1 : q3State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 5 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[4].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q4State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[4].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"sas" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ4Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q4State[index].u1 : q4State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}

            {/* Question 6 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[5].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q5State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[5].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"s" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ5Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q5State[index].u1 : q5State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 7 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[6].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q6State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[6].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"as" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ6Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q6State[index].u1 : q6State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 8 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[7].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q7State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[7].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"a" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ7Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q7State[index].u1 : q7State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
            {/* Question 9 */}
            <RowSingle className="mb-4">
              <TitleSmall className="text-gray-light">
                {qa[8].question}
              </TitleSmall>
            </RowSingle>
            <RowSingleORDouble pfrType={props.pfrType}>
              {getPfrLength.map((e2, userIndex) => (
                <Fragment key={"sa" + userIndex}>
                  {checkValidate(q8State, userIndex) ? (
                    <div className="text-xs font-normal text-red">Required</div>
                  ) : (
                    <div></div>
                  )}
                </Fragment>
              ))}
            </RowSingleORDouble>
            {props.pfrType > 1 ? (
              <RowSingleORDouble pfrType={props.pfrType}>
                <div>Client 1</div>
                <div>Client 2</div>
              </RowSingleORDouble>
            ) : (
              ""
            )}
            {qa[8].answers.map((e: any, index: number) => (
              <RowSingleORDouble pfrType={props.pfrType} key={index}>
                {getPfrLength.map((e2, userIndex) => (
                  <Fragment key={"sa" + userIndex}>
                    <div>
                      <Checkbox
                        value={e.score}
                        onChange={(el) => {
                          handleQ8Change(el, index, userIndex);
                        }}
                        dataId={index}
                        isChecked={
                          userIndex == 0 ? q8State[index].u1 : q8State[index].u2
                        }
                        label={e.answer}
                      />
                    </div>
                  </Fragment>
                ))}
              </RowSingleORDouble>
            ))}
          </SectionCardSingleGrid>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            5.2 Scoring Criteria
          </HeadingSecondarySection>
          <SectionCardSingleGrid className="mx-8 2xl:mx-60">
            <RowFourthGrid>
              <div></div>
              <div>Risk Capacity</div>
              <div>Risk Attitude</div>
              <div></div>
            </RowFourthGrid>
            {getPfrLength.map((e, i) => (
              <Fragment key={"sa" + i}>
                <RowFourthGrid>
                  {props.pfrType > 1 ? (
                    <div>Client {i + 1}</div>
                  ) : (
                    <div>Result of Risk Profile</div>
                  )}
                  <div>
                    {riskCapacity[i]} {statusRiskCapacity[i]}
                  </div>
                  <div>
                    {riskAttitude[i]} {statusRiskAttitude[i]}
                  </div>
                  <div className="w-full text-green-deep">
                    {resultAttitude[i]}
                  </div>
                </RowFourthGrid>
              </Fragment>
            ))}
          </SectionCardSingleGrid>
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleORDouble pfrType={props.pfrType}>
          {getPfrLength.map((e, index) => (
            <div className="flex-1" key={index}>
              {props.pfrType > 1 ? (
                <>
                  <h3
                    key={"heading-secondary-" + index}
                    className="w-full mb-10 text-base font-bold"
                  >
                    Client {index + 1}
                  </h3>
                </>
              ) : (
                ""
              )}
              <Checkbox
                isChecked={sectionFive.need[index] == 1 ? false : true}
                onChange={() => {
                  updateNeed(sectionFive.need[index], index);
                }}
                lableStyle="text-sm font-normal text-gray-light"
                label="Not applicable"
              />
            </div>
          ))}
        </RowSingleORDouble>

        {/*  */}

        <RowSingleORDouble pfrType={props.pfrType}>
          {getPfrLength.map((e, index) => (
            <div className="flex-1" key={index}>
              <TextArea
                isDisabled={sectionFive.need[index] == 0 ? false : true}
                className="my-4"
                label="The Reason"
                name="reason"
                defaultValue={sectionFive.reason[index]}
                handleChange={(e) => {
                  updateReason(e.target.value, index);
                }}
                needValidation={sectionFive.need[index] == 1 ? false : true}
                logic={
                  sectionFive.reason[index] == "" ||
                  sectionFive.reason[index] === "-" ||
                  sectionFive.reason[index] === null ||
                  sectionFive.reason[index] === undefined
                    ? false
                    : true
                }
              />
            </div>
          ))}
        </RowSingleORDouble>
      </SectionCardSingleGrid>
      {/* {sectionFive.editableStatus === 2 && sectionFive.status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 5" />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default RiskProfile;
