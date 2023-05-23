import React from "react";

interface Props {
  className?: string;
  data?: string;
}

const SmallBadges = (props : Props) => {
  return <span className={`rounded-2xl py-1 px-2 ${props.className}`}>{props.data}</span>;
};

export default SmallBadges;
