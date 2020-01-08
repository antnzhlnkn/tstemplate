import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import {Container} from "../components/container";

class Home extends Component<any, any> {

    render() {
        return (
            <Container>
                <TodoList/>
                <AddTodo/>
            </Container>
        )
    }
}

export default compose<any>(
    connect()
)(Home)
