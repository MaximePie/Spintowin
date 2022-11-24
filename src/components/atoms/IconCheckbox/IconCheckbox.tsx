import React from 'react';
import IconCheckboxDisplay from './IconCheckboxDisplay';
import { IconCheckboxProps } from './types';

export default function IconCheckbox({ checked, onChange, icon }: IconCheckboxProps) {
  return (
    <IconCheckboxDisplay
      checked={checked}
      onChange={onChange}
      icon={icon}
    />
  );
}
