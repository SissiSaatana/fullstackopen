import loginService from '../services/loginService'

const Login =  ({ propagateUser, user }) => {

  const login = async(e) => {
    e.preventDefault()
    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      const result = await loginService.postLogin(user)
      localStorage.setItem('loggedNoteappUser', JSON.stringify(result)) 
      propagateUser(result)
    } catch (ex) {
      console.log('exception: ', ex)
    }    
  }

  const logout = () => {
    localStorage.removeItem('loggedNoteappUser')
    propagateUser('')
  }

  if (user) {
    return (
      <p>
        {user.name}
        <button onClick={e =>logout()}>Logout</button>
      </p>
      )
  } else {
    return (
      <form onSubmit={e => login(e)}>
        <input type="text" name="username"></input>
        <input type="text" name="password"></input>
        <button>Kirjaudu</button>
      </form>
    )
  }

  
}

export default Login