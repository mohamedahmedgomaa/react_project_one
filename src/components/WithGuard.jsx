import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const WithGuard = ({ children }) => {
    const {isLoggedIn} = useSelector(state => state.auth)
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (!isLoggedIn) navigate("/")
    // }, [isLoggedIn,navigate]);


    return isLoggedIn ? children : <div>Please log in first !</div>;
};

export default WithGuard;
