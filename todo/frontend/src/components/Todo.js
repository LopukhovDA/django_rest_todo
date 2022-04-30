import React from 'react'

const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.name}
            </td>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.text_note}
            </td>
            <td>
                {todo.created_user}
            </td>
        </tr>
    )
}

const TodoList = ({ todos }) => {
    return (
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
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}
export default TodoList