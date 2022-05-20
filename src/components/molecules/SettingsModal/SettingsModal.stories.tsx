import React, {useContext} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import SettingsModal from './SettingsModal';
import {UserContext, UserContextProvider} from "../../../contexts/user";
import Button from "../../atoms/Button/Button";
import {ObjectId} from "bson";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SettingsModal',
  component: SettingsModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof SettingsModal>;

type LoginControlsProps = {areCategoriesEnabled: boolean}
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
const Template: ComponentStory<typeof SettingsModal> = function Template(args) {
  const {areCategoriesEnabled} = args as LoginControlsProps;
  return (
    <UserContextProvider>
      <LoginControls areCategoriesEnabled={areCategoriesEnabled}/>
      <SettingsModal/>
    </UserContextProvider>
  );
}

export const Enabled = Template.bind({});
Enabled.args = {
  areCategoriesEnabled: true,
}

export const Disabled = Template.bind({});
Disabled.args = {
  areCategoriesEnabled: false,
}
