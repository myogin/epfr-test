import React from "react";

interface Props {
  label?: string;
  placeholder?: any;
  isDisabled?: boolean;
  defaultValue?: any;
  className?: string;
  rows?: number;
  name?: string;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  needValidation?: boolean;
  logic?: boolean;
  textError?: string;
}

const TextArea = (props: Props) => {
  return (
    <div className={`w-full space-y-3 ${props.className}`}>
      {props.label ? (
        <label
          htmlFor=""
          className={`w-full text-sm font-bold text-gray-light ${
            props.isDisabled && "text-gray-soft-strong"
          }`}
        >
          {props.label}
        </label>
      ) : (
        ""
      )}
      <textarea
        defaultValue={props.defaultValue}
        rows={props.rows}
        className={`w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong ${
          props.isDisabled && "text-gray-soft-strong"
        }`}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleChange}
        disabled={props.isDisabled}
      ></textarea>

      {/* Error Validation */}
      {props.needValidation && !props.logic ? (
        <div className="w-full text-xs text-left text-red">
          {props.textError ? props.textError : "Required field"}
        </div>
      ) : null}
    </div>
  );
};

export default TextArea;
