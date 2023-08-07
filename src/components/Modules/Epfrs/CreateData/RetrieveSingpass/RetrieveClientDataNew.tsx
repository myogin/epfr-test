import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import React from "react";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import EditLineIcon from "remixicon-react/EditLineIcon"
import FlashlightLineIcon from "remixicon-react/FlashlightLineIcon"
import RetrieveSingpassModal from "./RetrieveSingpassModal";


const RetrieveClientDataNew = () => {
  const test = () => {
    console.log("test");
  };

  return (
    <>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        Please choose the way to complete new client information for EPFR
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowDoubleGrid className="p-10 border rounded-lg border-gray-soft-light">
          <div><TextSmall className="flex gap-4"><EditLineIcon /> USE EXISTING CLIENT DATA</TextSmall></div>
          <div className="flex items-start justify-end">
            <ButtonGreenMedium onClick={test}>
              Import Existing Client Data
            </ButtonGreenMedium>
          </div>
        </RowDoubleGrid>
        <RowDoubleGrid className="p-10 border rounded-lg border-gray-soft-light">
          <div>
            <TextSmall className="flex gap-4"><FlashlightLineIcon /> AUTOFILL PROFILE FORM BY SINGPASS</TextSmall>
            <TextThin>
              Singpass enables you to retrive your personal data from
              partcipating Goverment agencies. With your consent, we can
              auto-fill profile form.
            </TextThin>
          </div>
          <div className="flex items-start justify-end">
            <RetrieveSingpassModal clientType={0} />
          </div>
        </RowDoubleGrid>
      </SectionCardSingleGrid>
    </>
  );
};

export default RetrieveClientDataNew;
