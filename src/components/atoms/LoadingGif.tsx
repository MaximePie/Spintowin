import React from 'react';
import classNames from 'classnames';

const loadingGif = 'https://eurekard.s3.eu-west-3.amazonaws.com/loading.gif';

type LoadingGifProps = {
  isLoading: boolean,
  className: string,
}

export default function LoadingGif({ isLoading, className }: LoadingGifProps) {
  const classNamesList = classNames('LoadingGif', className);
  if (isLoading) {
    return <img className={classNamesList} src={loadingGif} alt="Loading" />;
  }

  return null;
}
