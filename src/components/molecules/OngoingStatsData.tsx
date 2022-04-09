import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getFromServer } from '../../services/server';

type OngoingStatsDataType = {
  started: number,
  today: number,
  total: number,
}

export default function OngoingStatsData() {
  const [data, setData] = useState<OngoingStatsDataType>({} as OngoingStatsDataType);
  useEffect(fetchData, []);

  const graph = {
    series: calculateSeries(),
    options: {
      chart: {
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          customScale: 1,
          size: 500,
        },
      },
      colors: ['#008ffb', '#00e396', '#e3e4ea'],
      labels: ['Déjà démarrées', "Démarrées aujourd'hui", 'Restantes'],
    },
  };

  return (
    <div className="OngoingStatsData__donut">
      <ReactApexChart
        // @ts-ignore
        options={graph.options}
        series={graph.series}
        type="donut"
      />
    </div>
  );

  function calculateSeries() {
    const {
      started,
      today,
      total,
    } = data || {} as OngoingStatsDataType;

    const formatedStarted = (started / total) * 100;
    const formatedToday = (today / total) * 100;
    return [
      Number.isNaN(formatedStarted) ? 0 : formatedStarted,
      Number.isNaN(formatedToday) ? 0 : formatedToday,
      100 - formatedStarted - formatedToday,
    ];
  }

  function fetchData() {
    getFromServer('/users/connectedUser/progress').then((response) => setData(response.data));
  }
}
