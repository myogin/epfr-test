import React from 'react'
import DatePicker from "react-datepicker";

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
    dataType?:string;
  }

const DatePickerCustom = (props: Props) => {
    return (
        <div className={`w-full space-y-3 ${props.className}`}>
          {props.label ? (
            <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
              {props.label}
            </label>
          ) : (
            ""
          )}
          <DatePicker selected={props.value} onChange={props.handleChange} />
          <input
            data-groupdata={props.dataType}
            name={props.name}
            type={props.type}
            readOnly={props.readonly}
            onChange={props.handleChange}
            value={props.value}
            placeholder={props.placeholder}
            className={`w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong ${props.formStyle}`}
          />
        </div>
      );
}

export default DatePickerCustom