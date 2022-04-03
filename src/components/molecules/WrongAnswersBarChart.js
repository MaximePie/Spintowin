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
                name: "series-1",
                data: values()
            }
        ]
    };

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        width="500"
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
                console.log(wrongAnswerDelay);
                return wrongAnswerDelay?.count || 0
            }
            return 0;
        })
    }

    function fetchData() {
        getFromServer('/users/connectedUser/wrongAnswers').then(response => setGraphData(response.data?.wrongAnswers))
    }
}
