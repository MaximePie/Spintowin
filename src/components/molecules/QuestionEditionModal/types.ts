import UserCard from '../../../types/UserCard';

type QuestionEditionModalProps = {
  card: UserCard,
  isOwnerOfCard?: boolean
  onClose: Function
  isOpen: boolean
}

export default QuestionEditionModalProps;
