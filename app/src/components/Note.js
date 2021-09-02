/** comno es otra lista distinta tambien hay que poner la key */

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'Marcar como no importante'
    : 'Marcar como importante'
  return (
    <li className='note'>
      <p>
        <strong>{note.content}</strong>
        <button onClick={toggleImportance}>{label}</button>
      </p>
      <small>
        <time>{note.date}</time>
      </small>
    </li>
  );
};
export default Note;
