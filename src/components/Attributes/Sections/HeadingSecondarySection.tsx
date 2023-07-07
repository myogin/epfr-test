import { getLength } from "@/libs/helper";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: any;
}

const HeadingSecondarySection = (props: Props) => {
  return (
    <div
      className={`flex flex-row items-center justify-between mb-10 ${props.className}`}
    >
      <h2 className="text-xl font-bold">{props.children}</h2>
    </div>
  );
};

export default HeadingSecondarySection;
