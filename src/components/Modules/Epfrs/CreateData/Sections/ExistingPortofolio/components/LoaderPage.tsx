import React from "react";

const LoaderPage = () => {
  const getLength = () => {
    let arr = [...Array(7)];
    return arr;
  };

  return (
    <div className="w-auto h-screen mx-8 2xl:mx-60 animate-pulse">
      {getLength().length &&
        getLength().map((d, i) => (
          <div
            key={"as" + i}
            className={`flex flex-row gap-4 items-center justify-between mb-10 py-5`}
          >
            <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-soft-strong rounded-full w-full mb-2.5"></div>
          </div>
        ))}
    </div>
  );
};

export default LoaderPage;
