import { clientIdentity, getLength } from "@/libs/helper";
import React, { Fragment } from "react";

interface Props {
  children?: React.ReactNode;
  className?: any;
  pfrType: number;
}

const HeadingSecondaryDynamicGrid = (props: Props) => {
  let getPfrLength = getLength(props.pfrType);

  return (
    <div
      className={`grid ${props.className} grid-cols-1 gap-8 mb-10 items-center`}
    >
      <h2 className={`text-xl font-bold col-span-3`}>{props.children}</h2>
      {props.pfrType > 1
        ? getPfrLength?.length &&
          getPfrLength.map((data, index) => (
            <Fragment key={"dsd"+index}>
              <span></span>
              <h3
                className="w-full text-base font-bold text-right text-green-deep"
              >
                {clientIdentity(index)}
              </h3>
            </Fragment>
          ))
        : ""}
    </div>
  );
};

export default HeadingSecondaryDynamicGrid;
