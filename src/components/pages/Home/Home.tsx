import React from 'react';
import { Link } from 'react-router-dom';
import { ObjectID } from 'bson';
import Card from '../../molecules/Card/Card';
import UserCard from '../../../types/UserCard';

function dummyCards(): UserCard[] {
  return [
    {
      _id: new ObjectID(),
      cardId: new ObjectID(),
      currentDelay: 0,
      question: `Eurekard est une application web qui vous
          permet d'apprendre de manière ludique et efficace.`,
      answer: 'Elle vous permet de créer des cartes de connaissances, de les réviser et de les partager',
      hints: ['hint1', 'hint2'],
      isOwnerOfCard: false,
      category: 'category',
      currentSuccessfulAnswerStreak: 0,
    },
    {
      _id: new ObjectID(),
      cardId: new ObjectID(),
      currentDelay: 0,
      question: 'Un algorithme de révision adaptatif',
      answer: 'Pour permettre un entraînement efficace et optimisée',
      hints: ['Perfectionné pour vos besoins', 'Le meilleur algorithme de révision'],
      isOwnerOfCard: false,
      category: 'category',
      currentSuccessfulAnswerStreak: 0,
    },
    {
      _id: new ObjectID(),
      cardId: new ObjectID(),
      currentDelay: 0,
      question: 'Ajoutez une carte en quelques secondes',
      answer: 'Le programme s\'occupe du reste',
      isOwnerOfCard: false,
      category: 'category',
      currentSuccessfulAnswerStreak: 0,
    },
    {
      _id: new ObjectID(),
      cardId: new ObjectID(),
      currentDelay: 0,
      question: "L'entraînement devient facile",
      answer: 'Ne laissez plus votre apprentissage au hasard. Voulez-vous commencer à apprendre ?',
      isOwnerOfCard: false,
      category: 'category',
      currentSuccessfulAnswerStreak: 0,
    },
  ];
}

export default function Home() {
  const [cards, setCards] = React.useState<UserCard[]>(dummyCards());
  return (
    <div className="Home">
      <div className="Home__left">
        <div className="Home__Cards">
          <div className="Home__CallToAction" />
          <div className="Home__CallToAction Home__CallToAction--delayed" />
          <Card
            key={cards[0]._id.toHexString()}
            data={cards[0]}
            onAnswer={removeFirst}
            onUpdate={removeFirst}
            mode="training"
            className={cards.length === 1 ? 'Home__Card Home__Card--last' : 'Home__Card'}
          />
        </div>
      </div>
      <div className="Home__right">
        <h2>La plus puissante des méthodes d&apos;apprentissage</h2>
        <p className="Home__actions">
          <Link className="Home__action--login" to="/login">Connectez-vous</Link>
          <Link className="Home__action--register" to="/register">Créez un compte</Link>
        </p>
      </div>

    </div>
  );

  function removeFirst() {
    if (cards.length === 1) {
      // Redirect to /register
      document.location.href = '/register';
      return;
    }
    setCards([...cards].slice(1));
  }
}
