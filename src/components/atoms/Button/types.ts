import { MouseEventHandler } from 'react';
import { colors } from '../../../style/StyledComponents/variables';

export type ButtonProps = {
  className?: string,
  variant?: keyof typeof colors,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  text: string,
  type?: 'button' | 'submit',
  icon?: string,
}

export type StyledButtonProps = { variant: ButtonProps['variant'] }
