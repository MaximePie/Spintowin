import styled from "styled-components";
import {cardStyle, colors, flex, modalContainer, spacings} from "../../../style/StyledComponents/variables"

export const ModalContainer = styled.div`
  ${modalContainer}
`

export const Modal = styled.div`
  width: 600px;
  max-height: 95vh;
  background-color: white;
  position: relative;

  ${cardStyle};
`

export const Field = styled.div`
  ${flex('row', 'end')};
  margin-bottom: ${spacings.medium};
`


export const CloseButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: ${spacings.medium};
  color: ${colors.grey};
`