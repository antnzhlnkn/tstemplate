import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Container} from "../components/container";
import HistoryItem from "../components/historyItem";
import TodoItem from "../components/TodoItem"

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

    render() {
        const {todos}: any = this.props;
        return (
            <Container>
                <div>
                    Task:
                    {
                        todos.map((item: any) => <TodoItem key={item.id} item={item} handleSave={this.handleSave}
                                                           handleRefresh={this.handleRefresh}
                                                           handleDelete={this.handleDelete}/>)
                    }
                    History:
                    <HistoryItem todoId={this.props.match.params.todoId}/>
                </div>
            </Container>
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

    private addHistory(id: ITodoItemState, comment: ITodoItemState) {
        this.props.firestore.add(
            {collection: 'history'},
            {
                uid: this.props.uid,
                todoId: id,
                comment: comment,
                date: new Date()
            }
        )
    }

    private handleRefresh = ({uid, id, name, isDone, isPrivate, comment}: ITodoItemState) => {
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
        this.addHistory(id, comment)
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
    }
};

const mapDispatchToProps = () => {

};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props: any) => {
        const {uid}: any = props;
        const {todoId}: any = props.match.params;
            if (!uid) return [];
            return [
                {
                    collection: 'todos',
                    doc: todoId
                }
            ]
        }
    )
)(History)
