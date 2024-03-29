import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { SettingsModalDisplayProps } from './types';
import {
  CloseButton, Field,
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
    isOpen,
  } = props;

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="SettingsModal-Container"
      unmountOnExit
      mountOnEnter
    >
      <div className="SettingsModal-Container">
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="SettingsModal"
          unmountOnExit
          mountOnEnter
        >
          <div className="SettingsModal">
            <h2>Modifier vos préférences</h2>
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
            <div className="SettingsModal-intervals">
              {intervals.map(({
                value, displayValue, isEnabled, _id,
              }) => (
                <Field>
                  <label>{displayValue || value}</label>
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(event) => onIntervalUpdate(event, _id)}
                  />
                </Field>
              ))}
            </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
