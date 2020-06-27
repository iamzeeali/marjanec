import React, { Fragment, useEffect } from 'react'
import './Dashboard.css';
import notfound from '../images/404.png'
const style = { maxWidth: 550, maxHeight: 380 }
const NotFound = () => {
    return (
        <Fragment>
            <div className="container-fluid animated fadeIn text-center">
                <div className="container ">
                    <img src={notfound} style={style} />
                    <h1> 404! Page Not Found</h1>
                </div>

            </div>

        </Fragment>
    )
}

export default NotFound
