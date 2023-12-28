const Login =  ({ login, logout, user }) => {
  if (user) {
    return (
      <p>
        {user.name}
        <button onClick={() => logout()}>Logout</button>
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
