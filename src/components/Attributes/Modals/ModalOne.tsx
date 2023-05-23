import React from "react";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const ModalOne = (prop: Props) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-2xl mx-auto my-6">
          <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none p-6 space-y-3">
            <div className="flex items-start justify-between rounded-t border-slate-200">
              <h3 className="w-full text-2xl font-medium text-left text-gray-light">
                {prop.title}
              </h3>
            </div>
            <div className="relative flex-auto">{prop.children}</div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 opacity-25 bg-gray-light"></div>
    </>
  );
};

export default ModalOne;
