import styled from 'styled-components';
import {
  cardStyle, colors, flex, spacings,
} from '../../../style/StyledComponents/variables';

export const Modal = styled.div`
  width: 600px;
  max-height: 95vh;
  background-color: white;
  position: relative;

  ${cardStyle};
`;

export const Field = styled.div`
  ${flex('row', 'end')};
  margin-bottom: ${spacings.medium};
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: ${spacings.medium};
  color: ${colors.grey};
`;

export const Intervals = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-column-gap: ${spacings.medium};
`;
