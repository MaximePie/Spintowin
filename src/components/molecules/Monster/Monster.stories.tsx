import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import Monster from "./Monster";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Monster',
  component: Monster,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Monster>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Monster> = function Template(args) {

  return (
    <Monster/>
  );
}

export const Default = Template.bind({});

