import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import * as moment from 'moment';

import AddTodo from './AddTodo'

interface IProps {
    uid?: string,
    todos?: object,
    selectedTodo?: object,
    selectTodo?: any,
    completedTodo?: object,
    completTodo?: any,
    firestore?: object
}

class TodoList extends Component<IProps,any> {

    renderTodo(todo) {
        const styles = {
            padding: '1rem',
            cursor: 'pointer'
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
                {todo.date ? <span>Hours: {((moment.duration(moment().unix()*1000).asHours())-moment.duration(todo.date.seconds*1000).asHours()).toFixed(1)}  </span> : null}
                {todo.date ? <span>Days: {((moment.duration(moment().unix()*1000).asDays())-moment.duration(todo.date.seconds*1000).asDays()).toFixed()} </span> : null}
                <button onClick={()=>this.refreshTodos(todo)}>refresh</button>
                <div><button onClick={()=>this.delTodos(todo)}>delete</button></div>
            </div>
        )
    }
    render() {
        const todoItems = this.props.todos.map(
            (item) => this.renderTodo(item)
        )
        return (
            <div>
                <div>
                    {todoItems}
                </div>
                {this.props.completedTodo ? <button onClick={()=>this.saveTodos()}>Save</button> : null}
                <AddTodo />
                {console.log(this.props.completedTodo)}
                {this.props.completedTodo ? console.log(this.props.completedTodo.id) : null}
            </div>
        )
    }
    saveTodos() {
        this.props.firestore.collection('todos')
            .doc(this.props.completedTodo.id)
            .set(
                {
                    name: this.props.completedTodo.name,
                    isDone: this.props.completedTodo.isDone,
                    uid: this.props.completedTodo.uid,
                    date: this.props.completedTodo.date ? this.props.completedTodo.date : new Date()
                }
            );
    }
    delTodos(todo) {
        this.props.firestore.collection('todos')
            .doc(todo.id)
            .delete()
    }
    refreshTodos(todo) {
        this.props.firestore.collection('todos')
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
}
const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
        selectedTodo: state.todos.selectedTodo,
        completedTodo :state.todos.completedTodo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTodo: todo => dispatch({ type: 'selectTodo', todo }),
        completTodo: todo => dispatch ({ type: 'completTodo', todo})
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
            if (!props.uid) return []
            return [
                {
                    collection: 'todos',
                    where: [
                        ['uid', '==', props.uid]
                    ]
                }
            ]
        }
    )
)(TodoList)