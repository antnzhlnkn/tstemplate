import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Container } from './container';

interface IProps {
  uid?: string;
  todos?: object;
  selectedTodo?: object;
  selectTodo?: any;
  completedTodo?: object;
  completTodo?: any;
  firestore?: object;
}

interface RenderTodoParams {
  todo: any;
}

interface Styles {
  padding: any;
  cursor: any;
  backgroundColor: any;
}

class OtherTodo extends Component<IProps, any> {
  renderTodo({ todo }: RenderTodoParams) {
    const styles: Styles = {
      padding: '1rem',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
    };
    if (todo === this.props.selectedTodo) {
      styles.backgroundColor = '#988afe';
    }
    return (
      <Box mb={1}>
        <Card
          key={todo.name}
          style={styles}
          onClick={() => this.props.selectTodo(todo)}
        >
          <Typography>{todo.name}</Typography>
          <Typography>
                        Done:
            <Checkbox
              checked={todo.isDone}
              disabled
            />
          </Typography>
          <Typography>
            {todo.date
              ? (
                <span>
Hours:
                  {((moment.duration(moment().unix() * 1000).asHours()) - moment.duration(todo.date.seconds * 1000).asHours()).toFixed(1)}
                  {' '}

                </span>
              ) : null}
            {todo.date
              ? (
                <span>
Days:
                  {((moment.duration(moment().unix() * 1000).asDays()) - moment.duration(todo.date.seconds * 1000).asDays()).toFixed()}
                  {' '}

                </span>
              ) : null}
          </Typography>
        </Card>
      </Box>
    );
  }

  render() {
    const links = [];
    const { todos }: any = this.props;
    links.push({ title: 'other', to: '/other' });
    const todoItems = todos.map(
      (item: any) => this.renderTodo({ todo: item }),
    );
    return (
      <Container>
        <div>
          {todoItems}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  uid: state.firebase.auth.uid,
  todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
  selectedTodo: state.todos.selectedTodo,
});

const mapDispatchToProps = (dispatch: any) => ({
  selectTodo: (todo: any) => dispatch({ type: 'selectTodo', todo }),
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
          ['isPrivate', '==', false],
        ],
      },
    ];
  }),
)(OtherTodo);
