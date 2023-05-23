import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowSingleGrid from "@/components/Attributes/Rows/Grids/RowSingleGrid";
import HeadingPrimarySection from "@/components/Attributes/Sections/HeadingPrimarySection";
import HeadingSecondarySection from "@/components/Attributes/Sections/HeadingSecondarySection";
import TextThin from "@/components/Attributes/Typography/TextThin";
import Select from "@/components/Forms/Select";
import TextArea from "@/components/Forms/TextArea";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigationSection } from "@/store/epfrPage/navigationSection";
import React, { useState } from "react";

interface Props {
  id?: any;
}

const SwitchingReplacement = (props: Props) => {
  let fillInformation = [
    { id: 0, name: "No" },
    { id: 1, name: "Yes" },
  ];

  const [showReason, setShowReason] = useState(0);
  const [showReasonTwo, setShowReasonTwo] = useState(0);

  const setData = (params: any) => {
    setShowReason(params);
  };

  const setDataTwo = (params: any) => {
    setShowReasonTwo(params);
  };

  let { showDetailData } = useNavigationSection();

  const saveData = (params: any) => {
    showDetailData(params);
  };

  const scrollPosition = useScrollPosition(10)
  return (
    <div id={props.id}>
      <div id="section-header-10" className={`sticky top-0 z-10 ${scrollPosition === "okSec10" ? "bg-white py-1 ease-in shadow-lg" : ""}`}>
        <HeadingPrimarySection className={`mx-8 2xl:mx-60 ${scrollPosition === "okSec10" ? "text-gray-light text-xl font-bold mb-5 mt-5" : "text-2xl font-bold mb-10 mt-10"}`}>
          Section 10. Switching / Replacement
        </HeadingPrimarySection>
      </div>
      <SectionCardSingleGrid className="mx-8 2xl:mx-60">
        <RowSingleGrid>
          <TextThin>
            1a. Have you withdrawn / surrendered / terminated, in part or in
            full any existing insurance policy or investment product within the
            last 12 months?
          </TextThin>
          <Select
            value={showReason}
            datas={fillInformation}
            handleChange={(event) => setData(eval(event.target.value))}
          />
          {showReason == 1 ? (
            <RowSingleGrid>
              <TextArea label="Please state reasons:" defaultValue="test" />
            </RowSingleGrid>
          ) : null}
        </RowSingleGrid>

        {/* Question 1.b */}
        <RowSingleGrid>
          <TextThin>
            1b. Are you switching / replacing in part or in full any existing
            insurance policy or investment product purchased from Legacy FA Pte
            Ltd or any other Financial Institution(s)?
          </TextThin>
          <Select
            value={showReasonTwo}
            datas={fillInformation}
            handleChange={(event) => setDataTwo(eval(event.target.value))}
          />
        </RowSingleGrid>
        {showReasonTwo == 1 ? (
          <>
            <RowSingleGrid>
              <TextThin>
                2. Is the switch / replacement of insurance policy and/or
                investment product advised by the Representative ?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                3. What are the reason(s) for switching / replacing your
                insurance policy and/or investment product?
              </TextThin>
              <TextArea label="Please state reasons:" defaultValue="test" />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>4. Details of Original Product</TextThin>
              <TextArea label="Please state reasons:" defaultValue="test" />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                5. Has the Representative explained to you that you may incur
                transaction costs without gaining any real benefit from the
                replacement?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                6. Has the Representative explained to you that you may incur
                penalties for terminating any of your existing policies?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                7. Has the Representative explained to you that the replacement
                plan may offer a lower level of benefit at a higher cost or same
                cost, or offer the same level of benefit at a higher cost?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                8. Has the Representative explained to you that the replacement
                plan may be less suitable and the terms and conditions may
                differ?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                9. Has the Representative explained to you that you may not be
                insurable at standard terms?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>

            <RowSingleGrid>
              <TextThin>
                10. Has the Representative explained to you that there may be
                other options available besides policy replacement (eg. Free
                switching facilities for investment policy)?
              </TextThin>
              <Select
                value=""
                datas={fillInformation}
                handleChange={(event) => setData(eval(event.target.value))}
              />
            </RowSingleGrid>
          </>
        ) : null}
      </SectionCardSingleGrid>
      <div className="mt-20 mb-20 border-b border-gray-soft-strong"></div>
    </div>
  );
};

export default SwitchingReplacement;
