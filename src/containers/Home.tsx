import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'


class Home extends Component<any,any> {

    render() {
        return (
            <div>
                <TodoList/>
                <AddTodo />
            </div>
        )
    }
}
const mapStateToProps = () => {};

const mapDispatchToProps = () => {};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps)
)(Home)
