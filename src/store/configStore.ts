import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { TaskItem, ProjectItem } from "../model/TaskItem";
import { rootReducer } from "../reducers/rootReducer";

export interface IState {
    task: {
        list: TaskItem[];
    },
    control: any;
    project: {
        list: ProjectItem[];
    };
}

export const configureStore = () => {
    if (process.env.NODE_ENV === "production") {
        return createStore(
            rootReducer,
            applyMiddleware(thunk),
        );
    } else {
        return createStore(
            rootReducer,
            composeWithDevTools(
                applyMiddleware(thunk),
            ),
        );
    }
};
