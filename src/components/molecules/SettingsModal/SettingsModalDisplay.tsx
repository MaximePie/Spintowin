import React from 'react';
import { SettingsModalDisplayProps } from './types';
import {
  CloseButton, Field, Modal, Intervals,
} from './styles';

SettingsModalDisplay.defaultProps = {
  hasCategoriesDisplayed: false,
};
export default function SettingsModalDisplay(props: SettingsModalDisplayProps) {
  const {
    onClose,
    hasCategoriesDisplayed,
    hasSoundEnabled,
    onSoundActivationChange,
    onCategoryDisplayChange,
    onStreakDisplayChange,
    hasStreakEnabled,
    intervals,
    shouldShowIntervals,
    onIntervalUpdate,
  } = props;

  return (
    <div className="ModalContainer">
      <div className="SettingsModal">
        <CloseButton
          role="button"
          tabIndex={0}
          onClick={onClose}
        >
          X
        </CloseButton>
        <Field>
          <label>
            Afficher les catégories
            <input
              name="hasCategoriesDisplayed"
              type="checkbox"
              checked={hasCategoriesDisplayed}
              onChange={onCategoryDisplayChange}
            />
          </label>
        </Field>
        <Field>
          <label>
            Afficher les notifications de série
            <input
              type="checkbox"
              checked={hasStreakEnabled}
              onChange={onStreakDisplayChange}
            />
          </label>
        </Field>
        <Field>
          <label>
            Activer les sons
            <input
              type="checkbox"
              checked={hasSoundEnabled}
              onChange={onSoundActivationChange}
            />
          </label>
        </Field>
        {shouldShowIntervals && (
          <Intervals>
            {intervals.map((userInterval) => (
              <Field>
                <label>{userInterval.value}</label>
                <input
                  type="checkbox"
                  checked={userInterval.isEnabled}
                  onChange={(event) => onIntervalUpdate(event, userInterval._id)}
                />
              </Field>
            ))}
          </Intervals>
        )}
      </div>
    </div>
  );
}
