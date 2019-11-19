import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';

interface ConstructorParams {
    props: any;
}

class TodoItem extends Component<any,any> {
    constructor({props}: ConstructorParams) {
        super(props);
        this.state = {
            name: 'asd',
            isDone: false,
            edit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
    }

    private handleChange(event: any) {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    private handleCheck(event : any) {
        const {name, checked} = event.target;
        this.setState({[name]: checked})
    }

    private handleEdit() {
        this.setState({edit: true})
    }

    handleSave() {
        this.setState({edit: false})
    }

    renderNorm = () => {
        return (
            <div>
                <Card className="Item">
                    <CardContent>
                        <span>{this.state.name}</span>
                        <Checkbox>
                            <input
                                type="checkbox"
                                name="isDone"
                                checked={this.state.isDone}
                                onChange={this.handleCheck}
                            />
                        </Checkbox>
                    </CardContent>
                    <CardActions>
                        <button onClick={this.handleEdit}><EditIcon>Edit</EditIcon></button>
                    </CardActions>
                </Card>
            </div>
        )
    };
    renderEdit = () => {
        return (
            <div>
                <Card>
                    <CardContent>
                        <input
                            type="text"
                            placeholder="add what ToDo"
                            value={this.state.name}
                            name="name"
                            onChange={this.handleChange}
                        />
                        <Checkbox>
                            <input
                                type="checkbox"
                                name="isDone"
                                checked={this.state.isDone}
                                onChange={this.handleCheck}
                            />
                        </Checkbox>
                    </CardContent>
                    <CardActions>
                        <button onClick={this.handleSave}><SaveIcon>Save</SaveIcon></button>
                        <button onClick={() => this.props.handleDelete(this.props.item.id)}><DeleteIcon>Delete
                            item</DeleteIcon></button>
                    </CardActions>
                </Card>
            </div>
        )
    };


    render() {
        console.log(this.props);
        return (
            this.state.edit ? this.renderEdit() : this.renderNorm()
        );
    }
}

export default TodoItem;