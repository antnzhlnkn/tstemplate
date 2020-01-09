import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import TodoItem from './TodoItem';
import { Container } from './container';

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

interface IProps {
  uid?: string;
  todos?: object;
  selectedTodo?: object;
  selectTodo?: any;
  completedTodo?: object;
  completTodo?: any;
  ptivatedTodo?: object;
  privateTodo?: any;
  firestore?: any;
}

class TodoList extends Component<IProps> {
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

    return (
      <Container>
        <div>
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
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  uid: state.firebase.auth.uid,
  todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
  selectedTodo: state.todos.selectedTodo,
  completedTodo: state.todos.completedTodo,
  privatedTodo: state.todos.privatedTodo,
});

const mapDispatchToProps = (dispatch: any) => ({
  selectTodo: (todo: any) => dispatch({ type: 'selectTodo', todo }),
  completTodo: (todo: any) => dispatch({ type: 'completTodo', todo }),
  privateTodo: (todo: any) => dispatch({ type: 'privateTodo', todo }),
});

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    const { uid }: any = props;
    if (!uid) return [];
    return [
      {
        collection: 'todos',
        where: [
          ['uid', '==', uid],
        ],
      },
    ];
  }),
)(TodoList);
