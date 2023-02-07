import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { colors } from '../../../style/StyledComponents/variables';

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 8px 0;
  transition: background-color 0.2s;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.gray};
  cursor: pointer;
`;

export const Icon = styled(FontAwesomeIcon)<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  font-size: 20px;
  color: ${({ isActive }) => (isActive ? colors.primary : colors.gray)};
  transition: color 0.2s;
  &:hover {
    color: ${colors.primary};
  }
`;
