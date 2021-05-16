import React from 'react';
import "../../style/StatsCard.css";
import 'react-circular-progressbar/dist/styles.css';
import OngoingStatsData from "./OngoingStatsData";

export default function StatsCard({title, data}) {
  return (
    <div className="StatsCard">
      <h3 className="StatsCard__title">{title}</h3>
      {title === "Cartes en cours d'apprentissage" && (
        <OngoingStatsData data={data}
      />)}
      {title === "Score" && (
        <h4>{data}</h4>
      )}
      {title === "Mémorisation" && (
        <div>
          <p> > 1 minute : {data.moreThanOneMinute}</p>
          <p> > 1 heure : {data.moreThanOneHour}</p>
          <p> > 1 Jour : {data.moreThanOneDay}</p>
          <p> > 1 semaine : {data.moreThanOneWeek}</p>
          <p> > 1 mois : {data.moreThanOneMonth}</p>
        </div>
      )}
    </div>
  );
}
