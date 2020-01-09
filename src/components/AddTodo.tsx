import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface IProps {
  uid?: string;
  isDone?: boolean;
  date?: any;
  firestore?: any;
}

interface IState {
  todo: string;
  isPrivate: boolean;
  isDone: boolean;
  date?: any;
}

class AddTodo extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      todo: '',
      isPrivate: true,
      isDone: false,
      date: new Date(),
    };
  }


  private handleDateChange = (date: Date | null) => {
    this.setState({ date });
  };

  private addTodo() {
    const { uid, firestore } = this.props;
    const {
      todo, isPrivate, date, isDone,
    } = this.state;
    firestore.add(
      { collection: 'todos' },
      {
        uid,
        name: todo,
        isDone,
        isPrivate,
        date,
      },
    );
    this.setState({ todo: '' });
  }

  render() {
    const { uid } = this.props;
    if (!uid) return null;

    const { todo, isPrivate, date } = this.state;
    return (
      <span>
        <Card>
          <Box display="flex" flexDirection="column" m={1}>
            <Input
              required
              placeholder="Enter new task"
              type="text"
              value={todo}
              onChange={(evt) => this.setState({ todo: evt.target.value })}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                ampm={false}
                format="dd/MM/yyyy HH:mm"
                margin="normal"
                id="date-picker-inline"
                value={date}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isPrivate}
                  onChange={(evt) => this.setState({ isPrivate: evt.target.checked })}
                  value="isPrivate"
                />
                )}
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
    );
  }
}

const mapStateToProps = (state: any) => ({
  uid: state.firebase.auth.uid,
});

const mapDispatchToProps = {};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddTodo);
