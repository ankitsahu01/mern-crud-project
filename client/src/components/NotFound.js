import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound= ()=>{
    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 hv-center">
                        <h1 className="not-found-title fg-yellow">404</h1>
                        <div className="not-found-text">
                        <p>We're sorry, the page you requested could not be found.</p>
                        <NavLink to="/" className="link"><i className="bi bi-arrow-left fg-yellow"></i> Back To Home</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;