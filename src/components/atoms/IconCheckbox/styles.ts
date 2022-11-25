import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { colors, spacings } from '../../../style/StyledComponents/variables';
import { IconProps } from './types';

export const StyledIconCheckbox = styled.label`
  // Circle around the icon
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: ${colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: ${spacings.small};
`;

// invisible input
export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

// Icon
export const Icon = styled(FontAwesomeIcon)<IconProps>`
  color: ${({ isActive }) => (isActive ? colors.primary : colors.gray)};
  
  transition: all 0.2s ease-in-out;
`;
