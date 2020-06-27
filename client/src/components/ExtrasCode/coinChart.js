import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Bar } from "react-chartjs-2";
import axios from "axios";

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            data: []
        };
    }

    componentDidMount() {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=true"
            )
            .then(res => {
                const x = res.data;

                let chartData = [];
                x.forEach(element => {
                    chartData.push({
                        labels: element.sparkline_in_7d.price,
                        datasets: [{ data: element.sparkline_in_7d.price }]
                    });
                });
                this.setState({ chartData });
            });
    }

    render() {
        return (
            <div className="chart">
                {this.state.chartData.map((n, index) => {
                    return <Bar key={index} data={n} />;
                })}
            </div>
        );
    }
}

export default Chart;

const rootElement = document.getElementById("root");
ReactDOM.render(<Chart />, rootElement);



import React, { Fragment, useEffect, useState } from "react";
import {
    getProjectInvestments,
} from "../../_actions/investmentAction";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProjectWiseInvestment = ({
    getProjectInvestments,
    projectwiseInvestment,
    filtered,
    loading,
    history
}) => {

    const [chartData, setChartData] = useState({
        barChartData: [],
        data: []
    });
    // const { data, barChartData } = chartData;

    useEffect(() => {
        getProjectInvestments();


    }, [getProjectInvestments]);


    const data = {


        labels: [projectwiseInvestment.forEach(investment => (

            investment.no_of_investment


        ))],
        datasets: [
            {
                label: [projectwiseInvestment.map(investment => (

                    investment.no_of_investment


                ))],
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [projectwiseInvestment.map(investment => (
                    (Math.round(investment.totalAmount * 100) / 100)
                ))]
            }
        ]
    };


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Project Wise Investments & Expenses </h2>
                                <br />
                                <div >
                                    <div className="animated fadeIn">
                                        <Bar
                                            data={data}
                                            options={{
                                                title: {
                                                    display: "Display",
                                                    text: "Project Wise Investment",
                                                    fontSize: 20
                                                },
                                                legend: {
                                                    position: "bottom"
                                                }
                                            }}
                                            options={{
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>




                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ProjectWiseInvestment.propTypes = {
    getProjectInvestments: PropTypes.func.isRequired,
    projectwiseInvestment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseInvestment: state.investment.projectwiseInvestment,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getProjectInvestments, }
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



// let barChartData = [];
// projectwiseInvestment.forEach(element => {
//     element.projects_docs.map(pd => (
//         barChartData.push({
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
// {barChartData.map((n, index) => {
//     return <Bar key={index} data={n} />
// })}

// </div>



import React, { Fragment, useEffect, useState } from "react";
import {
    getProjectInvestments,
} from "../../_actions/investmentAction";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

const ProjectWiseInvestment = ({
    getProjectInvestments,
    projectwiseInvestment,
    filtered,
    loading,
    history
}) => {

    const [chartData, setChartData] = useState({
        barChartData: [],
        data: []
    });
    const { data, barChartData } = chartData;

    useEffect(() => {
        getProjectInvestments()
        axios.get(`/api/investment/filter`).then(res => {
            const x = res.data.data;
            console.log(x);

            let chartData = [];
            x.forEach(element => {

                chartData.push({
                    labels: [element.projects_docs.map(pd => (
                        pd.projectName
                    ))],
                    datasets: [{
                        data: [x.map(inv => (
                            (Math.round(inv.totalAmount * 100) / 100)
                        ))]
                    }]
                })
            })
            setChartData({ barChartData: chartData })
        })



    }, [getProjectInvestments]);

    console.log({ barChartData })



    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Project Wise Investments & Expenses </h2>
                                <br />
                                <div >
                                    <div className="animated fadeIn">
                                        <div className="chart">
                                            {barChartData.map((n, index) => {
                                                return <Bar key={index} data={n} />;
                                            })}
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
    getProjectInvestments: PropTypes.func.isRequired,
    projectwiseInvestment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseInvestment: state.investment.projectwiseInvestment,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getProjectInvestments, }
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



// let barChartData = [];
// projectwiseInvestment.forEach(element => {
//     element.projects_docs.map(pd => (
//         barChartData.push({
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
// {barChartData.map((n, index) => {
//     return <Bar key={index} data={n} />
// })}

// </div>