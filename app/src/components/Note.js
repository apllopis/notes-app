/** comno es otra lista distinta tambien hay que poner la key */

const Note = ({ content, date }) => {
  return (
    <li>
      <p>
        <strong>{content}</strong>
        <button>Marcar como importante</button>
      </p>
      <small>
        <time>{date}</time>
      </small>
    </li>
  );
};
export default Note;
