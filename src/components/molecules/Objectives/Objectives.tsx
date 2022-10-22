import React, { useContext } from 'react';
import moment from 'moment';
import ObjectivesDisplay from './ObjectivesDisplay';
import { UserContext } from '../../../contexts/user';
import { postOnServer } from '../../../services/server';
import { addNotification, userPreferencesSavedNotification } from '../../../services/notification';

export default function Objectives() {
  // get limit date from user context
  const { user: { limitDate: initialDate, remainingCards = 0 } } = useContext(UserContext);
  const [limitDate, setLimitDate] = React.useState<string | undefined>(moment(initialDate).format('DD/MM/YYYY') || undefined);

  // Calculate the number of cards to learn per day to reach the limit date
  const cardsPerDay = Math.round(remainingCards / moment(limitDate, 'DD/MM/YYYY').diff(moment(), 'days'));
  const objective = remainingCards - cardsPerDay;

  return (
    <ObjectivesDisplay
      onLimitDateChange={updateDate}
      limitDate={limitDate || ''}
      onSubmit={save}
      numberOfCardsToLearn={remainingCards || 0}
      cardsPerDay={cardsPerDay || 0}
      objective={objective || 0}
    />
  );

  /**
   * Update user by sending the new limit date to the api
   */
  function save() {
    if (limitDate) {
      // Update user by sending the new limit date to the api
      postOnServer('/users/connectedUser/preferences/update', {
        limitDate,
      }).then(() => {
        // show success notification
        addNotification(userPreferencesSavedNotification);
      });
    }
  }

  /**
   * Update the date state
   * @param newDate
   */
  function updateDate(newDate: string) {
    setLimitDate(newDate);
  }
}
