import React, {
  ChangeEvent, FormEvent, useContext, useEffect, useState,
} from 'react';
import { Store } from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';
import { OnChangeValue } from 'react-select';
import { postOnServer } from '../../services/server';
import { addCardFailureNotification, addNotification, CardSuccessNotification } from '../../services/notification';
import InputGroup from '../atoms/InputGroup';
import CategorySelect from '../atoms/CategorySelect';
import { viewportContext } from '../../contexts/viewport';
import { UserContext } from '../../contexts/user';

export default function AddCardForm() {
  const userContext = useContext(UserContext);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState<Blob>({} as Blob);
  const [category, setCategory] = useState<string | null>(userContext.selectedCategory || null);
  const [displayedImage, setDisplayedImage] = useState<string>('');

  const [isTooltipDisplayed, setTooltipDisplayState] = useState(false);
  const { isMobile } = useContext(viewportContext);
  const tooltipPlace = isMobile ? 'bottom' : 'top';

  useEffect(() => {
    userContext.setSelectedCategory(category);
  }, [category]);

  let isValid = (question || image) && !!answer;
  if (image?.size >= 1000000) {
    isValid = false;
  }

  const isImageLoaded = !!image.size;

  return (
    <div className="AddCard">
      <ReactTooltip id="main" place={tooltipPlace} type="dark" effect="solid" multiline />
      <h3>
        Ajouter une question
        <a
          className="AddCard__hint"
          data-for="main"
          data-tip="Besoin d'aide ?<br />Cliquez ici pour découvrir<br />comment ajouter vos premières questions"
          data-iscapture="true"
          href="https://www.youtube.com/watch?v=JK9N84UqexA"
          onClick={handleHintClick}
        >
          <i className="far fa-question-circle" />
        </a>
      </h3>
      <form onSubmit={saveQuestion}>
        <div className="AddCard__fields">
          <CategorySelect
            onSelectMultiple={() => {}}
            onSelect={handleCategorySelection}
            variant="creatable"
            value={category}
          />
          <div className="AddCard__subfields">
            <div className={`AddCard__subfield-field ${isImageLoaded && 'AddCard__subfield-field--disabled'}`}>
              <label>
                Question
                <InputGroup
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  icon="question"
                  isIconSolid
                  placeholder="Quelle est la taille d'un castor ?"
                  className="AddCard__field"
                />
              </label>
            </div>
            <div className="AddCard__subfield-field">
              <div>
                {isImageLoaded && (
                  <span
                    onClick={() => setImage({} as Blob)}
                    className="AddCard__remove-image"
                    onKeyUp={
                    (event) => event.key === 'enter' && setImage({} as Blob)
                  }
                    role="button"
                    tabIndex={0}
                  >
                    X
                  </span>
                )}
                <label
                  className={`fileLabel ${!image && 'fileLabel--empty'} ${question && 'AddCard__subfield-field--disabled'}`}
                >
                  🖼️ Image
                  <input
                    className="AddCard__image-field fileInput"
                    type="file"
                    onChange={updateImage}
                  />
                  {isImageLoaded && (
                    <>
                      <img className="AddCard__image-field" src={displayedImage} alt="" />
                      {image?.size >= 1000000 && <p>L&apos;image est trop lourde. 1Mo maximum</p>}
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="AddCard__field">
              Réponse
              <InputGroup
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                icon="lightbulb"
                isIconSolid
                placeholder="80 - 100 cm"
                className="AddCard__field"
              />
            </label>
          </div>
        </div>
        <div className="AddCard__actions">
          <button
            className={`AddCard__submit ${!isValid && 'AddCard__submit--disabled'}`}
            type="submit"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );

  /**
   * Update the selected category with the given value
   * @param newValue
   */
  function handleCategorySelection(
    newValue: OnChangeValue<{ value: string, label: string }, false>,
  ) {
    if (newValue) {
      setCategory(newValue.value);
    }
  }

  /**
   * Redirects the user on Youtube link if he is on desktop
   * Else,
   *  if the tooltip is open, redirects
   *  else, display the tooltip.
   */
  function handleHintClick() {
    if (isMobile && !isTooltipDisplayed) {
      setTooltipDisplayState(true);
      setTimeout(() => {
        setTooltipDisplayState(false);
      }, 2000);
    }
  }

  function updateImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImage(event.target.files[0]);
      setDisplayedImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  function saveQuestion(event: FormEvent | null = null) {
    if (event) {
      event.preventDefault();
    }
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    formData.append('question', question);
    formData.append('answer', answer);
    if (category) {
      formData.append('category', category.toString());
    }
    postOnServer(
      '/cards',
      formData,
    ).then((response) => {
      if (response.status === 200) {
        addNotification(CardSuccessNotification);
        setQuestion('');
        setAnswer('');
        setImage({} as Blob);
        setDisplayedImage('');
      } else {
        // @ts-ignore
        const { message } = response;
        Store.addNotification({
          ...addCardFailureNotification,
          message: addCardFailureNotification.message + message,
        });
      }
    });
  }
}
