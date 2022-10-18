import React, { ChangeEvent, useContext, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ObjectId } from 'bson';
import SettingsModal from './SettingsModal';
import { UserContext, UserContextProvider } from '../../../contexts/user';
import Button from '../../atoms/Button/Button';
import SettingsModalDisplay from './SettingsModalDisplay';
import intervals from '../../../data/cards';
import UserInterval from '../../../types/UserInterval';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/SettingsModal',
  component: SettingsModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SettingsModal>;

type LoginControlsProps = {areCategoriesEnabled?: boolean, intervals: UserInterval[]}
function LoginControls({ areCategoriesEnabled, intervals }: LoginControlsProps) {
  const { setUser } = useContext(UserContext);

  return (
    <Button
      text="Se connecter"
      onClick={fillUser}
      variant="primary"
    />
  );

  function fillUser() {
    setUser({
      _id: new ObjectId(),
      intervals,
      hasStreakNotifications: false,
      experience: 0,
      level: 0,
      username: 'Storybook',
      hasCategoriesDisplayed: areCategoriesEnabled,
      role: 'admin',
    });
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SettingsModalDisplay> = function Template(_args) {
  const [hasCategoriesDisplayed, setCategoryDisplayState] = useState(false);
  const [hasStreakEnabled, setStreakDisplay] = useState(false);
  const [hasSoundEnabled, setSoundActivationState] = useState(false);
  const formattedIntervals = intervals.map((interval) => ({ value: interval, _id: new ObjectId(), isEnabled: true }));
  return (
    <UserContextProvider>
      <LoginControls areCategoriesEnabled={hasCategoriesDisplayed} intervals={formattedIntervals} />
      <SettingsModalDisplay
        onIntervalUpdate={() => {}}
        intervals={formattedIntervals}
        onCategoryDisplayChange={
        (event: ChangeEvent<HTMLInputElement>) => setCategoryDisplayState(event.target.checked)
      }
        onSoundActivationChange={
        (event: ChangeEvent<HTMLInputElement>) => setSoundActivationState(event.target.checked)
      }
        onStreakDisplayChange={
        (event: ChangeEvent<HTMLInputElement>) => setStreakDisplay(event.target.checked)
      }
        hasCategoriesDisplayed={hasCategoriesDisplayed}
        hasStreakEnabled={hasStreakEnabled}
        hasSoundEnabled={hasSoundEnabled}
        onClose={() => {}}
      />
    </UserContextProvider>
  );
};

export const Default = Template.bind({});
