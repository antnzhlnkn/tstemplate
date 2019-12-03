import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import RefreshIcon from '@material-ui/icons/Refresh';
import HistoryIcon from '@material-ui/icons/History';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import {Input} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import moment from "moment";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";


interface ITodoItemProps {
    item: any;
    firestore: object;
    handleSave: any;
    handleRefresh: any;
    handleDelete: any;
}

interface ITodoItemState {
    uid: string;
    id: string;
    isEdit: boolean;
    name: string;
    isDone: boolean;
    isPrivate: boolean;
    date: any;
}

class TodoItem extends Component<ITodoItemProps, ITodoItemState> {
    constructor(props: ITodoItemProps) {
        super(props);
        this.state = {
            uid: props.item.uid,
            id: props.item.id,
            name: props.item.name,
            isDone: props.item.isDone,
            isPrivate: props.item.isPrivate,
            date: props.item.date,
            isEdit: false
        };
    }

    componentDidUpdate(prevProps: ITodoItemProps) {
        if (this.props.item.date !== prevProps.item.date) {
            this.setState({date: this.props.item.date})
        }
    }

    private handleChange = (event: any) => {
        const {value} = event.target;
        this.setState({name: value})
    };

    private handleDone = (event: any) => {
        const {checked} = event.target;
        this.setState({isDone: checked})
    };

    private handlePrivate = (event: any) => {
        const {checked} = event.target;
        this.setState({isPrivate: checked})
    };

    private handleEdit = () => {
        this.setState({isEdit: true})
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
                                        placeholder="Add new task"
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
                                        onChange={this.handleDone}
                                    />
                                }
                                label="Done"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={!this.state.isEdit}
                                        checked={this.state.isPrivate}
                                        onChange={this.handlePrivate}
                                        name="isPrivate"
                                        value="isPrivate"
                                    />
                                }
                                label="Task is private"
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
                                        <Button onClick={this.handleRefresh}><RefreshIcon>Refresh</RefreshIcon></Button>
                                        <Button onClick={this.handleDelete}><DeleteIcon>Delete item</DeleteIcon></Button>
                                        <Button onClick={this.handleCancel}><CancelIcon>Delete
                                            item</CancelIcon></Button>
                                    </>
                                )
                                :
                                (
                                    <>
                                    <Button onClick={this.handleEdit}><EditIcon>Edit</EditIcon></Button>
                                        <Button><HistoryIcon>Delete item</HistoryIcon></Button>
                                    </>
                                )
                        }
                    </CardActions>
                </Card>
            </Box>
        );
    }

    private handleDelete = () => {
        const {id}: ITodoItemState = this.state;
        this.props.handleDelete({id});
    };
    private handleCancel = () => {
        this.setState({
            uid: this.props.item.uid,
            id: this.props.item.id,
            name: this.props.item.name,
            isDone: this.props.item.isDone,
            isPrivate: this.props.item.isPrivate,
            date: this.props.item.date,
            isEdit: false
        })
    };

    private handleSave = () => {
        const {uid, date, id, name, isDone, isPrivate}: ITodoItemState = this.state;
        this.props.handleSave({uid, date, id, name, isDone, isPrivate});
        this.setState({isEdit: false})
    };

    private handleRefresh = () => {
        const {uid, id, name, isDone, isPrivate}: ITodoItemState = this.state;
        this.props.handleRefresh({uid, id, name, isDone, isPrivate});
        this.setState({isEdit: false})
    };
}

const mapStateToProps = () => {
};

const mapDispatchToProps = () => {
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(),
)(TodoItem)
