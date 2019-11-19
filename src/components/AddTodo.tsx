import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import {Box} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface IProps {
    uid?: string,
    isDone?: boolean,
    date?: any,
    firestore?: any
}
interface IState {
    todo: string,
    isprivate:boolean,
    isDone:boolean,
    date? : any
}
class AddTodo extends Component<IProps,IState> {

    public state: IState = {
        todo: '',
        isprivate: false,
        isDone:false,
        date: new Date()
    };

    private addTodo() {
        this.props.firestore.add(
            { collection: 'todos' },
            {
                uid: this.props.uid,
                name: this.state.todo,
                isDone : this.state.isDone,
                isprivate : this.state.isprivate,
                date: this.state.date
            }
        );
        this.setState({ todo: '' })
    }
    private handleDateChange = (date: Date | null) => {
        this.setState({date: date});
        console.log(this.state.date)
    };

    render() {
        if (!this.props.uid) return null;

        return (
            <span>
                <Card>
                <Box display="flex" flexDirection="column" m={1}>
                    <Input
                        required={true}
                        placeholder="Enter new task"
                        type="text"
                        value={this.state.todo}
                        onChange={(evt) => this.setState({ todo: evt.target.value })}
                  />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            ampm={false}
                            format="dd/MM/yyyy HH:mm"
                            margin="normal"
                            id="date-picker-inline"
                            value={this.state.date}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                </MuiPickersUtilsProvider>
                <FormControlLabel
                     control={
                          <Checkbox
                               checked={this.state.isprivate}
                               onChange={(evt) => this.setState({ isprivate: evt.target.checked })}
                               value="isprivate"
                          />
                     }
                     label="Task is private"
                />
                <Button onClick={() => this.addTodo()}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Button>
                </Box>
                </Card>
            </span>
        )
    }
}

const mapStateToProps = (state: any)=> {
    return {
        uid: state.firebase.auth.uid
    }
};

const mapDispatchToProps = {
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(),
)(AddTodo)
