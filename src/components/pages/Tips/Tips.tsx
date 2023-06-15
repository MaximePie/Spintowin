import React from 'react';
import ReactTooltip from 'react-tooltip';

export default function Tips() {
  return (
    <div>
      <h1>Astuces</h1>
      <p>
        Cette page propose diverses astuces pour mieux comprendre votre mémoire.
        Elle est toujours en cours de construction, n&apos;hésitez pas à revenir plus tard !
      </p>

      <ul>
        <li>
          Travaillez vos cartes par petits paquets avant d&apos;en commencer de nouvelles
        </li>
        <li>
          Oublier ne fait rien perdre. N&apos;ayez pas peur !
        </li>
        <li>
          Utilisez les moyens mnémotechniques en survolant sur le bouton
          <ReactTooltip id="hint" place="top" type="dark" effect="solid" multiline />
          <span
            className="AddCardForm__hint"
            data-tip="Passez la souris dessus | cliquez sur le crayon pour ajouter de nouvelles astuces"
            data-for="hint"
            data-iscapture="true"
          >
            <i className="far fa-question-circle" />
          </span>
        </li>
      </ul>
    </div>
  );
}
