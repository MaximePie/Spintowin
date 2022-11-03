import React from 'react';
import Monster from '../../molecules/Monster/Monster';
import CardsHand from '../../molecules/CardsHand/CardsHand';
import InputGroup from '../../atoms/InputGroup/InputGroup';
import { QuestDisplayProps } from './types';
import Button from '../../atoms/Button/Button';
import { StyledQuest, Form } from './styles';

export default function QuestDisplay({
  answer, onUserInput, onAttack, cards, onFail, onSubmit,
}: QuestDisplayProps) {
  return (
    <StyledQuest>
      <Monster />
      <CardsHand cards={cards} onFail={onFail} />
      <Form onSubmit={onSubmit}>
        <InputGroup
          value={answer}
          onChange={onUserInput}
          type="text"
          placeholder="Réponse"
          isIconSolid
        />
        <Button text="Attaquer" onClick={() => onAttack()} />
      </Form>
    </StyledQuest>
  );
}
