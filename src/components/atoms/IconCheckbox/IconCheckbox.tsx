import React from 'react';
import { IconCheckboxProps } from './types';

import { Input, Wrapper, Icon } from './styles';

export default function IconCheckbox(props: IconCheckboxProps) {
  const { onChange, checked, icon } = props;
  return (
    <Wrapper onClick={() => onChange(!checked)}>
      <Icon icon={icon} isActive={checked} />
      <Input
        type="checkbox"
        checked={checked}
      />
    </Wrapper>
  );
}
