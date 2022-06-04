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
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';


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

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers, headers })
      .then(response => {
        this.setState({
          projects: this.state.projects.filter((project) => project.id !== id)
        })
      }).catch(error => console.log(error))
  }

  deleteTodo(todo) {
    const headers = this.get_headers()
    if (todo.is_active) {
      axios.delete(`http://127.0.0.1:8000/api/notes/${todo.id}`, { headers, headers })
        .then(response => {
          this.load_data()
        }).catch(error => console.log(error))
    }
    else {
      axios.put(`http://127.0.0.1:8000/api/notes/${todo.id}/`, {
        'name': todo.name, 'project': todo.project, 'text_note': todo.text_note,
        'created_date': todo.created_date, 'created_user': todo.created_user, 'is_active': true
      }, { headers })
        .then(response => {
          this.load_data()
        }).catch(error => console.log(error))
    }
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



  createProject(name, users) {
    let headers = this.get_headers()
    axios.post(`http://127.0.0.1:8000/api/projects/`, { 'name': name, 'users': users }, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  createTodo(name, project, text_note, created_user) {
    let headers = this.get_headers()
    axios.post(`http://127.0.0.1:8000/api/notes/`, { 'name': name, 'project': project, 'text_note': text_note, 'created_user': created_user, 'created_date': new Date() }, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <BrowserRouter>

          <Menu obj={this} />

          <Routes>
            <Route exact path='/' element={<UserList
              users={this.state.users} />} />
            <Route exact path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, users) => this.createProject(name, users)} />} />
            <Route exact path='/projects' element={<ProjectList
              projects={this.state.projects} users={this.state.users} deleteProject={(id) => this.deleteProject(id)} />} />
            <Route exact path='/todos/create' element={<TodoForm users={this.state.users} projects={this.state.projects} createTodo={(name, project, text_note, created_user) => this.createTodo(name, project, text_note, created_user)} />} />
            <Route exact path='/todos' element={<TodoList
              todos={this.state.todos} users={this.state.users} projects={this.state.projects} deleteTodo={(id) => this.deleteTodo(id)} />} />
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
