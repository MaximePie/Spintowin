import React from 'react';
import { StyledIconCheckbox, Input, Icon } from './styles';
import { IconCheckboxDisplayProps } from './types';

export default function IconCheckboxDisplay({ checked, icon, onChange }: IconCheckboxDisplayProps) {
  return (
    <StyledIconCheckbox>
      <Icon icon={icon} isActive={checked} />
      <Input type="checkbox" onChange={onChange} checked={checked} />
    </StyledIconCheckbox>
  );
}
