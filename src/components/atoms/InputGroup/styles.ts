import styled from "styled-components";
import {colors, spacings} from "../../../style/StyledComponents/variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const StyledInputGroup = styled.div`
  margin: ${spacings.smaller} 0;
`

export const Icon = styled(FontAwesomeIcon)`
  color: ${colors.gray};
  font-size: 0.8em;
  margin-right: ${spacings.smaller};
  vertical-align: text-bottom;
`

export const StyledInput = styled.input`
  min-width: 220px;
  outline: none;

  border: none;
  border-bottom: 1px lightblue solid;
  padding: ${spacings.smaller} 0;
  margin: 0.25rem;
  
  &.placeholder {
    color: ${colors.gray};
  }
`