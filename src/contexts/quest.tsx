import {createContext, ReactNode, useState} from "react";
import {ObjectId} from "bson";


type Props = {
  children: ReactNode;
}
type Context = {
  ignoredCards: ObjectId[],
  ignore: (cardId: ObjectId) => void
}

const defaultValue: Context = {
  ignoredCards: [],
  ignore: (cardId: ObjectId) => {}
}

export const QuestContext = createContext(defaultValue);

export function QuestContextProvider({children}: Props) {
  const [ignoredCards, setIgnoredCards] = useState<ObjectId[]>([]);

  return (
    <QuestContext.Provider value={{ignoredCards, ignore}}>
      {children}
    </QuestContext.Provider>
  )

  /**
   * Add card to ignored possible answers
   * @param cardId
   */
  function ignore(cardId: ObjectId) {
    setIgnoredCards(ignoredCards => [...ignoredCards, cardId]);
  }
}