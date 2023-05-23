import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: any
}

const SectionCardFooter = (props: Props) => {
  return (
    <div className={`flex flex-row items-center gap-4 mb-10 ${props.className} ${props.className ? "" : "justify-start"}`}>
      {props.children}
    </div>
  );
};

export default SectionCardFooter;
