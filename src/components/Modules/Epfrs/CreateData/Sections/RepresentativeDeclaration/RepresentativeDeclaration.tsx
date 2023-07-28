import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getPfrStep } from "@/services/pfrService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
  pfrType?: number;
}

const pfrId = 12016;

const RepresentativeDeclaration = (props: Props) => {

  const {push} = useRouter();

  const scrollPosition = useScrollPosition(12)

  const finish = () => {
    push('/create/finish')
  }

  const [requiredNFTF, setRequiredNFTF] = useState(false);
  const [isJointFieldWork, setIsJointFieldWork] = useState(false);

  const fetchData = async () => {
    console.log("Fetching ...");

    const s12Res:any = await getPfrStep(12, pfrId);

    const data = JSON.parse(s12Res['answer']['data']);

    console.log("Data: ", data[0]);

    if (data[0][8][0]) {
      setRequiredNFTF(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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
            {`3. The recommendation(s) made by me is/are based on the above needs
            analysis which has taken into account the information disclosed by
            the client in this 'Personal Financial Record'.`}
          </TextThin>
        </RowSingleGrid>

        <RowSingleGrid>
          <TextThin>
            {`4. The information provided to me in this 'Personal Financial
            Record' is strictly confidential and is only to be used for the
            purpose of fact-finding as part of the process of recommending
            suitable insurance/investment product(s) and shall not be used for
            any other purposes.`}
            
          </TextThin>
        </RowSingleGrid>

        <RowDoubleGrid className="border rounded-md border-green-deep bg-green-light">
          <div className="flex items-center justify-start gap-20 p-4">
            <span>5. This is Joint Field Work</span>
            <span>
              <Checkbox onChange={(e) => setIsJointFieldWork(e.target.checked)} />
            </span>
          </div>
          {isJointFieldWork && (<RowDoubleGrid className="mb-0">
            <div className="flex items-center justify-end gap-4 p-4">
              <span>Supervisor Name</span>
            </div>
            <div className="flex items-center justify-start gap-4 p-4">
              {/* <Select className="border rounded-md"
                datas={['one', 'two']}
                handleChange={(event) => console.log(event.target.value)}
              /> */}
              <select
                className="w-full border rounded-md px-2 py-2 text-sm cursor-pointer text-gray-light border-gray-soft-strong"
                onChange={(event) => console.log(event.target.value)}
                required={isJointFieldWork}
              >
                <option selected disabled={true} value="">Please choose supervisor</option>
                {['one', 'two']?.length &&
                  ['one', 'two'].map((val, index) => (
                    <option
                      key={index}
                      value={val}
                    >
                      {val}
                    </option>
                  ))}
              </select>
            </div>
          </RowDoubleGrid>)}
        </RowDoubleGrid>
        
      </SectionCardSingleGrid>

      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        For NFTF Transaction
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowFourthGrid>
          <div className="col-span-3">
            <TextThin>
            I have sought consent and obtained a screenshot of client for identity verification
            </TextThin>
          </div>
          <div>
            <Checkbox onChange={(e) => setRequiredNFTF(!e.target.checked)} label='Required field' lableStyle={requiredNFTF?'text-xs text-red': 'text-xs invisible'} class=" justify-end" />
          </div>
        </RowFourthGrid>
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
