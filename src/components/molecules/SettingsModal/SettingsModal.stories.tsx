import React, {ChangeEvent, useContext, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import SettingsModal from './SettingsModal';
import {UserContext, UserContextProvider} from "../../../contexts/user";
import Button from "../../atoms/Button/Button";
import {ObjectId} from "bson";
import SettingsModalDisplay from "./SettingsModalDisplay";
import {SettingsModalDisplayProps} from "./types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SettingsModal',
  component: SettingsModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof SettingsModal>;

type LoginControlsProps = {areCategoriesEnabled?: boolean}
function LoginControls({areCategoriesEnabled}: LoginControlsProps) {

  const {setUser} = useContext(UserContext);

  return (
    <Button
      text="Se connecter"
      onClick={fillUser}
      variant="primary"
    />
  )

  function fillUser() {
    setUser({
      _id: new ObjectId(),
      experience: 0,
      level: 0,
      username: "Storybook",
      hasCategoriesDisplayed: areCategoriesEnabled,
    });
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SettingsModalDisplay> = function Template(args) {
  const {hasCategoriesDisplayed: initialCategoryDisplayState} = args as SettingsModalDisplayProps;

  const [hasCategoriesDisplayed, setCategoryDisplayState] = useState(initialCategoryDisplayState);

  return (
    <UserContextProvider>
      <LoginControls areCategoriesEnabled={hasCategoriesDisplayed}/>
      <SettingsModalDisplay
        onCategoryDisplayChange={(event: ChangeEvent<HTMLInputElement>) => setCategoryDisplayState(event.target.checked)}
        hasCategoriesDisplayed={hasCategoriesDisplayed}
        onClose={() => {}}
      />
    </UserContextProvider>
  );
}

export const Enabled = Template.bind({});
Enabled.args = {
  hasCategoriesDisplayed: true,
  onClose: () => {},
}

export const Disabled = Template.bind({});
Disabled.args = {
  hasCategoriesDisplayed: false,
  onClose: () => {},
}
