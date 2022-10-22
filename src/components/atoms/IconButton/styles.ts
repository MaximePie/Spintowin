import styled from 'styled-components';
import { colors, spacings } from '../../../style/StyledComponents/variables';

const { medium } = spacings;
const { primary } = colors;

export const StyledIconButton = styled.i`
  margin-left: ${medium};
  color: ${primary}; 

  // Behavior
  cursor: pointer;
`;
