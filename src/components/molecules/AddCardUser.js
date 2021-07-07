import React, {useEffect, useState} from 'react';
import {getFromServer} from "../../server";
import {addNotification, CardSuccessNotification} from "../../services/notification";

export default function AddCardUser({userId}) {

  // The cards of the user
  const [cards, setCards] = useState([]);
  const [isLoading, setLoadingState] = useState(false);

  // Trigger the fetch method at the beginning of the component lifeCycle, and when the userId changes
  useEffect(fetchUserInfo, [userId]);

  return (
    <div className="AddCardUser">
      {((isLoading && cards.length) || (!isLoading)) && (
        <>
          {cards?.map(card => (
            <div className="AddCardUser__card">
              {card.question && <p>{card.question}</p>}
              {!card.question && <img className="AddCardUser__card-image" src={formatedImage(card.image.data)}/>}
              <p>
                {card.answer}
              </p>
              <button
                disabled={card.isAssignedToConnectedUser}
                onClick={() => absorbCard(card._id)}
              >
                <i className="fas fa-plus"/>Ajouter
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );

  /**
   * Add the card to the user's current collection
   */
  function absorbCard(cardId) {
    getFromServer(`/userCards/absorb/${cardId}`).then(response => {
      if (response.status === 201) {
        // TODO - Afficher une notification de succès
        addNotification(CardSuccessNotification);
        fetchUserInfo()
      }
      else {
        // TODO - Gérer l'erreur
      }
    })
  }

  /**
   * Fetches the info relative to the user
   */
  function fetchUserInfo() {
    setLoadingState(true);
    getFromServer(`/userCards/list/${userId}`).then(({status, data}) => {
      setLoadingState(false);
      console.log(cards);
      if (status === 200) {
        setCards(data.cards);
      }
      else {
        // TODO - Handle error
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
