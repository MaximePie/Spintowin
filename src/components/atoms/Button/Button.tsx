import React from 'react';
import { ButtonProps } from './types';

Button.defaultProps = {
  type: 'button',
  icon: '',
  onClick: null,
  variant: 'primary',
  className: '',
};

export default function Button({
  className, variant, onClick, type, text, icon, isActive,
}: ButtonProps) {
  let finalClassName = `Button ${className} Button--${variant}`;
  finalClassName += isActive ? ` Button--${variant}--active` : '';
  return (
    <button
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      className={finalClassName}
    >
      {icon && <i className={icon} />}
      {text}
    </button>
  );
}
