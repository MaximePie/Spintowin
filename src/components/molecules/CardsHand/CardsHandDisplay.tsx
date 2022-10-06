import {CardsHandDisplayProps} from "./types";
import Card from "../Card/Card";
import { StyledCardsHand } from "./styles";

export default function CardsHandDisplay({cards}: CardsHandDisplayProps) {
  return (
    <StyledCardsHand>
      {cards.map(card => (
        <Card
          data={card}
          onAnswer={() => {}}
          onUpdate={() => {}}
          mode="quest"
        />
      ))}
    </StyledCardsHand>
  )
}