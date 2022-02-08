import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.less";

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <div key="logOut"><Link to="#" >Logout</Link></div>
    );
};
