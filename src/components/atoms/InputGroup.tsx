import React, { ChangeEventHandler } from 'react';

type InputGroupProps = {
  type: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  className: string,
  placeholder: string,
  icon: string,
  isIconSolid?: boolean
}

InputGroup.defaultProps = {
  isIconSolid: true,
  className: "",
};

export default function InputGroup(
  {
    type,
    value,
    onChange,
    className,
    placeholder,
    icon,
    isIconSolid,
  }: InputGroupProps,
) {
  let iconClassName = '';
  iconClassName += isIconSolid ? 'fas' : 'far';
  iconClassName += ` fa-${icon}`;

  return (
    <div className="InputGroup">
      <i className={iconClassName} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}
