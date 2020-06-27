import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addInvestment, getCurrencies } from '../../_actions/investmentAction'
import { getProjects } from '../../_actions/projectAction'
import { getAllUsers } from "../../_actions/authAction"
import '../UI/Dashboard.css'
import axios from 'axios'

const AddInvestment = ({
    history,
    getAllUsers,
    getProjects,
    getCurrencies,
    addInvestment,
    projects,
    currencies,
    users,
}) => {


    useEffect(() => {
        getProjects();
        getAllUsers();
        getCurrencies();
        //eslint-disable-next-line
    }, [getProjects, getAllUsers, getCurrencies]);

    const [formData, setFormData] = useState({
        project: "",
        investedBy: "",
        amount: "",
        conv_amount: "",
        currency: "",
        date: "",
        image: ""

    });

    const { project, investedBy, amount, conv_amount, currency, date, image } = formData;

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)

    };


    const onChangeImage = e => {
        e.preventDefault();
        setFormData({ image: e.target.files[0] });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("image", image);
        formData.append("project", project);
        formData.append("investedBy", investedBy);
        formData.append("amount", amount);
        formData.append("currency", currency);
        formData.append("date", date);
        formData.append("conv_amount", conv_amount);


        addInvestment(formData, history);
        console.log(formData)

    };

    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
        </option>
    ));
    let usersOptn = users.map(users => (
        <option key={users._id} value={users._id}>
            {users.firstName + " " + users.lastName}
        </option>
    ));

    // let currencyOptn = currencies.map(currency => (
    //     <option key={currency} value={currency}>
    //         {currency}
    //     </option>
    // ));

    //const convAmount = { amount } * { currency }


    return (
        <Fragment>
            <div className="container-fluid">
                <form encType="multipart/form-data" onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-primary">
                                        <h3 className="bg-primary text-center text-white p-4">New Investment</h3>
                                        <fieldset className="p-4">

                                            <input
                                                placeholder="Upload Receipt"
                                                type="file"
                                                onChange={onChangeImage} className="border p-3 w-100 my-2" />

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                defaultValue={{ label: "Select Project", value: 0 }}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOptn}
                                            </select>


                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="investedBy"
                                                value={investedBy}
                                                defaultValue={{ label: "Select Investor", value: 0 }}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Investor</option>
                                                {usersOptn}
                                            </select>

                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency">
                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR">INR-Indian Rupees</option>
                                                <option value="USD">USD-US DOLLAR</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>
                                                <option value="OMR">OMR-Omani Riyal</option>
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="QAR">QAR-QATARI Riyal</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>

                                            </select>


                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />


                                            <input name="conv_amount"
                                                placeholder="In  $USD "
                                                type="text"
                                                value={conv_amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" disabled />


                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />



                                            <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">Add</button>

                                        </fieldset>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </Fragment>
    )
}

AddInvestment.propTypes = {
    getProjects: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    addInvestment: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    currencies: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    student: state.student,
    projects: state.project.projects,
    users: state.auth.users,
    currencies: state.investment.currencies

});
export default connect(mapStateToProps, { addInvestment, getProjects, getAllUsers, getCurrencies })(AddInvestment);


//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&format=1
//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1
// import axios from 'axios'

// import { converters } from '../utils'

// const fixerAPI = 'http://data.fixer.io/api/';
// const fixerKey = '35a3ad0f2f253d37131b68cd1b5953fc';

// export const getLatest = async () => {
//   const fixer = axios.create({
//     baseURL: fixerAPI,
//     params: {
//       base: 'USD',
//       access_key: fixerKey
//     }
//   });

//   try {
//     const res = await fixer.get('latest');
//     const ratesArray = converters.ratesIntoArray(res);
//     return ratesArray;
//   } catch (err) {
//     console.error(err);
//   }
// }


// <select className="border p-3 w-100 my-2"
// onChange={e => onChangeHandler(e)}
// name="currency">
// <option value="" className="form-control">--Select Currency--</option>
// <option value="INR">INR-Indian Rupees</option>
// <option value="USD">USD-US DOLLAR</option>
// <option value="SAR">SAR-Saudi Riyal</option>
// <option value="OMR">OMR-Omani Riyal</option>
// <option value="KWD">KWD-Kuwaiti Dinar</option>
// <option value="BHD">BHD-Bahraini Dinar</option>
// <option value="AED">AED-Emirati Dinar</option>
// <option value="QAR">QAR-QATARI Riyal</option>
// <option value="GBP">GBP-Great Britain Pound</option>

// </select>


//--------------AFTER Fetching VAlue---

import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addInvestment, getCurrencies } from '../../_actions/investmentAction'
import { getProjects } from '../../_actions/projectAction'
import { getAllUsers } from "../../_actions/authAction"
import '../UI/Dashboard.css'
import axios from 'axios'

