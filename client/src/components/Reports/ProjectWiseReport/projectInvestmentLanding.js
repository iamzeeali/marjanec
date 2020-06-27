import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import axios from "axios";
import { getTotalInvestments } from '../../../_actions/investmentAction'
import { getTotalExpenses } from '../../../_actions/expenseAction'
import { getTotalCustPay } from '../../../_actions/customerPayAction'

import { connect } from "react-redux";
import ProjectInvesttable from "./projectInvesttable";
import ProjectexpenseChart from "./projectexpenseChart";
import ProjectExpenseTable from "./projectExpenseTable";
import ProjectCusPayTable from "./projectCusPayTable";
import ProjectCustPayChart from "./projectCustPayChart";

const ProjectWiseInvestment = ({

    getTotalInvestments,
    getTotalCustPay,
    getTotalExpenses,
    totalInvestment,
    totalCustPay,
    totalExpenses,
    projectName,
    filtered,
    loading,
    history,
    match,
}) => {

    const [chartData, setChartData] = useState({
        barChartDataInvest: [],
        totalAmount: '',

    });

    const { data, totalAmount, barChartDataInvest, } = chartData;


    useEffect(() => {
        getTotalInvestments(match.params.id)
        getTotalExpenses(match.params.id)
        getTotalCustPay(match.params.id)

        axios.get(`/api/investment/total/${match.params.id}`).then(res => {
            const x = res.data.data;
            //console.log(x);
            let chartDataInvest = [];
            x.map(element => {

                chartDataInvest.push({
                    labels: [element.projects_docs.map(pd => (
                        pd.projectName
                    ))],
                    datasets: [{
                        label: 'Project Wise Investment ($USD)',
                        backgroundColor: '#28A745',
                        borderColor: '#228B22',
                        borderWidth: 1,
                        hoverBackgroundColor: '#008000',
                        hoverBorderColor: '#228B22',

                        data: [(Math.round(element.totalAmount * 100) / 100)]

                    }]
                })
                setChartData({
                    ...chartData,
                    barChartDataInvest: chartDataInvest,
                    totalAmount: x.totalAmount
                })


            })
        })



    }, [getTotalInvestments, getTotalExpenses, getTotalCustPay]);

    // console.log({ barChartDataInvest })
    // console.log({ totalAmount })

    return (
        <Fragment>
            <div className="container-fluid">
                <h2 className="text-center pt-2"><b>{projectName}</b></h2>


                <div className="row animated fadeIn">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <h2 className="text-center pt-2">Investment</h2>
                        <ProjectInvesttable projectId={match.params.id} />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <h2 className="text-center pt-2 ">Expenses</h2>
                        <ProjectExpenseTable projectId={match.params.id} />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <h2 className="text-center pt-2 ">Customer Payment</h2>
                        <ProjectCusPayTable projectId={match.params.id} />

                    </div>
                </div> <br />

                <div className="row">
                    <div className="col-sm-12 col-md-4 animated heartBeat">
                        <h2 className="text-center py-2 px-3 bg-success text-white border-0 rounded font-weight-bold mt-2">$USD- {totalInvestment.map(p => (
                            (Math.round(p.totalAmount * 100) / 100))
                        )}</h2>
                    </div>
                    <div className="col-sm-12 col-md-4 animated heartBeat">
                        <h2 className="text-center py-2 px-3 bg-info text-white border-0 rounded font-weight-bold mt-2">$USD- {totalExpenses.map(p => (
                            (Math.round(p.totalExpense * 100) / 100))
                        )}</h2>
                    </div>
                    <div className="col-sm-12 col-md-4 animated heartBeat">
                        <h2 className="text-center py-2 px-3 bg-warning text-white border-0 rounded font-weight-bold mt-2">$USD- {totalCustPay.map(p => (
                            (Math.round(p.totalAmount * 100) / 100))
                        )}</h2>
                    </div>
                </div>



                <div className="row" >
                    <div className="col-sm-12 col-md-4">
                        <div className="animated fadeIn">
                            <div className="chart">
                                {barChartDataInvest.map((n, index) => {
                                    return <Bar key={index} data={n} options={{
                                        title: {
                                            display: 'Display',
                                            text: "Investment",
                                            fontSize: 25
                                        },
                                        legend: {
                                            position: "bottom"
                                        },
                                        maintainAspectRatio: true
                                    }} />;
                                })}
                            </div>
                        </div> <br />



                    </div>

                    <div className="col-sm-12 col-md-4">
                        <ProjectexpenseChart projectId={match.params.id} />
                    </div><br />

                    <div className="col-sm-12 col-md-4">
                        <ProjectCustPayChart projectId={match.params.id} />
                    </div><br />


                </div>
            </div>


        </Fragment>
    );
};

ProjectWiseInvestment.propTypes = {
    getTotalInvestments: PropTypes.func.isRequired,
    getTotalCustPay: PropTypes.func.isRequired,
    getTotalExpenses: PropTypes.func.isRequired,
    totalInvestment: PropTypes.array.isRequired,
    totalCustPay: PropTypes.array.isRequired,
    totalExpenses: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    totalInvestment: state.investment.totalInvestment,
    totalCustPay: state.customerpay.totalCustPay,
    projectName: state.investment.projectName,
    totalExpenses: state.expense.totalExpenses,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps, { getTotalInvestments, getTotalExpenses, getTotalCustPay }
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
// totalInvestment.forEach(element => {
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


 //---Expense

//  axios.get(`/api/expense/total/${match.params.id}`).then(res => {
//     const x = res.data.data;
//     console.log(x);

//     let chartDataExpense = [];
//     x.map(element => {


//         chartDataExpense.push({
//             labels: [element.projects_docs.map(pd => (
//                 pd.projectName
//             ))],
//             datasets: [{
//                 label: 'Project Wise Expense',
//                 backgroundColor: '#00CED1',
//                 borderColor: '#008080',
//                 borderWidth: 1,
//                 hoverBackgroundColor: '	#20B2AA',
//                 hoverBorderColor: '#00CED1',
//                 data: [(Math.round(element.totalExpense * 100) / 100)]

//             }]
//         })


//     })
//     setChartData({
//         ...chartData,
//         barChartDataExpense: chartDataExpense,

//     })
// })

// {totalInvestment.map(p => (
//     p.totalAmount
// ))}