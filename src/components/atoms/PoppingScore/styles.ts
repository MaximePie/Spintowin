
import styled from "styled-components";
import {colors, spacings} from "../../../style/StyledComponents/variables";
export const StyledPoppingScore = styled.span`
  position: absolute;
  color: ${colors.success};
  font-weight: bold;

  left: 50%;
  top: ${spacings.small};
  transform: translateX(-50%);
  
`

