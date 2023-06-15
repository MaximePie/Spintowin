import React from 'react';
import { Link } from 'react-router-dom';
import noCardImage from '../../../images/noCards.svg';

export default function NoCardInfo() {
  return (
    <p className="NoCardInfo">
      <h4>
        Oups, plus de cartes !
      </h4>
      <img src={noCardImage} alt="" />
      <span>
        Vous n&apos;avez plus de carte à réviser pour le moment.
      </span>
      <Link to="add">Créez-en quelques unes !</Link>
    </p>
  );
}
