import React from 'react';
import {Progress} from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import addedCardBadge from "../../images/addedCardBadge.svg";
import moreThanOneWeekBadge from "../../images/moreThanOneWeekBadge.svg";
import moreThanOneDayBadge from "../../images/moreThanOneDayBadge.svg";
import moreThanOneMonthBadge from "../../images/moreThanOneMonthBadge.svg";


export default function Badge({badge, current, required}) {
  const {color, level, requiredField, requirementsDescription, title} = badge;
  return (
    <div className="Badge">
      <div className="Badge__image-container">
        <img className="Badge__image" src={imageForBadge()} alt=""/>
        <h4>Niveau {level}</h4>
      </div>
      <div className="Badge__details">
        <h4>{title}</h4>
        <p className="Badge__description">{requirementsDescription}</p>
        <div className="Badge__progress-container">
          <Progress
            percent={Math.round(current / required * 100)}
            theme={{
              default: {
                symbol: `${current} / ${required}`,
                color
              }
            }}
            status="default"
          />
        </div>
      </div>
    </div>
  );

  function imageForBadge() {
    switch(requiredField) {
      case "addedCards":
        return addedCardBadge;
      case "memorizedCardsMoreThanOneDay":
        return moreThanOneDayBadge;
      case "memorizedCardsMoreThanOneWeek":
        return moreThanOneWeekBadge;
      case "memorizedCardsMoreThanOneMonth":
        return moreThanOneMonthBadge;
      default:
        return;
    }
  }
}
