import React, {useEffect, useState} from 'react';
import {getFromServer} from "../../server";
import AddCardUserCard from "./AddCardUserCard";

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
            <AddCardUserCard card={card} onAbsorbSuccess={fetchUserInfo}/>
          ))}
        </>
      )}
    </div>
  );

  /**
   * Fetches the info relative to the user
   */
  async function fetchUserInfo() {
    setLoadingState(true);
    await getFromServer(`/userCards/list/${userId}`).then(({status, data}) => {
      setLoadingState(false);
      if (status === 200) {
        setCards(data.cards);
      }
      else {
        // TODO - Handle error
      }
    })
  }
}
