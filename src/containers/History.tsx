import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import { Container } from '../components/container';
import HistoryItem from '../components/HistoryItem';
import TodoItem from '../components/TodoItem';

interface IProps {
  uid?: string;
  todos?: object;
  firestore?: any;
  match: any;
}

interface ITodoItemState {
  uid: string;
  id: any;
  isEdit: boolean;
  name: string;
  isDone: boolean;
  isPrivate: boolean;
  date: any;
  comment: any;
}

class History extends Component<IProps, any> {
  private handleSave = ({
    uid, date, id, name, isDone, isPrivate,
  }: ITodoItemState) => {
    const { firestore } = this.props;
    const { collection }: any = firestore;
    collection('todos')
      .doc(id)
      .set(
        {
          name,
          isDone,
          uid,
          isPrivate,
          date,
        },
      );
  };

  private handleRefresh = ({
    uid, id, name, isDone, isPrivate, comment,
  }: ITodoItemState) => {
    const { firestore } = this.props;
    const { collection }: any = firestore;
    collection('todos')
      .doc(id)
      .set(
        {
          name,
          isDone,
          uid,
          isPrivate,
          date: new Date(),
        },
      );
    this.addHistory(id, comment);
  };

  private handleDelete = ({ id }: ITodoItemState) => {
    const { firestore } = this.props;
    const { collection }: any = firestore;
    collection('todos')
      .doc(id)
      .delete();
  };

  private addHistory(id: ITodoItemState, comment: ITodoItemState) {
    const { uid, firestore } = this.props;
    firestore.add(
      { collection: 'history' },
      {
        uid,
        todoId: id,
        comment,
        date: new Date(),
      },
    );
  }

  render() {
    const { todos }: any = this.props;
    const { match } = this.props;
    return (
      <Container>
        <>
          <Typography variant="h6" component="h3">
                        Task:
          </Typography>
          {
                        todos.map((item: any) => (
                          <TodoItem
                            key={item.id}
                            item={item}
                            handleSave={this.handleSave}
                            handleRefresh={this.handleRefresh}
                            handleDelete={this.handleDelete}
                          />
                        ))
                    }
          <Typography variant="h6" component="h3">
                        History:
          </Typography>
          <HistoryItem todoId={match.params.todoId} />
        </>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  uid: state.firebase.auth.uid,
  todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
});

const mapDispatchToProps = () => {

};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    const { uid }: any = props;
    const { todoId }: any = props.match.params;
    if (!uid) return [];
    return [
      {
        collection: 'todos',
        doc: todoId,
      },
    ];
  }),
)(History);
