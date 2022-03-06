import React from "react";
import {Helmet} from "react-helmet";

function Error_404() {
    console.log(process.env);
    return (
        <div className="error404 main-container">
            <Helmet defer={false}>
                <title>404 Error</title>
                <meta name="description" content="404 Error" />
            </Helmet>
            <div className="container">
                <div className="col align-items-center my-5">
                <div className="col-lg-8">
                    <h1>404</h1>
                    <h4 className="font-weight-light">Page not found</h4>
                    <p>{process.env.REACT_APP_ERROR_MESSAGE_404}</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Error_404;