import {ChangeEventHandler} from "react";

type CheckboxProps = {
  label: string,
  checked: boolean,
  onChange: (isChecked: boolean) => void,
}
type CheckboxDisplayProps = CheckboxProps & {
}

export type {CheckboxDisplayProps, CheckboxProps}

