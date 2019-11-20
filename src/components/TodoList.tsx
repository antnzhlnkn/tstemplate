import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect, isLoaded} from 'react-redux-firebase'
import moment from 'moment';
import AddTodo from "./AddTodo";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import {Box} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TodoItem from "./TodoItem";
import CircularProgress from "./AuthButton";

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

interface SaveTodosParams {
    todo: object;
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

interface Styles {
    padding: any,
    cursor: any,
    backgroundColor: any
}

class TodoList extends Component<IProps,any> {


    renderTodo({todo}: RenderTodoParams) {
        const styles : Styles = {
            padding: '1rem',
            cursor: 'pointer',
            backgroundColor:'#ffffff'
        };
        if (todo === this.props.selectedTodo) {
            styles.backgroundColor = '#988afe'
        }
        return (
            <Box mb={1}>
            <Card
                key={todo.name}
                style={styles}
                onClick={() => this.props.selectTodo(todo)}>
                {todo.name}
                <Checkbox
                    checked={todo.isDone}
                    onChange={() => this.props.completTodo(todo)}
                />
                <div>
                {todo.date ? <span>Hours: {((moment.duration(moment().unix() * 1000).asHours()) - moment.duration(todo.date.seconds * 1000).asHours()).toFixed(1)}  </span> : null}
                {todo.date ? <span>Days: {((moment.duration(moment().unix() * 1000).asDays()) - moment.duration(todo.date.seconds * 1000).asDays()).toFixed()} </span> : null}
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={todo.isprivate}
                            onChange={() => this.props.privateTodo(todo)}
                            value="isprivate"
                        />
                    }
                    label="Task is private"
                />
                <div>
                    <Button onClick={()=>this.refreshTodos({todo: todo})}>refresh</Button>
                    <Button onClick={()=>this.delTodos({todo: todo})}>delete</Button>
                    <Button onClick={()=> this.saveTodos({todo: todo})}>save</Button>
                </div>
            </Card>
            </Box>
        )
    }
    saveTodos({todo}: SaveTodosParams) {
        const {collection} : any = this.props.firestore;
        const {uid, date, id, name, isDone , isprivate} :any = todo;
        collection('todos')
            .doc(id)
            .set(
                {
                    name: name,
                    isDone: isDone,
                    uid: uid,
                    isprivate: isprivate,
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
                    uid: todo.uid,
                    isprivate: todo.isprivate
                }
            );
    }

    render() {
        const {todos} : any= this.props;
        const todoItems = todos.map((item:any) => <TodoItem key={item.id} item={item}/>)

        return (
            <div>
                <div>
                    {todoItems}
                </div>
                <AddTodo />
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
