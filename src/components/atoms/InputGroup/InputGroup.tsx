import React from 'react';
import { StyledInputGroup, Icon, StyledInput } from './styles';
import { InputGroupProps } from './types';

InputGroup.defaultProps = {
  isIconSolid: true,
  className: '',
  type: 'text',
  icon: '',
};

export default function InputGroup(props: InputGroupProps) {
  const {
    type,
    value,
    onChange,
    className,
    placeholder,
    icon,
  } = props;

  return (
    <StyledInputGroup>
      {icon
        && <Icon icon={icon} />}
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </StyledInputGroup>
  );
}
