import { Coordinates } from '../../../contexts/poppingScore';

type PoppingScoreProps = {
}
type PoppingScoreDisplayProps = PoppingScoreProps & {
  score: number
  coordinates: Coordinates
}

export type { PoppingScoreDisplayProps, PoppingScoreProps };
