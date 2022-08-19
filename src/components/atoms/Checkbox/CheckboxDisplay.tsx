import React from "react";
import {StyledCheckbox, Input} from "./styles";
import {CheckboxDisplayProps} from "./types";

export default function CheckboxDisplay(props: CheckboxDisplayProps) {
  const {label, checked, onChange} = props;
  return (
    <StyledCheckbox>
      {label}
      <Input
        type="checkbox"
        checked={checked}
        onChange={({target: {checked}}) => onChange(checked)}
      />
    </StyledCheckbox>
  )
}

