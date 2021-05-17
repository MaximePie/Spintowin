import React from 'react';
import "../../style/StatsCard.scss";
import 'react-circular-progressbar/dist/styles.css';
import OngoingStatsData from "./OngoingStatsData";
import BarChart from "./BarChart";

export default function StatsCard({title, data}) {
  return (
    <div className={`StatsCard ${title==="Mémorisation" && 'StatsCard--large'}`}>
      <h3 className="StatsCard__title">{title}</h3>
      {title === "Cartes en cours d'apprentissage" && (
        <OngoingStatsData data={data}
      />)}
      {title === "Score" && (
        <h4>{data}</h4>
      )}
      {title === "Mémorisation" && (
        <BarChart data={data}/>
      )}
    </div>
  );
}
