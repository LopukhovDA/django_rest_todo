import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({ project, users, deleteProject }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users.map(userId => users.find(u => u.id == userId).last_name)}
            </td>
            <td><button onClick={() => deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ projects, users, deleteProject }) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Users
                    </th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} users={users} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}
export default ProjectList