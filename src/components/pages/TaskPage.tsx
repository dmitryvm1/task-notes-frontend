import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import {DataTable} from 'primereact/datatable';
import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Toolbar} from 'primereact/toolbar';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dialog} from 'primereact/dialog';
import { TaskItem } from "../../model/TaskItem";
import { IState } from "../../store/configStore";
import { actionCreators, Identifiable } from "../../actions/actions";
import * as selectors from '../../store/selectors';

interface ITaskProps extends ITaskStateProps {
    createTask?: (task:TaskItem)=>void;
    deleteTask?: (task:Identifiable)=>void;
	getTasks?: ()=>void;
}

interface ITaskStateProps {
    projectName: string;
    projectId: number;
    taskItems: TaskItem[];
}

interface ITaskState {
    modalVisible: boolean;
    newTaskName: string;
    globalFilter: string;
}

class TaskPageComponent extends React.Component<ITaskProps, ITaskState> {
    constructor(props: ITaskProps) {
        super(props);
        this.state = {
            modalVisible: false,
            newTaskName: "",
            globalFilter: ""
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
    }

    public componentDidMount() {
    }

    public render(): JSX.Element {
        const projectName = this.props.projectName
        let header = <div style={{'textAlign':'left'}}>
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.currentTarget.value})} placeholder="Global Search" size={50}/>
        </div>;
        const footer = (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={this.handleOk} />
                <Button label="Cancel" icon="pi pi-times" onClick={this.handleCancel} className="p-button-secondary" />
            </div>
        );
        console.log('rendering tasks', this.props.taskItems);
        return (
            <Panel header={`Task List for ${projectName}`}>
                <Toolbar style={{marginBottom:"0.5em"}}>
                    <Button label="New Task" icon="pi pi-plus" onClick={() => this.setState({modalVisible: true})} />
                </Toolbar>
                <DataTable value={this.props.taskItems} paginator={true} rows={10} header={header}
                        resizableColumns={true} columnResizeMode="fit" 
                        globalFilter={this.state.globalFilter} emptyMessage="No records found">
                        <Column field="title" body={this.titleTemplate} header="Title" style={{color: 'black' }}/>
                        <Column header="Actions" body={this.actionTemplate} style={{width:'10rem', textAlign: 'center'}}/>
                </DataTable>
                <Dialog onHide={()=>{}} header="Add new task" visible={this.state.modalVisible} footer={footer} >
                    <InputTextarea cols={30} rows={5} value={this.state.newTaskName} onChange={(e) => this.handleChange(e)} />
                </Dialog>
            </Panel>
        );
    }

    private handleChange = (e:React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({newTaskName: e.currentTarget.value})
    }

    private handleOk = () => {
        const item: TaskItem = {
            id: 0,
            key: 0,
            projectId: this.props.projectId,
            title: this.state.newTaskName,
            isCompleted: false,
        };
	    this.props.createTask && this.props.createTask(item);
        this.setState({modalVisible: false});
    }

    private titleTemplate = (rowData: TaskItem, column:object) => {
        return <div>{rowData.title}</div>
    }

    private actionTemplate(rowData:TaskItem, column:object) {
        return (
            <div>
                <Button onClick={()=> this.props.deleteTask && this.props.deleteTask(rowData)} type="button" icon="pi pi-times" className="p-button-success" style={{marginRight: '.5em'}}></Button>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning"></Button>
            </div>
        );
    }

    private handleCancel = () => {
        this.setState({modalVisible: false});
    }
}

const mapStateToProps = (state: IState): ITaskStateProps => {
    return {
        taskItems: state.task.list.filter((t) => t.projectId == state.control.projectId),
        projectId: state.control.projectId,
        projectName: selectors.projectName(state),
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => {
    return {
        createTask: (taskItem: TaskItem) => actionCreators.createTaskAction(taskItem)(dispatch),
	    deleteTask: (record:TaskItem) => actionCreators.deleteTask(record)(dispatch),
        getTasks: (projectId:number) => actionCreators.getTasks({projectId, taskListId: 0})(dispatch)
    };
};

export const TaskPage = connect(mapStateToProps, mapDispatchToProps)(TaskPageComponent);
