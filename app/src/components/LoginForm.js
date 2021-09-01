import Togglable from "./Togglable"
import PropTypes from 'prop-types'
const LoginForm = ({ handleSubmit, username, password, handlechangeUsername, handleChangePassword }) => {

  return (
    <Togglable buttonLabel='LOGIN'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Nombre usuario'
            onChange={handlechangeUsername}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder=''
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <button>Acceder</button>
        </div>
      </form>
    </Togglable >
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlechangeUsername: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired
}
export default LoginForm