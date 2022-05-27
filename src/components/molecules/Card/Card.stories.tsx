import React, {KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import CardDisplay from './CardDisplay';
import {ObjectId} from "bson";
import {CardDisplayProps, CardProps} from "./types";
import { faker } from '@faker-js/faker';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Card',
  component: CardDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof CardDisplay>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardDisplay> = function Template(args) {

  const {
    hasCategoriesDisplayed,
    image,
    isScoreDisplayed,
    areInverted,
    isSingle,
    data,
  } = args as CardDisplayProps

  const [isAnswerShown, setAnswerDisplayState] = useState(false);
  const [isAnswerSuccessful, setAnswerSuccessState] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setOpenModalState] = useState(false);
  const isAnswerShownRef = React.useRef(false);

  return (
    <CardDisplay
      hasCategoriesDisplayed={hasCategoriesDisplayed}
      key={data._id.toString()}
      image={image}
      data={data}
      isAnswerSuccessful={isAnswerSuccessful}
      onAnswer={setAnswerDisplayState}
      isAnswerShown={isAnswerShown}
      isModalOpen={isModalOpen}
      isScoreDisplayed={isScoreDisplayed}
      areInverted={areInverted}
      isSingle={isSingle}
      onKeypress={(event) => reveal(event)}
      onClick={() => reveal()}
      onModalClose={closeModal}
      onModalOpen={openModal}
    />
  );

  function handleAnswer(isAnswerSuccessful: boolean) {
    setAnswerSuccessState(isAnswerSuccessful);
  }

  function reveal(event: KeyboardEvent<HTMLDivElement> | null = null) {
    if ((event?.code === 'enter' || !event) && !isAnswerShown) {
      setAnswerDisplayState(true);
      isAnswerShownRef.current = true;
    }
  }


  /**
   * Open the question edition modal
   */
  function openModal() {
    setOpenModalState(true);
  }


  /**
   * Closes the modal, and updates the current collection
   */
  function closeModal() {
    setOpenModalState(false);
  }
}

const data: CardProps['data'] = {
  _id: new ObjectId(),
  answer: 'Réponse',
  question: 'Question',
  image: '',
  currentDelay: parseInt(faker.random.numeric(3)),
  cardId: new ObjectId(),
  isOwnerOfCard: false,
  currentSuccessfulAnswerStreak: 3,
  category: 'Suuuper',
}


export const Default = Template.bind({});
Default.args = {
  hasCategoriesDisplayed: false,
  data,
}

export const WithCategories = Template.bind({});
WithCategories.args = {
  hasCategoriesDisplayed: true,
  data
}

export const WithImage = Template.bind({});
WithImage.args = {
  data: {
    ...data,
    question: '',
  },
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
}


export const WithLongDelay = Template.bind({});
WithLongDelay.args = {
  data: {
    ...data,
    currentDelay: parseInt(faker.random.numeric(12))
  },
  isScoreDisplayed: true,
}

export const isSingle = Template.bind({});
isSingle.args = {
  isSingle: true,
  data
}

export const isSingleWithImage = Template.bind({})
isSingleWithImage.args = {
  ...WithImage.args,
  isSingle: true,
}

