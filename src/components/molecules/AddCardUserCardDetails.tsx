import React, { memo } from 'react';
import UserCard from '../../types/UserCard';
import ImageType from '../../types/ImageType';

type AddCardUserCardDetailsProps = {
  card: UserCard
}

function AddCardUserCardDetails({ card }: AddCardUserCardDetailsProps) {
  return (
    <>
      {card.question && <p>{card.question}</p>}
      {!card.question
      && <img alt="questionCard" className="AddCardUserCard__image" src={formatedImage(card.image)} />}
      <p>
        {card.answer}
      </p>
    </>
  );

  function formatedImage(imageData: ImageType) {
    const base64Flag = `data:${imageData.contentType};base64,`;
    const imageString = arrayBufferToBase64(imageData.data.data);
    return base64Flag + imageString;
  }

  /**
   * Returns the converted image
   * This function is not from me !
   * https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
   * https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
   * @param buffer
   */
  function arrayBufferToBase64(buffer: Iterable<number>) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return window.btoa(binary);
  }
}

export default memo(AddCardUserCardDetails, () => true);
