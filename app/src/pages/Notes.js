import { useState, useEffect } from 'react'
import noteSrv from '../services/notes'
import Notification from '../components/Notification'
import loginSrv from '../services/login'
import LoginForm from '../components/LoginForm'
import NoteForm from '../components/NoteForm'
import Note from '../components/Note'

const Notes = () => {
  const [notas, setNotas] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({
    name: '',
    username: '',
    token: null
  })

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
    noteSrv.setToken(null)
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
  const toggleImportanceOf = (id) => {
    const nota = notas.find(n => n.id === id)
    const changedNote = { ...nota, important: !nota.important }

    noteSrv
      .update(id, changedNote)
      .then(returnedNote => {
        setNotas(notas.map(nota => nota.id !== id ? nota : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Nota '${nota.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const notesToShow = showAll
    ? notas
    : notas.filter(note => note.important)

  return (
    <div>
      <h1>Mantenimientos</h1>

      <Notification message={errorMessage} />
      {user.token ? <div>
        <NoteForm
          addNote={addNote}
        />
        <div>
          {loading ? "Cargando..." : ""}
          <div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              Ver {showAll ? 'solo Importantes' : 'todas'}
            </button>
          </div>

        </div>
        <ul>
          {notesToShow.map((nota, i) =>
            <Note
              key={i}
              note={nota}
              toggleImportance={() => toggleImportanceOf(nota.id)}
            />
          )}
        </ul>
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
