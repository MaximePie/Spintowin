import React from 'react';
import axios from "axios";

export default function AddCard() {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [image, setImage] = React.useState(undefined);

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
                onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))}
              />
              {image && (
                <img className="AddCard__image-field" src={image} alt=""/>
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

  function saveQuestion() {

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    const questionBody = {
      question,
      answer,
      files: null,
    };

    formData.append('state', JSON.stringify(questionBody));


    axios.post(
      `${process.env.BASE_URL}/cards`,
      formData
    ).then(() => {
      setQuestion('');
      setAnswer('');
    })
  }
}
