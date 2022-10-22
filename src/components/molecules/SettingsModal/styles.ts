import styled from 'styled-components';
import {
  cardStyle, colors, flex, modalContainer, spacings,
} from '../../../style/StyledComponents/variables';

export const ModalContainer = styled.div`
  ${modalContainer};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.42);
  z-index: 100;
  
  // fade in animation
  animation: fadeIn 0.3s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

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
