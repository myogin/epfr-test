import React from "react";

const LoaderPage = () => {
  const getLength = () => {
    let arr = [...Array(4)];
    return arr;
  };

  return (
    <div className="w-auto h-screen mx-8 2xl:mx-60 animate-pulse">
      {getLength().length &&
        getLength().map((d, i) => (
          <div
            key={"Sds" + i}
            className="relative mt-6 overflow-x-auto border rounded-lg shadow-md border-gray-soft-strong"
          >
            <table className="w-full text-sm divide-y rounded-md divide-gray-soft-strong">
              <thead className="bg-white-bone">
                <tr className="border-b border-gray-soft-strong">
                  <th className="px-2 py-5"></th>
                  <th className="px-2 py-5" colSpan={2}>
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5" colSpan={2}>
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                  <th className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-24 mb-2.5"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-5">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                  <td className="px-2 py-5 text-center">
                    <div className="h-2.5 bg-gray-soft-light rounded-full w-full mb-2.5"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default LoaderPage;