const AddInvestment = ({
    history,
    getAllUsers,
    getProjects,
    getCurrencies,
    addInvestment,
    projects,
    currencies,
    users,
}) => {


    const [formData, setFormData] = useState({
        project: "",
        investedBy: "",
        amount: "",
        currency: "",
        date: "",
        image: "",
        result: "",

    });

    const { project, investedBy, amount, conv_amount, currency, date, image, } = formData;

    useEffect(() => {
        getProjects();
        getAllUsers();

        //eslint-disable-next-line
    }, [getProjects, getAllUsers,]);


    useEffect(() => {

        getCurrencies();
        console.log(currencies[currency]);

        //eslint-disable-next-line
    }, [getCurrencies, currency]);


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(currency)

    };
    const handleAmount = e => {
        setFormData({ amount: e.target.value },
            console.log({ amount }),
            calculate()
        );

    };

    const onChangeImage = e => {
        e.preventDefault();
        setFormData({ image: e.target.files[0] });
    };

    const calculate = () => {
        console.log(currencies[currency])
        const result = (amount * 20)// parseInt({ convValue }))
        // setFormData({
        //     result: result
        // })
        console.log(result)

    }


    const onSubmitHandler = e => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("image", image);
        formData.append("project", project);
        formData.append("investedBy", investedBy);
        formData.append("amount", amount);
        formData.append("currency", currency);
        formData.append("date", date);
        formData.append("result", formData.result);
        formData.append("conv_amount", conv_amount);


        addInvestment(formData, history);
        console.log(formData)

    };

    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
        </option>
    ));
    let usersOptn = users.map(users => (
        <option key={users._id} value={users._id}>
            {users.firstName + " " + users.lastName}
        </option>
    ));

    // let currencyOptn = currencies.map(currency => (
    //     <option key={currency} value={currency}>
    //         {currency}
    //     </option>
    // ));

    //const convAmount = { amount } * { currency }


    return (
        <Fragment>
            <div className="container-fluid">
                <form encType="multipart/form-data" onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-primary">
                                        <h3 className="bg-primary text-center text-white p-4"> {amount} New Investment</h3>
                                        <fieldset className="p-4">

                                            <input
                                                placeholder="Upload Receipt"
                                                type="file"
                                                onChange={onChangeImage} className="border p-3 w-100 my-2" />

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                defaultValue={{ label: "Select Project", value: 0 }}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOptn}
                                            </select>


                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="investedBy"
                                                value={investedBy}
                                                defaultValue={{ label: "Select Investor", value: 0 }}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Investor</option>
                                                {usersOptn}
                                            </select>

                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency"
                                                value={currency}>

                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR" selected>INR-Indian Rupees</option>
                                                <option value="USD">USD-US DOLLAR</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>
                                                <option value="OMR">OMR-Omani Riyal</option>
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="QAR">QAR-QATARI Riyal</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>

                                            </select> <br />
                                            <p> <b>1 USD= </b>{currencies[currency]} {currency}</p>


                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={handleAmount}
                                                className="border p-3 w-100 my-2" />


                                            <input name="result"
                                                placeholder="In  $USD "
                                                type="number"
                                                value={formData.result}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" disabled />


                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />



                                            <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">Add</button>

                                        </fieldset>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </Fragment>
    )
}

AddInvestment.propTypes = {
    getProjects: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    addInvestment: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    student: state.student,
    projects: state.project.projects,
    users: state.auth.users,
    currencies: state.investment.currencies

});
export default connect(mapStateToProps, { addInvestment, getProjects, getAllUsers, getCurrencies })(AddInvestment);


//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&format=1
//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1
// import axios from 'axios'

// import { converters } from '../utils'

// const fixerAPI = 'http://data.fixer.io/api/';
// const fixerKey = '35a3ad0f2f253d37131b68cd1b5953fc';

// export const getLatest = async () => {
//   const fixer = axios.create({
//     baseURL: fixerAPI,
//     params: {
//       base: 'USD',
//       access_key: fixerKey
//     }
//   });

//   try {
//     const res = await fixer.get('latest');
//     const ratesArray = converters.ratesIntoArray(res);
//     return ratesArray;
//   } catch (err) {
//     console.error(err);
//   }
// }


// <select className="border p-3 w-100 my-2"
// onChange={e => onChangeHandler(e)}
// name="currency">
// <option value="" className="form-control">--Select Currency--</option>
// <option value="INR">INR-Indian Rupees</option>
// <option value="USD">USD-US DOLLAR</option>
// <option value="SAR">SAR-Saudi Riyal</option>
// <option value="OMR">OMR-Omani Riyal</option>
// <option value="KWD">KWD-Kuwaiti Dinar</option>
// <option value="BHD">BHD-Bahraini Dinar</option>
// <option value="AED">AED-Emirati Dinar</option>
// <option value="QAR">QAR-QATARI Riyal</option>
// <option value="GBP">GBP-Great Britain Pound</option>

// </select>