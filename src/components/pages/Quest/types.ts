import { ChangeEventHandler, FormEvent } from 'react';
import { ObjectID } from 'bson';
import UserCard from '../../../types/UserCard';

export type QuestDisplayProps = {
  answer: string,
  onUserInput: ChangeEventHandler,
  onAttack: () => void,
  onSubmit: (_event: FormEvent<HTMLFormElement>) => void,
  onFail: (_cardId: ObjectID) => void,
  cards: UserCard[],
}
