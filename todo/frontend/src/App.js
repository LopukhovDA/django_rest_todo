import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects')
      .then(response => {
        const projects = response.data
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/notes')
      .then(response => {
        const todos = response.data
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <BrowserRouter>

          <Menu />

          <Routes>
            <Route exact path='/' element={<UserList
              users={this.state.users} />} />
            <Route exact path='/projects' element={<ProjectList
              projects={this.state.projects} />} />
            <Route exact path='/todos' element={<TodoList
              todos={this.state.todos} />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}
export default App;
