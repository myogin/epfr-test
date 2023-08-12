import { Switch } from "@headlessui/react";
import React, { useState } from "react";

interface Props {
  toggleName?:string;
  className?: string;
  onChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
}

const ToggleCustom = (props: Props) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <div className="text-sm font-bold text-gray-light">{props.toggleName}</div>
      <Switch
        checked={props.isChecked}
        onChange={props.onChange}
        className={`${
          props.isChecked
            ? "bg-green-soft-light border-gray-soft-light"
            : "bg-gray-soft-strong border-gray-soft-strong"
        } relative inline-flex h-[23px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <div
          aria-hidden="true"
          className={`${
            props.isChecked
              ? "translate-x-6 bg-green-deep"
              : "translate-x-0 bg-white"
          } pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      
    </div>
  );
};

export default ToggleCustom;
