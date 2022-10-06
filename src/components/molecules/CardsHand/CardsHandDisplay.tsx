import {CardsHandDisplayProps} from "./types";
import Card from "../Card/Card";
import { StyledCardsHand } from "./styles";

export default function CardsHandDisplay({cards, onFail}: CardsHandDisplayProps) {
  return (
    <StyledCardsHand>
      {cards.map(card => (
        <Card
          key={card._id.toString()}
          data={card}
          onAnswer={() => onFail(card._id)}
          onUpdate={() => {}}
          mode="quest"
        />
      ))}
    </StyledCardsHand>
  )
}