import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getFromServer } from '../../services/server';
import { UserContext } from '../../contexts/user';
import { getFormattedInterval } from '../../services/time';

type answerType = {
  delay: number,
  delayAverage: number,
  successfulAnswersRate: number,
}

type graphDataType = answerType[];

/**
 * Calculates generates a graph based on the wrong answers given by the user.
 * @constructor
 */
export default function AnswersBarChart() {
  const [graphData, setGraphData] = useState<graphDataType>({} as graphDataType);
  const { intervals: flatIntervals } = useContext(UserContext);
  let isMounted = false;

  const intervals = flatIntervals
    .filter((interval, index) => index > 1 && interval.isEnabled)
    .map(({ value }) => value);

  useEffect(() => {
    isMounted = true;
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const chartData = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: intervals.map((value) => getFormattedInterval(value)),
      },
      colors: ['#f04444', '#1e8ee9'],
    },
    series: [
      {
        name: "Taux d'échec",
        data: successfulAnswersRate(),
      },
    ],
  };

  return (
    <div className="AnswersBarChart">
      <p>(Début de l&apos;expérience : 19/01/2023)</p>
      <div className="row">
        <div className="mixed-chart AnswersBarChart__chart">
          <Chart
            options={chartData.options}
            // @ts-ignore
            series={chartData.series}
            type="bar"
            width="100%"
            height="600"
          />
        </div>
      </div>
    </div>
  );

  /**
   * Returns all the wrong answer values
   */
  function successfulAnswersRate() {
    return intervals
      .map(((interval) => {
        if (graphData?.length) {
          const answerDelay = graphData.find(({ delay }) => delay === interval);
          if (answerDelay) {
            // I am using magic numbers because of float numbers, this is a mess i'm sorry. x(
            return `${(10000 - Math.round(answerDelay!.successfulAnswersRate * 100)) / 100} `;
          }
          return 0;
        }
        return 0;
      }));
  }

  function fetchData() {
    getFromServer('/users/connectedUser/answers').then(
      (response) => isMounted && setGraphData(response.data.answersStats),
    );
  }
}
