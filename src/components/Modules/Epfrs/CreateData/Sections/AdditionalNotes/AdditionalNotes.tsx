import SectionCardFooter from '@/components/Attributes/Cards/SectionCardFooter'
import SectionCardSingleGrid from '@/components/Attributes/Cards/SectionCardSingleGrid'
import RowSingleGrid from '@/components/Attributes/Rows/Grids/RowSingleGrid'
import HeadingSecondarySection from '@/components/Attributes/Sections/HeadingSecondarySection'
import ButtonGreenMedium from '@/components/Forms/Buttons/ButtonGreenMedium'
import TextArea from '@/components/Forms/TextArea'
import Toggle from '@/components/Forms/Toggle'
import React from 'react'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'

const AdditionalNotes = () => {
  return (
    <>
      <HeadingSecondarySection>11. Additional Notes</HeadingSecondarySection>
      <SectionCardSingleGrid>
        <RowSingleGrid>
          <Toggle toggleName="Not applicable" />
        </RowSingleGrid>
        <RowSingleGrid>
          <TextArea defaultValue="text here" />
        </RowSingleGrid>
      </SectionCardSingleGrid>
      <SectionCardFooter>
        <ButtonGreenMedium>
          Continue <ArrowRightLineIcon size={20} />
        </ButtonGreenMedium>
      </SectionCardFooter>
    </>
  )
}

export default AdditionalNotes