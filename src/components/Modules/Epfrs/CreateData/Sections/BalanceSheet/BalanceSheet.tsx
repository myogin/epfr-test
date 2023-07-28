import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";

import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import Checkbox from "@/components/Forms/Checkbox";
import TextArea from "@/components/Forms/TextArea";
import React, { useEffect, useState } from "react";
import AssetBalance from "./AssetBalance/AssetBalance";
import LiabilityBalance from "./LiabilityBalance/LiabilityBalance";
import NetWorthBalance from "./NetWorthBalance/NetWorthBalance";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { getLength } from "@/libs/helper";
import axios from "axios";
import RowSingleORDouble from "@/components/Attributes/Rows/Grids/RowSingleORDouble";

interface Props {
  id?: any;
  pfrType: number;
}

const BalanceSheet = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);
  // zustand
  const { others, calcTotal, need, updateNeed, reason, updateReason } =
    useBalanceSheet();

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

      {need[0] || need[1] ? (
        <>
          <div className="grid grid-cols-3 mx-8 mb-10 2xl:mx-60">
            <div className="grid col-span-2">
              <h2 className="text-xl font-bold">4.1 Assets</h2>
            </div>
            <div className="grid grid-cols-2">
              {getPfrLength.map((e, index) => (
                <>
                  {props.pfrType > 1 ? (
                    <h3
                      key={"heading-secondary-" + index}
                      className="w-full text-base font-bold text-right text-green-deep"
                    >
                      Client {++index}
                    </h3>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
          <AssetBalance pfrType={props.pfrType} dataS4={dataS4} />
          <div className="grid grid-cols-3 mx-8 mb-10 2xl:mx-60">
            <div className="grid col-span-2">
              <h2 className="text-xl font-bold">4.2 Liabilities</h2>
            </div>
            <div className="grid grid-cols-2">
              {getPfrLength.map((e, index) => (
                <>
                  {props.pfrType > 1 ? (
                    <h3
                      key={"heading-secondary-" + index}
                      className="w-full text-base font-bold text-right text-green-deep"
                    >
                      Client {++index}
                    </h3>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
          <LiabilityBalance pfrType={props.pfrType} />
          <div className="grid grid-cols-3 mx-8 mb-10 2xl:mx-60">
            <div className="grid col-span-2">
              <h2 className="text-xl font-bold"> 4.3 Net Worth</h2>
            </div>
            <div className="grid grid-cols-2">
              {getPfrLength.map((e, index) => (
                <>
                  {props.pfrType > 1 ? (
                    <h3
                      key={"heading-secondary-" + index}
                      className="w-full text-base font-bold text-right text-green-deep"
                    >
                      Client {++index}
                    </h3>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
          <NetWorthBalance pfrType={props.pfrType} />
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
                isChecked={need ? (need[index] == 1 ? false : true) : true}
                onChange={() => {
                  updateNeed(index, need[index] == 1 ? 0 : 1, props.pfrType);
                }}
                lableStyle="text-sm font-normal text-gray-light"
                label="No, The Client would not like their existing portfolio to be taken
            into consideration for the Needs Analysis and Recommendation(s)?"
              />
            </div>
          ))}
        </RowSingleORDouble>

        {/*  */}

        <RowSingleORDouble pfrType={props.pfrType}>
          {getPfrLength.map((e, index) => (
            <div className="flex-1" key={index}>
              <TextArea
                isDisabled={need[index] == 1 ? true : false}
                className="my-4"
                label="The Reason"
                name="reason"
                value={reason[index]}
                handleChange={(e) => {
                  updateReason(index, e.target.value, props.pfrType);
                }}
                needValidation={need[index] == 0 ? true : false}
                logic={
                  reason[index] === "" ||
                  reason[index] === "-" ||
                  reason[index] === null ||
                  reason[index] === undefined
                    ? false
                    : true
                }
              />
            </div>
          ))}
        </RowSingleORDouble>
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default BalanceSheet;
