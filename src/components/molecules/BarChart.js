import React from 'react';
import ReactApexChart from 'react-apexcharts'


export default function BarChart({data}) {

  const chartHeight = 250;
  const {mainData, total} = data;

  const {
    moreThanOneMinute,
    moreThanOneHour,
    moreThanOneDay,
    moreThanOneWeek,
    moreThanOneMonth
  } = mainData;

  const chartData = {
    series: [{
      data: [
        total || 0,
        moreThanOneMinute,
        moreThanOneHour,
        moreThanOneDay,
        moreThanOneWeek,
        moreThanOneMonth
      ]
    }],
    options: {
      chart: {
        type: 'bar',
        height: chartHeight
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'Total',
          '> 1 minute',
          '> 1 heure',
          '> 1 Jour',
          '> 1 semaine',
          '> 1 mois',
        ],
      }
    }
  };

  return (
    <div className="BarChart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartHeight}
      />
    </div>
  );
}
