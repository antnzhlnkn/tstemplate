import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import moment from 'moment';
import { AddTodo } from "./AddTodo";

interface IProps {
    uid?: string,
    todos?: object,
    selectedTodo?: object,
    selectTodo?: any,
    completedTodo?: object,
    completTodo?: any,
    firestore?: object
}

interface RenderTodoParams {
    todo: any;
}

interface DelTodosParams {
    todo: any;
}

interface RefreshTodosParams {
    todo: any;
}

class TodoList extends Component<IProps,any> {

    renderTodo({todo}: RenderTodoParams) {
        let styles = {
            padding: '1rem',
            cursor: 'pointer',
            backgroundColor: '#988afe'
        }
        if (todo === this.props.selectedTodo) {
            styles.backgroundColor = '#988afe'
        }
        return (
            <div
                key={todo.name}
                style={styles}
                onClick={() => this.props.selectTodo(todo)}>
                {todo.name}
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => this.props.completTodo(todo)}
                />
                {todo.date ? <span>Hours: {((moment.duration(moment().unix() * 1000).asHours()) - moment.duration(todo.date.seconds * 1000).asHours()).toFixed(1)}  </span> : null}
                {todo.date ? <span>Days: {((moment.duration(moment().unix() * 1000).asDays()) - moment.duration(todo.date.seconds * 1000).asDays()).toFixed()} </span> : null}
                <button onClick={()=>this.refreshTodos({todo: todo})}>refresh</button>
                <div><button onClick={()=>this.delTodos({todo: todo})}>delete</button></div>
            </div>
        )
    }
    saveTodos() {
        const {collection} : any = this.props.firestore
        const {uid, date, id, name, isDone} :any = this.props.completedTodo;
        collection('todos')
            .doc(id)
            .set(
                {
                    name: name,
                    isDone: isDone,
                    uid: uid,
                    date: date ? date : new Date()
                }
            );
    }
    delTodos({todo}: DelTodosParams) {
        const {collection} :any = this.props.firestore;
        collection('todos')
            .doc(todo.id)
            .delete()
    }
    refreshTodos({todo}: RefreshTodosParams) {
        const {collection} :any = this.props.firestore;
        collection('todos')
            .doc(todo.id)
            .set(
                {
                    date: new Date(),
                    name: todo.name,
                    isDone: todo.isDone,
                    uid: todo.uid
                }
            );
    }

    render() {
        const {completedTodo, todos} : any= this.props;
        const todoItems = todos.map(
            (item: any) => this.renderTodo({todo: item})
        );
        return (
            <div>
                <div>
                    {todoItems}
                </div>
                {completedTodo ? <button onClick={()=>this.saveTodos()}>Save</button> : null}
                <AddTodo />
                {console.log(completedTodo)}
                {completedTodo ? console.log(completedTodo.id) : null}
            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        uid: state.firebase.auth.uid,
        todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
        selectedTodo: state.todos.selectedTodo,
        completedTodo :state.todos.completedTodo
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        selectTodo: (todo : any) => dispatch({ type: 'selectTodo', todo }),
        completTodo: (todo : any) => dispatch ({ type: 'completTodo', todo})
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        const {uid } : any = props;
        if (!uid) return []
            return [
                {
                    collection: 'todos',
                    where: [
                        ['uid', '==', uid]
                    ]
                }
            ]
        }
    )
)(TodoList)