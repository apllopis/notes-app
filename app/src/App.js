/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import Notes from './pages/Notes'

const Home = () => <h1>Home page</h1>
const Users = () => <h1>Users page</h1>

const inlineStyles = {
  padding: 5
}
const App = () => {


  /** El compnente router envuelve a toda la aplicación  */
  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>Home</Link>
        <Link to='/notes' style={inlineStyles}>Notes</Link>
        <Link to='/users' style={inlineStyles}>Users</Link>
      </header>
      <Switch>
        <Route path='/notes/:id'>
          <h1> Nota por Id</h1>
        </Route>
        <Route path='/notes'>
          <Notes />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App