import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import CardsHand from "./CardsHand";
import CardsHandDisplay from "./CardsHandDisplay";
import UserCard from "../../../types/UserCard";
import {ObjectID} from "bson";
import {UserContext, UserContextType} from "../../../contexts/user";
import User from "../../../types/User";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/CardsHand',
  component: CardsHand,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof CardsHand>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardsHand> = function Template(args) {
  const cards: UserCard[] = [1,2,3,4,5].map(cardNumber => {
    return {
      question: `Question ${cardNumber}`,
      image: '',
      currentDelay: 5,
      cardId: new ObjectID(),
      answer: `Réponse ${cardNumber}`,
      isAssignedToConnectedUser: true,
      category: '',
      currentSuccessfulAnswerStreak: 1,
      isOwnerOfCard: true,
      _id: new ObjectID(),
      isMemorized: false,
    }
  })

  const user: UserContextType = {
    user: {} as User,
    setUser: () => {},
    setSelectedCategory: () => {},
    setCategoryDisplayState: () => {},
    setStreakDisplay: () => {},
    updateInterval: () => {},
    selectedCategory: null,
    intervals: [],
  }

  return (
    <UserContext.Provider value={user}>
      <CardsHandDisplay cards={cards}/>
    </UserContext.Provider>
  );
}

export const Default = Template.bind({});

