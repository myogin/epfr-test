import React from "react";

interface Props {
  label?: string;
  placeholder?: any;
  defaultValue?: any;
  className?: string;
  rows?: number;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = (prop: Props) => {
  return (
    <div className={`w-full space-y-3 ${prop.className}`}>
      {prop.label ? (
        <label htmlFor="" className="w-full text-sm font-bold text-gray-light">
          {prop.label}
        </label>
      ) : (
        ""
      )}
      <textarea
        defaultValue={prop.defaultValue}
        rows={prop.rows}
        className="w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 text-gray-light border-gray-soft-strong"
        placeholder={prop.placeholder}
        onChange={prop.handleChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
