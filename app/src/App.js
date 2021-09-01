/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"

const Home = () => <h1>Home page</h1>

const Notes = () => <h1>Notes page</h1>

const Users = () => <h1>Users page</h1>

const inlineStyles = {
  padding: 5
}
const App = () => {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location
    const page = pathname.slice(1)
    return page
  })

  const getContent = () => {
    if (page === 'users') {
      return <Users />
    } else if (page === 'notes') {
      return <Notes />
    } else {
      return <Home />
    }
  }
  const toPage = page => event => {
    window.history.pushState(null, '', `/${page}`)
    event.preventDefault()
    setPage(page)
  }
  return (
    <div>
      <header>
        <a href='#' onClick={toPage('home')} style={inlineStyles}>Home</a>
        <a href='#' onClick={toPage('notes')} style={inlineStyles}>Notes</a>
        <a href='#' onClick={toPage('users')} style={inlineStyles}>Users</a>
      </header>
      {getContent()}
    </div>
  )
}
export default App