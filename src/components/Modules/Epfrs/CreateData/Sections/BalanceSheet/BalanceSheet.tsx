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
import React, { useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import AssetBalance from "./AssetBalance/AssetBalance";
import LiabilityBalance from "./LiabilityBalance/LiabilityBalance";
import NetWorthBalance from "./NetWorthBalance/NetWorthBalance";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import { useScrollPosition } from "@/hooks/useScrollPosition";

interface Props {
  id?: any;
  pfrType?: number;
}

const BalanceSheet = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const [notReviewAll, setNotReviewAll] = useState(false);

  const scrollPosition = useScrollPosition(4)

  return (
    <div id={props.id}>
      <div id="section-header-4" className={`sticky top-0 z-10 ${scrollPosition === "okSec4" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec4" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 4. Balance Sheet
        </HeadingPrimarySection>
      </div>

      {!notReviewAll ? (
        <>
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            4.1 Assets
          </HeadingSecondarySection>
          <AssetBalance />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            4.2 Liabilities
          </HeadingSecondarySection>
          <LiabilityBalance />
          <HeadingSecondarySection className="mx-8 2xl:mx-60">
            4.3 Net Worth
          </HeadingSecondarySection>
          <NetWorthBalance />
        </>
      ) : (
        ""
      )}

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingle>
          <Checkbox
            isChecked={notReviewAll}
            onChange={() => setNotReviewAll(!notReviewAll)}
            lableStyle="text-sm font-normal text-gray-light"
            label="No, The Client would not like their existing portfolio to be taken
            into consideration for the Needs Analysis and Recommendation(s)?"
          />
        </RowSingle>
        {notReviewAll ? (
          <>
            <RowSingle>
              <TextArea
                className="my-4"
                label="The Reason"
                defaultValue="test text area"
              />
            </RowSingle>
          </>
        ) : (
          ""
        )}
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium onClick={() => saveData(5)}>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default BalanceSheet;
