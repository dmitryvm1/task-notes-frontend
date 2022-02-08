import axios from "axios";
import { Identifiable } from "../actions/actions";

const instance = axios.create({
  baseURL: "/api/",
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});

export function createTask(params: any) {
    return instance.post("task", params);
}

export function createProject(params: any) {
    return instance.post("project", params);
}

export function updateProject(params: any) {
    return instance.patch("project", params);
}

export function getTasks(params: Identifiable) {
    return instance.get("task", { params });
}

export function getProjects(params: Identifiable) {
    return instance.get("project", { params });
}

export function deleteTask(task: Identifiable) {
    return instance.delete("task", {params: { id: task.id }});
}

export function deleteProject(params: Identifiable) {
    return instance.delete("project", { params });
}
