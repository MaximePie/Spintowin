import React from 'react';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

// @ts-ignore
import addedCardBadge from '../../images/addedCardBadge.svg';
// @ts-ignore
import moreThanOneWeekBadge from '../../images/moreThanOneWeekBadge.svg';
// @ts-ignore
import moreThanOneDayBadge from '../../images/moreThanOneDayBadge.svg';
// @ts-ignore
import moreThanOneMonthBadge from '../../images/moreThanOneMonthBadge.svg';
import BadgeType from '../../types/BadgeType';

type BadgeProps = {
  badge: BadgeType,
  current: number,
  required: number,
}

export default function Badge({ badge, current, required }: BadgeProps) {
  const {
    color, level, requiredField, requirementsDescription, title,
  } = badge;
  return (
    <div className="Badge">
      <div className="Badge__image-container">
        <img className="Badge__image" src={imageForBadge()} alt="" />
        <h4>
          Niveau
          {level}
        </h4>
      </div>
      <div className="Badge__details">
        <h4>{title}</h4>
        <p className="Badge__description">{requirementsDescription}</p>
        <div className="Badge__progress-container">
          <Progress
            percent={Math.round((current / required) * 100)}
            theme={{
              oldMedium: {
                symbol: `${current} / ${required}`,
                color,
              },
            }}
            status="default"
          />
        </div>
      </div>
    </div>
  );

  function imageForBadge(): string {
    switch (requiredField) {
      case 'addedCards':
        return addedCardBadge;
      case 'memorizedCardsMoreThanOneDay':
        return moreThanOneDayBadge;
      case 'memorizedCardsMoreThanOneWeek':
        return moreThanOneWeekBadge;
      case 'memorizedCardsMoreThanOneMonth':
        return moreThanOneMonthBadge;
      default:
        return '';
    }
  }
}
