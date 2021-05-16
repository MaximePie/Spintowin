import React from 'react';
import {postOnServer} from "../../server";
import {addCardFailureNotification, addCardSuccessNotification} from "../../services/notification";
import { store } from 'react-notifications-component';

export default function AddCard() {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [image, setImage] = React.useState(undefined);
  const [displayedImage, setDisplayedImage] = React.useState(undefined);

  const isValid = (question || image) && answer;

  return (
    <div className="AddCard">
      <h3>Ajouter une question</h3>
      <div className="AddCard__fields">
        <div className="AddCard__subfields">
          <label className={`AddCard__subfield-field ${image && 'AddCard__subfield-field--disabled'}`}>
            ❓ Question
            <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)}/>
          </label>
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
            </label>
            </div>
          </div>
        </div>
        <label className="AddCard__field">
          Réponse
          <input type="text" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
        </label>
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
    console.log(event.target.files[0]);
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
        store.addNotification(addCardSuccessNotification);
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
