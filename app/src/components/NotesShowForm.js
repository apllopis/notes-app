import { useState } from "react"
import Note from "./Note";
const NotesShowForm = ({ notas, loading, handleLogout }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll
    ? notas
    : notas.filter(note => note.important)

  return (
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
      <ol>
        {notesToShow.map((note) => (
          <Note {...note} key={note.id} />
        ))}
      </ol>
    </div>
  )
}
export default NotesShowForm