import styled from 'styled-components';
import { colors } from '../../../style/StyledComponents/variables';

// Place at the top right of the container with a little offset, so it's not on the edge
export const StyledExcelUpload = styled.div`
position: absolute;
top: 0;
right: 0;
margin: 1rem;
cursor: pointer;
`;

export const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.grey};
  display: inline-block;
`;
