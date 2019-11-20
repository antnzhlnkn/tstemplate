import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import {Input} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import moment from "moment";

interface IIodoItemProps {
    item: any;
}

interface IIodoItemState {
    isEdit: boolean;
    name: string;
    isDone: boolean;
    isPrivate: boolean;
    date: any;
}

class TodoItem extends Component<IIodoItemProps, IIodoItemState> {
    constructor(props: IIodoItemProps) {
        super(props);
        this.state = {
            name: props.item.name,
            isDone: false,
            isEdit: false,
            isPrivate: false,
            date: props.item.date
        };
    }

    private handleChange = (event: any) => {
        const {value} = event.target;
        this.setState({name: value})
    };

    private handleCheck = (event: any) => {
        const {name, checked} = event.target;
        this.setState({name: checked})
    };

    private handleEdit = () => {
        this.setState({isEdit: true})
    };

    handleSave = () => {
        this.setState({isEdit: false})
    };

    render() {
        const {isEdit} = this.state;
        return (
            <Box mb={1}>
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
                                    <div>{this.state.name}</div>
                                )

                        }
                        <Checkbox
                            disabled={!this.state.isEdit}
                        >
                            <input
                                type="checkbox"
                                name="isDone"
                                checked={this.state.isDone}
                                onChange={this.handleCheck}
                            />
                        </Checkbox>
                        <div>
                            {this.state.date ?
                                <span>Hours: {((moment.duration(moment().unix() * 1000).asHours()) - moment.duration(this.state.date.seconds * 1000).asHours()).toFixed(1)}  </span> : null}
                            {this.state.date ?
                                <span>Days: {((moment.duration(moment().unix() * 1000).asDays()) - moment.duration(this.state.date.seconds * 1000).asDays()).toFixed()} </span> : null}
                        </div>
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
            </Box>
        );
    }
}

export default TodoItem;
