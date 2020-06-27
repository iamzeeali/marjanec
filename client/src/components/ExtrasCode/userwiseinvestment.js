import React, { Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import axios from "axios";
import { getProjectInvestments } from '../../_actions/investmentAction'
import { connect } from "react-redux";
import Projectwisetable from "../Reports/ProjectWiseReport/projectInvesttable";

const UserWiseInvestment = ({

    getProjectInvestments,
    projectwiseInvestment,
    filtered,
    loading,
    history,
    match,
}) => {

    const [chartData, setChartData] = useState({
        barChartDataInvest: [],
        barlabel: [],
        bardata: []

    });

    const { barChartDataInvest, } = chartData;


    useEffect(() => {

        axios.get(`/api/investment/filter/${match.params.id}`).then(res => {
            const x = res.data.data;
            console.log(x);

            let chartDataInvest = [];
            x.forEach(element => {
                chartDataInvest.push({
                    labels: [element.user.username],
                    datasets: [{
                        label: 'Project Wise Investment',
                        backgroundColor: '#32CD32',
                        borderColor: '#228B22',
                        borderWidth: 1,
                        hoverBackgroundColor: '#008000',
                        hoverBorderColor: '#228B22',
                        data: [(Math.round(element.convAmt * 100) / 100)]

                    }]
                })
                console.log(chartDataInvest)
                setChartData({
                    ...chartData,
                    barChartDataInvest: chartDataInvest
                })

            })
        })



    }, []);

    console.log({ barChartDataInvest })

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container-fluid">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-12 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Project Wise Investments</h2>
                                <Projectwisetable projectId={match.params.id} /> <br />
                                <div className="row" >
                                    <div className="col-sm-6 col-md-6">
                                        <div className="animated fadeIn">
                                            <div className="chart">
                                                {
                                                    barChartDataInvest.map((n, index) => {
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

UserWiseInvestment.propTypes = {
    projectwiseInvestment: PropTypes.array.isRequired,
    getProjectInvestments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    projectwiseInvestment: state.investment.projectwiseInvestment,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getProjectInvestments }
)(UserWiseInvestment);
