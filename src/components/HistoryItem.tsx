import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Container } from './container';


interface IProps {
  uid?: string;
  todoId?: string;
  todos?: object;
  history?: object;
  selectedTodo?: object;
  selectTodo?: any;
  completedTodo?: object;
  completTodo?: any;
  firestore?: object;
}

interface RenderTodoParams {
  item: any;
}

interface Styles {
  padding: any;
  cursor: any;
  backgroundColor: any;
}

class HistoryItem extends Component<IProps, any> {
  renderTodo({ item }: RenderTodoParams) {
    const styles: Styles = {
      padding: '1rem',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
    };
    if (item === this.props.selectedTodo) {
      styles.backgroundColor = '#988afe';
    }
    return (
      <Box mb={1}>
        <Card
          key={item.name}
          style={styles}
        >
          <Typography>
                        Comment:
            {item.comment}
          </Typography>
          <Typography>
                        Time ago:
            {item.date
              ? (
                <span>
                  {' '}
                                    Hours:
                  {((moment.duration(moment().unix() * 1000).asHours()) - moment.duration(item.date.seconds * 1000).asHours()).toFixed(1)}
                  {' '}

                </span>
              ) : null}
            {item.date
              ? (
                <span>
Days:
                  {((moment.duration(moment().unix() * 1000).asDays()) - moment.duration(item.date.seconds * 1000).asDays()).toFixed()}
                  {' '}

                </span>
              ) : null}
          </Typography>
          <Typography>
                        Updated
                        at:
            {moment(item.date.seconds * 1000).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </Typography>
        </Card>
      </Box>
    );
  }

  render() {
    const { history }: any = this.props;
    const historyItems = history.map(
      (item: any) => this.renderTodo({ item }),
    );
    return (
      <Container>
        <div>
          {historyItems}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  uid: state.firebase.auth.uid,
  history: state.firestore.ordered.history ? state.firestore.ordered.history : [],
});

const mapDispatchToProps = (dispatch: any) => ({
  selectTodo: (todo: any) => dispatch({ type: 'selectTodo', todo }),
});

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    const { uid }: IProps = props;
    const { todoId }: IProps = props;
    if (!uid) return [];
    return [
      {
        collection: 'history',
        where:
                    [
                      ['uid', '==', uid],
                      ['todoId', '==', todoId],
                    ],
        orderBy: ['date', 'desc'],
      },
    ];
  }),
)(HistoryItem);
