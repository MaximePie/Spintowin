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
      hints: ['Ajoutez des catégories', 'Partagez avec des ami*s'],
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
      answer: 'Le programme vous interroge sur les connaissances que vous souhaitez apprendre',
      isOwnerOfCard: false,
      hints: ['Apprenez vite', "N'oubliez plus"],
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

/**
 * Returns 3 cards with the following info
 * - question : "Mêlez la puissance des flashcards avec la facilité des jeux."
 * - answer : "L'intervale de révision idéale est déterminé à partir de milliers de réponses."
 *
 * - question : "Ajoutez des indices et points de contextes
 * pour créer des crochets mnémotechniques."
 * - answer : "Les indices et points de contextes sont affichés
 * au fur et à mesure de l'apprentissage."
 * - hints : ["Quand l'avez-vous apprise ?", "à quel moment de la
 * journée ?", "Que faisiez-vous ?", "Pourquoi l'avez-vous apprise ?"]
 *
 * - question: "Collectionnez les badges pour montrer votre progression."
 * - answer : "Partez à l'aventure avec votre compagnon de révision."
 */
function cards2() {
  return [{
    _id: new ObjectID(),
    cardId: new ObjectID(),
    currentDelay: 0,
    question: 'Mêlez la puissance des flashcards avec la facilité des jeux.',
    answer: 'L\'intervale de révision idéale est déterminé à partir de milliers de réponses.',
    isOwnerOfCard: false,
    category: 'category',
    currentSuccessfulAnswerStreak: 0,
  }, {
    _id: new ObjectID(),
    cardId: new ObjectID(),
    currentDelay: 0,
    question: 'Ajoutez des indices et points de contextes pour créer des crochets mnémotechniques.',
    answer: 'Les indices et points de contextes sont affichés au fur et à mesure de l\'apprentissage.',
    hints: ['Quand l\'avez-vous apprise ?', 'à quel moment de la journée ?', 'Que faisiez-vous ?', 'Pourquoi l\'avez-vous apprise ?'],
    isOwnerOfCard: false,
    category: 'category',
    currentSuccessfulAnswerStreak: 0,
  }, {
    _id: new ObjectID(),
    cardId: new ObjectID(),
    currentDelay: 0,
    answer: 'Collectionnez les badges pour montrer votre progression.',
    question: 'Ajoutez toutes sortes de connaissances',
    hints: ['Programmation', 'Anglais', 'Géographie', 'Images'],
    isOwnerOfCard: false,
    category: 'category',
    currentSuccessfulAnswerStreak: 0,

  }];
}

export default function Home() {
  const [cards, setCards] = React.useState<UserCard[]>(dummyCards());
  return (
    <div className="Home">
      <div className="Home--1">
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
      <div className="Home--2">
        <h2>Découvrez le concept de Flashcards revisité</h2>
        <div className="Home--2__Cards">
          {cards2().map((card) => (
            <Card
              key={card._id.toHexString()}
              data={card}
              onAnswer={removeFirst}
              onUpdate={removeFirst}
              mode="training"
              className="Home--2__Card"
            />
          ))}
        </div>
      </div>
      <div className="Home--3">
        <h2>Consultez vos statistiques de mémorisation</h2>
        <p>Configurez vos intervales de révision pour trouver celle qui vous convient le mieux</p>
        <img
          className="Home--3__stats"
          src="https://eurekardimages.s3.eu-west-2.amazonaws.com/stats.gif"
          alt="Rétention de l'information et taux d'échec selon l'intervale espacée de répétition en secondes"
        />
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
