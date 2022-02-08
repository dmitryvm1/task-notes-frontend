import { Identifiable } from "../actions/actions"

export interface ICRUDState<T> {
    list: T[];
    loading: boolean;
}

export interface IAction {
    type: string,
    data: any
}

interface IEntity extends Identifiable {
    [prop:string]: number|string|null;
}

/*
    Make crud reducer for some entity like task, project etc
    @param name - entity name
*/
export default function makeCRUDReducerFor(name:string) {
    const FETCH_SUCCESS = name + '_FETCH_SUCCESS'
    const FETCH_START = name + '_FETCH_START'
    const FETCH_ERROR = name + '_FETCH_ERROR'

    const DELETE_SUCCESS = name + '_DELETE_SUCCESS'
    const DELETE_START = name + '_DELETE_START'
    const DELETE_ERROR = name + '_DELETE_ERROR'

    const UPDATE_SUCCESS = name + '_UPDATE_SUCCESS'
    const UPDATE_START = name + '_UPDATE_START'
    const UPDATE_ERROR = name + '_UPDATE_ERROR'

    const CREATE_SUCCESS = name + '_CREATE_SUCCESS'
    const CREATE_START = name + '_CREATE_START'
    const CREATE_ERROR = name + '_CREATE_ERROR'

    name = name.toLowerCase()

    const reducer = (state:ICRUDState<IEntity>, action:IAction) => {
        if (!state) {
            state = {
                list: [],
                loading: false
            }
        }
        switch(action.type) {
            case CREATE_SUCCESS: 
                return {
                    ...state,
                    list: [...state.list, action.data],
                    loading: false
                }
            case UPDATE_SUCCESS: 
                return {
                    ...state,
                    list: state.list.map((item:IEntity) => {
                        return item.id == action.data.id ? Object.assign({}, item, action.data) : item
                    }),
                    loading: false
                }
            case DELETE_SUCCESS: 
                return {
                    ...state,
                    list: state.list.filter((item:IEntity) => {
                        return item.id != action.data.id
                    }),
                    loading: false
                }
            case FETCH_SUCCESS: 
                return {
                    ...state,
                    list: action.data,
                    loading: false
                }
            case DELETE_START:
            case CREATE_START:
            case UPDATE_START:
            case FETCH_START:
                return {
                    ...state,
                    loading: true
                }
            case DELETE_ERROR:
            case CREATE_ERROR:
            case UPDATE_ERROR:
            case FETCH_ERROR:
                return {
                    ...state,
                    loading: false
                }
            default: 
                return state
        }
    }
    return reducer
}

