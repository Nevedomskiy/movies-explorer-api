import './Title.css';

function Title({ text, modification }) {
  return <h2 className={`title ${modification}`}>{text}</h2>;
}

export default Title;
