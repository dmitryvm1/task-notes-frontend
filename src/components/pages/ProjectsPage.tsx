import * as React from "react";
import { updateProject, deleteProject, selectProject, getProjects, createProject, Identifiable, IDType } from '../../actions/actions';
import { connect } from 'react-redux';
import {DataTable} from 'primereact/datatable';
import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {Toolbar} from 'primereact/toolbar';
import { actionCreators } from "../../actions/actions";
import { Dispatch } from "redux";
import { ProjectItem } from "../../model/TaskItem";
import { IState } from "../../store/configStore";


interface IProjectsPageProps {
    getProjects: () => void;
    updateProject:(project:Identifiable) => void;
    selectProject:(id:IDType) => void;
    history: any;
    projects: any;
    deleteProject:(project:Identifiable) => void;
    createProject:(project:Identifiable) => void;
}

interface IProjectsPageState {
    globalFilter: string;
    newProjectTitle: string;
    isEditingName: boolean;
    modalVisible: boolean;
    project: ProjectItem;
    projects: ProjectItem[];
}

class ProjectsPageComponent extends React.Component<IProjectsPageProps, IProjectsPageState> {
    constructor(props: IProjectsPageProps) {
        super(props)
        this.state = {
            modalVisible: false,
            isEditingName: false,
            newProjectTitle: '',
            globalFilter: '',
            project: {} as ProjectItem,
            projects: []
        }
        this.selectProject = this.selectProject.bind(this)
        this.editProject = this.editProject.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.updateProject = this.updateProject.bind(this)
        this.actionTemplate = this.actionTemplate.bind(this)
        this.titleTemplate = this.titleTemplate.bind(this)
    }

    public componentDidMount() {
        this.props.getProjects();
    }

    public updateProject(project:ProjectItem) {
        this.props.updateProject(project)
        this.setState({ isEditingName: false })
    }

    public editProject(record:ProjectItem, e:any) {
        this.setState({ isEditingName: true, project: record })
        e.stopPropagation()
    }

    public cancelEditing() {
        this.setState({ isEditingName: false })
    }

    public render(): JSX.Element {
        var header = <div style={{'textAlign':'left'}}>
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.currentTarget.value})} placeholder="Project Search" size={50}/>
            </div>;
        const footer = (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={this.handleOk} />
                <Button label="Cancel" icon="pi pi-times" onClick={this.handleCancel} className="p-button-secondary" />
            </div>
        );
        return (
            <Panel header="Projects">
                <Toolbar style={{marginBottom:"0.5em"}}>
                    <Button label="New Project" icon="pi pi-plus" onClick={() => this.setState({modalVisible: true})} />
                </Toolbar>
                 <DataTable value={this.props.projects} paginator={true} rows={10} header={header}
                        resizableColumns={true} columnResizeMode="fit" 
                        globalFilter={this.state.globalFilter} emptyMessage="No records found">
                        <Column field="id" header="ID" style={{width:'10%'}} />
                        <Column field="title" body={this.titleTemplate} header="Title" style={{color: 'blue' }}/>
                        <Column header="Actions" body={this.actionTemplate} style={{width:'10rem', textAlign: 'center'}}/>
                </DataTable>
                <Dialog onHide={()=>{}} header="Add new project" visible={this.state.modalVisible} footer={footer} >
                    <InputTextarea rows={5} cols={30} value={this.state.newProjectTitle} onChange={(e) => this.setState({newProjectTitle: e.currentTarget.value})} />
                </Dialog>
            </Panel>
        );
    }

    private titleTemplate(rowData:ProjectItem, column:object) {
        return <div onClick={() => this.selectProject(rowData)} >{rowData.title}</div>; 
    }

    private actionTemplate(rowData:Identifiable, column:object) {
        return (
            <div>
                <Button onClick={() => this.props.deleteProject(rowData)} type="button" icon="pi pi-times" className="p-button-success" style={{marginRight: '.5em'}}></Button>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning"></Button>
            </div>
        );
    }
/*
    private deleteProject(record:Identifiable) {
        this.props.deleteProject(record)
    }*/

    private selectProject(record:Identifiable) {
        this.props.selectProject(record.id)
        this.props.history.push(`/tasks`)
    }

    private handleOk = () => {
        const item: any = {
            id: 0,
            ownerId: 0,
            title: this.state.newProjectTitle,
        };
	    this.props.createProject(item);
        this.setState({modalVisible: false});
    }
    private handleCancel = () => {
        this.setState({modalVisible: false});
    }
}

const mapStateToProps = (state: IState) => {
    return {
        projects: state.project.list
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getProjects: () => {
            getProjects({ownerId: 0})(dispatch);
        },
        createProject: (item:Identifiable) => {
            createProject(item)(dispatch);
        },
        deleteProject: (item:Identifiable) => {
            deleteProject(item)(dispatch);
        },
        selectProject: (id:any) => {
            dispatch(selectProject(id))
            actionCreators.getTasks({projectId: id, taskListId: 0})(dispatch)
        },
        updateProject: (project:Identifiable) => {
            updateProject(project)(dispatch)
        }
    }
}

export const ProjectsPage = connect(mapStateToProps, mapDispatchToProps)(ProjectsPageComponent);
