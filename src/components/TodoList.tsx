import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect, isLoaded} from 'react-redux-firebase'
import TodoItem from "./TodoItem";

interface IProps {
    uid?: string,
    todos?: object,
    selectedTodo?: object,
    selectTodo?: any,
    completedTodo?: object,
    completTodo?: any,
    ptivatedTodo?: object,
    privateTodo?: any,
    firestore?: object
}

class TodoList extends Component<IProps,any> {

    render() {
        const {todos} : any= this.props;
        const todoItems = todos.map((item:any) => <TodoItem key={item.id} item={item}/>);

        return (
            <div>
                <div>
                    {todoItems}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        uid: state.firebase.auth.uid,
        todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
        selectedTodo: state.todos.selectedTodo,
        completedTodo :state.todos.completedTodo,
        privatedTodo :state.todos.privatedTodo
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        selectTodo: (todo : any) => dispatch({ type: 'selectTodo', todo }),
        completTodo: (todo : any) => dispatch ({ type: 'completTodo', todo}),
        privateTodo: (todo : any) => dispatch({ type: 'privateTodo', todo }),
    }
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props:any) => {
        const {uid } : any = props;
        if (!uid) return [];
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
