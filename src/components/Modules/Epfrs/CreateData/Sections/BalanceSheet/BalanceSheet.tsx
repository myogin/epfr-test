import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import TextArea from "@/components/Forms/TextArea";
import React, { useEffect, useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import AssetBalance from "./AssetBalance/AssetBalance";
import LiabilityBalance from "./LiabilityBalance/LiabilityBalance";
import NetWorthBalance from "./NetWorthBalance/NetWorthBalance";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SectionFour, assetInterface } from "@/models/SectionFour";
import { log } from "console";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { getLength } from "@/libs/helper";
import axios from "axios";
import { Asset } from "next/font/google";

interface Props {
  id?: any;
  pfrType?: number;
}

const BalanceSheet = (props: Props) => {
  // zustand
  const { others, calcTotal } = useBalanceSheet();

  const [notReviewAll, setNotReviewAll] = useState([false, false]);
  const [dataS4, setDataS4] = useState(null);

  useEffect(() => {
    // const headers = {
    //   Authorization:
    //     "$2y$10$yQoEFyhzHdojmueU8TZZQu4EOZH3pcrYem9iMn5KyIM1qlD0DLd3W",
    // };
    // async function getDataS4() {
    //   await axios
    //     .get(`http://203.85.37.54:8000/api/pfr/get/s4/11011`, {
    //       headers: headers,
    //     })
    //     .then((res) => {
    //       setDataS4(res.data);
    //       // console.log(res.data);

    //       retrieveClientData(res.data);
    //     });
    // }
    // getDataS4();

    calcTotal();
  }, [others]);
  function retrieveClientData(data: any) {
    data.sumaryOfProperty;
  }
  const scrollPosition = useScrollPosition(4);

  const [sectionFour, setSectionFour] = useState<SectionFour>({
    id: 0,
    need: [0, 0],
    reason: [],
    others: {
      asset: [],
      liability: [],
    },
    issues: [],
    status: 0,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("section4", JSON.stringify(sectionFour));
  }

  // handle input change / state change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setSectionFour((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const checkboxChange = (event: any, index: number) => {
    console.log(notReviewAll[0]);

    let newNeed = notReviewAll;
    newNeed[index] = !notReviewAll[index];
    setNotReviewAll(newNeed);
    // setSectionFour((prevState) => {
    //   return { ...prevState, ["need"]: [!notReviewAll] };
    // });
  };

  return (
    <div id={props.id}>
      <div
        id="section-header-4"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec4" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec4"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 4. Balance Sheet
        </HeadingPrimarySection>
      </div>

      {!notReviewAll[0] ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            4.1 Assets
          </HeadingSecondarySection>
          <AssetBalance pfrType={props.pfrType} dataS4={dataS4} />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            4.2 Liabilities
          </HeadingSecondarySection>
          <LiabilityBalance pfrType={props.pfrType} />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            4.3 Net Worth
          </HeadingSecondarySection>
          <NetWorthBalance pfrType={props.pfrType} />
        </>
      ) : (
        ""
      )}
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingle>
          <Checkbox
            isChecked={true}
            onChange={(e) => {
              checkboxChange(e, 0);
            }}
            lableStyle="text-sm font-normal text-gray-light"
            label="No, The Client would not like their existing portfolio to be taken
            into consideration for the Needs Analysis and Recommendation(s)?"
          />
        </RowSingle>
        {notReviewAll ? (
          <>
            <RowSingle>
              <TextArea
                handleChange={handleInputChange}
                className="my-4"
                label="The Reason"
                name="reason"
              />
            </RowSingle>
          </>
        ) : (
          ""
        )}
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default BalanceSheet;
