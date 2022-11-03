import styled from 'styled-components';
import {
  cardStyle, colors, flex, modalContainer, spacings,
} from '../../../style/StyledComponents/variables';

export const ModalContainer = styled.div`
  ${modalContainer}
`;

export const Modal = styled.div`
  width: 800px;
  height: 500px;
  background-color: white;
  position: fixed;
  top: ${spacings.extraLarge};

  ${cardStyle};
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: ${spacings.medium};
  color: ${colors.grey};
`;

export const Form = styled.form`
  height: 80%;
  ${flex('column')};
`;

export const Fields = styled.div`
  ${flex('row', 'baseline', 'initial')};
`;

export const Field = styled.div`
  ${flex('column', 'baseline', 'initial')};
`;

export const Actions = styled.div`
  display: flex;
`;

// Display hints on the right side of the modal
export const Hints = styled.span`
  padding-left: ${spacings.medium};
  margin-left: ${spacings.medium};
  // Add a border on the left of the hints
  border-left: 1px solid ${colors.grey};
  height: 100%;
`;
