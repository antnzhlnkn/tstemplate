import React, {Component} from 'react'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {compose} from 'redux'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import { Container } from "../components/container";

class Home extends Component<any,any> {

    render() {
        return (
            <Container>
                <TodoList/>
                <AddTodo />
            </Container>
        )
    }
}
const mapStateToProps = () => {};

const mapDispatchToProps = () => {};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps)
)(Home)
