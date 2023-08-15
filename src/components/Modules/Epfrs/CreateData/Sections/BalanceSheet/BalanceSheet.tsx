import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";

import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import Checkbox from "@/components/Forms/Checkbox";
import TextArea from "@/components/Forms/TextArea";
import React, { Fragment, useEffect, useState } from "react";
import AssetBalance from "./AssetBalance/AssetBalance";
import LiabilityBalance from "./LiabilityBalance/LiabilityBalance";
import NetWorthBalance from "./NetWorthBalance/NetWorthBalance";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import { getLength } from "@/libs/helper";
import axios from "axios";
import RowSingleORDouble from "@/components/Attributes/Rows/Grids/RowSingleORDouble";
import { usePersonalInformation } from "@/store/epfrPage/createData/personalInformation";
import { getPfrStep, postPfrSections } from "@/services/pfrService";
import { useScrollPositionBottom } from "@/hooks/useScrollPositionBottom";
import ButtonFloating from "@/components/Forms/Buttons/ButtonFloating";
import { useRouter } from "next/router";
import LoadingPage from "@/components/Attributes/Loader/LoadingPage";

interface Props {
  id?: any;
  pfrType: number;
}

const BalanceSheet = (props: Props) => {
  // get id from group 1 and paste to grou 2
  let { id } = usePersonalInformation();

  let getPfrLength = getLength(props.pfrType);
  // zustand
  const {
    others,
    calcTotal,
    need,
    updateNeed,
    reason,
    updateReason,
    updateID,
    setGlobal,
    editableStatus,
    status,
    fetchLiability,
    fetchAsset,
    fetchInitData,
  } = useBalanceSheet();
  const router = useRouter();
  const [dataS4, setDataS4] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const scrollPosition = useScrollPosition(4);
  const scrollPositionBottom = useScrollPositionBottom(4);
  const scrollPositionBottom3 = useScrollPositionBottom(3);
  const scrollPosition3 = useScrollPosition(3);
  const scrollPositionNext = useScrollPosition(3);

  const [loading, setLoading] = useState(false);

  const getSectionData = async (params: any) => {
    try {
      setLoading(true); // Set loading before sending API request
      let getSection4 = await getPfrStep(4, params);

      if (getSection4.needs.length > 0) {
        setGlobal("need", [
          getSection4.needs[0].need,
          getSection4.needs[1].need,
        ]);
      }
      if (getSection4.reasons.length > 0) {
        setGlobal("reason", [
          getSection4.reasons[0].reason,
          getSection4.reasons[1].reason,
        ]);
      }
      if (getSection4.assetOther.length > 0) fetchAsset(getSection4.assetOther);
      if (getSection4.liabilityOther.length > 0) {
        fetchLiability(getSection4.liabilityOther);
      }
      // fetching assets data
      fetchInitData(getSection4);
      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  // load data for section 4 when position at 2 bottom
  useEffect(() => {
    if (scrollPositionBottom3 == "Process3") {
      if (router.query.id !== null && router.query.id !== undefined) {
        getSectionData(router.query.id);
        // getGeneralData(router.query.id);
      } else {
        if (id && Number(id) > 0) {
          getSectionData(Number(id));
        }
      }
    }
  }, [scrollPositionBottom3]);

  useEffect(() => {
    calcTotal();
  }, [others]);

  useEffect(() => {
    updateID(id);
  }, [id, updateID]);
  // Store data
  const storeData = async () => {
    try {
      setSaveLoading(true); // Set loading before sending API request

      let localData = localStorage.getItem("section4")
        ? localStorage.getItem("section4")
        : "";

      let dataFix = {};
      if (localData) {
        let data = JSON.parse(localData);
        dataFix = data.state;
      }

      let storeDataSection = await postPfrSections(4, JSON.stringify(dataFix));

      // If save success get ID and store to localstorage
      if (storeDataSection.data.result === "success") {
        setGlobal("editableStatus", 1);
      }

      setSaveLoading(false); // Stop loading
    } catch (error) {
      setSaveLoading(false); // Stop loading in case of error
      console.error(error);
    }
  };
  useEffect(() => {
    if (scrollPositionBottom === "Process4") {
      if (
        (editableStatus === 0 && status === 1) ||
        (editableStatus === 2 && status === 1)
      ) {
        console.log("can save now section4");
        storeData();
      } else {
        console.log("Your data not complete Section 4");
      }
    }
  }, [scrollPositionBottom, editableStatus, status]);

  // check if user update some value then can triger save again
  useEffect(() => {
    if (status == 1 && editableStatus == 1) {
      setGlobal("editableStatus", 2);
    }
  }, [others, reason, need]);

  const [showSection, setShowSection] = useState(false);
  useEffect(() => {
    if (props.pfrType == 1) {
      setShowSection(need[0] == 1 ? true : false);
    } else {
      if (need[0] || need[1]) {
        setShowSection(true);
      } else {
        setShowSection(false);
      }
    }
  }, [need, props.pfrType]);
  // return loading ? (
  //   <LoadingPage />
  // ) : (

  return (
    <div
      id={props.id}
      className="min-h-screen pb-20 mb-20 border-b border-gray-soft-strong"
    >
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
          <div className="grid grid-cols-3 mx-8 mb-10 2xl:mx-60">
            <div className="grid col-span-2">
              <h2 className="text-xl font-bold">4.1 Assets</h2>
            </div>
            <div className="grid grid-cols-2">
              {getPfrLength.map((e, index) => (
                <Fragment key={"key" + index}>
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
                </Fragment>
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
                <Fragment key={"sdas" + index}>
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
                </Fragment>
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
                <Fragment key={"sasd" + index}>
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
                </Fragment>
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
                defaultValue={reason[index]}
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
      {scrollPositionNext == "okSec4" &&
      editableStatus === 2 &&
      status === 1 ? (
        <ButtonFloating onClick={storeData} title="Save section 4" />
      ) : (
        ""
      )}
    </div>
  );
};

export default BalanceSheet;
