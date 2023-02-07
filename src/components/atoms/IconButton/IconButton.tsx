import React from 'react';
import { IconButtonProps } from './types';
import { StyledIconButton } from './styles';

export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <StyledIconButton
      className={icon}
      onClick={onClick}
    />
  );
}
