import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import {Input} from "@material-ui/core";

interface IIodoItemProps {
    item: any;
}

interface IIodoItemState {
    isEdit: boolean;
    name: string;
    isDone: boolean;
    isPrivate: boolean;
}

class TodoItem extends Component<IIodoItemProps, IIodoItemState> {
    constructor(props: IIodoItemProps) {
        super(props);
        this.state = {
            name: props.item.name,
            isDone: false,
            isEdit: false,
            isPrivate: false,
        };
    }

    private handleChange = (event: any) => {
        const {name, value} = event.target;
        this.setState({name: value})
    }

    private handleCheck = (event: any) => {
        const {name, checked} = event.target;
        this.setState({name: checked})
    }

    private handleEdit = () => {
        this.setState({isEdit: true})
    }

    handleSave = () => {
        this.setState({isEdit: false})
    }

    render() {
        const {isEdit} = this.state;
        return (
            <div>
                <Card>
                    <CardContent>
                        {
                            this.state.isEdit ? (
                                    <Input
                                        type="text"
                                        placeholder="add what ToDo"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                ) :
                                (
                                    <span>{this.state.name}</span>
                                )

                        }
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
                        {
                            isEdit ? (
                                    <>
                                        <button onClick={this.handleSave}><SaveIcon>Save</SaveIcon></button>
                                        <button><DeleteIcon>Delete item</DeleteIcon></button>
                                    </>
                                )
                                :
                                (

                                    <button onClick={this.handleEdit}><EditIcon>Edit</EditIcon></button>
                                )
                        }
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default TodoItem;
