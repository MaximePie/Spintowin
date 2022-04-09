import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import OngoingStatsData from './OngoingStatsData';
import Badges from './Badges';
import MemorizationBarChart from './MemorizationBarChart';
import AnswersBarChart from './AnswersBarChart';

type StatsData = {
  mainData: [] | null,
  total: number,
  number: number,
  percentage: number,
}

type StatsCardProps = {
  title?: string,
  data?: StatsData[] | [] | number,
}

StatsCard.defaultProps = {
  title: '',
  data: [],
};

export default function StatsCard({ title, data }: StatsCardProps) {
  return (
    <div className={`StatsCard ${title === 'Mémorisation' && 'StatsCard--large'}`}>
      <h3 className="StatsCard__title">{title}</h3>
      {title === "Cartes en cours d'apprentissage" && (
        <OngoingStatsData />
      )}
      {typeof data === 'number' && title === 'Score' && (
        <h4>{data}</h4>
      )}
      {title === 'Mémorisation' && (
        <MemorizationBarChart />
      )}
      {title === 'Wrong Answers' && (
        <AnswersBarChart />
      )}
      {title === 'Badges' && <Badges />}
    </div>
  );
}
