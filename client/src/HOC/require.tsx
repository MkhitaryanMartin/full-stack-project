import React from "react";
import {useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../Hooks/redux";
import Loader from "../components/Loader";

type Props = {
    children: React.ReactNode
}

export default function Require({ children }: Props) {
    const location = useLocation();
    const valid = useAppSelector(state => state?.auth?.isAuth);
    const {loader} = useAppSelector(state => state.auth)

    if (!loader && !valid  && location.pathname !== "/login") {
        return (
            <Navigate
                to="/login"
                state={{ from: location, message: "Please login your account, to be able to buy goods" }}
            />
        );
    }
    return  loader ? <Loader/> :  valid ? children : null  ;
}
