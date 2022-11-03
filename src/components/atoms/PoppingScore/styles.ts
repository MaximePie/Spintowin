import styled from 'styled-components';
import { colors, shapes } from '../../../style/StyledComponents/variables';
import { Coordinates } from '../../../contexts/poppingScore';
import { poppingScoreDuration } from './helpers';

type Props = {
  coordinates: Coordinates,
}

export const StyledPoppingScore = styled.span<Props>`
  // Shape of a card
  height: ${shapes.cardWidth}; 
  width: ${shapes.cardWidth};
  
  position: absolute;
  color: ${colors.success};
  font-weight: bold;

  // Display the popping score at the coordinates of the clicked card
  // Left is displayed the popping score at the center of the card
  top: calc(${(props) => props.coordinates.y}px - 3em);
  left: calc(${(props) => props.coordinates.x}px);
  animation: popInAndOut ${poppingScoreDuration}ms ease-in-out forwards;

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

export const Score = styled.span`
  position: absolute;
  
  // Centered
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Sparkle = styled.img`
  // size 100%
  height: 100%;
  width: 100%;
`;
