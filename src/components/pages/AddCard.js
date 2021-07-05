import React from 'react';
import {postOnServer} from "../../server";
import {addCardFailureNotification, CardSuccessNotification, addNotification} from "../../services/notification";
import { store } from 'react-notifications-component';
import InputGroup from "../atoms/InputGroup";

export default function AddCard() {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [image, setImage] = React.useState(undefined);
  const [displayedImage, setDisplayedImage] = React.useState(undefined);

  let isValid = (question || image) && answer;
  if (image?.size >= 1000000) {
    isValid = false;
  }

  return (
    <div className="AddCard">
      <h3>Ajouter une question</h3>
      <h4>
        Besoin d'aide ?
        <a href="/https://www.youtube.com/watch?v=JK9N84UqexA">{` Cette vidéo`}</a> devrait faire l'affaire !
      </h4>
      <div className="AddCard__fields">
        <div className="AddCard__subfields">
          <div className={`AddCard__subfield-field ${image && 'AddCard__subfield-field--disabled'}`}>
            <label>
              Question
            </label>
            <InputGroup
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              icon="question"
              isIconSolid
              placeholder="Quelle est la taille d'un castor ?"
              className="AddCard__field"
            />
          </div>
          <div className="AddCard__subfield-field">
            <div>
              {image && (
                <span
                  onClick={() => setImage(undefined)}
                  className="AddCard__remove-image"
                >
                  X
                </span>
              )}
            <label className={`fileLabel ${!image && 'fileLabel--empty'} ${question && 'AddCard__subfield-field--disabled'}`}>
              🖼️ Image
              <input
                className="AddCard__image-field fileInput"
                type="file"
                onChange={updateImage}
              />
              {image && (
                <img className="AddCard__image-field" src={displayedImage} alt=""/>
              )}
              {image?.size >= 1000000 && <p>L'image est trop lourde. 1Mo maximum</p>}
            </label>
            </div>
          </div>
        </div>
        <div>
          <label className="AddCard__field">
            Réponse
          </label>
          <InputGroup
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            icon="lightbulb"
            isIconSolid
            placeholder="80 - 100 cm"
            className="AddCard__field"
          />
        </div>
      </div>
      <div className="AddCard__actions">
        <button
          onClick={saveQuestion}
          className={`AddCard__submit ${!isValid && "AddCard__submit--disabled"}`}
        >
          Envoyer
        </button>
      </div>
    </div>
  );

  function updateImage(event) {
    setImage(event.target.files[0]);
    setDisplayedImage(URL.createObjectURL(event.target.files[0]))
  }

  function saveQuestion() {

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    formData.append('question', question);
    formData.append('answer', answer);
    postOnServer(
      `/cards`,
      formData
    ).then((response) => {
      if (response.status === 200) {
        addNotification(CardSuccessNotification);
        setQuestion('');
        setAnswer('');
        setImage(undefined);
        setDisplayedImage(undefined);
      }
      else {
        store.addNotification({
          ...addCardFailureNotification,
          message: addCardFailureNotification.message + response.message,
        });
      }
    })
  }
}
