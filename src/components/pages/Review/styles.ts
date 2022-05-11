import styled from 'styled-components';
import {
  colors, flex, shapes, spacings,
} from '../../../style/StyledComponents/variables';
import ScorePropsType from './types';

const StyledReview = styled.div`${flex}`;
const Content = styled.div`
  ${flex};
  width: ${shapes.singleCardWidth};
`;

const Header = styled.h4`margin: ${spacings.small} 0`;

const Score = styled.i<ScorePropsType>`
  color: ${scoreColor}
`;

function scoreColor({ type }: ScorePropsType) {
  const { successColor, dangerColor } = colors;
  return type === 'success' ? successColor : dangerColor;
}

/**
 *
  &__header {
    margin: 0.25em 0;
  }

  &__success {
    color: #00e396;
    font-size: 1.25em;
  }

  &__failures {
    color: #ff6d46;
    font-size: 1.25em;
  }
 */

export {
  StyledReview, Content, Header, Score,
};