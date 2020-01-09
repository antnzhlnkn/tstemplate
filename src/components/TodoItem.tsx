import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import HistoryIcon from '@material-ui/icons/History';
import CancelIcon from '@material-ui/icons/Cancel';
import CommentIcon from '@material-ui/icons/Comment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import { Input } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


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
  comment: string;
  open: boolean;
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
      isEdit: false,
      comment: 'Todo refreshed',
      open: false,
    };
  }

  componentDidUpdate(prevProps: ITodoItemProps) {
    const { item } = this.props;
    if (item.date !== prevProps.item.date) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ date: item.date });
    }
  }

  private handleChange = (event: any) => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  private handleDone = (event: any) => {
    const { checked } = event.target;
    this.setState({ isDone: checked });
  };

  private handlePrivate = (event: any) => {
    const { checked } = event.target;
    this.setState({ isPrivate: checked });
  };

  private handleEdit = () => {
    this.setState({ isEdit: true });
  };

  private handleChangeComment = (event: any) => {
    const { value } = event.target;
    this.setState({ comment: value });
  };

  private handleClickOpen = () => {
    this.setState({ open: true });
  };

  private handleClose = () => {
    this.setState({ open: false });
  };

  private handleDelete = () => {
    const { id }: ITodoItemState = this.state;
    const { handleDelete } = this.props;
    handleDelete({ id });
  };

  private handleCancel = () => {
    const { item } = this.props;
    this.setState({
      uid: item.uid,
      id: item.id,
      name: item.name,
      isDone: item.isDone,
      isPrivate: item.isPrivate,
      date: item.date,
      isEdit: false,
    });
  };

  private handleSave = () => {
    const {
      uid, date, id, name, isDone, isPrivate,
    }: ITodoItemState = this.state;
    const { handleSave } = this.props;
    handleSave({
      uid, date, id, name, isDone, isPrivate,
    });
    this.setState({ isEdit: false });
  };

  private handleRefresh = () => {
    const {
      uid, id, name, isDone, isPrivate, comment,
    }: ITodoItemState = this.state;
    const { handleRefresh } = this.props;
    handleRefresh({
      uid, id, name, isDone, isPrivate, comment,
    });
    this.setState({ isEdit: false });
  };

  render() {
    const {
      isEdit, date, name, isPrivate, isDone, open, id, comment,
    } = this.state;
    return (
      <Box display="flex" flexDirection="column" mb={1}>
        <Card>
          <CardContent>
            {
                isEdit ? (
                  <Input
                    type="text"
                    placeholder="Add new task"
                    value={name}
                    name="name"
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                )
                  : (
                    <Typography>{name}</Typography>
                  )
              }
            <div>
              <FormControlLabel
                control={(
                  <Checkbox
                    disabled={!isEdit}
                    name="isDone"
                    checked={isDone}
                    onChange={this.handleDone}
                  />
                    )}
                label="Done"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    disabled={!isEdit}
                    checked={isPrivate}
                    onChange={this.handlePrivate}
                    name="isPrivate"
                    value="isPrivate"
                  />
                    )}
                label="Task is private"
              />
            </div>
            <div>
              {date
                ? (
                  <span>
Hours:
                    {((moment.duration(moment().unix() * 1000).asHours()) - moment.duration(date.seconds * 1000).asHours()).toFixed(1)}
                    {' '}

                  </span>
                ) : null}
              {date
                ? (
                  <span>
Days:
                    {((moment.duration(moment().unix() * 1000).asDays()) - moment.duration(date.seconds * 1000).asDays()).toFixed()}
                    {' '}

                  </span>
                ) : null}
            </div>
          </CardContent>
          <CardActions>
            {
                isEdit ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleSave}
                    >
                      <SaveIcon>Save</SaveIcon>
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleRefresh}
                    >
                      <RefreshIcon>Refresh</RefreshIcon>
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleDelete}
                    >
                      <DeleteIcon>
                              Delete
                              item
                      </DeleteIcon>
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleCancel}
                    >
                      <CancelIcon>
                              Delete
                              item
                      </CancelIcon>
                    </Button>
                  </>
                )
                  : (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleEdit}
                      >
                        <EditIcon>Edit</EditIcon>
                      </Button>
                      <Link to={`/history/${id}`}>
                        <Button
                          variant="outlined"
                          color="primary"
                        >
                          <HistoryIcon>History</HistoryIcon>
                        </Button>
                      </Link>
                      <div>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                          <CommentIcon>
                                Comment for history
                          </CommentIcon>
                        </Button>
                        <Dialog
                          open={open}
                          onClose={this.handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">Comment</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                                  Enter the comment then view in history
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              type="text"
                              value={comment}
                              onChange={this.handleChangeComment}
                              fullWidth
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                  Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                  Enter
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </>
                  )
              }
          </CardActions>
        </Card>
      </Box>
    );
  }
}

const mapStateToProps = (state: any) => ({
  privateTodo: state.todos.isPrivate,
});

const mapDispatchToProps = (dispatch: any) => ({
  selectTodo: (todo: any) => dispatch({ type: 'selectTodo', todo }),
  privateTodo: (isPrivate: boolean) => dispatch({ type: 'privateTodo', isPrivate }),
});

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(TodoItem);
