import Cards from "../../molecules/Cards";
import React from "react";
import {TrainingDisplayProps} from "./types"

export default function TrainingDisplay(props: TrainingDisplayProps) {
  const {
    remainingCards,
    fetchCards,
    isLoading,
    triggerCardUpdate,
    cards,
  } = props;

  return (
    <div>
      <Cards
        cardsList={cards}
        triggerCardUpdate={triggerCardUpdate}
        remainingCards={remainingCards}
        fetchCards={fetchCards}
        isLoading={isLoading}
      />
    </div>
  )
}