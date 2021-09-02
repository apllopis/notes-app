
/**
 * Si el modulo se exporta como nombrado:
 *  export const Note = () =>{....}
 * se tiene que importar como :
 *  import {Note} from "./components/Note.js"
 */
import { useState, useEffect } from 'react'
import noteSrv from '../services/notes'
import Notification from '../components/Notification'
import loginSrv from '../services/login'
import LoginForm from '../components/LoginForm'
import NoteForm from '../components/NoteForm'
import NotesShowForm from '../components/NotesShowForm'

/**  Se pasa una props a App y si no le llega
 * nada se crea como un array vacío
 */
const Notes = () => {
  const [notas, setNotas] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({
    name: '',
    username: '',
    token: null
  })
  /** Se necesita un useEfect para que al hacer el setNotas
   * no se vuelva a renderizar el fetch y entre en bucle
   */
  useEffect(() => {
    setLoading(true)

    if (user.token) {
      noteSrv.getAll()
        .then(inicialNotas => {
          setNotas(inicialNotas)
          setLoading(false)
        })
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteSrv.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    const limpio = {
      name: '',
      username: '',
      token: null
    }
    setUser(limpio)
    noteSrv.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginSrv.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteSrv.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // console.log(user)
    } catch (error) {
      setErrorMessage('Credenciales erróneas')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }
  const addNote = (notaToAddToState) => {
    noteSrv
      .create(notaToAddToState)
      .then(returnedNote => {
        setNotas((prevNotas) => prevNotas.concat(returnedNote))
      })
  }

  /**
   * la key en el elemento mas alto en este caso
   * en el elemnto <Note />
   *
   * Se puede sustituir {notes.map((note)={
   *  return(.....)})}>
   * por
   * {notes.map(note=> (.....))}
   *  si solo está el  return  en la función
   *
   * Poner en el campo input value para que react controle el imput
   * en lugar del DOM
   */
  return (
    <div>
      <h1>Mantenimientos</h1>

      <Notification message={errorMessage} />
      {user.token ? <div>
        <NoteForm
          addNote={addNote}
        />
        <NotesShowForm
          notas={notas}
          loading={loading}
          handleLogout={handleLogout}
        />

      </div>
        : <LoginForm
          username={username}
          password={password}
          handlechangeUsername={
            ({ target }) => setUsername(target.value)
          }
          handleChangePassword={
            ({ target }) => setPassword(target.value)
          }

          handleSubmit={handleLogin}
        />}

    </div>
  )
}

export default Notes
