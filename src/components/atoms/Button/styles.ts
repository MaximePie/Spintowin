import styled from "styled-components";
import {colors, shapes, spacings} from "../../../style/StyledComponents/variables";
import { StyledButtonProps} from "./types";

export const StyledButton = styled.button<StyledButtonProps>`
  // Positionning
  margin: ${spacings.medium};
  
  // Shape
  border-radius: ${shapes.borders.radius.small};
  outline: none;
  border: none;
  height: 32px;
  min-width: 64px;
  
  // Content
  padding: ${spacings.smaller} ${spacings.medium};
  background-color: ${({variant}) => colors[variant || 'primary']};
  color: ${colors.white};



  // Behavior
  cursor: pointer;
  transition: filter 150ms ease-in-out;

  i {
    margin-right: ${spacings.medium};
  }
`
