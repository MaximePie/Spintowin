import {CardsHandDisplayProps} from "./types";
import Card from "../Card/Card";

export default function CardsHandDisplay({cards}: CardsHandDisplayProps) {
  return (
    <div>
      {cards.map(card => (
        <Card
          data={card}
          onAnswer={() => {}}
          onUpdate={() => {}}
        />
      ))}
    </div>
  )
}