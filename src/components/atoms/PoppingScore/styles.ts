import styled from 'styled-components';
import { colors, spacings } from '../../../style/StyledComponents/variables';

export const StyledPoppingScore = styled.span`
  position: absolute;
  color: ${colors.success};
  font-weight: bold;

  left: 50%;
  top: ${spacings.small};
  transform: translateX(-50%);
  
  animation: popInAndOut 800ms ease-in-out forwards;
  
  @keyframes popInAndOut {
    0% {
      transform: translateX(-50%) scale(0);
    }
    20% {
      transform: translateX(-50%) scale(1.5);
    }
    50% {
      transform: translateX(-50%) scale(1);
    }
    90% {
      transform: translateX(-50%) scale(1);
    }
    100% {
      transform: translateX(-50%) scale(0);
    }
  }
`;
