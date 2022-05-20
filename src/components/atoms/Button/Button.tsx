import { StyledButton } from "./styles";
import {ButtonProps} from "./types";

Button.defaultProps = {
  type: "button",
  icon: "",
  onClick: null,
}

export default function Button({variant, onClick, type, text, icon}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      type={type}
    >
      {icon && <i className={icon}/>}
      {text}
    </StyledButton>
  )
}