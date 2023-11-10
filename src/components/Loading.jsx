import React from "react";
import {NavLink} from "react-router-dom";

const Loading = ({loading, children, error}) => {
    return (
        <>
            {
                loading ? (
                    <p>Loading please wait....</p>
                ) : error ? (
                    <p>{error}</p>
                ) : children
            }
        </>
    );
};

export default Loading;
