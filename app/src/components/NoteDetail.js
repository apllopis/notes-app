import { useParams } from "react-router-dom"

export const NoteDetail = ({ notes }) => {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if (!note) {
    return <h1>Nota no encontrada</h1>
  }

  return (
    <div>
      <h3>{note.content}</h3>
      <strong>
        {note.important ? 'Importante' : ''}
      </strong>
      <div> {note.user[0].username}</div>
      <small>
        <time>{note.date}</time>
      </small>
    </div>
  )


}
export default NoteDetail