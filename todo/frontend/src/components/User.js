import React from 'react'

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.user_category}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Category
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}
export default UserList