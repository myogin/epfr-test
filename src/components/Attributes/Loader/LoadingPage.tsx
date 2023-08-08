import React from "react";
import LegacyFALogo from "../../../../public/LegacyFALogo.png";
import Image from "next/image";
const LoadingPage = () => {
  const getLength = () => {
    let arr = [...Array(10)];
    return arr;
  };

  return (
    <div className="w-auto mx-8 2xl:mx-60 animate-pulse">
      {getLength().length &&
        getLength().map((d, i) => (
          <div key={i} className="flex flex-row items-center justify-between gap-4 py-6 my-4">
            <div className="basis-1/2">
              <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
              <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
            </div>
            <div className="basis-1/2">
              <div className="h-2.5 bg-gray-soft-thin rounded-full w-24 mb-2.5"></div>
              <div className="h-2.5 bg-gray-soft-thin rounded-full w-full mb-2.5"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoadingPage;
