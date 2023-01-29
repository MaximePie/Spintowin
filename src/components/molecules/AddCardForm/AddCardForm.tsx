import React, {
  ChangeEvent, FormEvent, useContext, useEffect, useState,
} from 'react';
import { faQuestion, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Store } from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';
import { OnChangeValue } from 'react-select';
import InputGroup from '../../atoms/InputGroup/InputGroup';
import CategorySelect from '../../atoms/CategorySelect';

import { postOnServer } from '../../../services/server';
import { addCardFailureNotification, addNotification, CardSuccessNotification } from '../../../services/notification';
import { viewportContext } from '../../../contexts/viewport';
import { UserContext } from '../../../contexts/user';
import { Field } from './styles';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import ExcelUpload from '../../atoms/ExcelUpload/ExcelUpload';

export default function AddCardForm() {
  const userContext = useContext(UserContext);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState<Blob>({} as Blob);
  const [category, setCategory] = useState<string | null>(userContext.selectedCategory || null);
  const [shouldCreateReverseQuestion, setCreateReverseQuestionState] = useState(false);
  const [displayedImage, setDisplayedImage] = useState<string>('');
  const [isLoading, setLoadingState] = useState(false);

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
    <div className="AddCardForm">
      <ReactTooltip id="main" place={tooltipPlace} type="dark" effect="solid" multiline />
      <ExcelUpload />
      <h3>
        Ajouter une question
        <a
          className="AddCardForm__hint"
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
        <div className="AddCardForm__fields">
          <CategorySelect
            onSelectMultiple={() => {}}
            onSelect={handleCategorySelection}
            variant="creatable"
            value={category}
          />
          <div className="AddCardForm__subfields">
            <div className={`AddCardForm__subfield-field ${isImageLoaded && 'AddCardForm__subfield-field--disabled'}`}>
              <label>
                Question
                <InputGroup
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  icon={faQuestion}
                  isIconSolid
                  placeholder="Quelle est la taille d'un castor ?"
                  className="AddCardForm__field"
                />
              </label>
            </div>
            <div className="AddCardForm__subfield-field">
              <div>
                {isImageLoaded && (
                  <span
                    onClick={() => setImage({} as Blob)}
                    className="AddCardForm__remove-image"
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
                    className="AddCardForm__image-field fileInput"
                    type="file"
                    onChange={updateImage}
                  />
                  {isImageLoaded && (
                    <>
                      <img className="AddCardForm__image-field" src={displayedImage} alt="" />
                      {image?.size >= 1000000 && <p>L&apos;image est trop lourde. 1Mo maximum</p>}
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="AddCardForm__field">
              Réponse
              <InputGroup
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                icon={faLightbulb}
                isIconSolid
                placeholder="80 - 100 cm"
                className="AddCardForm__field"
              />
            </label>
            {!displayedImage && (
              <Field>
                <Checkbox
                  checked={shouldCreateReverseQuestion}
                  onChange={(isChecked) => setCreateReverseQuestionState(isChecked)}
                  label="Créer une question inverse"
                />
              </Field>
            )}
          </div>
        </div>
        <div className="AddCardForm__actions">
          <button
            className="AddCardForm__submit"
            type="submit"
            disabled={!isValid || isLoading}
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
   * Redirects the user on YouTube link if he is on desktop
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
    setLoadingState(true);
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
    formData.append('shouldCreateReverseQuestion', shouldCreateReverseQuestion.toString());
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
        setLoadingState(false);
      } else {
        // @ts-ignore
        const { message } = response;
        console.error(message);
        Store.addNotification({
          ...addCardFailureNotification,
          message: addCardFailureNotification.message + message,
        });
      }
    });
  }
}
