import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingle from "@/components/Attributes/Rows/Flexs/RowSingle";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import React from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
}

const PrioritiesNeedAnalysisMenu = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  const scrollPosition = useScrollPosition(7)
  return (
    <div id={props.id}>
      <div id="section-header-7" className={`sticky top-0 z-10 ${scrollPosition === "okSec7" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec7" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 7. Priorities & Need Analysis
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            You need to select priorities that you want to complete
          </TextThin>
        </RowSingleGrid>
        <RowDoubleGrid>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>7.1 Protection (Income Protection Upon Death)</TextThin>
          </RowSingle>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>
              7.2 Protection (Fund Disability Income / Expense)
            </TextThin>
          </RowSingle>
        </RowDoubleGrid>

        <RowDoubleGrid>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>7.3 Protection (Fund Critical Illness Expense)</TextThin>
          </RowSingle>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>
              7.4 Saving & Investment (Fund Child(ren)'s Education)
            </TextThin>
          </RowSingle>
        </RowDoubleGrid>

        <RowDoubleGrid>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>
              7.5 Saving & Investment (Fund Medium to Long Term Savings /
              Investment Needs / Other Goals)
            </TextThin>
          </RowSingle>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>
              7.6 Saving & Investment (Fund Retirement Lifestyle)
            </TextThin>
          </RowSingle>
        </RowDoubleGrid>

        <RowDoubleGrid>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>
              7.7 Accident & Health (Cover for Personal Accident)
            </TextThin>
          </RowSingle>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>7.8 Accident & Health (Fund Long Term Care)</TextThin>
          </RowSingle>
        </RowDoubleGrid>

        <RowDoubleGrid>
          <RowSingle>
            <Checkbox />{" "}
            <TextThin>7.9 Accident & Health (Fund Hospital Expenses)</TextThin>
          </RowSingle>
          <RowSingle>
            <Checkbox /> <TextThin>7.10 Maternity Plan</TextThin>
          </RowSingle>
        </RowDoubleGrid>

        <RowDoubleGrid>
          <RowSingle>
            <Checkbox /> <TextThin>7.11 Estate Planning</TextThin>
          </RowSingle>
          <RowSingle>
            <Checkbox /> <TextThin>7.12 Other Insurance(s)</TextThin>
          </RowSingle>
        </RowDoubleGrid>
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
      {/* <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter> */}
    </div>
  );
};

export default PrioritiesNeedAnalysisMenu;
