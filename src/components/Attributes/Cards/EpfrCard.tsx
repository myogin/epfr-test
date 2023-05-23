import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string
}

const EpfrCard = (props: Props) => {
  return <div className={props.className}>{props.children}</div>;
};

export default EpfrCard;
