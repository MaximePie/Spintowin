import React from 'react';
import { Link } from 'react-router-dom';

export default function NoCardInfo() {
  return (
    <p className="NoCardInfo">
      <span>
        Vous n&apos;avez plus de carte à réviser pour le moment.
      </span>
      <Link to="add">créez-en quelques unes</Link>
      {' '}
      !
    </p>
  );
}
