import React from 'react'
import { Link } from 'react-router-dom'

const TodoItem = ({ todo, users, projects, deleteTodo }) => {
    let is_active = todo.is_active ? 'true' : 'false'
    let user = users.find(u => u.id == todo.created_user).last_name
    let project = projects.find(p => p.id == todo.project).name
    let button_text = todo.is_active ? 'Set not_active' : 'Set active'
    return (
        <tr>
            <td>
                {todo.name}
            </td>
            <td>
                {project}
            </td>
            <td>
                {todo.text_note}
            </td>
            <td>
                {user}
            </td>
            <td>
                {is_active}
            </td>
            <td><button onClick={() => deleteTodo(todo)} type='button'>{button_text}</button></td>
        </tr>
    )
}

const TodoList = ({ todos, users, projects, deleteTodo }) => {
    return (
        <div>
            <table>
                <th>
                    Name
                </th>
                <th>
                    Project
                </th>
                <th>
                    Tasks
                </th>
                <th>
                    Created user
                </th>
                <th>
                    Is active
                </th>
                {todos.map((todo) => <TodoItem todo={todo} users={users} projects={projects} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}
export default TodoList