import React from 'react';
import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

import Login from "../Auth/Login";

export function AdminRoute({ children, ...rest }) {
    const { isLoggedIn, userRoleData } = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={() =>
                (isLoggedIn && userRoleData===1) ? (
                    children
                ) : <Redirect to="/login" />
            }
        />
    );
}