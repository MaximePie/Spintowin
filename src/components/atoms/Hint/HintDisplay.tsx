import React from 'react';
import ReactTooltip from 'react-tooltip';
import { StyledHint } from './styles';
import { HintDisplayProps } from './types';

export default function HintDisplay({ hints, cardId: _id }: HintDisplayProps) {
  return (
    <StyledHint>
      <ReactTooltip id={`main-${_id}`} place="top" type="dark" effect="solid" multiline />
      <span
        className="AddCardForm__hint"
        data-for={`main-${_id}`}
        data-tip={hints.join(' | ')}
        data-iscapture="true"
      >
        <i className="far fa-question-circle" />
      </span>
    </StyledHint>
  );
}
