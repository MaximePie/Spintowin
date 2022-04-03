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
export default function MemorizationBarChart() {

    const [graphData, setGraphData] = useState([]);
    const {isMobile} = useContext(viewportContext);

    useEffect(fetchData, []);

    const chartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: intervals
            }
        },
        series: [
            {
                name: "Errors",
                data: values()
            }
        ]
    };

    return (
        <div className="WrongAnswersBarChart">
            <div className="row">
                <div className="mixed-chart WrongAnswersBarChart__chart">
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
     * Returns all the wrong answer values
     */
    function values() {
        return intervals.map(interval => {
            if (graphData.length) {
                const wrongAnswerDelay = graphData.find(wrongAnswer => wrongAnswer._id === interval);
                return `${wrongAnswerDelay?.count} ` || 0
            }
            return 0;
        })
    }

    function fetchData() {
        getFromServer('/users/connectedUser/wrongAnswers').then(response => setGraphData(response.data?.wrongAnswers))
    }
}
