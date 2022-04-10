import React, { ReactNode } from 'react';
import 'react-circular-progressbar/dist/styles.css';

type StatsData = {
  mainData: [] | null,
  total: number,
  number: number,
  percentage: number,
}

type StatsCardProps = {
  title?: string,
  data?: StatsData[] | [] | number,
  component?: ReactNode
}

StatsCard.defaultProps = {
  title: '',
  data: [],
  component: null,
};

export default function StatsCard({ title, data, component }: StatsCardProps) {
  return (
    <div className={`StatsCard ${title === 'Mémorisation' && 'StatsCard--large'}`}>
      <h3 className="StatsCard__title">{title}</h3>
      {component}
      {typeof data === 'number' && title === 'Score' && (
        <h4>{data}</h4>
      )}
    </div>
  );
}
