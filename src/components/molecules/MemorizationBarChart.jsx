import React, {useContext, useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts'
import {getFromServer} from "../../services/server";
import {viewportContext} from "../../contexts/viewport";


export default function MemorizationBarChart() {

  const [graphData, setGraphData] = useState([]);
  const {isMobile} = useContext(viewportContext);

  useEffect(fetchData, []);

  const chartHeight = 250;

  const chartData = {

    series: chartSeries(),
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['Total', "Très court terme", "Court terme", "Moyen terme", "Long terme", "Très long terme"],
        labels: {
          formatter: function (val) {
            return val + (isMobile ? "" : " questions");
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " questions"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    },


  };

  return (
    <div className="BarChart">
      {Object.keys(graphData).length && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={chartHeight}
        />
      )}
    </div>
  );

  function chartSeries() {

    const {
      total,
      moreThanOneMinute,
      moreThanOneHour,
      moreThanOneDay,
      moreThanOneWeek,
      moreThanOneMonth
    } = graphData || {};

    const {
      startedCards,
      todayMinuteLengthCard,
      todayDayLengthCard,
      todayHourLengthCard,
      todayMonthLengthCard,
      todayWeekLengthCard,
    } = graphData || {};

    const todaysCurve = [
      startedCards || 0,
      todayMinuteLengthCard || 0,
      todayHourLengthCard || 0,
      todayDayLengthCard || 0,
      todayMonthLengthCard || 0,
      todayWeekLengthCard || 0,
    ];

    const currentCurve = [
      calculateCurrentValue(total, startedCards),
      calculateCurrentValue(moreThanOneMinute, todayMinuteLengthCard),
      calculateCurrentValue(moreThanOneHour, todayHourLengthCard),
      calculateCurrentValue(moreThanOneDay, todayDayLengthCard),
      calculateCurrentValue(moreThanOneWeek, todayMonthLengthCard),
      calculateCurrentValue(moreThanOneMonth, todayWeekLengthCard),
    ];
    return [{
      name: 'Révisions Antérieures',
      data: currentCurve
    }, {
      name: "Révisions Aujourd'hui",
      data: todaysCurve
    }]
  }

  /**
   * Calculates the current value
   * @param total : 80
   * @param today : 10
   *
   * The result is 70, or 0 if negative
   */
  function calculateCurrentValue(total, today) {
    const difference = total - today;
    return difference >= 0 ? difference : 0;
  }

  function fetchData() {
    getFromServer('/users/connectedUser/scales').then(response => setGraphData(response.data))
  }
}
