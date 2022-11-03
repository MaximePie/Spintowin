import CardsHandDisplay from "./CardsHandDisplay"
import {CardsHandProps} from "./types";

export default function CardsHand({cards, onFail}: CardsHandProps) {

  return (
    <div>
      <CardsHandDisplay
        cards={cards}
        onFail={onFail}
      />
    </div>
  )
}