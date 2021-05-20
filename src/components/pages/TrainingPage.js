import React, {useEffect, useRef, useState} from 'react';
import Cards from "../molecules/Cards";
import Profile from "../molecules/Profile";
import {getFromServer, postOnServer} from "../../server";
import {intervals} from "../../data/cards";
import {levelUpNotification} from "../../services/notification"
import { store } from 'react-notifications-component';

/**
 * This custom hooks returns the previous value of the ref.
 * It has an effect in hit which allows the previous value to update.
 * @param value
 */
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });
  const previousValue = ref.current;
  return previousValue;
}


export default function TrainingPage() {
  const [cardsList, setCardsList] = useState([]);
  const [user, setUser] = useState({});
  const previousLength = usePrevious(cardsList.length);

  useEffect(() => {
    if (previousLength === undefined) {
      fetchCards()
    }
  }, [cardsList, previousLength]);

  useEffect(fetchUserData, []);


  return (
    <div className="TrainingPage">
      <Profile user={user}/>
      <Cards cardsList={cardsList} triggerCardUpdate={triggerCardUpdate}/>
    </div>
  );



  function fetchCards() {
    getFromServer('/cards').then(({data}) => {
      if (data.cards) {
        setCardsList([...cardsList, ...data.cards]);
      } else {
        setCardsList([]);
      }
    })
  }

  // TODO - Remove this method and restore the previous function with parameterss
  function getOneCard() {
    getFromServer('/cards/getOne').then(({data}) => {
      if (data.cards) {
        setCardsList([...cardsList, ...data.cards]);
      }
    })
  }

  function fetchUserData() {
    getFromServer('/users/connectedUser').then(({data}) => {
      const { user: userData } = data;
      const {experience, level, username} = userData;
      if (user.level && level !== user.level) {
        store.addNotification(levelUpNotification)
      }

      setUser({
        experience,
        level,
        username,
      })
    })
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card) {
    postOnServer(`/cards/${card._id}`, {newDelay: card.currentDelay || intervals[1]}).then(() => {
      getOneCard();
      fetchUserData();
    });
  }
}
