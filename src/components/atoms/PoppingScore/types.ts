import { Coordinates } from '../../../contexts/poppingScore';

type PoppingScoreProps = {
}
type PoppingScoreDisplayProps = PoppingScoreProps & {
  score: number
  coordinates: Coordinates,
  hasSparkles: boolean,
}

export type { PoppingScoreDisplayProps, PoppingScoreProps };
