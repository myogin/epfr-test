import React, { ChangeEvent } from "react";

interface Props {
  label?: string;
  value?: string | number;
  placeholder?: string;
  name?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  datas?: Array<any>;
  className?: string;
  indexClient?: number;
  dataType?: string;
  indexData?: number;
  intro?: string;
  needValidation?: boolean;
  logic?: boolean;
  textError?: string;
  disabled?: boolean;
}

const Select = (props: Props) => {
  return (
    <div className={`w-full ${props.className} space-y-3`}>
      {props.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {props.label}
        </label>
      ) : (
        ""
      )}

      <select
        data-indexclient={props.indexClient}
        data-groupdata={props.dataType}
        data-indexdata={props.indexData}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong"
        onChange={props.handleChange}
        disabled={props.disabled}
      >
        <option value="-">
          {props.intro ? props.intro : "Select"}
        </option>
        {props.datas?.length &&
          props.datas.map((val, index) => (
            <option key={"select-box" + val.id} value={val.id}>
              {val.name}
            </option>
          ))}
      </select>

      {/* Error Validation */}
      {props.needValidation && !props.logic ? (
        <div className="w-full text-xs text-left text-red">
          {props.textError ? props.textError : "Required"}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
