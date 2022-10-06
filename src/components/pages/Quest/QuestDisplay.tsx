import Monster from "../../molecules/Monster/Monster";
import CardsHand from "../../molecules/CardsHand/CardsHand";
import InputGroup from "../../atoms/InputGroup/InputGroup";
import {QuestDisplayProps} from "./types";
import Button from "../../atoms/Button/Button";
import {FormEvent, useContext, useState} from "react";
import {StyledQuest, Form} from "./styles";
import {ObjectId} from "bson";
import {QuestContext} from "../../../contexts/quest";

export default function ({answer, onUserInput, onAttack, cards, onFail}: QuestDisplayProps) {
  const {ignoredCards} = useContext(QuestContext)
  return (
    <StyledQuest>
      <Monster/>
      <CardsHand cards={cards} onFail={onFail}/>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          value={answer}
          onChange={onUserInput}
          type="text"
          placeholder='Réponse'
          isIconSolid
        />
        <Button text='Attaquer' onClick={attack}/>
      </Form>
    </StyledQuest>
  )

  /**
   * Trigger onAttack event
   */
  function attack() {
    onAttack(ignoredCards);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer !== '') {
      attack()
    }
  }
}