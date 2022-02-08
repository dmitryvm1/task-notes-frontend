import * as React from "react";
import Sidebar from "./Sidebar";
import {renderRoutes} from "react-router-config";
import { routes } from "../routes";
import "./PageLayout.less";

const PageLayout: React.StatelessComponent<{}> = () => {
    return (
         <div className="p-grid sample-layout">
            <div className="p-col-12 p-md-2">
                <Sidebar />
            </div>
            <div className="p-col-12 p-md-10">
                    {renderRoutes(routes)}
            </div>
        </div>
    );
};

export default PageLayout;
