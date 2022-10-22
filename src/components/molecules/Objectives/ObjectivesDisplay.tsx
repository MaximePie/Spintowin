import React from 'react';
import { StyledObjectives } from './styles';
import { ObjectivesDisplayProps } from './types';
import Button from '../../atoms/Button/Button';

export default function ObjectivesDisplay(
  {
    numberOfCardsToLearn, onLimitDateChange, limitDate, onSubmit, cardsPerDay, objective,
  }:
    ObjectivesDisplayProps,
) {
  // Create one text input field containing the limit date of learning
  return (
    <StyledObjectives>
      <h2>Objectifs</h2>
      <p>
        Nombre de cartes à apprendre :
        {' '}
        {numberOfCardsToLearn}
      </p>
      <label htmlFor="limitDate">
        Date limite d&apos;apprentissage
        <input
          value={limitDate}
          type="text"
          onChange={(event) => onLimitDateChange(event.target.value)}
        />
      </label>
      <p>
        Objectif aujourd&apos;hui :
        <strong>{`${objective} (${cardsPerDay} par jour)`}</strong>
      </p>
      <Button text="Enregistrer" onClick={onSubmit} type="submit" />
    </StyledObjectives>
  );
}
