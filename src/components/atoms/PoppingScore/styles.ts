import styled from 'styled-components';
import { colors, shapes } from '../../../style/StyledComponents/variables';
import { Coordinates } from '../../../contexts/poppingScore';

type Props = {
  coordinates: Coordinates,
}

export const StyledPoppingScore = styled.span<Props>`
  position: absolute;
  color: ${colors.success};
  font-weight: bold;

  // Display the popping score at the coordinates of the clicked card
  // Left is displayed the popping score at the center of the card
  top: ${(props) => props.coordinates.y}px;
  left: calc(${(props) => props.coordinates.x + Math.round(parseInt(shapes.cardWidth, 10) / 2)}px  - 1rem);
  transition: all 0.5s ease-in-out;
  
  animation: popInAndOut 800ms ease-in-out forwards;
  
  @keyframes popInAndOut {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1.5);
    }
    50% {
      transform: scale(1);
    }
    90% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;
