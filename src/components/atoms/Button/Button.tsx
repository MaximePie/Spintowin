import { StyledButton } from "./styles";
import {ButtonProps} from "./types";

Button.defaultProps = {
  type: "button",
  icon: "",
  onClick: null,
  variant: "primary",
  className: '',
}

export default function Button({className, variant, onClick, type, text, icon}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      type={type}
      className={className}
    >
      {icon && <i className={icon}/>}
      {text}
    </StyledButton>
  )
}