import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import SettingsModal from './Checkbox';
import CheckboxDisplay from "./CheckboxDisplay";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Checkbox',
  component: SettingsModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof SettingsModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxDisplay> = function Template(args) {
  return (
      <CheckboxDisplay label={"Haha"} checked={args.checked} onChange={(isChecked) => console.log("haha")}/>
  );
}

export const Default = Template.bind({
  checked: true,
});