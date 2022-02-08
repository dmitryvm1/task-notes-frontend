export const projectName = (state:any) => {
    if (state.project.list.length === 0) {
        return ''
    }
    const project = state.project.list.filter((p:{id:string}) => p.id == state.control.projectId)[0];
    if (project) {
        return project.title
    }
    return ''
}
