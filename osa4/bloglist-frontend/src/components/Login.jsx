import PropTypes from 'prop-types';
import style from '../styles/login.module.css';

const Login = ({ login, logout, user }) => {
  if (user) {
    return (
      <>
        <p>{user.name} logged in</p>
        <button onClick={() => logout()}>Logout</button>
      </>
    );
  } else {
    return (
      <form onSubmit={(e) => login(e)} className={style['login-form']}>
        <div className={style['input-container']}>
          <label htmlFor="username">username:</label>
          <input type="text" name="username"></input>
        </div>

        <div className={style['input-container']}>
          <label htmlFor="password">password:</label>
          <input type="password" name="password"></input>
        </div>

        <button id="login-button">Kirjaudu</button>
      </form>
    );
  }
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  // user: Proptypes.object
};

export default Login;
