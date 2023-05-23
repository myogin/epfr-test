import { Switch } from "@headlessui/react";
import React, { useState } from "react";

interface Props {
  toggleName?: string | number;
  className?: string;
  onChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
}

const Toggle = (prop: Props) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <Switch
        checked={prop.isChecked}
        onChange={prop.onChange}
        className={`${
          prop.isChecked
            ? "bg-green-soft-light border-gray-soft-light"
            : "bg-gray-soft-strong border-gray-soft-strong"
        } relative inline-flex h-[23px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${
            prop.isChecked
              ? "translate-x-6 bg-green-deep"
              : "translate-x-0 bg-white"
          } pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      {prop.toggleName ? (<span className="text-sm font-bold text-gray-light">{prop.toggleName}</span>) : ""}
    </div>
  );
};

export default Toggle;
