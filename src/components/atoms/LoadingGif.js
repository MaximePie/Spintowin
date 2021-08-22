import React from 'react';
import loadingGif from "../../images/loading.gif"
import classNames from "classnames";

export default function LoadingGif({isLoading, className}) {

  const classNamesList = classNames('LoadingGif', className);

  return isLoading && (
    <img className={classNamesList} src={loadingGif} alt="Loading"/>
  );
}

