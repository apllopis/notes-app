/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NoteDetail from './components/NoteDetail'
import Notes from './pages/Notes'
import noteSrv from './services/notes'
const Home = () => <h1>Home page</h1>
const Users = () => <h1>Users page</h1>

const inlineStyles = {
  padding: 5
}
const App = () => {

  const [notes, setNotes] = useState([])
  useEffect(() => {
    noteSrv.getAll()
      .then(inicialNotas => {
        setNotes(inicialNotas)
      })
  }, [])
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
          <NoteDetail notes={notes} />
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