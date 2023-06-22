import SectionCardDoubleGrid from "@/components/Attributes/Cards/SectionCardDoubleGrid";
import SectionCardFooter from "@/components/Attributes/Cards/SectionCardFooter";
import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import RowFourthGrid from "@/components/Attributes/Rows/Grids/RowFourthGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import RowSixGrid from "@/components/Attributes/Rows/Grids/RowSixGrid";
import RowTripleGrid from "@/components/Attributes/Rows/Grids/RowTripleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import TextThin from "@/components/Attributes/Typography/TextThin";
import ButtonGreenMedium from "@/components/Forms/Buttons/ButtonGreenMedium";
import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

interface Props {
  id?: any;
  pfrType?: number;
}

const Affordability = (props: Props) => {
  const setData = (params: any) => {
    console.log(params);
  };

  let fillInformation: Array<any> = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  let payorForClient: Array<any> = [
    { id: 0, name: "Self" },
    { id: 1, name: "Pay for other" },
  ];

  let payorDetails: Array<any> = [
    { id: 0, name: "Cash", annual: 0, single: 0 },
    { id: 1, name: "CPF OA", annual: 0, single: 0 },
    { id: 2, name: "CPF SA", annual: 0, single: 0 },
    { id: 3, name: "CPF Medisave", annual: 0, single: 0 },
    { id: 4, name: "SRS", annual: 0, single: 0 },
  ];

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const checkboxPayorBudget = (params:any) => {

  }

  const scrollPosition = useScrollPosition(8);
  return (
    <div id={props.id}>
      <div
        id="section-header-8"
        className={`sticky top-0 z-10 ${
          scrollPosition === "okSec8" ? "bg-white py-1 ease-in shadow-lg" : ""
        }`}
      >
        <HeadingPrimarySection
          className={`mx-8 2xl:mx-60 ${
            scrollPosition === "okSec8"
              ? "text-gray-light text-xl font-bold mb-5 mt-5"
              : "text-2xl font-bold mb-10 mt-10"
          }`}
        >
          Section 8. Affordability
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div>
          <Select
            value=""
            className="my-4"
            datas={payorForClient}
            handleChange={(event) => setData(eval(event.target.value))}
            label="Payor For Client 1"
          />
        </div>
        <RowDoubleGrid>
        <div className="text-left space-y-11">
          <div className="text-sm font-bold">Total Annual Income ($)</div>
          <div className="text-sm font-normal">1,000,000</div>
        </div>
        <div className="text-left space-y-11">
          <div className="text-sm font-bold">Total Annual Income ($)</div>
          <div className="text-sm font-normal">1,000,000</div>
        </div>
      </RowDoubleGrid>
      </SectionCardSingleGrid>
      
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <HeadingSecondarySection>Payor Budget</HeadingSecondarySection>
        </RowSingleGrid>
        <RowSixGrid>
          <div></div>
          {payorDetails?.length && payorDetails.map((val, index) => (
            <div key={"payor-budget-top"+val.id} className="flex items-center justify-center text-sm font-normal">
            {val.name}
          </div>
          ))}
          
        </RowSixGrid>
        <RowSixGrid>
          <div className="text-sm font-bold">Client 1</div>
          {payorDetails?.length && payorDetails.map((val, index) => (
            <div key={"payor-budget-checkbox"+val.id} className="flex items-center justify-center">
            <Checkbox onChange={() => checkboxPayorBudget(val.id)} />
          </div>
          ))}
          
        </RowSixGrid>
      </SectionCardSingleGrid>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <h4 className="text-sm font-bold mb-9">
            References From Previous Sections
          </h4>
        </RowSingleGrid>
        <RowTripleGrid className="mb-16">
          <div className="text-center space-y-11">
            <div className="text-sm font-bold">Total Annual Income ($)</div>
            <div className="text-sm font-normal">1,000,000</div>
          </div>
          <div className="text-center space-y-11">
            <div className="text-sm font-bold">Total Annual Income ($)</div>
            <div className="text-sm font-normal">1,000,000</div>
          </div>
          <div className="text-center space-y-11">
            <div className="text-sm font-bold">Total Annual Income ($)</div>
            <div className="text-sm font-normal">1,000,000</div>
          </div>
        </RowTripleGrid>
        <RowTripleGrid>
          <div className="text-center space-y-11">
            <div className="text-sm font-bold">Total Annual Income ($)</div>
            <div className="text-sm font-normal">1,000,000</div>
          </div>
          <div className="text-center space-y-11">
            <div className="text-sm font-bold">Total Annual Income ($)</div>
            <div className="text-sm font-normal">1,000,000</div>
          </div>
          <div className="text-center space-y-11">
            <div className="text-sm font-bold">Total Annual Income ($)</div>
            <div className="text-sm font-normal">1,000,000</div>
          </div>
        </RowTripleGrid>
      </SectionCardSingleGrid>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
        <RowSingleGrid>
          <HeadingSecondarySection>Payor Details</HeadingSecondarySection>
        </RowSingleGrid>
        </RowSingleGrid>
        {/* heading */}
        <RowFourthGrid>
          <div></div>
          <div className="text-sm font-bold text-right">Annual ($)</div>
          <div className="text-sm font-bold text-right">Single ($)</div>
          <div className="text-sm font-bold text-right">Source of Fund</div>
        </RowFourthGrid>

        {/* body */}
        {payorDetails?.length && payorDetails.map((val, index) => (
            <RowFourthGrid key={"payor-detail"+val.id} className="items-center">
            <div>
              <TextSmall className="text-gray-light">{val.name}</TextSmall>
            </div>
            <div>
              <Input
                className="my-4"
                type="text"
                value={val.annual}
                formStyle="text-right"
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
            <div>
              <Input
                className="my-4"
                type="text"
                value={val.single}
                formStyle="text-right"
                handleChange={(event) => setData(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-2"><Checkbox lableStyle="text-sm font-normal" label="Past / Current Employment" /></div>
              <div className="mb-2"><Checkbox lableStyle="text-sm font-normal" label="Investment" /></div>
              <div className="mb-2"><Checkbox lableStyle="text-sm font-normal" label="Inheritance" /></div>
            </div>
          </RowFourthGrid>
          ))}
        
      </SectionCardSingleGrid>
      <HeadingSecondarySection className="mx-8 2xl:mx-60">
        Source of Wealth
      </HeadingSecondarySection>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div className="flex items-center justify-start gap-4 text-sm font-normal text-gray-light">
          <div className="flex items-center justify-start gap-2">
            <Checkbox label="Past / Current Employment" />
          </div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox label="Investment" />
          </div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox label="Inheritance" />
          </div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox label="Saving" />
          </div>
        </div>
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div>
          <TextSmall>If other please specify</TextSmall>
          <TextArea className="my-4" defaultValue="test text area" />
          <small>
            To indicate source of wealth if transaction(s) is/are ≤ $150,000
          </small>
        </div>
      </SectionCardSingleGrid>

      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <div>
          <TextThin>
            Is the budget set aside a substantial portion of The Payor’s assets
            or surplus?
          </TextThin>
          <Select
            value=""
            className="my-4"
            datas={fillInformation}
            handleChange={(event) => setData(eval(event.target.value))}
          />
          <small className="text-sm italic font-normal">
            If the answer is "Yes", a potential risk of not being able to
            continue paying premiums in the future may occur. Budget is
            considered substantial if it is more than 50% of assets or surplus
          </small>
        </div>
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

export default Affordability;
