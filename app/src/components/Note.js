/** comno es otra lista distinta tambien hay que poner la key */
import { Link } from "react-router-dom";
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'Marcar como no importante'
    : 'Marcar como importante'
  return (
    <li className='note'>
      <p>
        <Link to={`/notes/${note.id}`}>
          <strong>{note.content}</strong>
        </Link>
        <button onClick={toggleImportance}>{label}</button>
      </p>
      <small>
        <time>{note.date}</time>
      </small>
    </li>
  );
};
export default Note;
