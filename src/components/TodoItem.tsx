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
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";


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
            isDone: props.item.isDone,
            isEdit: false,
            isPrivate: props.item.isprivate,
            date: props.item.date
        };
    }

    private handleChange = (event: any) => {
        const {value} = event.target;
        this.setState({name: value})
    };

    private handleCheck = (event: any) => {
        const {checked} = event.target;
        this.setState({isDone: checked})
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
            <Box display="flex" flexDirection="column" mb={1}>
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
                        <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={!this.state.isEdit}
                                    name="isDone"
                                    checked={this.state.isDone}
                                    onChange={this.handleCheck}
                                />
                            }
                            label="Done"
                            />
                        </div>
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
                                        <Button onClick={this.handleSave}><SaveIcon>Save</SaveIcon></Button>
                                        <Button><DeleteIcon>Delete item</DeleteIcon></Button>
                                    </>
                                )
                                :
                                (

                                    <Button onClick={this.handleEdit}><EditIcon>Edit</EditIcon></Button>
                                )
                        }
                    </CardActions>
                </Card>
            </Box>
        );
    }
}

export default TodoItem;
