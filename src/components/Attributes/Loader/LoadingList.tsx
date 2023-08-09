import React from "react";

const LoadingList = () => {
  const getLength = () => {
    let arr = [...Array(10)];
    return arr;
  };

  return (
    <div
      role="status"
      className="w-auto py-6 mx-8 space-y-4 divide-y divide-gray-soft-white animate-pulse"
    >
      {getLength().length &&
        getLength().map((d, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-between py-6"
          >
            <div>
              <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
            </div>
            <div>
              <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
            </div>
            <div>
              <div className="h-2.5 bg-gray-soft-thin rounded-full w-24 mb-2.5"></div>
            </div>
            <div>
              <div className="h-2.5 bg-gray-soft-thin rounded-full w-24 mb-2.5"></div>
            </div>
            <div>
              <div className="w-32 h-2 rounded-full bg-gray-soft-strong mb-2.5"></div>
            </div>
            <div>
              <div className="w-32 h-2 rounded-full bg-gray-soft-strong mb-2.5"></div>
            </div>
          </div>
        ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingList;
