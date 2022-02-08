import * as React from 'react'
// TODO: a component for editing project name
interface NameEditorProps {
    update: any,
    cancel: any,
    name: string
}

interface NameEditorState {
    name: string
}

class NameEditor extends React.Component<NameEditorProps, NameEditorState> {
    constructor(props:NameEditorProps) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleOk() {
        this.props.update(this.state.name)
    }

    handleCancel() {
        this.props.cancel()
    }

    render() {
        //const visible = this.props.visible
       // const projectName = this.state.project ? this.state.project.title : ''
        return (
            <div>
      
            </div>
        )
    }
}

export default NameEditor
