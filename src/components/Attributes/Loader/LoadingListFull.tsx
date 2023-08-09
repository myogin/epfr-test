import React from "react";

const LoadingListFull = () => {
  const getLength = () => {
    let arr = [...Array(10)];
    return arr;
  };

  return (
    <div
      role="status"
      className="w-full py-6 mx-8 space-y-4 divide-y divide-gray-soft-white animate-pulse"
    >
      {getLength().length &&
        getLength().map((d, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-between py-6"
          >
            <div>
              <div className="h-3 bg-gray-soft-light rounded-full w-[25rem] mb-2.5"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-soft-light rounded-full w-[25rem] mb-2.5"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-soft-thin rounded-full w-[25rem] mb-2.5"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-soft-thin rounded-full w-[25rem] mb-2.5"></div>
            </div>
          </div>
        ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingListFull;
