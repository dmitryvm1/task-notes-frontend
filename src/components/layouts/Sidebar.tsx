import * as React from "react";
import {Menu} from 'primereact/menu';
import { withRouter } from "react-router-dom";
import "./Sidebar.less";

interface SidebarState {
    collapsed: boolean;
    mode: "vertical" | "inline" | "horizontal" | undefined;
}

const items = 
    [{
        label: "Projects",
        url: "/#/projects"
    },
    {
        label: "Tasks",
        url: "/#/tasks"
    },
    {
        label: "About",
        url: "/#/about"
    },
    {
        label: "Logout",
        url: "/api/logout"
    }
];

class Sidebar extends React.Component<any, SidebarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            mode: "inline",
        };
    }

    public render(): JSX.Element {
        return (<div >
            <Menu style={{width:"auto"}} model={items} popup={false} />
            </div>
        );
    }
}

export default withRouter(Sidebar);
