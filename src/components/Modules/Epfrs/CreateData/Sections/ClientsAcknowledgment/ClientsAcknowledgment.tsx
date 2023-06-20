import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
  pfrType?: number;
}

const ClientsAcknowledgment = (props: Props) => {
  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const scrollPosition = useScrollPosition(11)

  return (
    <div id={props.id}>
      <div id="section-header-11" className={`sticky top-0 z-10 ${scrollPosition === "okSec11" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec11" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 11. Client’s Acknowledgment
        </HeadingPrimarySection>
      </div>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        1. Customer Knowledge Assessment Outcome
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that I/we have been assessed to PASS the Customer
              Knowledge Assessment and I/we confirm that I/we WISH to receive
              advice concerning the unlisted Specified Investment Product from
              my/our Legacy FA Representative.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that I/we have been assessed to PASS the Customer
              Knowledge Assessment and I/we confirm that I/we DO NOT WISH to
              receive advice concerning the unlisted Specified Investment
              Product from my/our Legacy FA Representative. In this regard, I/we
              am/are aware that I/we will not be able to rely on Section 27 of
              the Financial Advisers Act (Cap 110) to file a civil claim against
              Legacy FA Pte Ltd in the event of a loss. It is my/our
              responsibility to ensure the suitability of the unlisted Specified
              Investment Product selected.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that I/we have been assessed to FAIL the Customer
              Knowledge Assessment and I/we understand that I/we will need to
              receive advice concerning the unlisted Specified Investment
              Product from my/our Legacy FA Representative and accept his/her
              recommendation(s) to proceed with the purchase of the investment
              product(s).
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        2. Replacement / Switching of Existing Insurance Policy / Investment
        Product
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we am/are fully aware that I/we may incur fees and charges as a
              result of (a) the disposal of, or reduction in interest in, an
              existing insurance policy/investment product; and (b) the
              acquisition of, or increase in interest in, a new insurance
              policy/investment product. I/we confirm that I/we wish to proceed
              with the replacement / switch notwithstanding the fees, charges or
              disadvantages that may arise could outweigh any potential
              benefits.I/we will obtain my/our own advice on the tax
              implications and/or any ancillary implications in relation to the
              application of the new insurance policy/investment product.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        3. Procedures, Charges and Restrictions on Withdrawal / Surrender /
        Claim
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that my/our Legacy FA Representative has
              disclosed and explained the procedures, charges, and restrictions
              on withdrawal, surrender / termination or claim of the product(s)
              recommended.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        4. Documents to Receive
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              Where investment-linked funds/collective investment schemes and
              participating plans are concerned, I/we acknowledge that my/our
              Legacy FA Representative has informed me/us of the frequency of
              the reports/statements and source from which I/we could reasonably
              expect to receive for the product(s) I/we have chosen to purchase.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
              I/we acknowledge that my Legacy FA Representative has explained
              the contents within this document and has furnished me/us with the
              endorsed copy of this document as well as the following documents
              (where applicable):
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
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

export default ClientsAcknowledgment;
