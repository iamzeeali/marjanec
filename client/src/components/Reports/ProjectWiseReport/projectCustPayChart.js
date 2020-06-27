import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const ProjectCustPayChart = ({
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

        axios.get(`/api/customerpayment/total/${projectId}`).then(res => {
            const x = res.data.data;
            //console.log(x);

            let chartDataCustPay = [];
            x.map(element => {


                chartDataCustPay.push({
                    labels: [element.projects_docs.map(pd => (
                        pd.projectName
                    ))],
                    datasets: [{
                        label: 'Project Wise Customer Payment ($USD)',
                        backgroundColor: '#FFC107',
                        borderColor: '#8e6b03',
                        borderWidth: 1,
                        hoverBackgroundColor: '#CC9A05',
                        hoverBorderColor: '#8e6b03',
                        data: [(Math.round(element.totalAmount * 100) / 100)]

                    }]
                })


            })
            setChartData({
                ...chartData,
                barChartDataExpense: chartDataCustPay,

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
                                text: "Customer Payment",
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


export default ProjectCustPayChart

