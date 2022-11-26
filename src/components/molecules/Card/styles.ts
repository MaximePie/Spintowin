import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { flex, shapes, spacings } from '../../../style/StyledComponents/variables';
import { StyledButtonProps, StyledCardProps } from './types';
import Button from '../../atoms/Button/Button';

const disappearDelay = 0.3;

export const Container = styled.div`
  
  &.Card--answerShown-enter, &.Card--answerShown-enter-active {
    opacity: 0.01;
    transform: rotateY(90deg);
  }

  &.Card--answerShown-enter-done {
    opacity: 1;
    transition: opacity 300ms, transform 300ms;
    transform: rotateY(0);
  }
`;

export const StyledCard = styled.div<StyledCardProps>`
  position: relative;

  overflow: hidden;
  border-radius: ${shapes.borders.radius.medium};

  width: ${width};
  height: ${height};
  font-size: ${fontSize};


  @media (max-width: 1200px) {
    width: ${(props) => width(props, true)};
    // if isDisappearing is true, trigger a shrinking animation
    ${({ isDisappearing }) => isDisappearing && `animation: shrink-out ${disappearDelay}s ease-in-out forwards;`}

    @keyframes shrink-out {
      0% {
        width: ${(props) => width(props, true)};
      }
      100% {
        width: 0;
      }
    }
  }

  border: ${border};
  margin: 0.25rem;
  cursor: pointer;

  ${flex('column')}

  font-weight: bold;

  text-align: center;
  
  // if isDisappearing is true, trigger a shrinking animation
  ${({ isDisappearing }) => isDisappearing && `animation: shrink-out ${disappearDelay}s ease-in-out forwards;`}

  @keyframes shrink-out {
    0% {
      width: ${width};
    }
    90% {
      width: 0;
    }
  }

`;

export const Delay = styled.div`
  font-weight: initial;
  margin: ${spacings.small} ${spacings.medium};
`;

export const Image = styled.img<StyledCardProps>`
  height: ${imageHeight};
  width: ${imageWidth};
`;

export const Content = styled.p<StyledCardProps>`
  font-weight: 500;
  max-height: 100%;
  overflow: auto;
  margin: 0;
  margin-top: ${({ isSingle }) => isSingle && spacings.small}};
`;

export const Category = styled.p`
  margin: 0;
`;

export const Edit = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${spacings.small};
  left: ${spacings.small};
  outline: none;
  border: none;
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  margin: ${spacings.small} 0 ${spacings.small} ${({ isFailed }) => (isFailed ? spacings.small : 0)};
`;

export const Hint = styled.span`
  position: absolute;
  // spacing small em from right and top borders
  right: ${spacings.small};
  top: ${spacings.small};
`;

function border({ noBorders }: StyledCardProps) {
  return noBorders ? '' : 'solid 1px lightgray';
}

function fontSize({ isSingle }: StyledCardProps) {
  return `${isSingle ? 2 : 1.1}em`;
}

function width({ isSingle }: StyledCardProps, isPhone = false) {
  const multipleCardsWidth = isPhone ? '170' : '180';
  return `${isSingle ? 340 : multipleCardsWidth}px`;
}

function height({ isSingle }: StyledCardProps) {
  return `${isSingle ? 480 : 150}px`;
}

function imageWidth({ isSingle }: StyledCardProps) {
  return isSingle ? '100%' : '180px';
}

function imageHeight({ isSingle }: StyledCardProps) {
  return isSingle ? '100%' : '180px';
}
