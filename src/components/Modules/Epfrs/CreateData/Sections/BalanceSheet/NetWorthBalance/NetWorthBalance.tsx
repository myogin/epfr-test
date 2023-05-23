import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import React from "react";

const NetWorthBalance = () => {
  const setData = (params: any) => {
    console.log(params);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-green-deep">TOTAL</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div></div>
            <div className="text-right">
              <TextSmall className="text-green-deep">$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
    </SectionCardSingleGrid>
  );
};

export default NetWorthBalance;
