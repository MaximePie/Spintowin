import { ObjectID } from 'bson';

type HintProps = {
  hints: string[]
  cardId: ObjectID
}
type HintDisplayProps = HintProps & {

}

export type { HintDisplayProps, HintProps };
