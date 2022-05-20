import styled from "styled-components";
import {colors, spacings} from "../../../style/StyledComponents/variables";

const {oldMedium} = spacings;
const {primary} = colors;

export const StyledIconButton = styled.i`
  margin-left: ${oldMedium};
  color: ${primary};

  // Behavior
  cursor: pointer;
`