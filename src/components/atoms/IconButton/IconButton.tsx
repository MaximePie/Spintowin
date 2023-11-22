import { IconButtonProps } from './types';
import classnames from 'classnames';

export default function IconButton({ icon, onClick, className }: IconButtonProps) {
  const classname = classnames(icon, className);
  return (
    <i
      className={classname}
      onClick={onClick}
    />
  );
}
