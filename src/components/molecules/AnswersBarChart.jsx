import React, {useContext, useEffect, useState} from 'react';
import Chart from 'react-apexcharts'
import {getFromServer} from "../../server";
import {viewportContext} from "../../contexts/viewport";
import {intervals} from "../../data/cards";

/**
 * Calculates generates a graph based on the wrong answers given by the user.
 * @returns {JSX.Element}
 * @constructor
 */
export default function AnswersBarChart() {

    const [graphData, setGraphData] = useState({});

    useEffect(fetchData, []);

    const chartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: intervals.filter((interval, index) => index > 1)
            },
            colors: ["#F44336", "#1e8ee9"]
        },
        series: [
            {
                name: "Errors",
                data: wrongAnswers()
            },
            {
                name: "Answer Time",
                data: answerTimes()
            }
        ]
    };

    return (
        <div className="AnswersBarChart">
            <div className="row">
                <div className="mixed-chart AnswersBarChart__chart">
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        width="100%"
                        height="400"
                    />
                </div>
            </div>
        </div>
    );

    /**
     * Returns all the answer delay averages
     */
    function answerTimes() {
        return intervals.filter((interval, index) => index > 1).map(interval => {
            if (graphData?.answerDelays?.length) {
                const answer = graphData.answerDelays.find(answer => answer._id === interval);
                return Math.round(answer?.average / 100 || 0);
            }
            return 0;
        })
    }

    /**
     * Returns all the wrong answer values
     */
    function wrongAnswers() {
        return intervals.filter((interval, index) => index > 1).map(interval => {
            if (graphData?.wrongAnswers?.length) {
                const wrongAnswerDelay = graphData.wrongAnswers.find(wrongAnswer => wrongAnswer._id === interval);
                return `${wrongAnswerDelay?.count} ` || 0
            }
            return 0;
        })
    }

    function fetchData() {
        getFromServer('/users/connectedUser/answers').then(response => setGraphData(response.data))
    }
}
