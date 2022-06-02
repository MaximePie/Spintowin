import CardsHandDisplay from "./CardsHandDisplay"
import {CardsHandProps} from "./types";

export default function CardsHand({cards}: CardsHandProps) {

  return (
    <div>
      <CardsHandDisplay
        cards={cards}
      />
    </div>
  )
}