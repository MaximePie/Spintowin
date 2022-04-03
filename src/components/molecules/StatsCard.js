import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import OngoingStatsData from "./OngoingStatsData";
import Badges from "./Badges";
import MemorizationBarChart from "./MemorizationBarChart";
import WrongAnswersBarChart from "./WrongAnswersBarChart";

export default function StatsCard({title, data}) {
  return (
    <div className={`StatsCard ${title==="Mémorisation" && 'StatsCard--large'}`}>
      <h3 className="StatsCard__title">{title}</h3>
      {title === "Cartes en cours d'apprentissage" && (
        <OngoingStatsData
      />)}
      {title === "Score" && (
        <h4>{data}</h4>
      )}
      {title === "Mémorisation" && (
        <MemorizationBarChart/>
      )}
      {title === "Wrong Answers" && (
        <WrongAnswersBarChart/>
      )}
      {title === "Badges" && <Badges/>}
    </div>
  );
}
