import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import InputGroup from "./InputGroup";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/InputGroup',
  component: InputGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof InputGroup>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputGroup> = function Template(args) {
  const [answer, setAnswer] = useState('');

  return (
    <InputGroup
      icon='edit'
      value={answer}
      onChange={(event) => setAnswer(event.target.value)}
      placeholder='Champ basique'
      type='text'
    />
  );
}

export const Default = Template.bind({});

