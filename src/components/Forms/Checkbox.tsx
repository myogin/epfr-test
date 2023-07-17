import React from 'react'

interface Props {
  isChecked?: boolean;
  isDisabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  lableStyle?: string;
  class?: string;
}

const Checkbox = (props: Props) => {

  return (
    <div className={`flex items-start justify-start gap-4 ${props.class}`}>
      <input type="checkbox" disabled={props.isDisabled} checked={props.isChecked} onChange={props.onChange} className='p-2 rounded-md cursor-pointer border-gray-soft-strong text-green-deep focus:ring-green-deep focus:ring-1' />
      <span className={`${props.lableStyle}`}>{props.label}</span>
    </div>
  )
}

export default Checkbox