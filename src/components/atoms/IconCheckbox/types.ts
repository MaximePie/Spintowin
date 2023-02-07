import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type IconCheckboxProps = {
  checked: boolean,
  onChange: (_isChecked: boolean) => void,
  icon: IconDefinition
}
type IconCheckboxDisplayProps = IconCheckboxProps & {

}

type IconProps = {
  isActive: boolean
}

export type { IconCheckboxDisplayProps, IconCheckboxProps, IconProps };
