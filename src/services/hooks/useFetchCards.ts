import cards from "../../data/cards";
import {useQuery, useQueryClient} from "react-query";
import {TrainingCardsQuery} from "../../components/pages/Training/types";
import {getFromServer} from "../server";

export default function () {
  const queryClient = useQueryClient();
  const {data, isLoading, error} = useQuery<TrainingCardsQuery>('cards', fetchCards)

  return {
    data,
    isLoading,
    error,
    refetch
  }


  function fetchCards() {
    return getFromServer('/userCards').then(({data}) => data);
  }

  function refetch(updatedCards: typeof cards) {
    const remainingCards = data?.remainingCards || 0;
    queryClient.setQueryData('cards', {
      cards: updatedCards,
      remainingCards
    });
    queryClient.cancelQueries('cards').then(() => {
      queryClient.invalidateQueries('cards').then(null)
    });
  }
}