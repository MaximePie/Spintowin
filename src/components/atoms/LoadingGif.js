import React from 'react';
import loadingGif from "../../images/loadinggif.gif"
import classNames from "classnames";

export default function LoadingGif({isLoading, className}) {

  const classNamesList = classNames('LoadingGif', className);

  return isLoading && (
    <img className={classNamesList} src={loadingGif} alt="Loading"/>
  );
}

