import { type } from "os";
import React from "react";

interface Props {
  label?: string;
  value?: any;
  placeholder?: string;
  type?: string;
  className?: string;
  formStyle?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

const Input = (prop: Props) => {
  return (
    <div className={`w-full space-y-3 ${prop.className}`}>
      {prop.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {prop.label}
        </label>
      ) : (
        ""
      )}
      <input
        type={prop.type}
        readOnly={prop.readonly}
        onChange={prop.handleChange}
        value={prop.value}
        placeholder={prop.placeholder}
        className={`w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong ${prop.formStyle}`}
      />
    </div>
  );
};

export default Input;
