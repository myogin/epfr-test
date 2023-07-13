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
  name?: string;
  dataType?: string;
  indexData?: number;
  needValidation?: boolean;
  logic?: boolean;
  textError?: string;
}

const Input = (props: Props) => {
  return (
    <div className={`w-full space-y-3 ${props.className}`}>
      {props.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {props.label}
        </label>
      ) : (
        ""
      )}
      <input
        data-groupdata={props.dataType}
        data-indexdata={props.indexData}
        name={props.name}
        type={props.type}
        readOnly={props.readonly}
        onChange={props.handleChange}
        value={props.value}
        placeholder={props.placeholder}
        className={`w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong ${props.formStyle}`}
      />

      {/* Error Validation */}
      {props.needValidation && !props.logic ? (
        <div className="w-full text-xs text-left text-red">{props.textError ? props.textError : "Required field"}</div>
      ) : null}
    </div>
  );
};

export default Input;
