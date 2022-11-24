import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ChangeEventHandler } from 'react';

type IconCheckboxProps = {
  checked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
  icon: IconDefinition
}
type IconCheckboxDisplayProps = IconCheckboxProps & {

}

type IconProps = {
  isActive: boolean
}

export type { IconCheckboxDisplayProps, IconCheckboxProps, IconProps };
