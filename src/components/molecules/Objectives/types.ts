type ObjectivesProps = {

}
type ObjectivesDisplayProps = {
  numberOfCardsToLearn: number;
  onLimitDateChange: (_date: string) => void;
  limitDate: string;
  onSubmit: () => void;
  cardsPerDay: number;
  objective: number;
}

export type { ObjectivesDisplayProps, ObjectivesProps };
