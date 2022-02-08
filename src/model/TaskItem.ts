import { Identifiable } from "../actions/actions";

export interface TaskItem extends Identifiable {
    key: number;
    title: string;
    projectId: number;
    isCompleted: boolean;
}

export interface ProjectItem extends Identifiable {
    title: string;
}