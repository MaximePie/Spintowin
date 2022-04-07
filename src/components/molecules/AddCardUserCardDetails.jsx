import React, {memo} from 'react';

const AddCardUserCardDetails = function ({card}) {
  return (
    <>
      {card.question && <p>{card.question}</p>}
      {!card.question &&
      <img alt="questionCard" className="AddCardUserCard__image" src={formatedImage(card.image.data)}/>}
      <p>
        {card.answer}
      </p>
    </>
  );


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
  }
}

export default memo(AddCardUserCardDetails, () => true);
