import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";

import RowSingleJointGrid from "@/components/Attributes/Rows/Grids/RowSingleJointGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import { getLength, usdFormat } from "@/libs/helper";
import { useBalanceSheet } from "@/store/epfrPage/createData/balanceSheet";
import React, { Fragment } from "react";
interface Props {
  pfrType?: any;
}
const NetWorthBalance = (props: Props) => {
  // zustand
  const { totalCalc } = useBalanceSheet();
  let getPfrLength = getLength(props.pfrType);
  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-green-deep">TOTAL</TextSmall>
        </div>
        <div>
          <RowSingleJointGrid pfrType={props.pfrType}>
            <div></div>
            {getPfrLength.map((e, i) => (
              <Fragment key={i}>
                <div className="text-right">
                  <TextSmall className="text-green-deep">
                    {usdFormat(totalCalc?.network[i])}
                  </TextSmall>
                </div>
              </Fragment>
            ))}
          </RowSingleJointGrid>
        </div>
      </RowDoubleGrid>
    </SectionCardSingleGrid>
  );
};

export default NetWorthBalance;
