import React, { Fragment, useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

const ProjectWiseInvestment = ({

    projectwiseInvestment,
    filtered,
    loading,
    history,
    match,
}) => {

    const [chartData, setChartData] = useState({
        barChartDataInvest: [],
        barChartDataExpense: [],
        data: []
    });
    const { data, barChartDataInvest, barChartDataExpense } = chartData;


    useEffect(() => {

        setChartData({
            ...chartData,

            barChartDataInvest: axios.get(`/api/investment/filter/${match.params.id}`).then(res => {
                const x = res.data.data;
                console.log(x);

                let chartDataInvest = [];
                x.map(element => {


                    chartDataInvest.push({
                        labels: [element.projects_docs.map(pd => (
                            pd.projectName
                        ))],
                        datasets: [{
                            label: 'Project Wise Investment',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: [(Math.round(element.totalAmount * 100) / 100)]

                        }]
                    })



                })
            }),

            //---Expense

            barChartDataExpense: axios.get(`/api/expense/filter/${match.params.id}`).then(res => {
                const x = res.data.data;
                console.log(x);

                let chartDataExpense = [];
                x.map(element => {


                    chartDataExpense.push({
                        labels: [element.projects_docs.map(pd => (
                            pd.projectName
                        ))],
                        datasets: [{
                            label: 'Project Wise Expense',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: [(Math.round(element.totalExpense * 100) / 100)]

                        }]
                    })


                })
                // setChartData({
                //     ...chartData,
                //     barChartDataExpense: chartDataExpense,

                // })
            })

        })

    }, []);



    console.log(chartData.barChartDataExpense)



    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Project Wise Investments & Expenses </h2>
                                <br />
                                <div className="row" >
                                    <div className="col-sm-6 col-md-6">
                                        <div className="animated fadeIn">
                                            <div className="chart">

                                                <Bar data={chartData.barChartDataInvest} />;

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-6">
                                        <div className="animated fadeIn">
                                            <div className="chart">
                                                <Bar data={chartData.barChartDataExpense} />;

                                            </div>
                                        </div>
                                    </div>



                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ProjectWiseInvestment.propTypes = {
    projectwiseInvestment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseInvestment: state.investment.projectwiseInvestment,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    null
)(ProjectWiseInvestment);


// <Bar
// data={data}
// options={{
//     title: {
//         display: "Display",
//         text: "Project Wise Investment",
//         fontSize: 20
//     },
//     legend: {
//         position: "bottom"
//     }
// }}
// options={{
//     maintainAspectRatio: false
// }}
// />



// let barChartDataInvest = [];
// projectwiseInvestment.forEach(element => {
//     element.projects_docs.map(pd => (
//         barChartDataInvest.push({
//             labels: pd.projectName,
//             datasets: [{
//                 backgroundColor: 'rgba(255,99,132,0.2)',
//                 borderColor: 'rgba(255,99,132,1)',
//                 borderWidth: 1,
//                 hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//                 hoverBorderColor: 'rgba(255,99,132,1)',
//                 data: pd.totalAmount
//             }]
//         })
//     ))
// });

// <div className="bar-chart">
// {barChartDataInvest.map((n, index) => {
//     return <Bar key={index} data={n} />
// })}

// </div>



import React, { Fragment, useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

const ProjectWiseInvestment = ({

    projectwiseInvestment,
    filtered,
    loading,
    history,
    match,
}) => {

    const [chartData, setChartData] = useState({
        barChartDataInvest: [],
        barChartDataExpense: [],
        data: []
    });

    const { data, barChartDataInvest, barChartDataExpense } = chartData;


    useEffect(() => {

        axios.get(`/api/investment/filter/${match.params.id}`).then(res => {
            const x = res.data.data;
            console.log(x);

            let chartDataInvest = [];
            x.map(element => {


                chartDataInvest.push({
                    labels: [element.projects_docs.map(pd => (
                        pd.projectName
                    ))],
                    datasets: [{
                        label: 'Project Wise Investment',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [(Math.round(element.totalAmount * 100) / 100)]

                    }]
                })
                setChartData({
                    ...chartData,
                    barChartDataInvest: chartDataInvest
                })

            })
        })


        //---Expense

        axios.get(`/api/expense/filter/${match.params.id}`).then(res => {
            const x = res.data.data;
            console.log(x);

            let chartDataExpense = [];
            x.map(element => {


                chartDataExpense.push({
                    labels: [element.projects_docs.map(pd => (
                        pd.projectName
                    ))],
                    datasets: [{
                        label: 'Project Wise Expense',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [(Math.round(element.totalExpense * 100) / 100)]

                    }]
                })


            })
            setChartData({
                ...chartData,
                barChartDataExpense: chartDataExpense,

            })
        })



    }, []);



    console.log({ barChartDataExpense })



    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Project Wise Investments & Expenses </h2>
                                <br />
                                <div className="row" >
                                    <div className="col-sm-6 col-md-6">
                                        <div className="animated fadeIn">
                                            <div className="chart">
                                                {barChartDataInvest.map((n, index) => {
                                                    return <Bar key={index} data={n} />;
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-6">
                                        <div className="animated fadeIn">
                                            <div className="chart">
                                                {barChartDataExpense.map((n, index) => {
                                                    return <Bar key={index} data={n} />;
                                                })}
                                            </div>
                                        </div>
                                    </div>



                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ProjectWiseInvestment.propTypes = {
    projectwiseInvestment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseInvestment: state.investment.projectwiseInvestment,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    null
)(ProjectWiseInvestment);


// <Bar
// data={data}
// options={{
//     title: {
//         display: "Display",
//         text: "Project Wise Investment",
//         fontSize: 20
//     },
//     legend: {
//         position: "bottom"
//     }
// }}
// options={{
//     maintainAspectRatio: false
// }}
// />



// let barChartDataInvest = [];
// projectwiseInvestment.forEach(element => {
//     element.projects_docs.map(pd => (
//         barChartDataInvest.push({
//             labels: pd.projectName,
//             datasets: [{
//                 backgroundColor: 'rgba(255,99,132,0.2)',
//                 borderColor: 'rgba(255,99,132,1)',
//                 borderWidth: 1,
//                 hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//                 hoverBorderColor: 'rgba(255,99,132,1)',
//                 data: pd.totalAmount
//             }]
//         })
//     ))
// });

// <div className="bar-chart">
// {barChartDataInvest.map((n, index) => {
//     return <Bar key={index} data={n} />
// })}

// </div>