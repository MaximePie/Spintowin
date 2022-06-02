import {ChangeEventHandler} from "react";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

export type InputGroupProps = {
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  className?: string,
  placeholder: string,
  type?: string,
  icon?: IconDefinition,
  isIconSolid?: boolean
}