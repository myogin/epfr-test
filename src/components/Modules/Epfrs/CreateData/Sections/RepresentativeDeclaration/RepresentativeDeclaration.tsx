import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useRouter } from "next/router";
import React from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
}

const RepresentativeDeclaration = (props: Props) => {

  const {push} = useRouter();

  const scrollPosition = useScrollPosition(12)

  const finish = () => {
    push('/create/finish')
  }

  return (
    <div id={props.id}>
      <div className="sticky top-0 z-10 bg-white">
        <HeadingPrimarySection className="mx-8 mt-10 mb-10 text-2xl font-bold 2xl:mx-60">
          Section 12. Representative Declaration
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            1. Where applicable,I have explained to the client the possible
            disadvantages of product switching / replacement and informed
            him/her of other options available besides product switching /
            replacement.
          </TextThin>
        </RowSingleGrid>
        <RowSingleGrid>
          <TextThin>
            2. Where applicable, I have also explained the basis for product
            switching / replacement and why the product switch / replacement is
            suitable for the client below.
          </TextThin>
        </RowSingleGrid>
        <RowSingleGrid>
          <TextArea defaultValue="test" />
        </RowSingleGrid>
        <RowSingleGrid>
          <TextThin>
            3. The recommendation(s) made by me is/are based on the above needs
            analysis which has taken into account the information disclosed by
            the client in this 'Personal Financial Record'.
          </TextThin>
        </RowSingleGrid>

        <RowSingleGrid>
          <TextThin>
            4. The information provided to me in this 'Personal Financial
            Record' is strictly confidential and is only to be used for the
            purpose of fact-finding as part of the process of recommending
            suitable insurance/investment product(s) and shall not be used for
            any other purposes.
          </TextThin>
        </RowSingleGrid>

        <RowSingleGrid>
          <div className="flex items-center justify-start gap-4 p-4 border rounded-md border-green-deep bg-green-light">
            <span>5. This is Joint Field Work</span>
            <span>
              <Checkbox />
            </span>
          </div>
        </RowSingleGrid>
      </SectionCardSingleGrid>

      <SectionCardFooter className="mx-8 2xl:mx-60">
        <ButtonGreenMedium>Review</ButtonGreenMedium>
        <ButtonGreenMedium onClick={finish}>
          Sign Now <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter>
    </div>
  );
};

export default RepresentativeDeclaration;
