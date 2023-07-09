import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
}

const ClientsAcknowledgment = (props: Props) => {
  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const [sectionElevenData, setSectionElevenData] = useState([
    [
      [
          false,
          false,
          false
      ],
      [
          0
      ],
      [
          false
      ],
      [
          false,
          false
      ],
      [
          false,
          false
      ],
      [
          false
      ],
      [
          true,
          false
      ],
      [
          false
      ],
      [
          false
      ],
      [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
      ]
  ]
  ]);

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

        {/* 4.1 */}
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Insurance Application Form(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox lableStyle="text-xs text-red" label="Required" />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Benefit Illustration(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Product Summary(ies)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Your Guide to Life Insurance
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Your Guide to Health Insurance
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Your Guide to Investment-Linked Insurance Plans
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Fund Summary(ies)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Legacy FA Model Portfolio Fact Sheet(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Fund Fact Sheet(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Product Highlight Sheet(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Prospectus(es)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Navigator Schedule - Funds Investment
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Navigator Account Opening / Subscription Form
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            iFast Account Opening / Subscription Form
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Havenport Investment Account Opening Form
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>

      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        5. PERSONAL DATA COLLECTION & MARKETING CONSENT
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I/we hereby give my/our consent to Legacy FA Pte Ltd to collect, use, and/or 
            disclose my/our personal data for the purpose of performing financial needs 
            analysis and planning, including providing financial advice, product 
            recommendation and reviews of my/our financial plans.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I/we hereby give my/our consent to Legacy FA Pte Ltd to contact me/us regarding 
            any marketing and promotional materials on financial products and services.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        6.
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I/We understand that the above recommendation(s) is/are based on the facts furnished 
            in this "Personal Financial Record"; and any incomplete or inaccurate information 
            provided by me/us may affect the suitability of the recommendation(s) made. 
            If I/we choose not to provide information requested or do not accept my/our 
            Legacy FA Representative's recommendation(s) and choose to purchase another product(s) 
            which is/are not recommended by my/our Legacy FA Representative, it is 
            my/our responsibility to ensure the suitability of the product(s) selected.
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        7. MY / OUR LEGACY FA REPRESENTATIVE HAS EXPLAINED IN DETAIL THE RECOMMENDATION(S) MADE AND I/WE :
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Accept the recommendation(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>

        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            Do not accept the recommendation(s) and wish to purchase my/our own choice of product(s)
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        8.
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I/we hereby confirm that I/we am/are referred by Introducer
            <input type="text" className="mx-2 border-t-0 border-b border-l-0 border-r-0"/> 
            and that I/we am/are informed of the following:
            </TextThin>
          </div>
          <div className="text-right">
            <Checkbox />
          </div>
        </RowFourthGrid>
        <TextThin>
        (a) that the Introducer is not permitted to give advice or provide recommendations on any investment product to me/us, 
        market any collective investment scheme, or arrange any contract of insurance in respect of life policies; and
        </TextThin>
        <TextThin>
        (b) the amount of remuneration that the introducer may be entitled to receive/pass on for carrying out this introduction.
        </TextThin>
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        9.
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I ACKNOWLEDGE AND AGREE TO THE PURCHASE OF FINANCIAL PRODUCTS USING REMOTE SIGNATURE IN THIS NON-FACE-TO-FACE TRANSACTION.
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
