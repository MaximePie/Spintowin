import Monster from "../../molecules/Monster/Monster";
import CardsHand from "../../molecules/CardsHand/CardsHand";
import InputGroup from "../../atoms/InputGroup/InputGroup";
import {QuestDisplayProps} from "./types";
import Button from "../../atoms/Button/Button";
import {FormEvent} from "react";
import {StyledQuest, Form} from "./styles";

export default function ({answer, onUserInput, onAnswer, cards}: QuestDisplayProps) {

  return (
    <StyledQuest>
      <Monster/>
      <CardsHand cards={cards}/>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          value={answer}
          onChange={onUserInput}
          type="text"
          placeholder='Réponse'
          isIconSolid
        />
        <Button text='Attaquer' onClick={() => onAnswer()}/>
      </Form>
    </StyledQuest>
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAnswer()
  }
}