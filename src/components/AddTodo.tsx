import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
                <Input
                    type="text"
                    value={this.state.todo}
                    onChange={(evt) => this.setState({ todo: evt.target.value })}
                />
                <Button onClick={() => this.addTodo()}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Button>
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