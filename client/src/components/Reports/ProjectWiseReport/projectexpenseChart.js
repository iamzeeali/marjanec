import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const ProjectExpenseChart = ({
    match,
    projectId
}) => {

    const [chartData, setChartData] = useState({
        barChartDataExpense: [],
        data: []
    });

    const { barChartDataExpense } = chartData;


    useEffect(() => {

        //---Expense

        axios.get(`/api/expense/total/${projectId}`).then(res => {
            const x = res.data.data;
            //console.log(x);

            let chartDataExpense = [];
            x.map(element => {


                chartDataExpense.push({
                    labels: [element.projects_docs.map(pd => (
                        pd.projectName
                    ))],
                    datasets: [{
                        label: 'Project Wise Expense ($USD)',
                        backgroundColor: '#17A2B8',
                        borderColor: '#00FFFF',
                        borderWidth: 1,
                        hoverBackgroundColor: '#008B8B',
                        hoverBorderColor: '#00FFFF',
                        data: [(Math.round(element.totalExpense * 100) / 100)]

                    }]
                })

                setChartData({
                    ...chartData,
                    barChartDataExpense: chartDataExpense,

                })

            })

        })



    }, []);



    //console.log({ barChartDataExpense })



    return (
        <Fragment>

            <div className="animated fadeIn">
                <div className="chart">
                    {barChartDataExpense.map((n, index) => {
                        return <Bar key={index} data={n} options={{
                            title: {
                                display: 'Display',
                                text: "Expense",
                                fontSize: 25
                            },
                            legend: {
                                position: "bottom"
                            },
                            maintainAspectRatio: true
                        }} />;
                    })}
                </div>
            </div>



        </Fragment>
    );
};


export default ProjectExpenseChart

