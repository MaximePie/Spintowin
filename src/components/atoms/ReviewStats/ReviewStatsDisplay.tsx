import React from 'react';
import Chart from 'react-apexcharts';
import { StyledReviewStats } from './styles';
import { ReviewStatsDisplayProps } from './types';
import LoadingGif from '../LoadingGif';

export default function ReviewStatsDisplay(props: ReviewStatsDisplayProps) {
  const { remainingCards, isLoading, cardsStats } = props;
  const chartData = {
    options: {
      type: 'bar',
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      chart: {
        height: 350,
      },
      xaxis: {
        categories: cardsStats.map(([delay]) => delay),
      },
      colors: ['#3fe447'],
    },
    series: [
      {
        name: 'Intervales',
        data: cardsStats.map(([, count]) => count),
      },
    ],
  };
  return (
    <StyledReviewStats>
      {remainingCards}
      <LoadingGif isLoading={isLoading || false} className="Cards__loading" />
      <div id="chart">
        <Chart
          options={chartData.options}
          // @ts-ignore
          series={chartData.series}
          type="bar"
          width="100%"
          height="300"
          chart={{ toolbar: { show: false } }}
        />
      </div>
    </StyledReviewStats>
  );
}
