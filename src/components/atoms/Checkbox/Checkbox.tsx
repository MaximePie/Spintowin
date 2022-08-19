import React from "react"
import CheckboxDisplay from "./CheckboxDisplay"
import {CheckboxProps} from "./types";

export default function Checkbox(props: CheckboxProps) {
  const {label, checked, onChange} = props
  return (
    <CheckboxDisplay label={label} checked={checked} onChange={onChange}/>
  )
}
