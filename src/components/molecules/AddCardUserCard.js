import React, {useState} from 'react';
import {getFromServer} from "../../server";
import {addNotification, CardSuccessNotification} from "../../services/notification";
import LoadingGif from "../atoms/LoadingGif"

export default function AddCardUserCard({card, onAbsorbSuccess}) {

  const [isLoading, setLoadingState] = useState(false);

  return (
    <div className="AddCardUserCard">
      {card.question && <p>{card.question}</p>}
      {!card.question && <img className="AddCardUserCard__image" src={formatedImage(card.image.data)}/>}
      <p>
        {card.answer}
      </p>
      <div className="AddCardUserCard__actions">
        <button
          disabled={card.isAssignedToConnectedUser || isLoading}
          onClick={() => absorbCard(card._id)}
        >
          <i className="fas fa-plus"/>
          <span className="AddCardUserCard__button-text">
            Ajouter
          </span>
        </button>
        <LoadingGif isLoading={isLoading} className={"AddCardUserCard__loading"}/>
      </div>
    </div>
  );


  /**
   * Add the card to the user's current collection
   * @param cardId The Id of the card we want to absorb
   */
  function absorbCard(cardId) {
    setLoadingState(true);
    getFromServer(`/userCards/absorb/${cardId}`).then(response => {
      if (response.status === 201) {
        // TODO - Afficher une notification de succès
        addNotification(CardSuccessNotification);
        onAbsorbSuccess().then(() => setLoadingState(false));
      }
      else {
        // TODO - Gérer l'erreur
      }
    })
  }

  function formatedImage(image) {
    const base64Flag = `data:${image.contentType};base64,`;
    const imageString = arrayBufferToBase64(image.data);
    return base64Flag + imageString;
  }

  /**
   * Returns the converted image
   * This function is not from me !
   * https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
   * https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
   * @param buffer
   */
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
}
