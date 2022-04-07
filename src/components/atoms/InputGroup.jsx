import React from 'react';

export default function InputGroup(
  {
    type,
    value,
    onChange,
    className,
    placeholder,
    icon,
    isIconSolid
  }
) {

  let iconClassName = '';
  iconClassName += isIconSolid ? 'fas' : 'far';
  iconClassName += ` fa-${icon}`;

  return (
    <div className="InputGroup">
      <i className={iconClassName}/>
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
