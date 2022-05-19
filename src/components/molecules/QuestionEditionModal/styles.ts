import styled from "styled-components";
import {cardStyle, colors, flex, shapes, spacings} from "../../../style/StyledComponents/variables";

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #00000080;
  width: 100vw;
  height: 100vh;
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
  right: ${spacings.default};
  color: ${colors.grey};
`

type ButtonProps = {
  variant: keyof typeof colors,
}

export const Button = styled.button<ButtonProps>`
  // Positionning
  margin: ${spacings.default};
  
  // Shape
  border-radius: ${shapes.borders.radius.small};
  outline: none;
  border: none;
  height: 32px;
  min-width: 64px;
  
  // Content
  padding: ${spacings.small} ${spacings.default};
  background-color: ${({variant}) => colors[variant]};
  color: ${colors.white};



  // Behavior
  cursor: pointer;
  transition: filter 150ms ease-in-out;

  i {
    margin-right: ${spacings.medium};
  }
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