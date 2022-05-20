import styled from "styled-components";
import {cardStyle, colors, flex, modalContainer, spacings} from "../../../style/StyledComponents/variables";

export const ModalContainer = styled.div`
  ${modalContainer}
`

export const Modal = styled.div`
  width: 800px;
  height: 500px;
  background-color: white;
  position: relative;

  ${cardStyle};
`

export const CloseButton = styled.span`
  position: absolute;
  top: 0.5rem;
  right: ${spacings.oldMedium};
  color: ${colors.grey};
`

export const Form = styled.form`
  height: 80%;
  ${flex('column')};
`

export const Fields = styled.div`
  ${flex('column', 'baseline', 'initial')};
`

export const Field = styled.div`
  ${flex('column', 'baseline', 'initial')};
`

export const Actions = styled.div`
  display: flex;
`