import { useState, useRef } from "react";
import Togglable from "./Togglable";
const NoteForm = ({ addNote }) => {
  const [nuevaNota, setNuevaNota] = useState("");
  const togglableRef = useRef()
  const handleChangeNote = (event) => {
    setNuevaNota(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const notaToAddToState = {
      content: nuevaNota,
      important: Math.random() < 0.55, // para que varíe
    };
    addNote(notaToAddToState)
    setNuevaNota("")
    togglableRef.current.toggleVisibility()
  }
  return (
    <Togglable buttonLabel='Nueva Nota' ref={togglableRef}>
      <h3> Nueva Nota </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChangeNote}
          value={nuevaNota}
        />
        <button>Grabar mantenimiento</button>
      </form>
    </Togglable>
  )
}
export default NoteForm