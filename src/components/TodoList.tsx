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
    private handleSave = () => {
        const {collection} : any = this.props.firestore;
        const {uid, date, id, name, isDone , isPrivate} :IIodoItemState = this.state;
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
        this.setState({isEdit: false})
    };

    render() {
        const {todos} : any= this.props;

        return (
            <div>
                <div>
                    {
                        todos.map((item:any) => <TodoItem key={item.id} item={item} handleSave={this.handleSave} />)
                    }
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
