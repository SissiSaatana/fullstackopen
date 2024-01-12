import { useState, useEffect } from 'react'
import usersService from '../services/usersSevice'
import { useParams, Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  const id = useParams().id

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersService.getAll()
      setUsers(users)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (id !== undefined && users.length) {
      setSelectedUser(users.find((user) => user.id === id))
    } else {
      setSelectedUser({})
    }
  }, [id])

  if (Object.keys(selectedUser).length === 0) {
    return (
      <>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
      <h2>{selectedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default Users
