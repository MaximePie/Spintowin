import Monster from "../../molecules/Monster/Monster";
import CardsHand from "../../molecules/CardsHand/CardsHand";
import InputGroup from "../../atoms/InputGroup/InputGroup";
import {QuestDisplayProps} from "./types";
import Button from "../../atoms/Button/Button";

export default function ({answer, onUserInput, onAnswer, cards}: QuestDisplayProps) {


  return (
    <div>
      <Monster/>
      <CardsHand cards={cards}/>
      <InputGroup
        value={answer}
        onChange={onUserInput}
        type="text"
        placeholder='Réponse'
        isIconSolid
      />
      <Button text='Attaquer' onClick={() => onAnswer()}/>
    </div>
  )
}