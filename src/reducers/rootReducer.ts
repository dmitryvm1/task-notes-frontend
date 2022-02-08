import { combineReducers } from "redux";
import { IState } from "../store/configStore";
import makeCRUDReducerFor, { IAction } from './util';

export const initState: IState = {
    task: {
        list: []
    },
    project: {
        list: []
    },
    control: {
        projectId: 0
    }
};

const task = makeCRUDReducerFor('TASK');
const project = makeCRUDReducerFor('PROJECT');

export const rootReducer = combineReducers({
    task,
    control: (state = {projectId: 0}, action:IAction) => {
        switch(action.type) {
            case 'SELECT_PROJECT':
                return { projectId: action.data }
            default: 
                return state;
        }
    },
    project
});
