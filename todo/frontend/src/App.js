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
import LoginForm from './components/Auth.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': '',
    }
  }

  set_token(token) {
    localStorage.setItem('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return !!this.state.token
  }

  logout() {
    this.set_token('')
    localStorage.setItem('token', '')
  }

  get_token_from_storage() {
    const token = localStorage.getItem('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users', { headers })
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ 'users': [] })
      })

    axios.get('http://127.0.0.1:8000/api/projects', { headers })
      .then(response => {
        const projects = response.data
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ 'projects': [] })
      })

    axios.get('http://127.0.0.1:8000/api/notes', { headers })
      .then(response => {
        const todos = response.data
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ 'todos': [] })
      })
  }

  componentDidMount() {
    this.get_token_from_storage()
  }


  render() {
    return (
      <div>
        <BrowserRouter>

          <Menu obj={this} />

          <Routes>
            <Route exact path='/' element={<UserList
              users={this.state.users} />} />
            <Route exact path='/projects' element={<ProjectList
              projects={this.state.projects} />} />
            <Route exact path='/todos' element={<TodoList
              todos={this.state.todos} />} />
            <Route exact path='/login' element={<LoginForm
              get_token={(username, password) => this.get_token(username, password)} />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}
export default App;
