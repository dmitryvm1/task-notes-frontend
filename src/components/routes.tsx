import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TaskPage } from "./pages/TaskPage";
import AboutPage from "./pages/AboutPage";
import PageLayout from "./layouts/PageLayout";

export const routes: RouteConfig[] = [
    { 
        path: "/",
        exact: true,
        component: () => <Redirect to="/projects"/>
    },
    {
        path: "/projects",
        exact: true,
        component: (props:any) => (<ProjectsPage {...props} />),
    },
    {
        path: "/tasks",
        component: () => (<TaskPage />),
    },
    {
        path: "/about",
        component: () => (<AboutPage />),
    },
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout} />
    </Switch>
);
