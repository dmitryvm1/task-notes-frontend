import * as service from "../services";
import { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "redux";

export type IDType = number;
export interface Identifiable {
	id: IDType
}
/*
	Helper class for returning various actions during request phases. 
	Started, Succeeded, Failed
*/
class ReduxRequest {
	private name:string;
	private method:(param:object) => Promise<object>;

	/*
		Creates a set of actions to control and react to request's life cycle
		@params
		name - action name
		method - a function that starts the request (sends concrete method)
	*/
	constructor(name:string, method:(param:object) => Promise<object>) {
		this.name = name
		this.method = method
	}

	/*
		Returns an action for initiating the request
	*/
	start(params:object) {
		return {
			type: this.name + '_START',
			...params
		}
	}
	/*
		Sends the request, i.e. executes the method function
	*/
	do(param:object): Promise<object> {
		return this.method(param)
	}
	/*
		Returns a success action
	*/
	success(data: object, additional:object) {
		return {
			type: this.name + '_SUCCESS',
			data,
			...additional
		}
	}
	/*
		Returns an error action
	*/
	error(err:object) {
		return {
			type: this.name + '_ERROR',
			error: err
		}
	}
}

/*
	A helper function to bind the concrete request parameters with the dispatch redux function
*/
function requestDispatcher(reduxRequest: ReduxRequest, param: object, additional: any) {
    return (dispatch:Dispatch) => {
	dispatch(reduxRequest.start(param))
	    reduxRequest.do(param).then((response:AxiosResponse) => {
	    dispatch(reduxRequest.success(response.data, additional))
	    }, (error:AxiosError) => {
		    dispatch(reduxRequest.error(error))
	    });
    }
}

const getTasksEndPoint = new ReduxRequest('TASK_FETCH', service.getTasks)
const createTaskEndPoint = new ReduxRequest('TASK_CREATE', service.createTask)
const deleteTaskEndPoint = new ReduxRequest('TASK_DELETE', service.deleteTask)

const getProjectsEndPoint = new ReduxRequest('PROJECT_FETCH', service.getProjects)
const deleteProjectEndPoint = new ReduxRequest('PROJECT_DELETE', service.deleteProject)
const createProjectEndPoint = new ReduxRequest('PROJECT_CREATE', service.createProject)
const updateProjectEndPoint = new ReduxRequest('PROJECT_UPDATE', service.updateProject)

export const getTasks = (params:object) => {
    return requestDispatcher(getTasksEndPoint, params, null)
}

/*
	Example usage:
	 createProject(params)(dispatch);
*/
export const createProject = (params:Identifiable) => {
    const cid = params.id = Number.MAX_SAFE_INTEGER;
	return requestDispatcher(createProjectEndPoint, params, { cid });
}

export const getProjects = (params:object) => {
    return requestDispatcher(getProjectsEndPoint, params, undefined)
}

export const updateProject = (params:object) => {
    return requestDispatcher(updateProjectEndPoint, params, undefined)
}

export const deleteTask = (task:Identifiable) => {
    const deletedId = task.id
	return requestDispatcher(deleteTaskEndPoint, task, { id: deletedId });
}

export const deleteProject = (project:Identifiable) => {
    const deletedId = project.id
	return requestDispatcher(deleteProjectEndPoint, project, { id: deletedId });
}

export const createTaskAction = (task: Identifiable) => {
    const cid = task.id = Number.MAX_SAFE_INTEGER;
	return requestDispatcher(createTaskEndPoint, task, { cid })
}

export const selectProject = (projectId: number) => {
    return {
	type: 'SELECT_PROJECT',
	data: projectId
    }
}

export const actionCreators = {
    createTaskAction,
    deleteTask,
    getProjects,
    updateProject,
    createProject,
    getTasks,
};
