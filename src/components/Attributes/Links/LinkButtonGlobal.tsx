import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  url?: any;
}

const LinkButtonGlobal = (prop: Props) => {
  return (
    <Link
      href={prop.url}
      className="flex justify-start gap-2 px-5 py-3 text-white rounded-md bg-green-deep max-w-fit"
    >
      {prop.children}
    </Link>
  );
};

export default LinkButtonGlobal;
