import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

interface IProps {
    uid?: string,
    isDone?: boolean,
    date?: any,
    firestore?: any
}
interface IState {
    todo: string
}
class AddTodo extends Component<IProps,IState> {

    public state: IState = {
        todo: '',
    };

    private addTodo() {
        this.props.firestore.add(
            { collection: 'todos' },
            {
                uid: this.props.uid,
                name: this.state.todo,
                isDone : this.props.isDone,
                date: this.props.date
            }
        )
        this.setState({ todo: '' })
    }

    render() {
        if (!this.props.uid) return null;

        return (
            <div>
                <input
                    type="text"
                    value={this.state.todo}
                    onChange={(evt) => this.setState({ todo: evt.target.value })}
                />
                <button onClick={() => this.addTodo()}>Add Todo</button>
            </div>
        )
    }
}

const mapStateToProps = (state: any)=> {
    return {
        uid: state.firebase.auth.uid,
        isDone: false,
        date: new Date()
    }
}

const mapDispatchToProps = {
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(),
)(AddTodo)