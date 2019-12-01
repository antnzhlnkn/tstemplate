import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import TodoItem from "./TodoItem";

interface ITodoItemState {
    uid: string;
    id: any;
    isEdit: boolean;
    name: string;
    isDone: boolean;
    isPrivate: boolean;
    date: any;
}

interface IProps {
    uid?: string,
    todos?: object,
    selectedTodo?: object,
    selectTodo?: any,
    completedTodo?: object,
    completTodo?: any,
    ptivatedTodo?: object,
    privateTodo?: any,
    firestore?: any
}

class TodoList extends Component<IProps> {
    render() {
        const {todos}: any = this.props;

        return (
            <div>
                <div>
                    {
                        todos.map((item: any) => <TodoItem key={item.id} item={item} handleSave={this.handleSave}
                                                           handleRefresh={this.handleRefresh}
                                                           handleDelete={this.handleDelete}/>)
                    }
                </div>
            </div>
        )
    }

    private handleSave = ({uid, date, id, name, isDone, isPrivate}: ITodoItemState) => {
        const {collection}: any = this.props.firestore;
        collection('todos')
            .doc(id)
            .set(
                {
                    name: name,
                    isDone: isDone,
                    uid: uid,
                    isPrivate: isPrivate,
                    date: date
                }
            );
    };

    addHistory(id: ITodoItemState) {
        this.props.firestore.add(
            {collection: 'history'},
            {
                uid: this.props.uid,
                todoId: id,
                comment: "test",
                date: new Date()
            }
        )
    }

    private handleRefresh = ({uid, id, name, isDone, isPrivate}: ITodoItemState) => {
        const {collection}: any = this.props.firestore;
        collection('todos')
            .doc(id)
            .set(
                {
                    name: name,
                    isDone: isDone,
                    uid: uid,
                    isPrivate: isPrivate,
                    date: new Date()
                }
            );
        this.addHistory(id)
    };

    private handleDelete = ({id}: ITodoItemState) => {
        const {collection}: any = this.props.firestore;
        collection('todos')
            .doc(id)
            .delete()
    };
}

const mapStateToProps = (state: any) => {
    return {
        uid: state.firebase.auth.uid,
        todos: state.firestore.ordered.todos ? state.firestore.ordered.todos : [],
        selectedTodo: state.todos.selectedTodo,
        completedTodo: state.todos.completedTodo,
        privatedTodo: state.todos.privatedTodo
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        selectTodo: (todo: any) => dispatch({type: 'selectTodo', todo}),
        completTodo: (todo: any) => dispatch({type: 'completTodo', todo}),
        privateTodo: (todo: any) => dispatch({type: 'privateTodo', todo}),
    }
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props: any) => {
        const {uid}: any = props;
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
